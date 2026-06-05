import { obtenerTareas, eliminarTarea } from "../../services/task.service.js";
import { navigate } from "../../router/router.js";
import { themeToggleButtonHtml, setupThemeToggle } from "../../utils/theme.js";
import { t, getLangSelectHtml, setupLangSelect } from "../../utils/i18n.js";
import Swal from "sweetalert2";

export function renderTask() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        <!-- Header -->
        <header class="app-header">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <a href="/" class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">T</div>
                    <span class="text-base font-black text-white">TaskFlow<span class="gradient-text">SPA</span></span>
                </a>
                <div class="flex items-center gap-2">
                    <nav class="hidden gap-1 md:flex">
                        <a href="/dashboard" class="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">${t("dashboard")}</a>
                        <a href="/tasks"     class="nav-active rounded-xl px-4 py-2 text-sm font-semibold">${t("tasks")}</a>
                        <a href="/profile"   class="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">${t("profile")}</a>
                        <a href="/login"     class="btn-ghost text-red-400 hover:text-red-300 rounded-xl px-4 py-2 text-sm font-semibold nav-logout">${t("logout")}</a>
                    </nav>
                    ${getLangSelectHtml()}
                    ${themeToggleButtonHtml}
                </div>
            </div>
        </header>

        <main class="mx-auto max-w-7xl px-6 py-10">

            <!-- Banner -->
            <section class="relative overflow-hidden rounded-3xl p-8 flex items-center justify-between gap-6"
                style="background: linear-gradient(135deg, rgba(6,182,212,0.25) 0%, rgba(79,70,229,0.25) 60%, rgba(124,58,237,0.2) 100%); border: 1px solid rgba(6,182,212,0.3);">
                <div class="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-cyan-600/15 blur-3xl"></div>
                <div class="relative z-10">
                    <p class="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-1">${t("manage_activities")}</p>
                    <h1 class="text-3xl font-black text-white">${t("tasks")}</h1>
                </div>
                <button id="crear-tarea" class="btn-primary relative z-10 shrink-0 gap-2">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    ${t("create_task_btn")}
                </button>
            </section>

            <!-- Tasks grid -->
            <section id="tasks-container" class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div class="col-span-full flex justify-center py-16">
                    <div class="h-8 w-8 animate-spin rounded-full border-[3px] border-violet-500 border-t-transparent"></div>
                </div>
            </section>

        </main>
    </div>
    `;
}

export async function setupTask() {
    setupThemeToggle();
    setupLangSelect();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { navigate("/login"); return; }

    // Logout
    document.querySelector(".nav-logout")?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/login");
    });

    // New task
    document.getElementById("crear-tarea")?.addEventListener("click", () => {
        localStorage.removeItem("taskId");
        navigate("/tasks/new");
    });

    const container = document.getElementById("tasks-container");
    if (!container) return;

    function statusInfo(status) {
        if (status === "Completada" || status === "Completed") return { cls: "badge-completed", key: "status_completed", dot: "bg-emerald-400" };
        if (status === "En progreso" || status === "In progress") return { cls: "badge-progress", key: "status_progress", dot: "bg-indigo-400" };
        return { cls: "badge-pending", key: "status_pending", dot: "bg-amber-400" };
    }

    try {
        const tareas    = await obtenerTareas();
        const misTareas = user.role === "ADMIN" ? tareas : tareas.filter(ta => ta.userId === user.id);

        if (misTareas.length === 0) {
            container.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div class="mb-4 h-16 w-16 rounded-3xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-3xl">📋</div>
                    <p class="text-lg font-bold text-slate-300">${t("no_tasks")}</p>
                    <a href="/tasks/new" class="btn-primary mt-5 gap-2">+ ${t("create_task_btn")}</a>
                </div>
            `;
            return;
        }

        container.innerHTML = misTareas.map(tarea => {
            const si = statusInfo(tarea.status);
            return `
            <article class="task-card animate-fade-up">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <h2 class="text-lg font-bold text-white leading-snug">${tarea.title}</h2>
                        <span class="${si.cls} shrink-0">${t(si.key)}</span>
                    </div>
                    <p class="text-sm text-slate-400 leading-6 line-clamp-3">${tarea.description || "—"}</p>
                </div>

                <div class="mt-6 pt-4 border-t border-white/8 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span class="h-1.5 w-1.5 rounded-full ${si.dot}"></span>
                        ${tarea.date ? `📅 ${tarea.date}` : "—"}
                    </div>
                    <div class="flex gap-2">
                        <button class="editar-tarea rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 cursor-pointer transition-all"
                            data-id="${tarea.id}">${t("edit")}</button>
                        <button class="eliminar-tarea rounded-xl border border-red-500/25 bg-red-500/8 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/18 hover:border-red-500/40 cursor-pointer transition-all"
                            data-id="${tarea.id}">${t("delete")}</button>
                    </div>
                </div>
            </article>
            `;
        }).join("");

        // Edit
        document.querySelectorAll(".editar-tarea").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.setItem("taskId", btn.dataset.id);
                navigate("/tasks/new");
            });
        });

        // Delete
        document.querySelectorAll(".eliminar-tarea").forEach(btn => {
            btn.addEventListener("click", async () => {
                const result = await Swal.fire({
                    title: t("delete_task_confirm"),
                    text: t("delete_user_confirm_desc"),
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#dc2626",
                    cancelButtonColor: "#7c3aed",
                    confirmButtonText: t("delete_confirm_btn"),
                    cancelButtonText: t("cancel_btn")
                });
                if (!result.isConfirmed) return;
                try {
                    await eliminarTarea(btn.dataset.id);
                    btn.closest("article").remove();
                    Swal.fire({ icon: "success", title: t("deleted"), text: t("task_deleted"), timer: 1500, showConfirmButton: false });
                    if (container.querySelectorAll("article").length === 0) {
                        container.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-20 text-center"><p class="text-slate-400 font-medium">${t("no_tasks")}</p></div>`;
                    }
                } catch (err) {
                    Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#7c3aed" });
                }
            });
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="col-span-full text-center py-16 text-red-400 font-medium">Error cargando tareas.</div>`;
    }
}