# TaskFlow SPA — Frontend Cliente

> Cliente Single Page Application (SPA) moderno y fluido construido con JavaScript Vanilla y Tailwind CSS v4, diseñado bajo una arquitectura limpia por capas.

---

## 🛠️ Stack Tecnológico

- **Lenguaje:** JavaScript ES Modules (ES2022+)
- **Estilos:** Tailwind CSS v4 (Compilado nativamente con el plugin oficial de Vite)
- **Empaquetador & Dev Server:** Vite 8
- **Enrutamiento:** History API nativa del navegador
- **Modales & Notificaciones:** SweetAlert2

---

## 🚀 Inicio Rápido

### 1. Instalar dependencias
Desde este directorio (`/client`), ejecuta:
```bash
npm install
```

### 2. Iniciar en modo desarrollo
Arranca el servidor local con Hot Module Replacement (HMR):
```bash
npm run dev
```
La aplicación se abrirá en la dirección que indique Vite (típicamente **http://localhost:5173**).

> 💡 **Nota:** Para que la autenticación y las tareas funcionen, debes tener corriendo la [API backend](../api/README.md) en el puerto 3000.

---

## 📂 Arquitectura del Código

La aplicación sigue una organización estructurada en capas para facilitar su mantenimiento sin frameworks:

```
client/src/
├── main.js             # Punto de entrada. Inicializa tema y enrutador.
├── styles/
│   └── global.css      # Sistema de diseño: variables, animaciones, clases personalizadas.
├── router/
│   ├── router.js       # Motor de rutas SPA con guards de sesión y rol.
│   └── routes.js       # Definición de rutas (componentes, títulos, metadatos).
├── services/
│   ├── auth.service.js # Control de login, registro y tokens JWT.
│   ├── task.service.js # CRUD completo de tareas conectando a la API.
│   └── users.service.js# CRUD de usuarios (administrador).
├── utils/
│   ├── theme.js        # Gestor de tema claro/oscuro y persistencia.
│   └── i18n.js         # Diccionario de idiomas (ES/EN) y formateadores.
└── views/
    ├── home.js         # Landing page pública.
    ├── notFound.js     # Página 404 personalizada.
    ├── auth/           # Vistas de autenticación (login, registro).
    ├── app/            # Panel principal / Dashboard de estadísticas.
    ├── tasks/          # Listado y formularios de tareas.
    └── admin/          # Panel de control de administrador y gestión de perfil.
```

---

## ⚙️ Características Frontend Clave

### 1. Enrutador SPA Personalizado ([router.js](file:///c:/Users/juanj/Desktop/TaskFlowSPA/client/src/router/router.js))
En lugar de recargar la página, interceptamos los clics en enlaces (`<a>`) y usamos `window.history.pushState` para cambiar de vista de forma instantánea.
Admite **Guardias de Ruta**:
- Evita que usuarios no autenticados entren a pantallas privadas (`requiresAuth`).
- Evita que usuarios con rol `USER` entren a la pantalla del administrador (`requiresAdmin`).
- Redirige al dashboard si intentas entrar a `/login` estando ya autenticado (`redirectAuthenticated`).

### 2. Ciclo de Vida de las Vistas (Render + Setup)
Cada vista de la SPA cuenta con dos etapas esenciales:
- **`render()`:** Retorna un string con la estructura HTML pura de la página.
- **`setup()`:** Se ejecuta inmediatamente después de inyectar el HTML en el DOM. Aquí es donde se enlazan los escuchadores de eventos (`click`, `submit`), se realizan las llamadas fetch asíncronas y se inician complementos visuales.

### 3. Soporte de Idiomas Integrado ([i18n.js](file:///c:/Users/juanj/Desktop/TaskFlowSPA/client/src/utils/i18n.js))
Contiene un mapa de traducción en formato clave-valor para Español e Inglés. El idioma activo se lee y se persiste en `localStorage` con la clave `lang`. Cambiar de idioma vuelve a renderizar la vista actual de inmediato.

### 4. Modo Oscuro/Claro Inteligente ([theme.js](file:///c:/Users/juanj/Desktop/TaskFlowSPA/client/src/utils/theme.js))
El modo oscuro añade la clase `.dark` a la etiqueta `<html>`. El tema se lee al iniciar para evitar destellos blancos y se almacena en la clave `theme` de `localStorage`.
- Los estilos utilitarios de Tailwind y las directivas de sobreescritura de contraste en [global.css](file:///c:/Users/juanj/Desktop/TaskFlowSPA/client/src/styles/global.css) garantizan que todos los elementos se adapten automáticamente conservando una legibilidad perfecta.

---

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Empaqueta la aplicación optimizada para producción dentro del directorio `/dist`.
- `npm run preview`: Ejecuta un servidor local para previsualizar la compilación de producción.
