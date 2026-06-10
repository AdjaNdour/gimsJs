import Service from "./service.js";

class AuthService {

    showAcceuil(login, inscription, sidebar, pageHome, main) {
        login.classList.remove("active");
        inscription.classList.remove("active");
        sidebar.classList.add("active");
        pageHome.classList.add("active");
        main.classList.add("padd");
    }

    showAcceuilAfterIns(inscription, sidebar, pageHome, main) {
        inscription.classList.remove("active");
        sidebar.classList.add("active");
        pageHome.classList.add("active");
        main.classList.add("padd");
    }

    showInscription(login, inscription, sidebar, pageHome, main) {
        login.classList.remove("active");
        inscription.classList.add("active");
        sidebar.classList.remove("active");
        pageHome.classList.remove("active");
        main.classList.remove("padd");
    }

    connexionPage(login, sidebar, pageHome, main, inputEmail, inputPassword) {
        login.classList.add("active");
        sidebar.classList.remove("active");
        pageHome.classList.remove("active");
        main.classList.remove("padd");
        inputEmail.value = "";
        inputPassword.value = "";
    }
    inscriptionPage(login, sidebar, pageHome, main, inscription) {
        login.classList.remove("active");
        inscription.classList.add("active");
        sidebar.classList.remove("active");
        pageHome.classList.remove("active");
        main.classList.remove("padd");
    }

    connexion(email, password, login, inscription, sidebar, pageHome, main) {

        if (!email || !password) {
            alert("entrer les champs");
            return;
        }

        let users = Service.get("users") || [];

        let user = users.find(c =>
            c.email.trim().toLowerCase() === email.toLowerCase() &&
            c.password.trim() === password
        );

        if (!user) {
            alert("Email ou mot de passe incorrect.");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        this.showAcceuil(login, inscription, sidebar, pageHome, main);
    }

    inscription(nom, email, password, passwordConf, login, sidebar, pageHome, main, inscription) {
        
        let users = Service.get("users") || [];
        let existingUser = users.find(
            user => user.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        if (existingUser) {
            alert("Cet email est déjà utilisé.");
            return;
        }
        if (password !== passwordConf) {
            alert("les mot de pass ne correspondent pas.");
            return;
        }

        let newUser = {
            id: Date.now(),
            nom,
            email,
            password,
            role: "client"
        };

        users.push(newUser);
        Service.save("users", users);
        console.log("ce que jai creer:", users);
        localStorage.setItem("user", JSON.stringify(newUser));
        this.showAcceuilAfterIns(inscription, sidebar, pageHome, main);
    }

    deconnexion(login, sidebar, pageHome, main, inputEmail, inputPassword) {
        localStorage.removeItem("user");
        this.connexionPage(login, sidebar, pageHome, main, inputEmail, inputPassword);
    }
}

export default AuthService;