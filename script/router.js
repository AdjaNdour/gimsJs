import Nav from "./pages/nav.js";

const routes = {
    "/": "intro",
    "/connexion": "login",
    "/inscription": "inscription",
    "/home": "home",
    "/profile": "profil",
    "/mesClients": "mesClients",
    "/emploieDuTemps": "emploieDuTemps",
    "/detailsSalle": "detailsSalle"
};

const handleHashChange = async () => {
    const fullPath = window.location.hash.replace('#', '') || '/';

    const parts = fullPath.split('/').filter(Boolean);

    const basePath = '/' + (parts[0] || '');
    const param = parts[1] || null;

    await render(basePath, param);
};

const render = async (path, param = null) => {

    const app = document.querySelector('main');
    if (!app) return;

    const pageName = routes[path];

    let pageModule;
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

    try {
        if (!pageName) {
            pageModule = await import('./pages/notFound.js');
        } else {
            pageModule = await import(`./pages/${pageName}.js`);
        }

        const pageComponent = pageModule.default;

        const html = await pageComponent(param);
        app.innerHTML = html;

        pageComponent.afterRender?.(param);

    } catch (error) {
        console.error(error);
        app.innerHTML = '<h1>Erreur technique</h1>';
    }
};

const navigate = (path) => {
    window.location.hash = path;
};

const initRouter = () => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
};

export { initRouter, navigate };