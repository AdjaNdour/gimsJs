import Service from "./service.js";

class AuthService {

    async connexion(email, password) {
        if (!email || !password) return null;

        const users = await Service.get("users");

        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!user) return null;

        localStorage.setItem("user", JSON.stringify(user));

        return user;
    }

    async inscription(nom, email, password, passwordConf) {

        if (password !== passwordConf) return null;

        const users = await Service.get("users");

        const exist = users.find(u => u.email === email);
        if (exist) return null;

        const newUser = {
            nom,
            email,
            password,
            role: "client"
        };

        const created = await Service.add("users", newUser);

        localStorage.setItem("user", JSON.stringify(created));

        return created;
    }

    deconnexion() {
        localStorage.removeItem("user");
    }

    static getUserConnect() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default AuthService;