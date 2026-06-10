class Service {

    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Erreur save localStorage:", e);
        }
    }

    static get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Erreur get localStorage:", e);
            return [];
        }
    }

    static add(key, item) {
        const data = Service.get(key);

        if (!Array.isArray(data)) {
            console.warn(`La clé "${key}" n'est pas un tableau, reset automatique.`);
            Service.save(key, []);
            return Service.add(key, item);
        }

        data.push(item);
        Service.save(key, data);
    }

    static clear(key) {
        localStorage.removeItem(key);
    }

    static exists(key) {
        return localStorage.getItem(key) !== null;
    }
}

export default Service;