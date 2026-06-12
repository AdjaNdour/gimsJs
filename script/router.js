import Nav from "./pages/nav.js";

const routes = {
    "/": "intro",
    "/connexion": "login",
    "/inscription": "inscription",
    "/home": "home",
    "/profile": "profile",
    "/mesClients": "mesClients",
    "/emploieDuTemps": "emploieDuTemps"
};

const render = async (path) => {

    const app = document.querySelector('main');
    if (!app) return;

    const pageName = routes[path];

    let pageModule;

    try {
        if (!pageName) {
            pageModule = await import('./pages/notFound.js');
        } else {
            pageModule = await import(`./pages/${pageName}.js`);
        }

        const pageComponent = pageModule.default;

        // 🔥 IMPORTANT FIX
        const html = await pageComponent();
        app.innerHTML = html;

        pageComponent.afterRender?.();

        const sidebar = document.querySelector(".sidebar");

        if (sidebar) {
            if (path === "/" || path === "/connexion" || path === "/inscription") {
                sidebar.innerHTML = "";
                sidebar.style.display = "none";
            } else {
                sidebar.style.display = "block";
                sidebar.innerHTML = Nav();
                Nav.afterRender?.();
            }
        }

    } catch (error) {
        console.error(error);
        app.innerHTML = '<h1>Erreur technique</h1>';
    }
};

const navigate = (path) => {
    window.location.hash = path;
};

const handleHashChange = async () => {
    const path = window.location.hash.replace('#', '') || '/';
    await render(path);
};

const initRouter = () => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
};

export { initRouter, navigate };