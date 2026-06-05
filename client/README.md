# TaskFlow SPA — Frontend Cliente

> Single Page Application moderna construida con JavaScript Vanilla y Tailwind CSS v4 — desplegada en **Vercel**.

![Deploy](https://img.shields.io/badge/Desplegado%20en-Vercel-black?logo=vercel)

**🌐 URL en producción:** **https://proyecto-hs.vercel.app**

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| JavaScript ES Modules | ES2022+ | Lógica de la SPA |
| Tailwind CSS | v4 | Estilos utilitarios |
| Vite | ^8.0 | Bundler y dev server |
| History API | Nativa | Enrutamiento SPA |
| SweetAlert2 | ^11.26 | Modales y notificaciones |

---

## 🚀 Despliegue en Vercel

| Parámetro | Valor |
|---|---|
| Root directory | `client` |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| URL pública | https://proyecto-hs.vercel.app |

Cada `git push` a `main` lanza un redespliegue automático en Vercel.

---

## 🔗 Conexión con el Backend

Todos los servicios apuntan a la API en Render:

```
https://proyectohs-5.onrender.com
```

| Servicio | Archivo | Endpoints que usa |
|---|---|---|
| Autenticación | `auth.service.js` | `POST /login` |
| Usuarios | `users.service.js` | `POST /register`, `GET/PUT/DELETE /users/:id` |
| Tareas | `task.service.js` | `GET/POST/PUT/DELETE /task` |

> ⚠️ El backend corre en Render free tier. La primera petición tras un período de inactividad puede tardar hasta **60 segundos**. La app muestra un spinner de carga automáticamente durante ese tiempo.

---

## 📂 Arquitectura del Código

```
client/src/
├── main.js              # Punto de entrada. Inicializa tema y enrutador.
├── styles/
│   └── global.css       # Variables CSS, animaciones, clases personalizadas.
├── router/
│   ├── router.js        # Motor SPA con guards de sesión y rol.
│   └── routes.js        # Mapa de rutas: vistas, guards, metadatos.
├── services/
│   ├── auth.service.js  # login() → POST /login, guarda JWT en localStorage.
│   ├── task.service.js  # CRUD completo → /task.
│   └── users.service.js # CRUD de usuarios → /users, POST /register.
├── utils/
│   ├── theme.js         # Tema oscuro/claro + persistencia en localStorage.
│   └── i18n.js          # Traducciones ES/EN, selector de idioma.
└── views/
    ├── home.js          # Landing page pública.
    ├── notFound.js      # Página 404.
    ├── auth/
    │   ├── login.js     # Formulario de login.
    │   └── register.js  # Registro con selector de rol y clave de admin.
    ├── app/
    │   └── dashboard.js # Panel principal con estadísticas.
    ├── tasks/
    │   ├── task.js      # Listado de tareas con filtros.
    │   └── taskForm.js  # Crear / editar tarea.
    └── admin/
        ├── admin.js     # Panel de administrador (solo ADMIN).
        └── profile.js   # Perfil del usuario.
```

---

## ⚙️ Características clave

### Enrutador SPA ([router.js](./src/router/router.js))
Intercepta clics en `<a>` y usa `window.history.pushState` para cambiar de vista sin recargar la página. Implementa tres guards:

| Guard | Comportamiento |
|---|---|
| `requiresAuth` | Redirige a `/login` si no hay JWT válido |
| `requiresAdmin` | Redirige a `/dashboard` si el rol no es `ADMIN` |
| `redirectAutenticated` | Redirige a `/dashboard` si ya hay sesión activa |

### Ciclo de vida de las vistas
- **`render()`** → devuelve el HTML como string, se inyecta en `#app`.
- **`setup()`** → se llama justo después para enlazar eventos y hacer peticiones fetch.

### Registro con clave de administrador
El formulario de registro incluye un selector de rol. Si se selecciona **ADMIN**, aparece un campo de clave secreta. Sin la clave correcta no es posible completar el registro como administrador.

### JWT real del servidor
El login envía credenciales a `POST /login`. El servidor devuelve un JWT firmado que se guarda en `localStorage` y se adjunta como `Authorization: Bearer <token>` en cada petición posterior.

### Indicador de carga para Render
Los formularios de login y registro muestran un Swal de carga mientras el servidor responde, para evitar confusión cuando Render tarda en despertar.

---

## 💻 Desarrollo local

```bash
cd client
npm install
npm run dev
# App en http://localhost:5173
```

Para apuntar al backend local en vez de Render, cambia `API_URL` y `endpoint` en los archivos de servicios:

```js
// Cambiar esto:
const endpoint = "https://proyectohs-5.onrender.com";

// Por esto:
const endpoint = "http://localhost:3000";
```

---

## 📦 Scripts

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build
```
