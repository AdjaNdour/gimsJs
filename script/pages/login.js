
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
            </div>

            <div class="input-group">
                <label>Mot de passe</label>

                <div class="input-box">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" id="password" placeholder="veiller entrez votre mot de pass">
                </div>
            </div>

            <div id="lienIns" class="forgot">
                s'inscrire
            </div>

            <button type="submit" id="btnConnexion">connexion</button>

        </form>

    </div>

</div>
`;

Login.afterRender = () => {
    console.log("afterRender exécuté log");
    const btnConnexion = document.getElementById('btnConnexion');
    const lienIns = document.getElementById('lienIns');

    let inputEmail = document.getElementById("email");
    let inputPassword = document.getElementById("password");

    btnConnexion?.addEventListener("click", async function (e) {
        e.preventDefault();
        let userConnect = await authService.connexion(
            inputEmail.value.trim(),
            inputPassword.value.trim()
        );
        if (userConnect) {
            console.table(userConnect);
            console.log("connexion");
            navigate('/home');
        }

    });


    lienIns?.addEventListener('click', () => {
        navigate('/inscription');
    });
};


export default Login;
