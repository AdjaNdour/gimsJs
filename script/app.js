import Nav from "./pages/nav.js";
import { initRouter } from './router.js';

let sidebar = document.querySelector(".sidebar");

sidebar.innerHTML = Nav();

if (Nav.afterRender) {
    Nav.afterRender();
}

initRouter();