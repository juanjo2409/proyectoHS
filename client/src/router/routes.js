import { renderHome, setupHome } from "../views/home.js";
import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderDashboard, setupDashboard } from "../views/app/dashboard.js";
import { renderNotFound } from "../views/notFound.js";
import { renderAdmin, setupAdmin } from "../views/admin/admin.js";
import { renderProfile, setupProfile } from "../views/admin/profile.js";
import { renderTaskForm, setupTaskForm } from "../views/tasks/taskForm.js";
import { renderTask, setupTask } from "../views/tasks/task.js";


export const routes = {
    "/": {
        render: renderHome,
        setup: setupHome,
        ispublic: true,
        redirectAutenticated: true,
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        ispublic: true,
        redirectAutenticated: true,
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        ispublic: true,
        redirectAutenticated: true,
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        requiresAuth: true,
        redirectUnautenticated: true,
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        requiresAuth: true,
        requiresAdmin: true,
        redirectUnautenticated: true,
        redirectUnauthorized: true,
    },
    "/profile": {
        render: renderProfile,
        setup: setupProfile,
        requiresAuth: true,
        redirectUnautenticated: true,
    },
    "/tasks": { 
        render: renderTask,
        setup: setupTask,
        requiresAuth: true,
        redirectUnautenticated: true,
    },
    "/tasks/new": {
        render: renderTaskForm,
        setup: setupTaskForm,
        requiresAuth: true,
        redirectUnautenticated: true,
    },
} 

export const notFoundView = renderNotFound

    

