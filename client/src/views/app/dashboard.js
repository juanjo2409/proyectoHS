import { obtenerTareas } from "../../services/task.service.js";
import { obtenerUsuarioActual } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { t } from "../../utils/i18n.js";
import { renderHeader, setupHeader } from "../../components/Header.js";

export function renderDashboard() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        <!-- Header -->
        ${renderHeader("/dashboard")}


        <main class="mx-auto max-w-7xl px-6 py-10">

            <!-- Hero banner -->
            <section class="relative overflow-hidden rounded-3xl p-8 lg:p-10"
                style="background: linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(79,70,229,0.25) 50%, rgba(6,182,212,0.15) 100%); border: 1px solid rgba(124,58,237,0.3);">
                <!-- glow blob -->
                <div class="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"></div>
                <div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-widest text-violet-300">${t("dashboard_title")}</p>
                        <h1 class="dashboard-title mt-2 text-3xl font-black text-white lg:text-4xl">${t("welcome")}</h1>
                        <p class="mt-3 max-w-lg text-sm text-slate-400 leading-6">${t("home_desc")}</p>
                    </div>
                    <a href="/tasks/new" class="btn-primary shrink-0 gap-2">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        ${t("new_task")}
                    </a>
                </div>
            </section>

            <!-- Stats -->
            <section class="mt-8 grid gap-4 sm:grid-cols-3 stagger">
                <article class="stat-card animate-fade-up">
                    <div class="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 border border-violet-500/25">
                        <svg class="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    </div>
                    <p class="tasks-active text-4xl font-black text-violet-400">—</p>
                    <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("active_tasks")}</p>
                </article>

                <article class="stat-card animate-fade-up">
                    <div class="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25">
                        <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p class="tasks-completed text-4xl font-black text-emerald-400">—</p>
                    <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("completed_tasks")}</p>
                </article>

                <article class="stat-card animate-fade-up">
                    <div class="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/25">
                        <svg class="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p class="tasks-pending text-4xl font-black text-amber-400">—</p>
                    <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("pending_tasks")}</p>
                </article>
            </section>

            <!-- Quick access -->
            <section class="mt-8">
                <div class="glass-card rounded-3xl p-7">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-bold text-white">${t("quick_access")}</h2>
                        <a href="/tasks" class="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">${t("view_tasks")} →</a>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <a href="/tasks/new" class="quick-task group flex items-center gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/8 hover:bg-violet-500/15 hover:border-violet-500/40 p-5 transition-all">
                            <div class="h-12 w-12 shrink-0 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xl group-hover:scale-110 transition-transform">✚</div>
                            <div>
                                <p class="text-xs font-semibold text-violet-400 uppercase tracking-wider">${t("create")}</p>
                                <p class="text-base font-bold text-white">${t("new_task")}</p>
                            </div>
                        </a>
                        <a href="/profile" class="quick-profile group flex items-center gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/8 hover:bg-cyan-500/15 hover:border-cyan-500/40 p-5 transition-all">
                            <div class="h-12 w-12 shrink-0 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition-transform">👤</div>
                            <div>
                                <p class="text-xs font-semibold text-cyan-400 uppercase tracking-wider">${t("account")}</p>
                                <p class="text-base font-bold text-white">${t("edit_profile")}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

        </main>
    </div>
    `;
}

export async function setupDashboard() {
    setupHeader();
    const usuario = obtenerUsuarioActual();
    if (!usuario) { navigate("/login"); return; }

    // Handle logout
    document.querySelectorAll(".nav-logout").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            navigate("/login");
        });
    });

    // Dynamic title
    const titleEl = document.querySelector(".dashboard-title");
    if (titleEl) titleEl.textContent = t("welcome_user", { name: usuario.name });

    try {
        const tareas    = await obtenerTareas();
        const misTareas = usuario.role === "ADMIN" ? tareas : tareas.filter(t => t.userId == usuario.id);
        const completed = misTareas.filter(t => t.status === "Completada" || t.status === "Completed");
        const pending   = misTareas.filter(t => t.status === "Pendiente"  || t.status === "Pending");

        const activeEl    = document.querySelector(".tasks-active");
        const completedEl = document.querySelector(".tasks-completed");
        const pendingEl   = document.querySelector(".tasks-pending");
        if (activeEl)    activeEl.textContent    = misTareas.length;
        if (completedEl) completedEl.textContent = completed.length;
        if (pendingEl)   pendingEl.textContent   = pending.length;
    } catch (error) {
        console.error("Error cargando tareas:", error);
    }
}