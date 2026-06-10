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
let inputInsEmail = document.getElementById("emailIns");

let main = document.querySelector("main");

sidebar.classList.remove("active");

const authService = new AuthService();

btnConnexion.addEventListener("click", function (e) {
    e.preventDefault();

    authService.connexion(
        inputEmail.value.trim(),
        inputPassword.value.trim(),
        login,
        inscription,
        sidebar,
        pageHome,
        main
    );
});

btnSinscrire.addEventListener("click", function (e) {
    e.preventDefault();

    authService.inscription(
        inputNom.value.trim(),
        inputInsEmail.value.trim(),
        inputInsPassword.value.trim(),
        login,
        sidebar,
        pageHome,
        main,
        inscription
    );
});

lienIns.addEventListener("click", function (e) {
    e.preventDefault();

    authService.inscriptionPage( login, sidebar, pageHome, main, inscription );
});

btnDeconnexion.addEventListener("click", function (e) {
    e.preventDefault();
    authService.deconnexion(
        login,
        sidebar,
        pageHome,
        main,
        inputEmail,
        inputPassword
    );
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

