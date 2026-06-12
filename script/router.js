const routes = {
    "/": "intro",
    "/connexion": "login",
    "/inscription": "inscription",
    "/home": "home",
    "/profile": "profile",
    "/mesClients": "mesClients",
    "/emploieDuTemps": "emploieDuTemps"
};
import Nav from "./pages/nav.js";
const render = async (path) => {
    console.log(path);
    const app = document.querySelector('main');
    if (!app) return;
    const pageName = routes[path];
    console.log(pageName);

    let pageModule;

    try {
        if (!pageName) {
            pageModule = await import('./pages/notFound.js');
        } else {
            pageModule = await import(`./pages/${pageName}.js`);
        }

        const pageComponent = pageModule.default;
        app.innerHTML = pageComponent();

        if (pageComponent.afterRender) {
            pageComponent.afterRender();
        }

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
        console.error(`Erreur de chargement : ${error}`);
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