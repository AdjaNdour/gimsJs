import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";

const MesClients = async () => {

    const coachConnect = AuthService.getUserConnect();

    if (!coachConnect) {
        return `
            <section class="page active margin padd">
                <p>Utilisateur non connecté</p>
            </section>
        `;
    }

    const users = await Service.getAll("users");
    const salles = await Service.getAll("salles");
    const abonnements = await Service.getAll("abonnements");

    const salle = salles.find(s => String(s.coachId) === String(coachConnect.id));

    if (!salle) {
        return `
            <section class="page active margin padd">
                <p>Aucune salle trouvée pour ce coach.</p>
            </section>
        `;
    }

    const mesAbonnements = abonnements.filter(abo => String(abo.salleId) === String(salle.id));

    const mesClients = mesAbonnements.map(abo => {
        const client = users.find(user => String(user.id) === String(abo.clientId));
        return { ...abo, client };
    });

    const clientsHTML = mesClients.map(abonnement => {

        const client = abonnement.client;
        if (!client) return "";
        return `
            <article class="list-card">

                <div class="list-left">

                    <img src="${client.photo || ""}" alt="${client.nom}">

                    <div class="list-info">
                        <h3>${client.nom || "Client"}</h3>
                        <p>${client.email || ""}</p>
                    </div>

                </div>

                <div class="list-right">

                    <span class="list-days">
                        15 jours restants
                    </span>

                    <button
                        class="list-edit-btn"
                        data-id="${abonnement.id}"
                    >
                        Modifier
                    </button>

                    <button
                        class="list-cancel-btn"
                        data-id="${abonnement.id}"
                    >
                        Abandon
                    </button>

                </div>

            </article>
        `;

    }).join("");

    return `
        <section id="myList" class="page active margin padd">
            <div class="home-search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search" placeholder="Search coaches, gyms, or sports...">
            </div>
            <div class="list-section-title">
                <h2>Mes Clients</h2>
            </div>
            <div class="list-container">
                ${mesClients.length > 0 ? clientsHTML : `<p>Aucun client abonné à votre salle.</p>`}
            </div>

        </section>
    `;
};

MesClients.afterRender = () => {

    const input = document.querySelector("#search");

    if (!input) return;

    input.addEventListener("input", () => {

        const searchTerm = input.value.toLowerCase();

        const cards = document.querySelectorAll(".list-card");

        cards.forEach(card => {

            const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const email = card.querySelector("p")?.textContent.toLowerCase() || "";

            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });

    });
};

export default MesClients;