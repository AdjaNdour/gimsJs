import { initRouter } from './router.js';
import Nav from "./pages/nav.js";

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.innerHTML = Nav();
        Nav.afterRender?.();
    }

    initRouter();
});