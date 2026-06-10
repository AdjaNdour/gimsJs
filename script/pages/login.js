
const loginSection = document.getElementById("login");

loginSection.innerHTML = `
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