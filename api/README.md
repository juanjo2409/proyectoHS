# TaskFlow SPA — API Backend

> Backend de desarrollo ligero que expone una API REST con autenticación JWT, encriptación Bcrypt y validación de roles/permisos.

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js (v18+)
- **Base de datos de desarrollo:** `json-server` (Mapea un archivo `db.json` a endpoints REST)
- **Autenticación:** `jsonwebtoken` (Para firmar y verificar tokens de acceso)
- **Seguridad:** `bcryptjs` (Para el hashing seguro de contraseñas)
- **CORS:** `cors` (Habilitado para permitir la comunicación del cliente SPA)

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias
Desde esta carpeta (`/api`), ejecuta:
```bash
npm install
```

### 2. Iniciar el servidor
Arranca la API en modo de desarrollo:
```bash
npm start
```
El servidor estará corriendo en **http://localhost:3000**.

---

## 📝 Base de Datos (`db.json`)
El archivo `db.json` actúa como base de datos local y almacena las colecciones de:
- `users`: Colección de usuarios. Las contraseñas creadas mediante la aplicación se guardan automáticamente hasheadas por Bcrypt.
- `task`: Colección de tareas del sistema, vinculadas a su respectivo propietario a través de `userId`.

---

## 🔒 Flujo de Autenticación y Autorización

El archivo principal [server.js](file:///c:/Users/juanj/Desktop/TaskFlowSPA/api/server.js) implementa tres capas principales de seguridad:

### 1. Endpoints Públicos
- `POST /register`: Hashea la contraseña recibida con Bcrypt (`bcrypt.hashSync(password, 10)`) y guarda el usuario con rol `USER` por defecto.
- `POST /login`: Valida las credenciales. Si coinciden, genera y firma un token JWT que expira en 2 horas (`expiresIn: '2h'`), devolviendo el token y los datos seguros del usuario (removiendo la contraseña del objeto).

### 2. Middleware de Verificación JWT
Cualquier otra ruta requiere la cabecera `Authorization: Bearer <token>`. El servidor decodifica el token con la clave secreta y añade el usuario desencriptado al objeto de petición (`req.user = decoded`).

### 3. Middleware de Roles y Permisos (Evita IDOR)
- **Acceso a Usuarios (`/users`):**
  - Un usuario con rol `ADMIN` puede listar, ver, editar y eliminar cualquier usuario.
  - Un usuario con rol `USER` solo puede consultar, editar o eliminar **su propio** registro (comparando el ID de la ruta con el del token).
- **Acceso a Tareas (`/task`):**
  - Si un `USER` hace un `GET /task`, el servidor reescribe silenciosamente la consulta para añadir `userId = req.user.id`, previniendo que lea tareas ajenas.
  - Si se intenta editar (`PUT`), parchear (`PATCH`) o eliminar (`DELETE`) una tarea específica, el servidor consulta la base de datos y rechaza la petición con `403 Forbidden` si la tarea no le pertenece al usuario autenticado (a menos que sea `ADMIN`).

---

## 📡 Endpoints de la API

| Método | Endpoint | Cabecera Auth | Permiso Requerido | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/login` | No | Público | Valida credenciales y entrega el JWT |
| **POST** | `/register` | No | Público | Registra un usuario y hashea su contraseña |
| **GET** | `/users` | Sí | `ADMIN` | Obtiene la lista de todos los usuarios |
| **GET** | `/users/:id` | Sí | `ADMIN` o Propietario | Obtiene la información de un usuario específico |
| **PUT** | `/users/:id` | Sí | `ADMIN` o Propietario | Actualiza los datos de un usuario |
| **DELETE** | `/users/:id` | Sí | `ADMIN` o Propietario | Elimina una cuenta de usuario |
| **GET** | `/task` | Sí | Cualquiera | Obtiene las tareas (Propias para USER; Todas para ADMIN) |
| **POST** | `/task` | Sí | Cualquiera | Crea una nueva tarea |
| **PUT** | `/task/:id` | Sí | `ADMIN` o Propietario | Edita todos los campos de una tarea |
| **PATCH**| `/task/:id` | Sí | `ADMIN` o Propietario | Edita parcialmente una tarea |
| **DELETE**| `/task/:id` | Sí | `ADMIN` o Propietario | Elimina una tarea |
