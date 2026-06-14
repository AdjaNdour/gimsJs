import { initRouter } from './router.js';
import Nav from "./pages/nav.js";
import AuthService from './services/auth.services.js';
document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.innerHTML = Nav();
        Nav.afterRender?.();
    }

    initRouter();
    AuthService.init();
});


