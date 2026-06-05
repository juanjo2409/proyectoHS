import { renderRouter } from "../router/router.js";

export const translations = {
    es: {
        // Nav & General
        dashboard: "Dashboard",
        tasks: "Tareas",
        profile: "Perfil",
        admin: "Admin",
        logout: "Logout",
        home: "Inicio",
        login: "Iniciar sesión",
        register: "Registrarse",
        welcome: "Bienvenido",
        welcome_user: "Bienvenido, {name}",

        // Home View
        organize_calm: "Organiza tu trabajo con calma",
        home_title: "Una plataforma clara para gestionar tareas, usuarios y productividad.",
        home_desc: "TaskFlowSPA presenta el recorrido principal del proyecto con una interfaz uniforme, amable y lista para convertirse luego en una SPA real con autenticación, roles, permisos y CRUD de tareas.",
        create_account: "Crear cuenta",
        project_views: "Vistas del proyecto",
        view_desc_dashboard: "Resumen principal de productividad.",
        view_desc_tasks: "CRUD principal del usuario.",
        view_desc_profile: "Actualizar cuenta y datos personales.",
        view_desc_admin: "Gestión de usuarios y roles.",

        // Login View
        login_subtitle: "Inicio de sesión",
        login_welcome: "Bienvenido de nuevo",
        login_desc: "Ingresa a tu espacio de trabajo y continúa organizando tus tareas.",
        email: "Correo",
        password: "Contraseña",
        enter_dashboard: "Entrar al dashboard",
        login_sidebar_title: "Bienvenido a TaskFlowSPA, tu gestor de tareas personal.",
        login_feature_1: "Autenticación robusta con JWT y localStorage.",
        login_feature_2: "Gestión de tareas con enfoque claro y visual.",
        login_feature_3: "Roles y permisos entendibles desde el primer recorrido.",
        fields_incomplete: "Campos incompletos",
        fields_incomplete_desc: "Por favor, completa todos los campos para continuar.",
        welcome_success: "¡Bienvenido, {name}!",
        login_success: "Has iniciado sesión correctamente.",
        auth_error: "Error de autenticación",
        auth_error_desc: "Credenciales incorrectas.",

        // Register View
        register_subtitle: "Registro",
        register_title: "Crear cuenta",
        new_user: "Nuevo usuario",
        register_sidebar_title: "Crea tu cuenta y empieza a organizar tu flujo.",
        register_sidebar_desc: "Esta vista permite registrarte en el sistema de forma completamente segura.",
        register_sidebar_footer: "Módulo de autenticación básica.",
        name: "Nombre",
        lastname: "Apellido",
        role: "Rol",
        already_have_account: "Ya tengo cuenta",
        register_btn: "Registrarme",
        register_incomplete_desc: "Por favor, completa todos los campos para registrarte.",
        email_in_use: "Correo en uso",
        email_in_use_desc: "Ese correo electrónico ya está registrado en el sistema.",
        register_success: "Registro exitoso",
        register_success_desc: "Tu usuario ha sido creado correctamente.",
        register_error: "Error de registro",
        register_error_desc: "No se pudo crear la cuenta.",

        // Dashboard View
        dashboard_title: "Dashboard principal",
        active_tasks: "Tareas activas",
        completed_tasks: "Completadas",
        pending_tasks: "Pendientes",
        quick_access: "Accesos rápidos",
        view_tasks: "Ver tareas",
        create: "Crear",
        new_task: "Nueva tarea",
        account: "Cuenta",
        edit_profile: "Editar perfil",

        // Admin View
        admin_subtitle: "Rol administrador",
        admin_title_banner: "Panel administrativo",
        admin_desc: "Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.",
        quick_actions: "Acciones rápidas",
        manage_users: "Gestionar usuarios",
        view_all_tasks: "Ver todas las tareas",
        back_to_dashboard: "Volver al dashboard",
        system_users: "Usuarios del sistema",
        active: "Activo",
        edit_role: "Editar rol",
        delete: "Eliminar",
        role_updated: "Rol actualizado",
        role_updated_desc: "El rol del usuario ha sido modificado correctamente.",
        delete_user_confirm: "¿Eliminar usuario?",
        delete_user_confirm_desc: "Esta acción no se puede deshacer.",
        delete_confirm_btn: "Sí, eliminar",
        cancel_btn: "Cancelar",
        deleted: "Eliminado",
        deleted_desc: "El usuario ha sido eliminado correctamente.",
        // Admin Panel — Enhanced
        users_tab: "Usuarios",
        tasks_tab: "Tareas",
        total_users: "Usuarios totales",
        user_tasks: "Tareas del usuario",
        no_user_tasks: "Sin tareas asignadas",
        view_tasks_btn: "Ver tareas",
        hide_tasks: "Ocultar tareas",
        add_task_for_user: "Nueva tarea",
        all_tasks: "Todas las tareas",
        edit_task: "Editar tarea",
        save_changes: "Guardar cambios",

        // Profile View
        my_profile: "Mi perfil",
        profile_desc: "El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.",
        new_password_placeholder: "Nueva contraseña (deja en blanco para conservar)",
        fields_empty: "Campos vacíos",
        fields_empty_desc: "Nombre y Correo son obligatorios.",
        profile_updated: "Perfil actualizado",
        profile_updated_desc: "Tus datos se han guardado correctamente.",
        delete_account_confirm: "¿Seguro que deseas eliminar tu cuenta?",
        delete_account_confirm_desc: "Esta acción eliminará de forma permanente tu cuenta del sistema.",
        delete_account_btn: "Sí, eliminar cuenta",
        account_deleted: "Cuenta eliminada",
        account_deleted_desc: "Tu cuenta ha sido eliminada del sistema.",
        save_profile: "Guardar cambios",
        delete_account: "Eliminar mi cuenta",

        // Task View
        manage_activities: "Gestiona tus actividades individuales y haz un seguimiento de tu progreso diario.",
        create_task_btn: "Crear tarea",
        no_tasks: "No tienes tareas asignadas actualmente.",
        edit: "Editar",
        deadline: "📅 Límite: {date}",
        delete_task_confirm: "¿Eliminar esta tarea?",
        task_deleted: "La tarea ha sido eliminada correctamente.",

        // TaskForm View
        task_form_subtitle: "Formulario de Tarea",
        task_form_create_title: "Crear tarea",
        task_form_edit_title: "Editar tarea",
        task_form_create_desc: "Registra una nueva tarea para organizar tu trabajo.",
        task_form_edit_desc: "Modifica los detalles de tu tarea a continuación.",
        task_title_label: "Título",
        task_title_placeholder: "Ej: Preparar presentación",
        task_desc_label: "Descripción",
        task_desc_placeholder: "Describe la tarea...",
        task_status_label: "Estado",
        task_date_label: "Fecha límite",
        save_task_btn: "Guardar tarea",
        update_task_btn: "Actualizar tarea",
        status_pending: "Pendiente",
        status_progress: "En progreso",
        status_completed: "Completada",
        load_task_error: "No se pudo cargar la tarea seleccionada.",
        title_required: "Campo obligatorio",
        title_required_desc: "El título de la tarea es requerido.",
        task_saved: "Tarea creada",
        task_saved_desc: "La tarea ha sido registrada exitosamente.",
        task_updated: "Tarea actualizada",
        task_updated_desc: "La tarea se ha guardado correctamente.",

        // NotFound View
        not_found_subtitle: "Error de navegación",
        not_found_desc: "La vista que intentas abrir no existe o todavía no está disponible dentro del proyecto.",
        go_to_home: "Ir al inicio",
        back_to_login: "Volver al login"
    },
    en: {
        // Nav & General
        dashboard: "Dashboard",
        tasks: "Tasks",
        profile: "Profile",
        admin: "Admin",
        logout: "Logout",
        home: "Home",
        login: "Login",
        register: "Register",
        welcome: "Welcome",
        welcome_user: "Welcome, {name}",

        // Home View
        organize_calm: "Organize your work calmly",
        home_title: "A clear platform to manage tasks, users, and productivity.",
        home_desc: "TaskFlowSPA presents the main journey of the project with a uniform, friendly interface ready to become a real SPA with authentication, roles, permissions, and task CRUD.",
        create_account: "Create Account",
        project_views: "Project Views",
        view_desc_dashboard: "Main productivity summary.",
        view_desc_tasks: "Main user CRUD.",
        view_desc_profile: "Update account and personal details.",
        view_desc_admin: "Users and roles management.",

        // Login View
        login_subtitle: "Login",
        login_welcome: "Welcome back",
        login_desc: "Enter your workspace and continue organizing your tasks.",
        email: "Email",
        password: "Password",
        enter_dashboard: "Enter Dashboard",
        login_sidebar_title: "Welcome to TaskFlowSPA, your personal task manager.",
        login_feature_1: "Robust authentication with JWT and localStorage.",
        login_feature_2: "Task management with a clear and visual focus.",
        login_feature_3: "Understandable roles and permissions from the first tour.",
        fields_incomplete: "Incomplete Fields",
        fields_incomplete_desc: "Please complete all fields to continue.",
        welcome_success: "Welcome, {name}!",
        login_success: "You have logged in successfully.",
        auth_error: "Authentication Error",
        auth_error_desc: "Incorrect credentials.",

        // Register View
        register_subtitle: "Register",
        register_title: "Create Account",
        new_user: "New User",
        register_sidebar_title: "Create your account and start organizing your flow.",
        register_sidebar_desc: "This view allows you to register in the system completely securely.",
        register_sidebar_footer: "Basic authentication module.",
        name: "First Name",
        lastname: "Last Name",
        role: "Role",
        already_have_account: "I already have an account",
        register_btn: "Register",
        register_incomplete_desc: "Please complete all fields to register.",
        email_in_use: "Email in Use",
        email_in_use_desc: "That email is already registered in the system.",
        register_success: "Registration Successful",
        register_success_desc: "Your user account has been successfully created.",
        register_error: "Registration Error",
        register_error_desc: "Could not create the account.",

        // Dashboard View
        dashboard_title: "Main Dashboard",
        active_tasks: "Active Tasks",
        completed_tasks: "Completed",
        pending_tasks: "Pending",
        quick_access: "Quick Access",
        view_tasks: "View Tasks",
        create: "Create",
        new_task: "New Task",
        account: "Account",
        edit_profile: "Edit Profile",

        // Admin View
        admin_subtitle: "Admin Role",
        admin_title_banner: "Administrative Panel",
        admin_desc: "View reserved to manage users, roles, permissions, and general system monitoring.",
        quick_actions: "Quick Actions",
        manage_users: "Manage Users",
        view_all_tasks: "View All Tasks",
        back_to_dashboard: "Back to Dashboard",
        system_users: "System Users",
        active: "Active",
        edit_role: "Edit Role",
        delete: "Delete",
        role_updated: "Role Updated",
        role_updated_desc: "The user role has been modified successfully.",
        delete_user_confirm: "Delete User?",
        delete_user_confirm_desc: "This action cannot be undone.",
        delete_confirm_btn: "Yes, delete",
        cancel_btn: "Cancel",
        deleted: "Deleted",
        deleted_desc: "The user has been successfully deleted.",
        // Admin Panel — Enhanced
        users_tab: "Users",
        tasks_tab: "Tasks",
        total_users: "Total users",
        user_tasks: "User tasks",
        no_user_tasks: "No tasks assigned",
        view_tasks_btn: "View tasks",
        hide_tasks: "Hide tasks",
        add_task_for_user: "New task",
        all_tasks: "All tasks",
        edit_task: "Edit task",
        save_changes: "Save changes",

        // Profile View
        my_profile: "My Profile",
        profile_desc: "The user can update their personal details and manage their own account in the system.",
        new_password_placeholder: "New password (leave blank to keep current)",
        fields_empty: "Empty Fields",
        fields_empty_desc: "First Name and Email are required.",
        profile_updated: "Profile Updated",
        profile_updated_desc: "Your details have been successfully saved.",
        delete_account_confirm: "Are you sure you want to delete your account?",
        delete_account_confirm_desc: "This action will permanently delete your account from the system.",
        delete_account_btn: "Yes, delete account",
        account_deleted: "Account Deleted",
        account_deleted_desc: "Your account has been deleted from the system.",
        save_profile: "Save Changes",
        delete_account: "Delete My Account",

        // Task View
        manage_activities: "Manage your individual activities and track your daily progress.",
        create_task_btn: "Create Task",
        no_tasks: "You currently have no tasks assigned.",
        edit: "Edit",
        deadline: "📅 Deadline: {date}",
        delete_task_confirm: "Delete this task?",
        task_deleted: "The task has been successfully deleted.",

        // TaskForm View
        task_form_subtitle: "Task Form",
        task_form_create_title: "Create Task",
        task_form_edit_title: "Edit Task",
        task_form_create_desc: "Register a new task to organize your work.",
        task_form_edit_desc: "Modify your task details below.",
        task_title_label: "Title",
        task_title_placeholder: "E.g., Prepare presentation",
        task_desc_label: "Description",
        task_desc_placeholder: "Describe the task...",
        task_status_label: "Status",
        task_date_label: "Deadline",
        save_task_btn: "Save Task",
        update_task_btn: "Update Task",
        status_pending: "Pending",
        status_progress: "In progress",
        status_completed: "Completed",
        load_task_error: "Could not load the selected task.",
        title_required: "Required Field",
        title_required_desc: "The task title is required.",
        task_saved: "Task Created",
        task_saved_desc: "The task has been successfully registered.",
        task_updated: "Task Updated",
        task_updated_desc: "The task has been successfully saved.",

        // NotFound View
        not_found_subtitle: "Navigation Error",
        not_found_desc: "The view you are trying to open does not exist or is not available yet in the project.",
        go_to_home: "Go to Home",
        back_to_login: "Back to Login"
    }
};

export function getLanguage() {
    return localStorage.getItem("lang") || "es";
}

export function setLanguage(lang) {
    localStorage.setItem("lang", lang);
}

export function t(key, replacements = {}) {
    const lang = getLanguage();
    let text = translations[lang]?.[key] || translations["es"]?.[key] || key;
    
    // Perform string interpolation for values like {name} or {date}
    Object.keys(replacements).forEach(k => {
        text = text.replace(`{${k}}`, replacements[k]);
    });
    
    return text;
}

export function getLangSelectHtml() {
    return `
    <select id="lang-select" class="px-3 py-1.5 rounded-full border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer mr-1 text-xs font-semibold focus:outline-none" aria-label="Select language">
        <option value="es" ${getLanguage() === "es" ? "selected" : ""}>🇪🇸 ES</option>
        <option value="en" ${getLanguage() === "en" ? "selected" : ""}>🇺🇸 EN</option>
    </select>
    `;
}

export function setupLangSelect() {
    const select = document.getElementById("lang-select");
    if (!select) return;
    
    select.addEventListener("change", (e) => {
        setLanguage(e.target.value);
        renderRouter();
    });
}
