import "./styles/global.css";
import { initRouter } from "./router/router.js";
import { initTheme } from "./utils/theme.js";

// Initialize the visual theme (dark/light) immediately to prevent white flashes
initTheme();

initRouter();
