# TaskFlow SPA — API Backend

> Backend REST con autenticación JWT y hash de contraseñas — desplegado en **Render**.

![Deploy](https://img.shields.io/badge/Desplegado%20en-Render-46E3B7?logo=render)

**URL en producción:** `https://proyectohs-5.onrender.com`

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js (v18+)
- **Base de datos:** `json-server` v0.17 (mapea `db.json` a endpoints REST)
- **Autenticación:** `jsonwebtoken` (firma y verifica tokens JWT — 2h de expiración)
- **Seguridad:** `bcryptjs` (hashing seguro de contraseñas con salt 10)
- **CORS:** `cors` (habilitado para permitir peticiones del frontend en Vercel)

---

## 🚀 Despliegue en Render

La API está desplegada como **Web Service** en Render.

| Configuración | Valor |
|---|---|
| Start command | `node server.js` |
| Root directory | `api` |
| Puerto | Inyectado por Render vía `PORT` |
| URL pública | `https://proyectohs-5.onrender.com` |

> ⚠️ **Plan gratuito:** El servidor se suspende tras 15 min de inactividad. La primera petición puede tardar hasta 60 segundos mientras despierta.

> ⚠️ **Datos efímeros:** En el plan gratuito, el sistema de archivos se resetea con cada redespliegue. Los datos persisten solo mientras el servidor está corriendo. Los datos base provienen del `db.json` commiteado en el repo.

---

## 📝 Base de Datos (`db.json`)

El archivo `db.json` actúa como base de datos y almacena:
- **`users`**: Colección de usuarios. Las contraseñas se guardan hasheadas con Bcrypt.
- **`task`**: Colección de tareas vinculadas a su propietario mediante `userId`.

Datos iniciales incluidos en el repo (contraseñas hasheadas con bcrypt):

| Email | Rol |
|---|---|
| `juanjosemn63@gmail.com` | ADMIN |
| `kim3@gmail.com` | USER |
| `robleskeyner8@gmail.com` | USER |

---

## 🔒 Flujo de Autenticación y Autorización

El archivo [server.js](./server.js) implementa tres capas de seguridad:

### 1. Endpoints Públicos (sin token)
- `POST /register`: Hashea la contraseña con `bcrypt.hashSync(password, 10)` y guarda el usuario con rol `USER` por defecto.
- `POST /login`: Valida credenciales, genera y firma un JWT (`expiresIn: '2h'`), devuelve el token y datos del usuario sin contraseña.

### 2. Middleware de Verificación JWT
Cualquier ruta fuera de `/login` y `/register` requiere `Authorization: Bearer <token>`. El servidor decodifica el token y añade el usuario a `req.user`.

### 3. Middleware de Roles y Permisos (prevención IDOR)
- **`/users`:** Un `USER` solo puede consultar/editar/eliminar su propio registro. Un `ADMIN` tiene acceso total.
- **`/task`:** Los `GET` de un `USER` se filtran automáticamente por `userId`. Los `PUT`/`DELETE` verifican que la tarea pertenezca al usuario autenticado.

---

## 📡 Endpoints de la API

Base URL: `https://proyectohs-5.onrender.com`

| Método | Endpoint | Auth requerida | Permiso | Descripción |
|---|---|---|---|---|
| `POST` | `/login` | ❌ | Público | Valida credenciales y entrega JWT |
| `POST` | `/register` | ❌ | Público | Registra usuario con contraseña hasheada |
| `GET` | `/users` | ✅ | `ADMIN` | Lista todos los usuarios |
| `GET` | `/users/:id` | ✅ | ADMIN o Propietario | Obtiene un usuario |
| `PUT` | `/users/:id` | ✅ | ADMIN o Propietario | Actualiza usuario |
| `DELETE` | `/users/:id` | ✅ | ADMIN o Propietario | Elimina usuario |
| `GET` | `/task` | ✅ | Cualquiera | Tareas propias (USER) o todas (ADMIN) |
| `POST` | `/task` | ✅ | Cualquiera | Crea tarea |
| `PUT` | `/task/:id` | ✅ | ADMIN o Propietario | Edita tarea |
| `PATCH` | `/task/:id` | ✅ | ADMIN o Propietario | Edita parcialmente tarea |
| `DELETE` | `/task/:id` | ✅ | ADMIN o Propietario | Elimina tarea |

---

## 💻 Desarrollo local

```bash
cd api
npm install
npm start
# Servidor en http://localhost:3000
```

> Recuerda actualizar la `API_URL` en los servicios del cliente para que apunten a `http://localhost:3000` en lugar de la URL de Render.

---

## Scripts

```bash
npm start   # node server.js — inicia la API
```
