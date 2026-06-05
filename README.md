# TaskFlow SPA

> Sistema de gestión de tareas moderno — Single Page Application construida con JavaScript Vanilla, Tailwind CSS v4 y una API REST con JWT.

![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/Licencia-MIT-violet)

---

## 🌐 Acceso en producción

| Servicio | URL |
|---|---|
| 🖥️ **Aplicación web (Vercel)** | **https://proyecto-hs.vercel.app** |
| ⚙️ **API backend (Render)** | https://proyectohs-5.onrender.com |

> ⚠️ **Nota sobre el backend:** corre en el plan gratuito de Render. Si lleva un rato sin usarse, la primera petición puede tardar hasta **60 segundos** mientras el servidor despierta. La app muestra un indicador de carga durante ese tiempo — es completamente normal.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Acceso en producción](#-acceso-en-producción)
- [Rutas disponibles](#rutas-disponibles)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Características implementadas](#características-implementadas)
- [Roles y permisos](#roles-y-permisos)
- [Despliegue](#despliegue)
- [Desarrollo local](#desarrollo-local)
- [API — Endpoints disponibles](#api--endpoints-disponibles)
- [Licencia](#licencia)

---

## Descripción

**TaskFlow SPA** es una aplicación web completamente funcional que simula un sistema de productividad y gestión de tareas. Demuestra cómo construir una SPA robusta con JavaScript Vanilla sin depender de frameworks como React, Vue o Angular, aplicando buenas prácticas de arquitectura frontend por capas.

La aplicación cuenta con:

- **Autenticación JWT** real contra un backend con `json-server`.
- **Sistema de roles** — `USER` y `ADMIN` con permisos diferenciados.
- **Registro con clave secreta** — para registrarse como ADMIN se requiere una clave.
- **Modo claro / oscuro** persistente en `localStorage`.
- **Soporte multiidioma** Español / Inglés persistido en `localStorage`.
- **Diseño premium** con glassmorphism, gradientes y micro-animaciones.

---

## Rutas disponibles

| Vista | Ruta | Rol requerido |
|---|---|---|
| Landing page | `/` | Público |
| Login | `/login` | Público |
| Registro | `/register` | Público |
| Dashboard | `/dashboard` | USER / ADMIN |
| Mis tareas | `/tasks` | USER / ADMIN |
| Crear / Editar tarea | `/tasks/new` | USER / ADMIN |
| Mi perfil | `/profile` | USER / ADMIN |
| Panel Admin | `/admin` | Solo ADMIN |
| 404 | `*` | — |

---

## Stack tecnológico

### Frontend — `/client` → desplegado en Vercel

| Tecnología | Versión | Rol |
|---|---|---|
| JavaScript Vanilla (ES Modules) | ES2022+ | Lógica de la SPA |
| Vite | ^8.0 | Bundler / Dev server |
| Tailwind CSS | ^4.3 | Estilos utilitarios |
| SweetAlert2 | ^11.26 | Modales y alertas |
| History API | Nativa | Routing SPA |

### Backend — `/api` → desplegado en Render

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | ≥18 | Entorno de ejecución |
| json-server | ^0.17.4 | Base de datos fake REST |
| jsonwebtoken | ^9.0 | Generación / verificación JWT |
| bcryptjs | ^3.0 | Hash de contraseñas |
| cors | ^2.8 | Manejo de CORS |

---

## Estructura del proyecto

```
TaskFlowSPA/
├── api/                        # Backend → desplegado en Render
│   ├── server.js               # Servidor Express + json-server + JWT + guards de rol
│   ├── db.json                 # Base de datos (usuarios y tareas)
│   └── package.json
│
└── client/                     # SPA frontend → desplegada en Vercel
    ├── index.html
    ├── vite.config.ts
    ├── package.json
    └── src/
        ├── main.js             # Punto de entrada — inicia tema y router
        ├── styles/
        │   └── global.css      # Sistema de diseño: tokens, glassmorphism, modos
        ├── router/
        │   ├── router.js       # Router SPA con guards de autenticación y rol
        │   └── routes.js       # Definición de rutas y metadatos
        ├── services/
        │   ├── auth.service.js     # Login via POST /login, sesión con JWT
        │   ├── task.service.js     # CRUD de tareas (GET/POST/PUT/DELETE /task)
        │   └── users.service.js    # CRUD de usuarios (/users, POST /register)
        ├── utils/
        │   ├── theme.js        # Toggle modo oscuro/claro + initTheme
        │   └── i18n.js         # Traducciones ES/EN + getLangSelectHtml
        └── views/
            ├── home.js         # Landing page pública
            ├── notFound.js     # Página 404
            ├── auth/
            │   ├── login.js
            │   └── register.js
            ├── app/
            │   └── dashboard.js
            ├── tasks/
            │   ├── task.js     # Lista de tareas
            │   └── taskForm.js # Crear / editar tarea
            └── admin/
                ├── admin.js    # Panel de control ADMIN
                └── profile.js  # Perfil del usuario
```

---

## Características implementadas

### Autenticación y sesión
- [x] Registro — el servidor hashea la contraseña con `bcryptjs`
- [x] Login con JWT real generado por el servidor (expira en 2 h)
- [x] Sesión persistida en `localStorage`
- [x] Cierre de sesión con limpieza de estado
- [x] Guards en el router — redirige si no hay token válido

### Sistema de roles
- [x] Al registrarse se elige rol `USER` o `ADMIN`
- [x] Si se elige `ADMIN`, el formulario pide una **clave secreta**
- [x] La clave se valida en el servidor — no puede saltarse desde el cliente
- [x] El panel `/admin` es exclusivo para usuarios con rol `ADMIN`

### Tareas (CRUD completo)
- [x] Crear tarea con título, descripción, fecha límite y estado
- [x] Editar tarea existente (formulario reutilizable)
- [x] Eliminar tarea con confirmación
- [x] Filtrar tareas por estado (Pendiente / En progreso / Completada)
- [x] La API filtra automáticamente por `userId` si el rol es `USER`

### Panel de administración
- [x] Ver todos los usuarios con sus estadísticas
- [x] Cambiar rol de usuario (USER ↔ ADMIN)
- [x] Eliminar usuario
- [x] Ver, editar y eliminar las tareas de cualquier usuario
- [x] Estadísticas globales

### UI / UX
- [x] Modo oscuro / claro con transición suave
- [x] Selector de idioma ES / EN
- [x] Indicador de carga mientras el servidor despierta (Render free tier)
- [x] Diseño premium con glassmorphism y gradientes violeta/índigo
- [x] Micro-animaciones y modales con SweetAlert2
- [x] Responsive — móvil y escritorio

---

## Roles y permisos

### `ADMIN`
- Acceso completo a todos los endpoints de la API.
- Puede listar, crear, editar y eliminar cualquier usuario o tarea.
- Acceso exclusivo al panel `/admin`.
- Para registrarse como ADMIN se requiere una **clave secreta**.

### `USER`
- Solo puede ver y modificar sus propias tareas.
- Solo puede editar su propio perfil.
- Puede eliminar su propia cuenta.
- La API rechaza con `403` cualquier intento de acceder a recursos ajenos.

---

## Despliegue

### Frontend → Vercel

URL: **https://proyecto-hs.vercel.app**

El cliente se despliega automáticamente desde la rama `main` del repositorio.

| Parámetro | Valor |
|---|---|
| Framework preset | Vite |
| Root directory | `client` |
| Build command | `npm run build` |
| Output directory | `dist` |

Cada `git push` a `main` lanza un redespliegue automático en Vercel.

### Backend → Render

URL: **https://proyectohs-5.onrender.com**

La API corre como **Web Service** en Render apuntando a la carpeta `/api`.

| Parámetro | Valor |
|---|---|
| Root directory | `api` |
| Start command | `node server.js` |
| Puerto | Variable `PORT` inyectada por Render |

> ⚠️ **Plan gratuito de Render:** el servidor se suspende tras 15 minutos de inactividad. La primera petición puede tardar hasta 60 segundos. La aplicación muestra un spinner de carga durante ese tiempo.

> ⚠️ **Persistencia de datos:** el sistema de archivos en Render free tier es efímero — los datos nuevos se pierden al redesplegar. Los datos base provienen del `api/db.json` commiteado en el repositorio.

---

## Desarrollo local

### Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanjo2409/proyectoHS.git
cd TaskFlowSPA
```

### 2. Levantar el backend

```bash
cd api
npm install
npm start
# API corriendo en http://localhost:3000
```

### 3. Levantar el frontend

Abre una segunda terminal:

```bash
cd client
npm install
npm run dev
# App en http://localhost:5173
```

> 💡 Para desarrollo local, cambia la variable `API_URL` / `endpoint` en los archivos de servicios de `https://proyectohs-5.onrender.com` a `http://localhost:3000`.

### 4. Usuarios de prueba

Los usuarios vienen en `api/db.json` con contraseñas ya hasheadas. Para saber las contraseñas, regístralos de nuevo o edita el `db.json` localmente.

| Email | Rol |
|---|---|
| `juanjosemn63@gmail.com` | ADMIN |
| `kim3@gmail.com` | USER |
| `robleskeyner8@gmail.com` | USER |

---

## API — Endpoints disponibles

Base URL en producción: `https://proyectohs-5.onrender.com`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `POST` | `/login` | ❌ | Autenticación — devuelve JWT + usuario |
| `POST` | `/register` | ❌ | Registro — hashea contraseña; acepta `adminKey` para rol ADMIN |
| `GET` | `/users` | ✅ ADMIN | Listar todos los usuarios |
| `GET` | `/users/:id` | ✅ | Ver usuario por ID |
| `PUT` | `/users/:id` | ✅ | Actualizar usuario (propio o cualquiera si ADMIN) |
| `DELETE` | `/users/:id` | ✅ | Eliminar usuario |
| `GET` | `/task` | ✅ | Listar tareas (USER: solo las propias; ADMIN: todas) |
| `POST` | `/task` | ✅ | Crear tarea |
| `PUT` | `/task/:id` | ✅ | Editar tarea |
| `DELETE` | `/task/:id` | ✅ | Eliminar tarea |

> Todas las rutas protegidas requieren el header `Authorization: Bearer <token>`.

---

## Licencia

Este proyecto se distribuye bajo la licencia incluida en [`client/LICENSE`](./client/LICENSE).
