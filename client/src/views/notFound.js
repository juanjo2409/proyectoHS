import { t } from "../utils/i18n.js";

export function renderNotFound() {
    return `
        <main class="flex min-h-screen items-center justify-center px-6 py-10 bg-gradient-to-b from-sky-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 transition-colors">
            <section class="w-full max-w-2xl rounded-[2rem] border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-10 text-center shadow-xl shadow-blue-100/70 dark:shadow-none">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-sky-400">
                    ${t("not_found_subtitle")}
                </p>

                <h1 class="mt-4 text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                    404
                </h1>

                <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    ${t("not_found_desc")}
                </p>

                <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a
                        class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
                        href="/"
                    >
                        ${t("go_to_home")}
                    </a>

                    <a
                        class="inline-flex items-center justify-center rounded-2xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-850 px-5 py-3 text-sm font-bold text-blue-700 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-700"
                        href="/login"
                    >
                        ${t("back_to_login")}
                    </a>
                </div>
            </section>
        </main>
    `;
}

export function setupNotFound() {
    console.log("Not Found view loaded");
}