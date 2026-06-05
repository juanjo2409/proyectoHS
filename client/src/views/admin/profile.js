import { actualizarUsuario, eliminarUsuario } from "../../services/users.service.js";
import { obtenerUsuarioActual, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { t } from "../../utils/i18n.js";
import { renderHeader, setupHeader } from "../../components/Header.js";
import Swal from "sweetalert2";

export function renderProfile() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        <!-- Header -->
        ${renderHeader("/profile")}


        <main class="mx-auto max-w-3xl px-6 py-12">

            <!-- Banner -->
            <section class="relative overflow-hidden rounded-3xl p-8 mb-8"
                style="background: linear-gradient(135deg, rgba(236,72,153,0.25) 0%, rgba(124,58,237,0.25) 60%, rgba(79,70,229,0.2) 100%); border: 1px solid rgba(236,72,153,0.3);">
                <div class="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-pink-600/15 blur-3xl"></div>
                <div class="relative z-10 flex items-center gap-5">
                    <!-- Avatar -->
                    <div class="profile-avatar h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0">?</div>
                    <div>
                        <p class="text-xs font-bold uppercase tracking-widest text-pink-300">${t("account")}</p>
                        <h1 class="text-3xl font-black text-white">${t("my_profile")}</h1>
                        <p class="mt-1 text-sm text-slate-300">${t("profile_desc")}</p>
                    </div>
                </div>
            </section>

            <!-- Form card -->
            <div class="glass-card rounded-3xl p-8 animate-fade-up">
                <form class="profile-form space-y-5">

                    <div>
                        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="name">${t("name")}</label>
                        <input id="name" type="text" class="field" />
                    </div>

                    <div>
                        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="profile-email">${t("email")}</label>
                        <input id="profile-email" type="email" class="field" />
                    </div>

                    <div>
                        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400" for="password-new">${t("password")}</label>
                        <input id="password-new" type="password" placeholder="${t("new_password_placeholder")}" class="field" />
                    </div>

                    <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button type="button" class="save-profile btn-primary flex-1">
                            <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            ${t("save_profile")}
                        </button>
                        <button type="button" class="delete-account inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 hover:border-red-500/50 cursor-pointer transition-all">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            ${t("delete_account")}
                        </button>
                    </div>
                </form>
            </div>

        </main>
    </div>
    `;
}

export function setupProfile() {
    setupHeader();
    const usuario = obtenerUsuarioActual();
    if (!usuario) { navigate("/login"); return; }

    // Fill form
    document.getElementById("name").value          = usuario.name  || "";
    document.getElementById("profile-email").value = usuario.email || "";

    // Avatar initials
    const avatarEl = document.querySelector(".profile-avatar");
    if (avatarEl) avatarEl.textContent = ((usuario.name?.[0] || "") + (usuario.lastName?.[0] || "")).toUpperCase() || "?";

    // Logout
    document.querySelectorAll(".nav-logout").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            navigate("/login");
        });
    });

    // Save
    document.querySelector(".save-profile")?.addEventListener("click", async () => {
        const nameVal     = document.getElementById("name").value.trim();
        const emailVal    = document.getElementById("profile-email").value.trim();
        const passwordVal = document.getElementById("password-new").value;

        if (!nameVal || !emailVal) {
            Swal.fire({ icon: "warning", title: t("fields_empty"), text: t("fields_empty_desc"), confirmButtonColor: "#7c3aed" });
            return;
        }
        try {
            const datosActualizados = { ...usuario, name: nameVal, email: emailVal, password: passwordVal || usuario.password };
            const usuarioActualizado = await actualizarUsuario(usuario.id, datosActualizados);
            localStorage.setItem("user", JSON.stringify(usuarioActualizado));
            Swal.fire({ icon: "success", title: t("profile_updated"), text: t("profile_updated_desc"), timer: 1500, showConfirmButton: false });
            document.getElementById("password-new").value = "";
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message || "Error.", confirmButtonColor: "#7c3aed" });
        }
    });

    // Delete account
    document.querySelector(".delete-account")?.addEventListener("click", async () => {
        const result = await Swal.fire({
            title: t("delete_account_confirm"),
            text: t("delete_account_confirm_desc"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#7c3aed",
            confirmButtonText: t("delete_account_btn"),
            cancelButtonText: t("cancel_btn")
        });
        if (!result.isConfirmed) return;
        try {
            await eliminarUsuario(usuario.id);
            cerrarSesion();
            Swal.fire({ icon: "success", title: t("account_deleted"), text: t("account_deleted_desc"), timer: 1500, showConfirmButton: false });
            setTimeout(() => navigate("/register"), 1000);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message || "Error.", confirmButtonColor: "#7c3aed" });
        }
    });
}