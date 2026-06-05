import { obtenerUsuarioPorEmail } from "./users.service.js";
import bcrypt from "bcryptjs";

// Helper for Base64Url encoding
function base64url(source) {
    const jsonStr = JSON.stringify(source);
    const base64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    }));
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Helper for Base64Url decoding
function decodeBase64url(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    const raw = atob(base64);
    const jsonStr = decodeURIComponent(raw.split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonStr);
}

export async function login(email, password) {
    const user = await obtenerUsuarioPorEmail(email);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // Support both bcrypt hashes (starts with $2a$ or $2b$) and original plain text passwords
    const isHashed = user.password.startsWith("$2a$") || user.password.startsWith("$2b$");
    const passwordMatches = isHashed 
        ? bcrypt.compareSync(password, user.password)
        : user.password === password;

    if (!passwordMatches) {
        throw new Error("Contraseña incorrecta");
    }

    // Generate local JWT token (2 hours expiration)
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        lastName: user.lastName,
        exp: Math.floor(Date.now() / 1000) + 7200
    };

    const token = `${base64url(header)}.${base64url(payload)}.client_signed_token`;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
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