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

    async inscription(nom, photo, email, password, passwordConf) {
        if (password !== passwordConf) return null;
        const users = await Service.get("users");
        const exist = users.find(u => u.email === email);
        if (exist) return null;
        const newUser = {
            nom,
            photo: "https://i.pinimg.com/736x/d7/89/ab/d789abc5c5a0398edf4b4c2e0385f69b.jpg",
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
        console.log(localStorage.getItem("user"));
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default AuthService;