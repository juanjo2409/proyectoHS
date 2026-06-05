# TaskFlow SPA — API Backend

> Backend REST con autenticación JWT, hash de contraseñas y control de roles — desplegado en **Render**.

![Deploy](https://img.shields.io/badge/Desplegado%20en-Render-46E3B7?logo=render)

**🌐 URL en producción:** `https://proyectohs-5.onrender.com`

> ⚠️ Plan gratuito de Render: el servidor se suspende tras 15 min de inactividad. La primera petición puede tardar hasta **60 segundos**. La app frontend muestra un spinner durante ese tiempo.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | ≥18 | Entorno de ejecución |
| json-server | ^0.17.4 | Base de datos fake en `db.json` |
| jsonwebtoken | ^9.0 | Firma y verificación de JWT (2h) |
| bcryptjs | ^3.0 | Hash seguro de contraseñas (salt 10) |
| cors | ^2.8 | Habilita peticiones cross-origin desde Vercel |

---

## 🚀 Despliegue en Render

| Parámetro | Valor |
|---|---|
| Root directory | `api` |
| Start command | `node server.js` |
| Puerto | Variable `PORT` inyectada automáticamente por Render |
| URL pública | `https://proyectohs-5.onrender.com` |

Cada `git push` a `main` redesplega automáticamente.

> ⚠️ **Datos efímeros:** el sistema de archivos de Render free tier se resetea con cada redespliegue. Los datos base vienen del `db.json` commiteado en el repositorio.

---

## 📝 Base de Datos (`db.json`)

El archivo `db.json` es la base de datos del servidor y contiene dos colecciones:

- **`users`** — usuarios con contraseñas hasheadas por bcrypt.
- **`task`** — tareas vinculadas a su propietario vía `userId`.

Usuarios incluidos por defecto:

| Email | Rol |
|---|---|
| `juanjosemn63@gmail.com` | ADMIN |
| `kim3@gmail.com` | USER |
| `robleskeyner8@gmail.com` | USER |

---

## 🔒 Flujo de Autenticación y Autorización

### 1. Endpoints Públicos (sin token)

**`POST /register`**
- Recibe: `name`, `lastName`, `email`, `password`, `adminKey` (opcional)
- Hashea la contraseña con `bcrypt.hashSync(password, 10)`
- Si `adminKey === 'riwi'` → asigna rol `ADMIN`; de lo contrario → `USER`
- Devuelve el usuario creado sin contraseña

**`POST /login`**
- Recibe: `email`, `password`
- Busca el usuario, compara contraseña con bcrypt
- Genera y firma un JWT con `expiresIn: '2h'`
- Devuelve `{ token, user }` (sin contraseña)

### 2. Middleware JWT (todas las demás rutas)
Verifica el header `Authorization: Bearer <token>`. Si el token es inválido o expirado devuelve `401`.

### 3. Middleware de Roles (prevención de IDOR)

**`/users`**
- `ADMIN` → acceso total (listar, ver, editar, eliminar cualquier usuario)
- `USER` → solo puede ver/editar/eliminar su propio registro

**`/task`**
- `GET` de un `USER` → el servidor inyecta `?userId=<id>` automáticamente
- `PUT`/`DELETE` → verifica que la tarea pertenezca al usuario; si no, devuelve `403`
- `POST` de un `USER` → el servidor sobreescribe `userId` con el del token

---

## 📡 Endpoints

Base URL: `https://proyectohs-5.onrender.com`

| Método | Endpoint | Auth | Permiso | Descripción |
|---|---|---|---|---|
| `POST` | `/login` | ❌ | Público | Valida credenciales y devuelve JWT |
| `POST` | `/register` | ❌ | Público | Crea usuario; acepta `adminKey` para rol ADMIN |
| `GET` | `/users` | ✅ | ADMIN | Lista todos los usuarios |
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
# API en http://localhost:3000
```

Recuerda cambiar la `API_URL` en los servicios del cliente a `http://localhost:3000` para trabajar en local.

---

## Scripts

```bash
npm start   # node server.js
```
