import { obtenerUsuarioActual } from "../services/auth.service.js";
import { themeToggleButtonHtml, setupThemeToggle } from "../utils/theme.js";
import { t, getLangSelectHtml, setupLangSelect } from "../utils/i18n.js";

/**
 * Helper to generate link HTML
 */
const getNavLinkHtml = (href, label, active = false, isMobile = false) => {
    if (isMobile) {
        return `
        <a href="${href}" class="w-full flex items-center px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
            active 
                ? "bg-violet-500/12 text-violet-600 dark:text-violet-300 border border-violet-500/25 dark:border-violet-500/40" 
                : "text-slate-400 hover:bg-violet-500/8 hover:text-violet-400 dark:hover:bg-white/5"
        }">
            ${label}
        </a>`;
    }
    return `
    <a href="${href}" class="${
        active ? "nav-active" : "btn-ghost"
    } rounded-xl px-4 py-2 text-sm font-semibold transition-all">
        ${label}
    </a>`;
};

/**
 * Renders the HTML template of the header including mobile structure
 * @param {string} activePath - The currently active route path
 */
export function renderHeader(activePath = "") {
    const usuario = obtenerUsuarioActual();
    const isAuthenticated = !!usuario;
    const isAdmin = usuario?.role === "ADMIN";

    let desktopNav = "";
    let mobileNav = "";

    if (isAuthenticated) {
        // Authenticated links
        desktopNav = `
            ${getNavLinkHtml("/dashboard", t("dashboard"), activePath === "/dashboard")}
            ${getNavLinkHtml("/tasks", t("tasks"), activePath === "/tasks" || activePath === "/tasks/new")}
            ${getNavLinkHtml("/profile", t("profile"), activePath === "/profile")}
            ${isAdmin ? `<a href="/admin" class="${activePath === "/admin" ? "nav-active" : "btn-ghost"} rounded-xl px-4 py-2 text-sm font-semibold transition-all">${t("admin")}</a>` : ""}
            <a href="/login" class="nav-logout btn-ghost text-red-400 hover:text-red-300 rounded-xl px-4 py-2 text-sm font-semibold">${t("logout")}</a>
        `;

        mobileNav = `
            ${getNavLinkHtml("/dashboard", t("dashboard"), activePath === "/dashboard", true)}
            ${getNavLinkHtml("/tasks", t("tasks"), activePath === "/tasks" || activePath === "/tasks/new", true)}
            ${getNavLinkHtml("/profile", t("profile"), activePath === "/profile", true)}
            ${isAdmin ? getNavLinkHtml("/admin", t("admin"), activePath === "/admin", true) : ""}
            <a href="/login" class="nav-logout w-full flex items-center px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/8 hover:text-red-300 transition-all">
                ${t("logout")}
            </a>
        `;
    } else {
        // Visitor/Public links
        desktopNav = `
            ${getNavLinkHtml("/", t("home"), activePath === "/")}
            ${getNavLinkHtml("/login", t("login"), activePath === "/login")}
            <a href="/register" class="btn-primary text-xs px-4 py-2">${t("register")}</a>
        `;

        mobileNav = `
            ${getNavLinkHtml("/", t("home"), activePath === "/", true)}
            ${getNavLinkHtml("/login", t("login"), activePath === "/login", true)}
            <a href="/register" class="btn-primary text-sm w-full py-3 mt-2 text-center justify-center">
                ${t("register")}
            </a>
        `;
    }

    return `
    <header class="app-header relative">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" class="flex items-center gap-2 group">
                <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:shadow-violet-500/50 transition-shadow">T</div>
                <span class="text-base font-black text-white">TaskFlow<span class="gradient-text">SPA</span></span>
            </a>
            
            <div class="flex items-center gap-2">
                <!-- Desktop Navigation -->
                <nav class="hidden gap-1 md:flex mr-2">
                    ${desktopNav}
                </nav>

                <!-- Shared Controls (Lang, Theme) -->
                ${getLangSelectHtml()}
                ${themeToggleButtonHtml}

                <!-- Hamburger Button (Mobile Only) -->
                <button id="mobile-menu-btn" class="hamburger-btn md:hidden" aria-label="Toggle menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobile-menu" class="md:hidden">
            ${mobileNav}
        </div>
    </header>
    `;
}

/**
 * Closes the mobile navigation menu smoothly
 */
export function closeMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (btn) btn.classList.remove("open");
    if (menu) menu.classList.remove("open");
}

/**
 * Binds DOM event listeners for the header (Theme, Language, and Mobile Menu)
 */
export function setupHeader() {
    // Setup theme toggler and language select
    setupThemeToggle();
    setupLangSelect();

    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");

    if (btn && menu) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = btn.classList.toggle("open");
            menu.classList.toggle("open", isOpen);
        });
    }

    // Auto close menu when clicking inside or navigation links
    menu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    // Auto close on outside clicks
    document.addEventListener("click", (e) => {
        if (menu?.classList.contains("open") && !menu.contains(e.target) && !btn?.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Auto close menu on screen resize to desktop size
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
}
