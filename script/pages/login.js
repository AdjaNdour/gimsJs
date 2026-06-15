
import { navigate } from '../router.js';
import AuthService from "../services/auth.services.js";
const authService = new AuthService();

const Login = () => ` <section id="login" class="page active"> 

<div class="login-page">

    <div class="brand">
        <h1 class="orange mt-30">Gim's Finder</h1>
        <p>Pro Member</p>
    </div>

    <div class="login-card">

        <h2 class="orange">Connexion</h2>

        <form id="loginForm">

            <div class="input-group">
                <label>Email ou Login</label>

                <div class="input-box">
                    <i class="fa-regular fa-envelope"></i>
                    <input type="email" id="email" placeholder="veuillez entrer votre mail">
                </div>

                <small id="emailError" class="error-message"></small>
            </div>

            <div class="input-group">
                <label>Mot de passe</label>

                <div class="input-box">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" id="password" placeholder="veuillez entrer votre mot de passe">
                </div>

                <small id="passwordError" class="error-message"></small>
            </div>

            <div id="lienIns" class="forgot">
                s'inscrire ?
            </div>

            <button type="submit" id="btnConnexion">
                connexion
            </button>

        </form>

    </div>

</div>
`;

Login.afterRender = () => {
    console.log("afterRender exécuté log");
    const form = document.querySelector('form');
    const lienIns = document.getElementById('lienIns');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputEmail = document.getElementById("email");
        const inputPassword = document.getElementById("password");

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        document.querySelectorAll(".error-message").forEach(el => {
            el.textContent = "";
        });

        document.querySelectorAll(".input-box").forEach(el => {
            el.classList.remove("error");
        });

        let hasError = false;

        if (email === "") {
            inputEmail.parentElement.classList.add("error");
            document.getElementById("emailError").textContent =
                "L'email est obligatoire";
            hasError = true;
        }

        if (password === "") {
            inputPassword.parentElement.classList.add("error");
            document.getElementById("passwordError").textContent =
                "Le mot de passe est obligatoire";
            hasError = true;
        }

        if (hasError) return;

        let userConnect = await authService.connexion( email,password);

        if (userConnect) {
            console.table(userConnect);
            navigate('/home');
        } else {
            inputEmail.parentElement.classList.add("error");
            inputPassword.parentElement.classList.add("error");

            document.getElementById("passwordError").textContent =
                "Email ou mot de passe incorrect";
        }
    });

    lienIns?.addEventListener('click', () => {
        navigate('/inscription');
    });
};

export default Login;
