import { obtenerUsuarios, actualizarRolUsuario, eliminarUsuario } from "../../services/users.service.js";
import { obtenerUsuarioActual } from "../../services/auth.service.js";
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from "../../services/task.service.js";
import { navigate } from "../../router/router.js";
import { t } from "../../utils/i18n.js";
import { renderHeader, setupHeader } from "../../components/Header.js";
import Swal from "sweetalert2";

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — static shell (stats + tabs filled by setup)
// ─────────────────────────────────────────────────────────────────────────────

export function renderAdmin() {
    return `
    <div class="bg-mesh min-h-screen text-slate-200">

        ${renderHeader("/admin")}


        <main class="mx-auto max-w-7xl px-6 py-10">

            <!-- Banner -->
            <section class="relative overflow-hidden rounded-3xl p-8 lg:p-10"
                style="background: linear-gradient(135deg, rgba(124,58,237,0.40) 0%, rgba(79,70,229,0.30) 50%, rgba(6,182,212,0.18) 100%); border: 1px solid rgba(124,58,237,0.4);">
                <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"></div>
                <div class="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-widest text-violet-300 mb-2">${t("admin_subtitle")}</p>
                        <h1 class="text-3xl font-black text-white lg:text-4xl">${t("admin_title_banner")}</h1>
                        <p class="mt-3 max-w-lg text-sm text-slate-300 leading-6">${t("admin_desc")}</p>
                    </div>
                    <div class="flex flex-wrap gap-3 shrink-0">
                        <div class="stat-card">
                            <p class="text-3xl font-black tabular-nums text-violet-400" id="stat-users">—</p>
                            <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("total_users")}</p>
                        </div>
                        <div class="stat-card">
                            <p class="text-3xl font-black tabular-nums text-cyan-400" id="stat-tasks">—</p>
                            <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("tasks")}</p>
                        </div>
                        <div class="stat-card">
                            <p class="text-3xl font-black tabular-nums text-emerald-400" id="stat-completed">—</p>
                            <p class="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">${t("completed_tasks")}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tabs -->
            <div class="mt-8 flex gap-1" style="border-bottom: 1px solid rgba(124,58,237,0.25)">
                <button class="admin-tab-btn -mb-px border-b-2 border-violet-500 px-5 py-3 text-sm font-bold text-violet-400 transition-colors" data-tab="users">
                    ${t("users_tab")}
                </button>
                <button class="admin-tab-btn -mb-px border-b-2 border-transparent px-5 py-3 text-sm font-bold text-slate-500 hover:text-violet-400 transition-colors" data-tab="tasks">
                    ${t("tasks_tab")}
                </button>
            </div>

            <!-- Users tab -->
            <div id="tab-users" class="mt-6 space-y-4">
                <div class="flex justify-center py-16">
                    <div class="h-7 w-7 animate-spin rounded-full border-[3px] border-violet-500 border-t-transparent"></div>
                </div>
            </div>

            <!-- Tasks tab -->
            <div id="tab-tasks" class="mt-6 hidden">
                <div class="flex justify-center py-16">
                    <div class="h-7 w-7 animate-spin rounded-full border-[3px] border-violet-500 border-t-transparent"></div>
                </div>
            </div>

        </main>
    </div>
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function statusBadge(status) {
    if (status === "Completada" || status === "Completed")   return `<span class="badge-completed">${t("status_completed")}</span>`;
    if (status === "En progreso" || status === "In progress") return `<span class="badge-progress">${t("status_progress")}</span>`;
    return `<span class="badge-pending">${t("status_pending")}</span>`;
}

function roleBadge(role) {
    if (role === "ADMIN") return `<span class="badge-admin">ADMIN</span>`;
    return `<span class="badge-user">USER</span>`;
}

function getInitials(name = "", lastName = "") {
    return ((name[0] || "") + (lastName[0] || "")).toUpperCase() || "?";
}

function avatarColors(id = "") {
    const palettes = [
        "from-blue-500 to-indigo-600",
        "from-violet-500 to-purple-700",
        "from-emerald-500 to-teal-600",
        "from-rose-500 to-pink-600",
        "from-amber-500 to-orange-600",
        "from-cyan-500 to-sky-600",
    ];
    const idx = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % palettes.length;
    return palettes[idx];
}

/** Build the form HTML injected inside Swal for task create/edit */
function buildTaskFormHtml(task = null) {
    const isDark = document.documentElement.classList.contains("dark");
    const bg = isDark ? "#0f172a" : "#eff6ff";
    const border = isDark ? "#334155" : "#bfdbfe";
    const color = isDark ? "#f1f5f9" : "#0f172a";
    const labelColor = isDark ? "#94a3b8" : "#374151";
    const inputStyle = `width:100%;padding:10px 14px;border-radius:12px;border:1px solid ${border};background:${bg};color:${color};font-size:13px;margin-bottom:14px;outline:none;box-sizing:border-box`;

    const statusPending   = task ? (task.status === "Pendiente"   || task.status === "Pending")    ? "selected" : "" : "selected";
    const statusProgress  = task ? (task.status === "En progreso" || task.status === "In progress") ? "selected" : "" : "";
    const statusCompleted = task ? (task.status === "Completada"  || task.status === "Completed")   ? "selected" : "" : "";

    return `
        <div style="text-align:left;padding:4px 0">
            <label style="display:block;font-size:12px;font-weight:700;margin-bottom:5px;color:${labelColor};text-transform:uppercase;letter-spacing:.05em">${t("task_title_label")}</label>
            <input id="swal-title" type="text" placeholder="${t("task_title_placeholder")}" value="${task ? (task.title || "") : ""}" style="${inputStyle}" />

            <label style="display:block;font-size:12px;font-weight:700;margin-bottom:5px;color:${labelColor};text-transform:uppercase;letter-spacing:.05em">${t("task_desc_label")}</label>
            <textarea id="swal-desc" rows="3" placeholder="${t("task_desc_placeholder")}" style="${inputStyle};resize:vertical">${task ? (task.description || "") : ""}</textarea>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                    <label style="display:block;font-size:12px;font-weight:700;margin-bottom:5px;color:${labelColor};text-transform:uppercase;letter-spacing:.05em">${t("task_status_label")}</label>
                    <select id="swal-status" style="${inputStyle};margin-bottom:0">
                        <option value="Pendiente"   ${statusPending}>${t("status_pending")}</option>
                        <option value="En progreso" ${statusProgress}>${t("status_progress")}</option>
                        <option value="Completada"  ${statusCompleted}>${t("status_completed")}</option>
                    </select>
                </div>
                <div>
                    <label style="display:block;font-size:12px;font-weight:700;margin-bottom:5px;color:${labelColor};text-transform:uppercase;letter-spacing:.05em">${t("task_date_label")}</label>
                    <input id="swal-date" type="date" value="${task ? (task.date || "") : ""}" style="${inputStyle};margin-bottom:0" />
                </div>
            </div>
        </div>
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — Users Tab
// ─────────────────────────────────────────────────────────────────────────────

function renderUsersTab(users, tasks) {
    const container = document.getElementById("tab-users");
    if (!container) return;

    if (users.length === 0) {
        container.innerHTML = `<div class="flex flex-col items-center py-20 text-center"><div class="mb-4 text-4xl">👥</div><p class="text-slate-500">${t("no_user_tasks")}</p></div>`;
        return;
    }

    container.innerHTML = users.map(u => {
        const userTasks = tasks.filter(tk => tk.userId === u.id);
        const gradient  = avatarColors(u.id);

        const taskRows = userTasks.length === 0
            ? `<p class="py-3 text-sm text-center text-slate-400 dark:text-slate-500">${t("no_user_tasks")}</p>`
            : userTasks.map(tk => `
                <div class="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 bg-white/40 dark:bg-white/4 border border-violet-500/15 dark:border-violet-500/22">
                    <div class="flex items-center gap-3 min-w-0">
                        ${statusBadge(tk.status)}
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-white truncate">${tk.title}</p>
                            ${tk.date ? `<p class="text-xs text-slate-500 mt-0.5">${t("deadline", { date: tk.date })}</p>` : ""}
                        </div>
                    </div>
                    <div class="flex gap-2 shrink-0">
                        <button class="btn-edit-task rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all bg-violet-500/15 border border-violet-500/30 text-violet-600 dark:text-violet-300 hover:bg-violet-500/25"
                            data-task-id="${tk.id}" data-user-id="${u.id}">
                            ${t("edit")}
                        </button>
                        <button class="btn-delete-task rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all bg-red-500/8 border border-red-500/25 text-red-600 dark:text-red-400 hover:bg-red-500/18"
                            data-task-id="${tk.id}" data-user-id="${u.id}">
                            ${t("delete")}
                        </button>
                    </div>
                </div>
            `).join("");

        return `
        <article class="rounded-3xl overflow-hidden bg-white/30 dark:bg-white/4 border border-violet-500/18 dark:border-violet-500/22" data-user-id="${u.id}">

            <div class="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white font-black text-lg shadow-lg">
                        ${getInitials(u.name, u.lastName)}
                    </div>
                    <div>
                        <p class="font-bold text-white">${u.name} ${u.lastName || ""}</p>
                        <p class="text-xs text-slate-500 mt-0.5">${u.email}</p>
                        <div class="mt-2 flex items-center gap-2 flex-wrap">
                            ${roleBadge(u.role)}
                            <span class="text-xs text-slate-600">${userTasks.length} ${t("tasks").toLowerCase()}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2 items-center">
                    <button class="btn-view-tasks flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold cursor-pointer transition-all bg-violet-500/15 border border-violet-500/30 text-violet-600 dark:text-violet-300 hover:bg-violet-500/25"
                        data-user-id="${u.id}">
                        <span class="btn-view-arrow">▼</span>
                        <span class="btn-view-label">${t("view_tasks_btn")}</span>
                    </button>
                    <button class="btn-edit-role rounded-xl px-4 py-2 text-xs font-semibold cursor-pointer transition-all bg-purple-500/12 border border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20"
                        data-user-id="${u.id}" data-role="${u.role}">
                        ${t("edit_role")} (${u.role === "ADMIN" ? "→ USER" : "→ ADMIN"})
                    </button>
                    <button class="btn-delete-user rounded-xl px-4 py-2 text-xs font-semibold cursor-pointer transition-all bg-red-500/8 border border-red-500/22 text-red-600 dark:text-red-400 hover:bg-red-500/18"
                        data-user-id="${u.id}">
                        ${t("delete")}
                    </button>
                </div>
            </div>

            <div id="tasks-panel-${u.id}" class="hidden border-t border-violet-500/15 dark:border-violet-500/25 bg-violet-500/5 dark:bg-black/20">
                <div class="p-5">
                    <div class="mb-4 flex items-center justify-between gap-3">
                        <p class="text-xs font-bold uppercase tracking-widest text-slate-500">${t("user_tasks")} — ${u.name}</p>
                        <button class="btn-add-task btn-primary text-xs px-4 py-2" data-user-id="${u.id}" data-user-name="${u.name}">
                            + ${t("add_task_for_user")}
                        </button>
                    </div>
                    <div class="space-y-2">${taskRows}</div>
                </div>
            </div>

        </article>
        `;
    }).join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — Tasks Tab (global list)
// ─────────────────────────────────────────────────────────────────────────────

function renderTasksTab(tasks, usersMap) {
    const container = document.getElementById("tab-tasks");
    if (!container) return;

    if (tasks.length === 0) {
        container.innerHTML = `<div class="flex flex-col items-center py-20 text-center"><div class="mb-4 text-4xl">📋</div><p class="text-slate-500">${t("no_tasks")}</p></div>`;
        return;
    }

    container.innerHTML = `
    <div class="rounded-3xl overflow-hidden bg-white/30 dark:bg-white/4 border border-violet-500/18 dark:border-violet-500/22">
        <div class="flex items-center justify-between px-6 py-4 border-b border-violet-500/15 dark:border-violet-500/25">
            <h2 class="text-base font-bold text-white">${t("all_tasks")}</h2>
            <span class="rounded-full px-3 py-1 text-xs font-bold bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/20">${tasks.length}</span>
        </div>
        <div>
            ${tasks.map((tk, i) => {
                const owner = usersMap[tk.userId];
                const ownerName = owner ? `${owner.name} ${owner.lastName || ""}`.trim() : "—";
                const gradient  = owner ? avatarColors(owner.id) : "from-slate-400 to-slate-600";
                const initials  = owner ? getInitials(owner.name, owner.lastName) : "?";
                const borderTopClass = i > 0 ? "border-t border-violet-500/10 dark:border-violet-500/20" : "";
                return `
                <div class="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-violet-500/5 dark:hover:bg-violet-500/8 ${borderTopClass}">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <p class="text-sm font-semibold text-white">${tk.title}</p>
                            ${statusBadge(tk.status)}
                        </div>
                        <div class="mt-1.5 flex items-center gap-3 flex-wrap">
                            <div class="flex items-center gap-1.5">
                                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-[9px] font-black shrink-0">${initials}</span>
                                <span class="text-xs font-medium text-slate-500">${ownerName}</span>
                            </div>
                            ${tk.date ? `<span class="text-xs text-slate-500">${t("deadline", { date: tk.date })}</span>` : ""}
                        </div>
                    </div>
                    <div class="flex gap-2 shrink-0">
                        <button class="btn-edit-task rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all bg-violet-500/15 border border-violet-500/30 text-violet-600 dark:text-violet-300 hover:bg-violet-500/25"
                            data-task-id="${tk.id}" data-user-id="${tk.userId}">
                            ${t("edit")}
                        </button>
                        <button class="btn-delete-task rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all bg-red-500/8 border border-red-500/25 text-red-600 dark:text-red-400 hover:bg-red-500/18"
                            data-task-id="${tk.id}" data-user-id="${tk.userId}">
                            ${t("delete")}
                        </button>
                    </div>
                </div>
                `;
            }).join("")}
        </div>
    </div>
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS LOGIC
// ─────────────────────────────────────────────────────────────────────────────

function setupTabs() {
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll(".admin-tab-btn").forEach(b => {
                b.classList.remove("border-violet-500", "text-violet-400");
                b.classList.add("border-transparent", "text-slate-500");
            });
            btn.classList.add("border-violet-500", "text-violet-400");
            btn.classList.remove("border-transparent", "text-slate-500");
            document.getElementById("tab-users").classList.toggle("hidden", tab !== "users");
            document.getElementById("tab-tasks").classList.toggle("hidden", tab !== "tasks");
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIONS (edit task, delete task — shared between both tabs)
// ─────────────────────────────────────────────────────────────────────────────

async function doEditTask(taskId, userId, state, reloadAll) {
    const task = state.tasks.find(tk => tk.id === taskId);
    if (!task) return;

    const { isConfirmed, value } = await Swal.fire({
        title: t("edit_task"),
        html: buildTaskFormHtml(task),
        width: 560,
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#64748b",
        confirmButtonText: t("save_changes"),
        cancelButtonText: t("cancel_btn"),
        preConfirm: () => {
            const title = document.getElementById("swal-title")?.value.trim();
            if (!title) { Swal.showValidationMessage(t("title_required_desc")); return false; }
            return {
                title,
                description: document.getElementById("swal-desc")?.value.trim() || "",
                status:      document.getElementById("swal-status")?.value || "Pendiente",
                date:        document.getElementById("swal-date")?.value   || "",
                userId:      task.userId
            };
        }
    });

    if (!isConfirmed || !value) return;

    try {
        await actualizarTarea(taskId, value);
        await Swal.fire({ icon: "success", title: t("task_updated"), text: t("task_updated_desc"), timer: 1500, showConfirmButton: false });
        await reloadAll();
        // re-open user panel if we came from the users tab
        openPanel(userId);
    } catch (e) {
        Swal.fire({ icon: "error", title: "Error", text: e.message, confirmButtonColor: "#2563eb" });
    }
}

async function doDeleteTask(taskId, userId, state, reloadAll) {
    const { isConfirmed } = await Swal.fire({
        title: t("delete_task_confirm"),
        text: t("delete_user_confirm_desc"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#2563eb",
        confirmButtonText: t("delete_confirm_btn"),
        cancelButtonText: t("cancel_btn")
    });
    if (!isConfirmed) return;

    try {
        await eliminarTarea(taskId);
        await Swal.fire({ icon: "success", title: t("deleted"), text: t("task_deleted"), timer: 1500, showConfirmButton: false });
        await reloadAll();
        openPanel(userId);
    } catch (e) {
        Swal.fire({ icon: "error", title: "Error", text: e.message, confirmButtonColor: "#2563eb" });
    }
}

function openPanel(userId) {
    if (!userId) return;
    const panel = document.getElementById(`tasks-panel-${userId}`);
    if (panel) {
        panel.classList.remove("hidden");
        // sync the toggle button label
        const viewBtn = document.querySelector(`.btn-view-tasks[data-user-id="${userId}"]`);
        if (viewBtn) {
            const arrow = viewBtn.querySelector(".btn-view-arrow");
            const label = viewBtn.querySelector(".btn-view-label");
            if (arrow) arrow.textContent = "▲";
            if (label) label.textContent = t("hide_tasks");
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT DELEGATION (attached once, works after every reloadAll)
// ─────────────────────────────────────────────────────────────────────────────

function setupEventDelegation(state, reloadAll) {
    // ── Users Tab ──────────────────────────────────────────────────────────
    document.getElementById("tab-users").addEventListener("click", async (event) => {

        // Toggle tasks panel
        const viewBtn = event.target.closest(".btn-view-tasks");
        if (viewBtn) {
            const userId = viewBtn.dataset.userId;
            const panel  = document.getElementById(`tasks-panel-${userId}`);
            if (!panel) return;
            const isOpen = !panel.classList.contains("hidden");
            panel.classList.toggle("hidden", isOpen);
            const arrow = viewBtn.querySelector(".btn-view-arrow");
            const label = viewBtn.querySelector(".btn-view-label");
            if (arrow) arrow.textContent = isOpen ? "▼" : "▲";
            if (label) label.textContent = isOpen ? t("view_tasks_btn") : t("hide_tasks");
            return;
        }

        // Edit role
        const editRoleBtn = event.target.closest(".btn-edit-role");
        if (editRoleBtn) {
            const userId      = editRoleBtn.dataset.userId;
            const currentRole = editRoleBtn.dataset.role;
            const newRole     = currentRole === "ADMIN" ? "USER" : "ADMIN";
            const { isConfirmed } = await Swal.fire({
                title: t("edit_role"),
                html: `<p>${currentRole} <b>→</b> ${newRole}</p>`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#7c3aed",
                cancelButtonColor: "#64748b",
                confirmButtonText: t("save_changes"),
                cancelButtonText: t("cancel_btn")
            });
            if (!isConfirmed) return;
            try {
                await actualizarRolUsuario(userId, newRole);
                await Swal.fire({ icon: "success", title: t("role_updated"), text: t("role_updated_desc"), timer: 1500, showConfirmButton: false });
                await reloadAll();
                openPanel(userId);
            } catch (e) {
                Swal.fire({ icon: "error", title: "Error", text: e.message, confirmButtonColor: "#2563eb" });
            }
            return;
        }

        // Delete user
        const deleteUserBtn = event.target.closest(".btn-delete-user");
        if (deleteUserBtn) {
            const userId = deleteUserBtn.dataset.userId;
            const { isConfirmed } = await Swal.fire({
                title: t("delete_user_confirm"),
                text: t("delete_user_confirm_desc"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#2563eb",
                confirmButtonText: t("delete_confirm_btn"),
                cancelButtonText: t("cancel_btn")
            });
            if (!isConfirmed) return;
            try {
                await eliminarUsuario(userId);
                await Swal.fire({ icon: "success", title: t("deleted"), text: t("deleted_desc"), timer: 1500, showConfirmButton: false });
                await reloadAll();
            } catch (e) {
                Swal.fire({ icon: "error", title: "Error", text: e.message, confirmButtonColor: "#2563eb" });
            }
            return;
        }

        // Add task for user
        const addTaskBtn = event.target.closest(".btn-add-task");
        if (addTaskBtn) {
            const userId   = addTaskBtn.dataset.userId;
            const userName = addTaskBtn.dataset.userName || "";
            const { isConfirmed, value } = await Swal.fire({
                title: `${t("add_task_for_user")} — ${userName}`,
                html: buildTaskFormHtml(),
                width: 560,
                showCancelButton: true,
                confirmButtonColor: "#2563eb",
                cancelButtonColor: "#64748b",
                confirmButtonText: t("save_task_btn"),
                cancelButtonText: t("cancel_btn"),
                preConfirm: () => {
                    const title = document.getElementById("swal-title")?.value.trim();
                    if (!title) { Swal.showValidationMessage(t("title_required_desc")); return false; }
                    return {
                        title,
                        description: document.getElementById("swal-desc")?.value.trim() || "",
                        status:      document.getElementById("swal-status")?.value || "Pendiente",
                        date:        document.getElementById("swal-date")?.value   || "",
                        userId
                    };
                }
            });
            if (!isConfirmed || !value) return;
            try {
                await crearTarea(value);
                await Swal.fire({ icon: "success", title: t("task_saved"), text: t("task_saved_desc"), timer: 1500, showConfirmButton: false });
                await reloadAll();
                openPanel(userId);
            } catch (e) {
                Swal.fire({ icon: "error", title: "Error", text: e.message, confirmButtonColor: "#2563eb" });
            }
            return;
        }

        // Edit task (from user panel)
        const editTaskBtn = event.target.closest(".btn-edit-task");
        if (editTaskBtn) {
            await doEditTask(editTaskBtn.dataset.taskId, editTaskBtn.dataset.userId, state, reloadAll);
            return;
        }

        // Delete task (from user panel)
        const deleteTaskBtn = event.target.closest(".btn-delete-task");
        if (deleteTaskBtn) {
            await doDeleteTask(deleteTaskBtn.dataset.taskId, deleteTaskBtn.dataset.userId, state, reloadAll);
            return;
        }
    });

    // ── Tasks Tab ──────────────────────────────────────────────────────────
    document.getElementById("tab-tasks").addEventListener("click", async (event) => {
        const editTaskBtn = event.target.closest(".btn-edit-task");
        if (editTaskBtn) {
            await doEditTask(editTaskBtn.dataset.taskId, editTaskBtn.dataset.userId, state, reloadAll);
            return;
        }
        const deleteTaskBtn = event.target.closest(".btn-delete-task");
        if (deleteTaskBtn) {
            await doDeleteTask(deleteTaskBtn.dataset.taskId, deleteTaskBtn.dataset.userId, state, reloadAll);
            return;
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// SETUP — entry point
// ─────────────────────────────────────────────────────────────────────────────

export async function setupAdmin() {
    setupHeader();

    const currentUser = obtenerUsuarioActual();

    if (!currentUser) {
        navigate("/login");
        return;
    }
    if (currentUser.role !== "ADMIN") {
        Swal.fire({ icon: "error", title: t("auth_error"), text: "Access denied.", confirmButtonColor: "#2563eb" });
        navigate("/dashboard");
        return;
    }

    // Shared mutable state so reloadAll always has fresh data
    const state = { users: [], tasks: [], usersMap: {} };

    async function reloadAll() {
        try {
            const [users, tasks] = await Promise.all([obtenerUsuarios(), obtenerTareas()]);
            state.users = users;
            state.tasks = tasks;
            state.usersMap = {};
            users.forEach(u => { state.usersMap[u.id] = u; });

            // Update stats
            const statUsers     = document.getElementById("stat-users");
            const statTasks     = document.getElementById("stat-tasks");
            const statCompleted = document.getElementById("stat-completed");
            if (statUsers)     statUsers.textContent     = users.length;
            if (statTasks)     statTasks.textContent     = tasks.length;
            if (statCompleted) statCompleted.textContent = tasks.filter(tk => tk.status === "Completada" || tk.status === "Completed").length;

            // Re-render tab contents
            renderUsersTab(users, tasks);
            renderTasksTab(tasks, state.usersMap);
        } catch (e) {
            console.error("Admin reloadAll error:", e);
        }
    }

    // Initial load
    try {
        await reloadAll();
        setupTabs();
        setupEventDelegation(state, reloadAll);
    } catch (error) {
        console.error("Admin setup error:", error);
        Swal.fire({ icon: "error", title: "Error", text: error.message || "Error loading admin panel.", confirmButtonColor: "#2563eb" });
    }
}