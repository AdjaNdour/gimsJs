const inscriptionSection = document.getElementById("inscription");

inscriptionSection.classList.add("active");

inscriptionSection.innerHTML = `
    <div class="inscription-page">

        <!-- Logo -->
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
`;