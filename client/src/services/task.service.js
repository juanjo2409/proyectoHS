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

export async function obtenerTareas() {
    const response = await fetch(`${endpoint}/task`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al obtener tareas");
    }

    return await response.json();
}

export async function obtenerTareaPorId(id) {
    const response = await fetch(`${endpoint}/task/${id}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Tarea no encontrada");
    }

    return await response.json();
}

export async function crearTarea({ title, description, status, date, userId }) {
    const response = await fetch(`${endpoint}/task`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ title, description, status, date, userId })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear tarea");
    }

    return await response.json();
}

export async function actualizarTarea(id, datos) {
    const response = await fetch(`${endpoint}/task/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al actualizar tarea");
    }

    return await response.json();
}

export async function eliminarTarea(id) {
    const response = await fetch(`${endpoint}/task/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar tarea");
    }

    return true;
}