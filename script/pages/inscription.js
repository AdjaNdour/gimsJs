import { navigate } from '../router.js';
import AuthService from "../services/auth.services.js";
const authService = new AuthService();

const Inscription = () => `  <section id="inscription" class="page "> 

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
                            <label>url Photo</label>

                            <div class="input-box">
                                <i class="fa-regular fa-user"></i>
                                <input type="text" id="photo" placeholder="url photo">
                            </div>
                        </div>

                        <div class="input-group">
                            <label>Nom</label>

                            <div class="input-box">
                                <i class="fa-regular fa-user"></i>
                                <input type="text" id="nom" placeholder="veuillez entrer votre nom">
                            </div>
                        </div>

                        <div class="input-group">
                            <label>Email ou Login</label>

                            <div class="input-box">
                                <i class="fa-regular fa-envelope"></i>
                                <input type="email" id="emailIns" placeholder="veuillez entrer votre mail">
                            </div>
                        </div>

                        <div class="input-group">
                            <label>Mot de passe</label>

                            <div class="input-box">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="passwordIns" placeholder="veuillez entrer votre mot de passe">
                            </div>
                        </div>
                    
                        <div class="input-group">
                            <label>Mot de passe</label>

                            <div class="input-box">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="passwordInsConf" placeholder="veuillez entrer votre mot de passe">
                            </div>
                        </div>

                        <button type="submit" id="btnInscription">s'inscrire</button>

                    </form>

                </div>

            </div>
        </section>
`;

Inscription.afterRender = () => {
    console.log("afterRender exécuté");

    const btnSinscrire = document.getElementById('btnInscription');
    
    let inputPhoto = document.getElementById("photo");
    let inputNom = document.getElementById("nom");
    let inputInsPassword = document.getElementById("passwordIns");
    let inputInsPasswordConf = document.getElementById("passwordInsConf");
    let inputInsEmail = document.getElementById("emailIns");

    btnSinscrire?.addEventListener("click", async function (e) {
        e.preventDefault();
        let user = await authService.inscription(
            inputNom.value.trim(),
            inputPhoto.value.trim(),
            inputInsEmail.value.trim(),
            inputInsPassword.value.trim(),
            inputInsPasswordConf.value.trim()
        );
        if (user) {
            console.log("inscrition");
            navigate('/home');
        }
    });
};

export default Inscription;