# TaskFlow SPA

> Sistema de gestión de tareas moderno — Single Page Application construida con JavaScript Vanilla, Tailwind CSS v4 y una API REST con JWT.

![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/License-MIT-violet)

---

## 🌐 Demo en producción

| Servicio | URL |
|---|---|
| 🖥️ **Frontend (Vercel)** | [taskflow-spa en Vercel](https://proyectohs.vercel.app) |
| ⚙️ **Backend API (Render)** | https://proyectohs-5.onrender.com |

> ⚠️ El backend corre en **Render plan gratuito**. Si lleva un rato sin usarse, la primera petición puede tardar hasta **60 segundos** mientras el servidor despierta. Es normal — la app muestra un indicador de carga durante ese tiempo.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Demo en producción](#-demo-en-producción)
- [Rutas disponibles](#rutas-disponibles)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Características implementadas](#características-implementadas)
- [Roles y permisos](#roles-y-permisos)
- [Despliegue](#despliegue)
- [Desarrollo local](#desarrollo-local)
- [API — Endpoints disponibles](#api--endpoints-disponibles)
- [Persistencia en localStorage](#persistencia-en-localstorage)
- [Licencia](#licencia)

---

## Descripción

**TaskFlow SPA** es una aplicación web completamente funcional que simula un sistema de productividad y gestión de tareas. Demuestra cómo construir una SPA robusta con JavaScript Vanilla sin depender de frameworks como React, Vue o Angular, aplicando buenas prácticas de arquitectura frontend por capas.

La aplicación cuenta con:

- **Modo claro / oscuro** persistente (`localStorage`).
- **Soporte multiidioma** Español / Inglés (`localStorage`).
- **Autenticación JWT** real contra un backend con `json-server`.
- **Panel de administración** con gestión completa de usuarios y tareas.
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
| Panel Admin | `/admin` | ADMIN |
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
├── api/                        # Backend fake con JWT → Render
│   ├── server.js               # Servidor Express + json-server + JWT
│   ├── db.json                 # Base de datos (usuarios y tareas)
│   └── package.json
│
└── client/                     # SPA frontend → Vercel
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
        │   ├── auth.service.js     # Login, sesión activa (usa POST /login)
        │   ├── task.service.js     # CRUD de tareas (usa /task)
        │   └── users.service.js    # CRUD de usuarios (usa /users, /register)
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
- [x] Registro con hash de contraseña (`bcryptjs`) — procesado en el servidor
- [x] Login con generación de **JWT real** en el backend (expira en 2 h)
- [x] Sesión persistida en `localStorage`
- [x] Cierre de sesión con limpieza de estado
- [x] Guards en el router — redirige si no hay token

### Tareas (CRUD completo)
- [x] Crear tarea con título, descripción, fecha límite y estado
- [x] Editar tarea existente (formulario reutilizable)
- [x] Eliminar tarea con confirmación
- [x] Filtrar tareas por estado (Pendiente / En progreso / Completada)
- [x] La API asigna automáticamente `userId` al crear si el rol es USER

### Panel de administración
- [x] Ver todos los usuarios con sus estadísticas
- [x] Cambiar rol de usuario (USER ↔ ADMIN)
- [x] Eliminar usuario
- [x] Ver, editar y eliminar las tareas de cualquier usuario
- [x] Estadísticas globales: total usuarios, total tareas, completadas

### UI / UX
- [x] Modo oscuro / claro con transición suave (persistido en `localStorage`)
- [x] Selector de idioma ES / EN (persistido en `localStorage`)
- [x] Diseño premium con glassmorphism y gradientes violeta/índigo
- [x] Indicador de carga mientras el servidor responde
- [x] Micro-animaciones (`fadeInUp`, `float`, `pulse-glow`)
- [x] Modales temáticos con SweetAlert2
- [x] Responsive — adaptado para móvil y escritorio
- [x] Página 404 personalizada

---

## Roles y permisos

### `ADMIN`
- Acceso completo a todos los endpoints de la API.
- Puede listar, crear, editar y eliminar cualquier usuario o tarea.
- Acceso exclusivo al panel `/admin`.

### `USER`
- Solo puede ver y modificar sus propias tareas.
- Solo puede editar su propio perfil.
- Puede eliminar su propia cuenta.
- La API rechaza con `403` cualquier intento de acceder a recursos ajenos.

---

## Despliegue

### Frontend → Vercel

El cliente se despliega automáticamente desde la rama `main` del repositorio.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Root directory:** `client`
- Vercel redespliega automáticamente con cada `git push`.

### Backend → Render

La API corre como un **Web Service** en Render apuntando a la carpeta `/api`.

- **Start command:** `node server.js`
- **Puerto:** definido por la variable de entorno `PORT` (Render lo inyecta automáticamente)
- **URL pública:** `https://proyectohs-5.onrender.com`

> ⚠️ **Limitación del plan gratuito de Render:** El servidor se suspende tras 15 minutos de inactividad. La primera petición después de un período de inactividad puede tardar hasta 60 segundos. La app muestra un indicador de carga durante ese tiempo.

> ⚠️ **Persistencia de datos:** En el plan gratuito de Render, el sistema de archivos es efímero. Los usuarios nuevos registrados se perderán si el servidor se redespliega. Los datos iniciales provienen del `db.json` commiteado en el repositorio.

---

## Desarrollo local

### Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanjo2409/proyectoHS.git
cd TaskFlowSPA
```

### 2. Levantar el backend (API)

```bash
cd api
npm install
npm start
```

El servidor queda corriendo en **http://localhost:3000**.

### 3. Levantar el frontend (cliente)

Abre una segunda terminal:

```bash
cd client
npm install
npm run dev
```

La app queda disponible en **http://localhost:5173** (o el puerto que indique Vite).

> 💡 En desarrollo local, cambia la variable `endpoint` / `API_URL` en los servicios de `http://localhost:3000` antes de correr el cliente.

### 4. Credenciales de prueba

El archivo `api/db.json` contiene usuarios de ejemplo con contraseñas hasheadas. Puedes registrar nuevos desde `/register`.

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
| `POST` | `/register` | ❌ | Registro — hashea contraseña y crea usuario |
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

## Persistencia en localStorage

| Clave | Contenido | Cuándo se borra |
|---|---|---|
| `token` | JWT firmado por el servidor | Al cerrar sesión o expirar |
| `user` | Objeto usuario (sin contraseña) | Al cerrar sesión o eliminar cuenta |
| `theme` | `"dark"` \| `"light"` | Nunca (preferencia permanente) |
| `lang` | `"es"` \| `"en"` | Nunca (preferencia permanente) |
| `taskId` | ID de la tarea en edición | Al terminar de editar / cancelar |

---

## Licencia

Este proyecto se distribuye bajo la licencia incluida en [`client/LICENSE`](./client/LICENSE).
