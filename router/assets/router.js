const routes = {};

export function addRoute(name, pageFunction) {
    routes[name] = pageFunction;
}

export function navigate(name) {
    const main = document.querySelector("main");
    main.innerHTML = routes[name]();

    window.history.pushState({}, "", "#" + name);

    initEvents(name);
}