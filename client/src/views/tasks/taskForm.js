import { crearTarea, actualizarTarea, obtenerTareaPorId } from "../../services/task.service.js";
import { navigate } from "../../router/router.js";
import { t } from "../../utils/i18n.js";
import { renderHeader, setupHeader } from "../../components/Header.js";
import Swal from "sweetalert2";

export function renderTaskForm() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        <!-- Header -->
        ${renderHeader("/tasks")}


        <main class="mx-auto max-w-2xl px-6 py-12">

            <!-- Breadcrumb -->
            <a href="/tasks" class="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 mb-6 transition-colors">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                ${t("tasks")}
            </a>

            <!-- Form card -->
            <div class="glass-card rounded-3xl p-8 animate-fade-up">

                <!-- Header section -->
                <div class="mb-8">
                    <div class="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 border border-violet-500/30 text-2xl">📝</div>
                    <p class="text-xs font-bold uppercase tracking-widest text-violet-400">${t("task_form_subtitle")}</p>
                    <h1 class="form-title mt-2 text-3xl font-black text-white">${t("task_form_create_title")}</h1>
                    <p class="form-desc mt-2 text-sm text-slate-400 leading-6">${t("task_form_create_desc")}</p>
                </div>

                <form class="space-y-5">
                    <!-- Title -->
                    <div>
                        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="title">
                            ${t("task_title_label")}
                        </label>
                        <input id="title" type="text" placeholder="${t("task_title_placeholder")}" class="field" />
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="description">
                            ${t("task_desc_label")}
                        </label>
                        <textarea id="description" rows="4" placeholder="${t("task_desc_placeholder")}" class="field" style="resize:vertical"></textarea>
                    </div>

                    <!-- Status + Date -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="status">
                                ${t("task_status_label")}
                            </label>
                            <select id="status" class="field">
                                <option value="Pendiente">${t("status_pending")}</option>
                                <option value="En progreso">${t("status_progress")}</option>
                                <option value="Completada">${t("status_completed")}</option>
                            </select>
                        </div>
                        <div>
                            <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="date">
                                ${t("task_date_label")}
                            </label>
                            <input id="date" type="date" class="field" />
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3 pt-2">
                        <button type="submit" class="guardar-tarea btn-primary flex-1">
                            <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            ${t("save_task_btn")}
                        </button>
                        <button type="button" class="cancelar-tarea btn-secondary">
                            ${t("cancel_btn")}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
    `;
}

export async function setupTaskForm() {
    setupHeader();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { navigate("/login"); return; }

    // Logout
    document.querySelectorAll(".nav-logout").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            navigate("/login");
        });
    });

    const taskId     = localStorage.getItem("taskId");
    const form       = document.querySelector("form");
    const cancelarBtn = document.querySelector(".cancelar-tarea");

    if (taskId) {
        try {
            const tarea = await obtenerTareaPorId(taskId);
            document.getElementById("title").value       = tarea.title || "";
            document.getElementById("description").value = tarea.description || "";
            document.getElementById("date").value        = tarea.date || "";

            let selectedStatus = "Pendiente";
            if (tarea.status === "Completada"  || tarea.status === "Completed")   selectedStatus = "Completada";
            else if (tarea.status === "En progreso" || tarea.status === "In progress") selectedStatus = "En progreso";
            document.getElementById("status").value = selectedStatus;

            const h1  = document.querySelector(".form-title");
            const dsc = document.querySelector(".form-desc");
            const sav = document.querySelector(".guardar-tarea");
            if (h1)  h1.textContent  = t("task_form_edit_title");
            if (dsc) dsc.textContent = t("task_form_edit_desc");
            if (sav) sav.innerHTML   = `<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>${t("update_task_btn")}`;
        } catch {
            Swal.fire({ icon: "error", title: "Error", text: t("load_task_error"), confirmButtonColor: "#7c3aed" });
            navigate("/tasks");
            return;
        }
    }

    cancelarBtn?.addEventListener("click", () => {
        localStorage.removeItem("taskId");
        navigate("/tasks");
    });

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const titleVal       = document.getElementById("title").value.trim();
        const descriptionVal = document.getElementById("description").value.trim();
        const statusVal      = document.getElementById("status").value;
        const dateVal        = document.getElementById("date").value;

        if (!titleVal) {
            Swal.fire({ icon: "warning", title: t("title_required"), text: t("title_required_desc"), confirmButtonColor: "#7c3aed" });
            return;
        }

        const datos = { title: titleVal, description: descriptionVal, status: statusVal, date: dateVal, userId: user.id };
        try {
            if (taskId) {
                await actualizarTarea(taskId, datos);
                Swal.fire({ icon: "success", title: t("task_updated"), text: t("task_updated_desc"), timer: 1500, showConfirmButton: false });
            } else {
                await crearTarea(datos);
                Swal.fire({ icon: "success", title: t("task_saved"), text: t("task_saved_desc"), timer: 1500, showConfirmButton: false });
            }
            localStorage.removeItem("taskId");
            setTimeout(() => navigate("/tasks"), 1000);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message || "Error.", confirmButtonColor: "#7c3aed" });
        }
    });
}