import { t } from "../utils/i18n.js";
import { renderHeader, setupHeader } from "../components/Header.js";

export function renderHome() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        <!-- Header -->
        ${renderHeader("/")}


        <main class="mx-auto max-w-7xl px-6 py-20">

            <!-- Hero -->
            <section class="grid gap-16 lg:grid-cols-2 lg:items-center">

                <!-- Left: text -->
                <div class="animate-fade-up">
                    <div class="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300 mb-6">
                        <span class="h-2 w-2 rounded-full bg-violet-400 animate-pulse"></span>
                        ${t("organize_calm")}
                    </div>

                    <h1 class="text-5xl font-black tracking-tight text-white sm:text-6xl leading-tight">
                        ${t("home_title").split(",")[0]}<br/>
                        <span class="gradient-text">${t("home_title").includes(",") ? t("home_title").split(",").slice(1).join(",") : "TaskFlow SPA"}</span>
                    </h1>

                    <p class="mt-6 text-lg leading-8 text-slate-400 max-w-xl">
                        ${t("home_desc")}
                    </p>

                    <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                        <a href="/login" class="btn-primary gap-2">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            ${t("login")}
                        </a>
                        <a href="/register" class="btn-secondary">
                            ${t("create_account")}
                        </a>
                    </div>

                    <!-- Feature pills -->
                    <div class="mt-10 flex flex-wrap gap-3">
                        <span class="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400">✦ JWT Auth</span>
                        <span class="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400">✦ Roles & Permisos</span>
                        <span class="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400">✦ Dark Mode</span>
                        <span class="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400">✦ i18n ES/EN</span>
                    </div>
                </div>

                <!-- Right: view cards -->
                <div class="glass-card rounded-3xl p-8 animate-float">
                    <div class="mb-5 flex items-center justify-between">
                        <p class="text-sm font-bold text-violet-300 uppercase tracking-widest">${t("project_views")}</p>
                        <div class="flex gap-1">
                            <span class="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
                            <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></span>
                            <span class="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3 stagger">
                        <a href="/dashboard" class="group rounded-2xl border border-violet-500/20 bg-violet-500/8 hover:bg-violet-500/15 hover:border-violet-500/40 p-5 transition-all duration-200 animate-fade-up">
                            <div class="mb-3 h-8 w-8 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm">📊</div>
                            <p class="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">${t("dashboard")}</p>
                            <p class="mt-1 text-xs text-slate-500">${t("view_desc_dashboard")}</p>
                        </a>
                        <a href="/tasks" class="group rounded-2xl border border-cyan-500/20 bg-cyan-500/8 hover:bg-cyan-500/15 hover:border-cyan-500/40 p-5 transition-all duration-200 animate-fade-up">
                            <div class="mb-3 h-8 w-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">✅</div>
                            <p class="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">${t("tasks")}</p>
                            <p class="mt-1 text-xs text-slate-500">${t("view_desc_tasks")}</p>
                        </a>
                        <a href="/profile" class="group rounded-2xl border border-pink-500/20 bg-pink-500/8 hover:bg-pink-500/15 hover:border-pink-500/40 p-5 transition-all duration-200 animate-fade-up">
                            <div class="mb-3 h-8 w-8 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">👤</div>
                            <p class="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">${t("profile")}</p>
                            <p class="mt-1 text-xs text-slate-500">${t("view_desc_profile")}</p>
                        </a>
                        <a href="/admin" class="group rounded-2xl border border-amber-500/20 bg-amber-500/8 hover:bg-amber-500/15 hover:border-amber-500/40 p-5 transition-all duration-200 animate-fade-up">
                            <div class="mb-3 h-8 w-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">⚙️</div>
                            <p class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">${t("admin")}</p>
                            <p class="mt-1 text-xs text-slate-500">${t("view_desc_admin")}</p>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Glow orbs decoration -->
            <div class="pointer-events-none fixed top-0 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"></div>
            <div class="pointer-events-none fixed top-1/2 right-0 h-64 w-64 rounded-full bg-cyan-600/8 blur-3xl"></div>

        </main>
    </div>
    `;
}

export function setupHome() {
    setupHeader();
}
