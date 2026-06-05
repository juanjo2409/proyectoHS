import { estaAutenticado, obtenerUsuarioActual, cerrarSesion } from "../services/auth.service.js";
import { renderNotFound } from "../views/notFound.js";
import { routes } from "./routes.js";

export function navigate(path) {
    window.history.pushState({}, "", path);
    renderRouter();
}

export function renderRouter() {
    const app = document.getElementById("app");
    const currentPath = window.location.pathname;
    let route = routes[currentPath];

    if (!route) {
        route = { render: renderNotFound };
    }

    const authenticated = estaAutenticado();
    const user = obtenerUsuarioActual();

    // Guard: Requires Authentication
    if (route.requiresAuth && !authenticated) {
        window.history.replaceState({}, "", "/login");
        renderRouter();
        return;
    }

    // Guard: Requires Admin Role
    if (route.requiresAdmin && (!user || user.role !== "ADMIN")) {
        window.history.replaceState({}, "", "/dashboard");
        renderRouter();
        return;
    }

    // Guard: Redirect Authenticated Users from Public Login/Register Pages
    if (route.redirectAutenticated && authenticated) {
        window.history.replaceState({}, "", "/dashboard");
        renderRouter();
        return;
    }

    app.innerHTML = route.render();
 
    if (route.setup) {
        route.setup();
    }
}

export function initRouter() { 
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || !href.startsWith("/")) return;

        event.preventDefault();

        // Handle logout globally if the user clicked the logout link
        if (link.classList.contains("nav-logout")) {
            cerrarSesion();
        }

        navigate(href);
    });

    window.addEventListener("popstate", renderRouter);
    renderRouter();
}