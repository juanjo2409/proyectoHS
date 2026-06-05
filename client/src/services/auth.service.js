const API_URL = "https://proyectohs-5.onrender.com";

// Helper for Base64Url decoding (to read JWT payload from server)
function decodeBase64url(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    try {
        const raw = atob(base64);
        const jsonStr = decodeURIComponent(raw.split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonStr);
    } catch (e) {
        return null;
    }
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
    }

    // Server returns { token, user }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
}

export function cerrarSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("taskId");
}

export function obtenerUsuarioActual() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const decoded = decodeBase64url(parts[1]);
        if (!decoded) return null;

        // Expiration check
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            cerrarSesion();
            return null;
        }

        return decoded;
    } catch (e) {
        return null;
    }
}

export function estaAutenticado() {
    return !!localStorage.getItem("token");
}

export function obtenerToken() {
    return localStorage.getItem("token");
}