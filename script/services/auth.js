import AuthService from "./services/auth.services.js";

import "./pages/login.js";
import "./pages/inscription.js";
import "./pages/home.js";
import "./pages/detailsSalle.js";
import "./pages/subscription.js";
import "./pages/EmploieDuTemps.js";
import "./pages/profil.js";
import "./pages/nav.js";


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

let inputPhoto = document.getElementById("photo");
let inputNom = document.getElementById("nom");
let inputPassword = document.getElementById("password");
let inputEmail = document.getElementById("email");
let inputInsPassword = document.getElementById("passwordIns");
let inputInsPasswordConf = document.getElementById("passwordInsConf");
let inputInsEmail = document.getElementById("emailIns");
let main = document.querySelector("main");

sidebar.classList.remove("active");
main.classList.remove("margin");

const authService = new AuthService();

function action(act) {
    sidebar.classList[act]("active");
    pageHome.classList[act]("active");
    main.classList[act]("padd");
}

function inscriptionPage() {
    login.classList.remove("active");
    inscription.classList.add("active");
    action("remove")
}

function showAcceuil() {
    login.classList.remove("active");
    inscription.classList.remove("active");
    main.classList.add("margin");
    action("add")
}

btnConnexion.addEventListener("click", async function (e) {
    e.preventDefault();
    let userConnect = await authService.connexion(
        inputEmail.value.trim(),
        inputPassword.value.trim()
    );
    if (userConnect) {
        showAcceuil();
        console.table(userConnect);
    }
});

lienIns.addEventListener("click", function (e) {
    e.preventDefault();
    inscriptionPage();
});

btnSinscrire.addEventListener("click", async function (e) {
    e.preventDefault();
    let user = await authService.inscription(
        inputNom.value.trim(),
        inputPhoto.value.trim(),
        inputInsEmail.value.trim(),
        inputInsPassword.value.trim(),
        inputInsPasswordConf.value.trim()
    );
    if (user) {
        showAcceuil();
    }
});

btnDeconnexion.addEventListener("click", async function (e) {
    e.preventDefault();
    await authService.deconnexion();
    login.classList.add("active");
    main.classList.remove("margin");
    action("remove");
    inputEmail.value = "";
    inputPassword.value = "";
    inputNom.value = "";
    inputInsEmail.value = "";
    inputInsPassword.value = "";
    inputInsPasswordConf.value = "";
    inputPhoto.value = "";
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(page => {
            page.classList.remove("active");
        });
        sidebar.classList.add("active");

        document
            .getElementById(btn.dataset.page)
            .classList.add("active");
    });
});

function connectionPage() {
    login.classList.add("active");
    inscription.classList.remove("active");
    pageHome.classList.remove("active")
}

showconnectionPageConn();