import { obtenerToken } from "./auth.service.js";

const endpoint = "https://proyectohs-5.onrender.com";


function getHeaders() {
    const token = obtenerToken();
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

export async function crearUsuario(usuario) {
    // Send plain password — the server (/register) handles hashing
    const response = await fetch(`${endpoint}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear el usuario");
    }

    return await response.json();
}

export async function obtenerUsuarios() {
    const response = await fetch(`${endpoint}/users`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al obtener los usuarios");
    }

    return await response.json();
}

export async function obtenerUsuarioPorId(id) {
    const response = await fetch(`${endpoint}/users/${id}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Usuario no encontrado");
    }

    return await response.json();
}

export async function obtenerUsuarioPorEmail(email) {
    const response = await fetch(`${endpoint}/users?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al buscar usuario");
    }

    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}

export async function actualizarUsuario(id, datos) {
    // Send plain password — the server handles hashing on PUT/PATCH
    const response = await fetch(`${endpoint}/users/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al actualizar usuario");
    }

    return await response.json();
}

export async function actualizarRolUsuario(id, nuevoRol) {
    const usuario = await obtenerUsuarioPorId(id);
    return await actualizarUsuario(id, {
        ...usuario,
        role: nuevoRol
    });
}

export async function eliminarUsuario(id) {
    const response = await fetch(`${endpoint}/users/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar usuario");
    }

    return true;
}