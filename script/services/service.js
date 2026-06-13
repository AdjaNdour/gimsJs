const API_URL = "http://localhost:3000";

class Service {

    static async get(endpoint) {
        const res = await fetch(`${API_URL}/${endpoint}`);
        return await res.json();
    }

    static async getById(endpoint, id) {
        const res = await fetch(`${API_URL}/${endpoint}/${id}`);
        if (!res.ok) {
            throw new Error("Ressource introuvable");
        }
        return await res.json();
    }

    static async getAll(endpoint) {
        try {
            const res = await fetch(`${API_URL}/${endpoint}`);
            if (!res.ok) {
                throw new Error(`Erreur HTTP: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error("Erreur API:", error);
            return null;
        }
    }

    static async add(endpoint, data) {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
}

export default Service;