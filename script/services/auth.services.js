import Service from "./service.js";

class AuthService {

    async connexion(email, password) {

        if (!email || !password) return null;

        const users = await Service.get("users");
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!user) return null;

        AuthService.currentUser = user;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }

    async inscription(nom, photo, email, password, passwordConf) {
        if (password !== passwordConf) return null;

        const users = await Service.get("users");
        const exist = users.find(u => u.email === email);
        if (exist) return null;

        const newUser = {
            nom,
            photo: photo || "https://i.pinimg.com/1200x/49/0b/61/490b61c0d93920841527e4d4f7aee5fa.jpg",
            email,
            password,
            role: "client"
        };

        const createdUser = await Service.add("users", newUser);
        localStorage.setItem("user", JSON.stringify(createdUser));
        AuthService.currentUser = createdUser;
        return createdUser;
    }

    static currentUser = null;

    static init() {
        const user = localStorage.getItem("user");
        if (user) {
            AuthService.currentUser = JSON.parse(user);
        }
    }

    static getUserConnect() {
        if (!AuthService.currentUser) {
            const user = localStorage.getItem("user");
            if (user) {
                AuthService.currentUser = JSON.parse(user);
            }
        }
        return AuthService.currentUser;
    }

    deconnexion() {
        AuthService.currentUser = null;
        localStorage.removeItem("user");
    }
}

export default AuthService;