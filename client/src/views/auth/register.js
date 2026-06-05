import { crearUsuario, obtenerUsuarioPorEmail } from "../../services/users.service.js";
import { navigate } from "../../router/router.js";
import { themeToggleButtonHtml, setupThemeToggle } from "../../utils/theme.js";
import { t, getLangSelectHtml, setupLangSelect } from "../../utils/i18n.js";
import Swal from "sweetalert2";

export function renderRegister() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">
        <main class="grid min-h-screen lg:grid-cols-[1fr_1fr]">

            <!-- Left: brand panel -->
            <section class="hidden lg:flex lg:flex-col lg:justify-between relative overflow-hidden px-14 py-16 bg-gradient-to-br from-violet-950/60 via-indigo-950/40 to-slate-950/80 border-r border-violet-500/20">
                <div class="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-violet-600/18 blur-3xl"></div>
                <div class="pointer-events-none absolute bottom-20 left-0 h-48 w-48 rounded-full bg-cyan-600/12 blur-3xl"></div>

                <a href="/" class="relative z-10 flex items-center gap-2">
                    <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">T</div>
                    <span class="text-base font-black text-white">TaskFlow<span class="gradient-text">SPA</span></span>
                </a>

                <div class="relative z-10">
                    <p class="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">${t("new_user")}</p>
                    <h2 class="text-4xl font-black text-white leading-tight">${t("register_sidebar_title")}</h2>
                    <p class="mt-5 text-slate-400 text-sm leading-7">${t("register_sidebar_desc")}</p>

                    <!-- Decorative grid -->
                    <div class="mt-10 grid grid-cols-2 gap-3">
                        <div class="rounded-2xl border border-violet-500/20 bg-violet-500/8 p-4">
                            <p class="text-2xl mb-1">🔐</p>
                            <p class="text-xs font-semibold text-slate-300">Seguridad JWT</p>
                        </div>
                        <div class="rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-4">
                            <p class="text-2xl mb-1">⚡</p>
                            <p class="text-xs font-semibold text-slate-300">Roles & Permisos</p>
                        </div>
                    </div>
                </div>

                <p class="relative z-10 text-xs text-slate-600">${t("register_sidebar_footer")}</p>
            </section>

            <!-- Right: form -->
            <section class="flex items-center justify-center px-6 py-12">
                <div class="w-full max-w-md">

                    <!-- Top bar -->
                    <div class="flex items-center justify-between mb-10">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-widest text-violet-400">${t("register_subtitle")}</p>
                            <h1 class="text-xl font-black text-white mt-0.5">${t("register_title")}</h1>
                        </div>
                        <div class="flex items-center gap-2">
                            <a href="/login" class="btn-ghost text-xs">${t("already_have_account")}</a>
                            ${getLangSelectHtml()}
                            ${themeToggleButtonHtml}
                        </div>
                    </div>

                    <!-- Card -->
                    <div class="glass-card rounded-3xl p-8 animate-fade-up space-y-5">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">${t("name")}</label>
                                <input id="register-name" type="text" placeholder="Juan" class="field" />
                            </div>
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">${t("lastname")}</label>
                                <input id="register-lastname" type="text" placeholder="Maldonado" class="field" />
                            </div>
                        </div>

                        <div>
                            <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">${t("email")}</label>
                            <input id="register-email" type="email" placeholder="usuario@correo.com" class="field" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">${t("password")}</label>
                                <input id="register-password" type="password" placeholder="••••••••" class="field" />
                            </div>
                            <div>
                                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">${t("role")}</label>
                                <select id="register-role" class="field">
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                        </div>

                        <button id="register-btn" type="button" class="btn-primary w-full">
                            <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                            ${t("register_btn")}
                        </button>
                    </div>
                </div>
            </section>

        </main>
    </div>
    `;
}

export function setupRegister() {
    setupThemeToggle();
    setupLangSelect();
    const registerBtn = document.getElementById("register-btn");
    if (!registerBtn) return;

    registerBtn.addEventListener("click", async () => {
        const name     = document.getElementById("register-name").value.trim();
        const lastName = document.getElementById("register-lastname").value.trim();
        const email    = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();
        const role     = document.getElementById("register-role").value;

        if (!name || !lastName || !email || !password) {
            Swal.fire({ icon: "warning", title: t("fields_incomplete"), text: t("register_incomplete_desc"), confirmButtonColor: "#7c3aed" });
            return;
        }
        try {
            const usuarioExistente = await obtenerUsuarioPorEmail(email);
            if (usuarioExistente) {
                Swal.fire({ icon: "error", title: t("email_in_use"), text: t("email_in_use_desc"), confirmButtonColor: "#7c3aed" });
                return;
            }
            await crearUsuario({ name, lastName, email, password, role });
            Swal.fire({ icon: "success", title: t("register_success"), text: t("register_success_desc"), timer: 1500, showConfirmButton: false });
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            Swal.fire({ icon: "error", title: t("register_error"), text: error.message || t("register_error_desc"), confirmButtonColor: "#7c3aed" });
        }
    });
}
