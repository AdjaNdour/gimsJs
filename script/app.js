import AuthService from "./services/auth.services.js";
import Service from "./services/service.js";

const buttons = document.querySelectorAll("[data-page]");
const btnConnexion = document.getElementById("btnConnexion");
const btnSinscrire = document.getElementById("btnInscription");

const btnDeconnexion = document.getElementById("btnDeconnexion");
const lienIns = document.getElementById("lienIns");

const pages = document.querySelectorAll(".page");
const sidebar = document.querySelector(".sidebar");
const pageHome = document.querySelector("#home");
const login = document.getElementById("login");
const inscription = document.getElementById("inscription");

let inputNom = document.getElementById("nom");
let inputPassword = document.getElementById("password");
let inputEmail = document.getElementById("email");
let inputInsPassword = document.getElementById("passwordIns");
let inputInsPasswordConf = document.getElementById("passwordInsConf");
let inputInsEmail = document.getElementById("emailIns");
let main = document.querySelector("main");

sidebar.classList.remove("active");

const authService = new AuthService();

function remove(sidebar, pageHome, main) {
    sidebar.classList.remove("active");
    pageHome.classList.remove("active");
    main.classList.remove("padd");
}

function add(sidebar, pageHome, main) {
    sidebar.classList.add("active");
    pageHome.classList.add("active");
    main.classList.add("padd");
}
function inscriptionPage(login, sidebar, pageHome, main, inscription) {
    login.classList.remove("active");
    inscription.classList.add("active");
    remove(sidebar, pageHome, main)
}
function showAcceuil(login, inscription, sidebar, pageHome, main) {
    login.classList.remove("active");
    inscription.classList.remove("active");
    add(sidebar, pageHome, main)
}

btnConnexion.addEventListener("click", function (e) {
    e.preventDefault();
    authService.connexion(inputEmail.value.trim(), inputPassword.value.trim(),);
    showAcceuil(login, inscription, sidebar, pageHome, main);
});

lienIns.addEventListener("click", function (e) {
    e.preventDefault();
    inscriptionPage(login, sidebar, pageHome, main, inscription);
});

btnSinscrire.addEventListener("click", function (e) {
    e.preventDefault();
    authService.inscription(inputNom.value.trim(), inputInsEmail.value.trim(), inputInsPassword.value.trim(), inputInsPasswordConf.value.trim());
    inscription.classList.remove("active");
    add(sidebar, pageHome, main)
});

btnDeconnexion.addEventListener("click", function (e) {
    e.preventDefault();
    authService.deconnexion();
    login.classList.add("active");
    remove(sidebar, pageHome, main)
    inputEmail.value = "";
    inputPassword.value = "";
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(page => {
            page.classList.remove("active");
        });

        document
            .getElementById(btn.dataset.page)
            .classList.add("active");
        sidebar.classList.add("active");
    });
});

