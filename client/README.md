# TaskFlow SPA — Frontend Cliente

> Cliente Single Page Application moderno construido con JavaScript Vanilla y Tailwind CSS v4 — desplegado en **Vercel**.

![Deploy](https://img.shields.io/badge/Desplegado%20en-Vercel-black?logo=vercel)

**URL en producción:** https://proyectohs.vercel.app

---

## 🛠️ Stack Tecnológico

- **Lenguaje:** JavaScript ES Modules (ES2022+)
- **Estilos:** Tailwind CSS v4 (compilado con el plugin oficial de Vite)
- **Empaquetador & Dev Server:** Vite 8
- **Enrutamiento:** History API nativa del navegador
- **Modales & Notificaciones:** SweetAlert2

---

## 🚀 Despliegue en Vercel

El frontend se despliega automáticamente en Vercel desde la rama `main`.

| Configuración | Valor |
|---|---|
| Framework preset | Vite |
| Root directory | `client` |
| Build command | `npm run build` |
| Output directory | `dist` |
| URL pública | https://proyectohs.vercel.app |

Cada `git push` a `main` lanza un redespliegue automático.

---

## 📂 Arquitectura del Código

```
client/src/
├── main.js             # Punto de entrada. Inicializa tema y enrutador.
├── styles/
│   └── global.css      # Sistema de diseño: variables, animaciones, clases personalizadas.
├── router/
│   ├── router.js       # Motor de rutas SPA con guards de sesión y rol.
│   └── routes.js       # Definición de rutas (vistas, guards, metadatos).
├── services/
│   ├── auth.service.js # Login via POST /login y gestión de JWT en localStorage.
│   ├── task.service.js # CRUD completo de tareas (GET/POST/PUT/DELETE /task).
│   └── users.service.js# CRUD de usuarios (GET/PUT/DELETE /users, POST /register).
├── utils/
│   ├── theme.js        # Gestor de tema claro/oscuro y persistencia.
│   └── i18n.js         # Diccionario ES/EN y formateadores de texto.
└── views/
    ├── home.js         # Landing page pública.
    ├── notFound.js     # Página 404 personalizada.
    ├── auth/           # Vistas de autenticación (login, registro).
    ├── app/            # Dashboard de estadísticas.
    ├── tasks/          # Listado y formulario de tareas.
    └── admin/          # Panel de administrador y perfil de usuario.
```

---

## ⚙️ Características Frontend Clave

### 1. Enrutador SPA Personalizado ([router.js](./src/router/router.js))
Intercepta clics en `<a>` y usa `window.history.pushState` para navegar sin recargar la página. Admite **Guards de Ruta**:
- `requiresAuth` — redirige a `/login` si no hay token válido.
- `requiresAdmin` — redirige a `/dashboard` si el rol no es `ADMIN`.
- `redirectAutenticated` — redirige a `/dashboard` si ya hay sesión activa.

### 2. Ciclo de Vida de las Vistas (Render + Setup)
- **`render()`:** Retorna el HTML de la vista como string.
- **`setup()`:** Se ejecuta tras inyectar el HTML. Enlaza eventos, hace peticiones `fetch` y activa plugins visuales.

### 3. Autenticación con JWT real ([auth.service.js](./src/services/auth.service.js))
El login envía las credenciales al servidor (`POST /login`), que devuelve un JWT firmado. El token se almacena en `localStorage` y se adjunta automáticamente como `Authorization: Bearer <token>` en cada petición posterior.

### 4. Soporte de Idiomas Integrado ([i18n.js](./src/utils/i18n.js))
Mapa de traducción clave-valor para Español e Inglés. El idioma activo se persiste en `localStorage` (`lang`). Cambiar de idioma vuelve a renderizar la vista actual.

### 5. Modo Oscuro/Claro Inteligente ([theme.js](./src/utils/theme.js))
Añade/quita la clase `.dark` en `<html>`. El tema se lee al iniciar para evitar destellos y se persiste en `localStorage` (`theme`).

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

---

## 💻 Desarrollo local

```bash
cd client
npm install
npm run dev
# App en http://localhost:5173
```

> 💡 Para desarrollo local, asegúrate de que el backend (`/api`) esté corriendo en `http://localhost:3000` y actualiza la constante `API_URL`/`endpoint` en los archivos de servicios.

---

## 📦 Scripts

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build de producción
```
