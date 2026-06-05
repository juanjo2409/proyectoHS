# TaskFlow SPA

> Sistema de gestión de tareas moderno — Single Page Application construida con JavaScript Vanilla, Tailwind CSS v4 y una API REST con JWT.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Demo rápida](#demo-rápida)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Características implementadas](#características-implementadas)
- [Roles y permisos](#roles-y-permisos)
- [Inicio rápido](#inicio-rápido)
- [Variables de entorno y configuración](#variables-de-entorno-y-configuración)
- [Arquitectura frontend](#arquitectura-frontend)
- [API — Endpoints disponibles](#api--endpoints-disponibles)
- [Persistencia en localStorage](#persistencia-en-localstorage)
- [Scripts disponibles](#scripts-disponibles)
- [Licencia](#licencia)

---

## Descripción

**TaskFlow SPA** es una aplicación web completamente funcional que simula un sistema de productividad y gestión de tareas. Su objetivo pedagógico es demostrar cómo construir una SPA robusta con JavaScript Vanilla sin depender de frameworks como React, Vue o Angular, aplicando buenas prácticas de arquitectura frontend por capas.

La aplicación cuenta con:

- **Modo claro / oscuro** persistente (`localStorage`).
- **Soporte multiidioma** Español / Inglés (`localStorage`).
- **Autenticación JWT** real contra un backend con `json-server`.
- **Panel de administración** con gestión completa de usuarios y tareas.
- **Diseño premium** con glassmorphism, gradientes y micro-animaciones.

---

## Demo rápida

| Vista | Ruta | Rol requerido |
|---|---|---|
| Landing page | `/` | Público |
| Login | `/login` | Público |
| Registro | `/register` | Público |
| Dashboard | `/dashboard` | USER / ADMIN |
| Mis tareas | `/tasks` | USER / ADMIN |
| Crear / Editar tarea | `/task-form` | USER / ADMIN |
| Mi perfil | `/profile` | USER / ADMIN |
| Panel Admin | `/admin` | ADMIN |
| 404 | `*` | — |

---

## Stack tecnológico

### Frontend — `/client`

| Tecnología | Versión | Rol |
|---|---|---|
| JavaScript Vanilla (ES Modules) | ES2022+ | Lógica de la SPA |
| Vite | ^8.0 | Bundler / Dev server |
| Tailwind CSS | ^4.3 | Estilos utilitarios |
| SweetAlert2 | ^11.26 | Modales y alertas |
| History API | Nativa | Routing SPA |

### Backend — `/api`

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | ≥18 | Entorno de ejecución |
| json-server | ^1.0.0-beta.15 | Base de datos fake |
| jsonwebtoken | ^9.0 | Generación / verificación JWT |
| bcryptjs | ^3.0 | Hash de contraseñas |
| cors | ^2.8 | Manejo de CORS |

---

## Estructura del proyecto

```
TaskFlowSPA/
├── api/                        # Backend fake con JWT
│   ├── server.js               # Servidor Express + json-server + JWT
│   ├── db.json                 # Base de datos (usuarios y tareas)
│   └── package.json
│
└── client/                     # SPA frontend
    ├── index.html
    ├── vite.config.ts
    ├── package.json
    └── src/
        ├── main.js             # Punto de entrada — inicia tema y router
        ├── styles/
        │   └── global.css      # Sistema de diseño: tokens, glassmorphism, modos
        ├── router/
        │   └── router.js       # Router SPA con guards de autenticación y rol
        ├── services/
        │   ├── auth.service.js     # Login, registro, sesión activa
        │   ├── task.service.js     # CRUD de tareas
        │   └── users.service.js    # CRUD de usuarios (admin)
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
- [x] Registro con hash de contraseña (`bcryptjs`)
- [x] Login con generación de **JWT** (expira en 2 h)
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
- [x] Crear tareas en nombre de otro usuario
- [x] Estadísticas globales: total usuarios, total tareas, completadas

### UI / UX
- [x] Modo oscuro / claro con transición suave (persistido en `localStorage`)
- [x] Selector de idioma ES / EN (persistido en `localStorage`)
- [x] Diseño premium con glassmorphism y gradientes violeta/índigo
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

## Inicio rápido

### Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd TaskFlowSPA
```

### 2. Levantar el backend (API)

```bash
cd api
npm install
npx json-server db.json --port 3000 
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

### 4. Credenciales de prueba

El archivo `api/db.json` contiene usuarios de ejemplo. Puedes registrar nuevos desde `/register`. El primer usuario con rol `ADMIN` puede ser creado directamente en `db.json`:

```json
{
  "users": [
    {
      "id": "admin1",
      "name": "Admin",
      "lastName": "Principal",
      "email": "admin@taskflow.com",
      "password": "admin123",
      "role": "ADMIN"
    }
  ],
  "task": []
}
```

> **Nota:** Las contraseñas en texto plano sólo funcionan para usuarios pre-cargados en `db.json`. Los usuarios creados desde `/register` tienen contraseñas hasheadas automáticamente.

---

## Variables de entorno y configuración

### API (`/api/server.js`)

| Constante | Valor por defecto | Descripción |
|---|---|---|
| `SECRET_KEY` | `taskflow-super-secret-key-12345` | Clave para firmar/verificar JWT |
| Puerto | `3000` | Puerto del servidor |

> ⚠️ En producción cambia `SECRET_KEY` por una variable de entorno real.

### Cliente (`/client`)

El cliente apunta a `http://localhost:3000` como base URL de la API. Si cambias el puerto del backend, actualiza la constante en los archivos de servicio:

```
client/src/services/auth.service.js
client/src/services/task.service.js
client/src/services/users.service.js
```

---

## Arquitectura frontend

La SPA sigue una **arquitectura por capas** limpia:

```
┌─────────────────────────────┐
│          VISTAS             │  views/ — renderizado e interacción
├─────────────────────────────┤
│         SERVICIOS           │  services/ — comunicación con la API
├─────────────────────────────┤
│         UTILIDADES          │  utils/ — tema, i18n, helpers
├─────────────────────────────┤
│          ROUTER             │  router/ — navegación + guards
├─────────────────────────────┤
│     ESTILOS / DISEÑO        │  styles/ — sistema de diseño global
└─────────────────────────────┘
```

**Principios clave:**
- Cada vista exporta `render<Vista>()` (HTML string) y `setup<Vista>()` (event listeners).
- El router inyecta el HTML en `#app` y luego llama al setup.
- Los servicios centralizan todas las llamadas `fetch` y adjuntan el JWT automáticamente.
- Las utilidades `theme.js` e `i18n.js` se re-inicializan en cada render de vista.

---

## API — Endpoints disponibles

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
| `user` | Objeto usuario + token JWT | Al cerrar sesión o eliminar cuenta |
| `theme` | `"dark"` \| `"light"` | Nunca (preferencia permanente) |
| `lang` | `"es"` \| `"en"` | Nunca (preferencia permanente) |
| `editTaskId` | ID de la tarea en edición | Al terminar de editar / cancelar |

---

## Scripts disponibles

### Frontend (`/client`)

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build de producción en /dist
npm run preview   # Vista previa del build
```

### Backend (`/api`)

```bash
npm start         # node server.js — API en puerto 3000
```

---

## Licencia

Este proyecto se distribuye bajo la licencia incluida en [`client/LICENSE`](./client/LICENSE).
