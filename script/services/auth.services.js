import Service from "./service.js";

class AuthService {

    connexion(email, password) {
        
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
    }

    inscription(nom, email, password, passwordConf) {

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
    }

    deconnexion() {
        localStorage.removeItem("user");
    }
}

export default AuthService;