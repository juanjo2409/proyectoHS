import { login } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { themeToggleButtonHtml, setupThemeToggle } from "../../utils/theme.js";
import { t, getLangSelectHtml, setupLangSelect } from "../../utils/i18n.js";
import Swal from "sweetalert2";

export function renderLogin() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">
        <main class="grid min-h-screen lg:grid-cols-[1fr_1fr]">

            <!-- Left: form -->
            <section class="flex items-center justify-center px-6 py-12">
                <div class="w-full max-w-md">

                    <!-- Top bar -->
                    <div class="flex items-center justify-between mb-10">
                        <a href="/" class="flex items-center gap-2 group">
                            <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">T</div>
                            <span class="text-base font-black text-white">TaskFlow<span class="gradient-text">SPA</span></span>
                        </a>
                        <div class="flex items-center gap-2">
                            <a href="/register" class="btn-ghost text-xs">${t("register")}</a>
                            ${getLangSelectHtml()}
                            ${themeToggleButtonHtml}
                        </div>
                    </div>

                    <!-- Card -->
                    <div class="glass-card rounded-3xl p-8 animate-fade-up">
                        <div class="mb-8">
                            <p class="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">${t("login_subtitle")}</p>
                            <h1 class="text-3xl font-black text-white">${t("login_welcome")}</h1>
                            <p class="mt-2 text-sm text-slate-400 leading-6">${t("login_desc")}</p>
                        </div>

                        <form class="login-form space-y-5">
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="email">${t("email")}</label>
                                <input id="email" type="email" placeholder="usuario@taskflow.com" class="field" />
                            </div>
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="password">${t("password")}</label>
                                <input id="password" type="password" placeholder="••••••••" class="field" />
                            </div>
                            <button type="submit" class="btn-primary w-full mt-2">
                                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                ${t("enter_dashboard")}
                            </button>
                        </form>

                        <p class="mt-6 text-center text-xs text-slate-500">
                            ${t("register")} →
                            <a href="/register" class="text-violet-400 font-semibold hover:text-violet-300">${t("create_account")}</a>
                        </p>
                    </div>
                </div>
            </section>

            <!-- Right: brand panel -->
            <section class="hidden lg:flex lg:flex-col lg:justify-between relative overflow-hidden px-14 py-16 bg-gradient-to-br from-violet-950/60 via-indigo-950/40 to-slate-950/80 border-l border-violet-500/20">

                <!-- Glow decorations -->
                <div class="pointer-events-none absolute top-20 left-10 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl"></div>
                <div class="pointer-events-none absolute bottom-20 right-10 h-48 w-48 rounded-full bg-cyan-600/15 blur-3xl"></div>

                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                        ✦ TaskFlowSPA
                    </div>
                </div>

                <div class="relative z-10">
                    <h2 class="text-4xl font-black text-white leading-tight">${t("login_sidebar_title")}</h2>
                    <ul class="mt-8 space-y-5">
                        ${[t("login_feature_1"), t("login_feature_2"), t("login_feature_3")].map(f => `
                        <li class="flex items-start gap-3">
                            <div class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                                <svg class="h-3 w-3 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                            </div>
                            <span class="text-slate-300 text-sm leading-6">${f}</span>
                        </li>
                        `).join("")}
                    </ul>
                </div>

                <p class="relative z-10 text-xs text-slate-600">TaskFlowSPA © 2025</p>
            </section>

        </main>
    </div>
    `;
}

export function setupLogin() {
    setupThemeToggle();
    setupLangSelect();
    const form = document.querySelector(".login-form");

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            Swal.fire({ icon: "warning", title: t("fields_incomplete"), text: t("fields_incomplete_desc"), confirmButtonColor: "#7c3aed" });
            return;
        }
        try {
            const user = await login(email, password);
            Swal.fire({ icon: "success", title: t("welcome_success", { name: user.name }), text: t("login_success"), timer: 1500, showConfirmButton: false });
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            Swal.fire({ icon: "error", title: t("auth_error"), text: error.message || t("auth_error_desc"), confirmButtonColor: "#7c3aed" });
        }
    });
}