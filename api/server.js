const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const SECRET_KEY = 'taskflow-super-secret-key-12345';

// Enable CORS
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom Login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }

  const db = router.db; // lowdb instance
  const user = db.get('users').find({ email }).value();

  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  // Compare passwords (supports both plain text for original DB entries and bcrypt for new entries)
  let passwordMatches = false;
  if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
    passwordMatches = bcrypt.compareSync(password, user.password);
  } else {
    passwordMatches = (user.password === password);
  }

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  // Return token and safe user details (excluding password)
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// Custom Register endpoint (so we hash passwords when creating a user)
server.post('/register', (req, res) => {
  const { name, lastName, email, password, role } = req.body;
  if (!name || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const db = router.db;
  const userExists = db.get('users').find({ email }).value();

  if (userExists) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Custom ID generation similar to what json-server does
  const id = Math.random().toString(36).substring(2, 9);
  
  const newUser = {
    name,
    lastName,
    email,
    password: hashedPassword,
    role: role || 'USER',
    id
  };

  db.get('users').push(newUser).write();

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// JWT Verification Middleware for all other routes
server.use((req, res, next) => {
  // Allow OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de acceso faltante o inválido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
});

// Add rules for permissions/roles after JWT verification
server.use((req, res, next) => {
  // Encrypt password when updating a user record
  if (req.path.startsWith('/users') && (req.method === 'PUT' || req.method === 'PATCH')) {
    if (req.body && req.body.password) {
      if (!req.body.password.startsWith('$2a$') && !req.body.password.startsWith('$2b$')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
    }
  }

  // Check access to users
  if (req.path.startsWith('/users')) {
    // ADMIN can do anything. USER can only view/edit/delete their own user record.
    if (req.user.role !== 'ADMIN') {
      const targetId = req.path.split('/')[2];
      // If it's querying all users, USER is not allowed
      if (!targetId && req.method === 'GET') {
        return res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
      }
      // If editing or deleting a specific user, targetId must match req.user.id
      if (targetId && targetId !== req.user.id) {
        return res.status(403).json({ message: 'Acceso denegado: no puedes manipular la cuenta de otro usuario' });
      }
    }
  }

  // Check access to tasks
  if (req.path.startsWith('/task')) {
    // If it's a GET, filter tasks by userId if user is USER
    if (req.method === 'GET' && req.user.role !== 'ADMIN') {
      req.query.userId = req.user.id;
    }
    
    // If it's a POST/PUT/DELETE, check if user is admin or the task belongs to them
    if ((req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') && req.user.role !== 'ADMIN') {
      const targetTaskId = req.path.split('/')[2];
      if (targetTaskId) {
        const db = router.db;
        const task = db.get('task').find({ id: targetTaskId }).value();
        if (task && task.userId !== req.user.id) {
          return res.status(403).json({ message: 'Acceso denegado: no eres el propietario de esta tarea' });
        }
      }
    }

    // If it's a POST, enforce the userId of the authenticated user
    if (req.method === 'POST' && req.user.role !== 'ADMIN') {
      req.body.userId = req.user.id;
    }
  }

  next();
});

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server + JWT Auth running on port 3000');
});
