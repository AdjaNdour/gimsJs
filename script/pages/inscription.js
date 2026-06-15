import { navigate } from '../router.js';
import AuthService from "../services/auth.services.js";

const authService = new AuthService();

const Inscription = () => `  
        
        <section id="inscription" class="page active"> 

            <div class="inscription-page">

                <div class="brand">
                    <h1 class="orange mt-30">Gim's Finder</h1>
                    <p>Pro Member</p>
                </div>

                <!-- Formulaire -->
                <div class="inscription-card">

                    <h2 class="orange">Créer un compte</h2>

                    <form id="inscriptionForm">

                        <div class="input-group">
                            <label>Url Photo</label>

                            <div class="input-box">
                                <i class="fa-regular fa-user"></i>
                                <input type="text" id="photo" placeholder="url photo">
                            </div>

                            <small id="photoError" class="error-message"></small>
                        </div>

                        <div class="input-group">
                            <label>Nom</label>

                            <div class="input-box">
                                <i class="fa-regular fa-user"></i>
                                <input type="text" id="nom" placeholder="veuillez entrer votre nom">
                            </div>

                            <small id="nomError" class="error-message"></small>
                        </div>

                        <div class="input-group">
                            <label>Email ou Login</label>

                            <div class="input-box">
                                <i class="fa-regular fa-envelope"></i>
                                <input type="email" id="emailIns" placeholder="veuillez entrer votre mail">
                            </div>

                            <small id="emailError" class="error-message"></small>
                        </div>

                        <div class="input-group">
                            <label>Mot de passe</label>

                            <div class="input-box">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="passwordIns" placeholder="veuillez entrer votre mot de passe">
                            </div>

                            <small id="passwordError" class="error-message"></small>
                        </div>

                        <div class="input-group">
                            <label>Confirmation mot de passe</label>

                            <div class="input-box">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="passwordInsConf" placeholder="confirmez votre mot de passe">
                            </div>

                            <small id="passwordConfError" class="error-message"></small>
                        </div>

                        <button type="submit" id="btnInscription">
                            S'inscrire
                        </button>

                    </form>

                </div>

            </div>
        </section>
`;


Inscription.afterRender = () => {
    console.log("INSCRIPTION AFTER RENDER OK");
    const form = document.querySelector('form');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputPhoto = document.getElementById("photo");
        const inputNom = document.getElementById("nom");
        const inputInsPassword = document.getElementById("passwordIns");
        const inputInsPasswordConf = document.getElementById("passwordInsConf");
        const inputInsEmail = document.getElementById("emailIns");

        const photo = inputPhoto.value.trim();
        const nom = inputNom.value.trim();
        const pass = inputInsPassword.value.trim();
        const passConf = inputInsPasswordConf.value.trim();
        const email = inputInsEmail.value.trim();

        document.querySelectorAll(".error-message").forEach(el => {
            el.textContent = "";
        });

        document.querySelectorAll(".input-box").forEach(el => {
            el.classList.remove("error");
        });

        let hasError = false;

        if (nom === "") {
            inputNom.parentElement.classList.add("error");
            document.getElementById("nomError").textContent =
                "Le nom est obligatoire";
            hasError = true;
        }

        if (email === "") {
            inputInsEmail.parentElement.classList.add("error");
            document.getElementById("emailError").textContent =
                "L'email est obligatoire";
            hasError = true;
        }

        if (pass === "") {
            inputInsPassword.parentElement.classList.add("error");
            document.getElementById("passwordError").textContent =
                "Le mot de passe est obligatoire";
            hasError = true;
        }

        if (passConf === "") {
            inputInsPasswordConf.parentElement.classList.add("error");
            document.getElementById("passwordConfError").textContent =
                "La confirmation est obligatoire";
            hasError = true;
        }

        if (pass !== "" && passConf !== "" && pass !== passConf) {
            inputInsPassword.parentElement.classList.add("error");
            inputInsPasswordConf.parentElement.classList.add("error");

            document.getElementById("passwordConfError").textContent =
                "Les mots de passe ne correspondent pas";

            hasError = true;
        }

        if (hasError) return;

        const user = await authService.inscription(
            nom,
            photo,
            email,
            pass,
            passConf
        );

        if (user) {
            navigate('/home');
        }
    });
};
export default Inscription;