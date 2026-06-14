import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";

let coach = null;
let salle = null;

const MesClients = async () => {

    const coachConnect = AuthService.getUserConnect();
    if (!coachConnect) return `<p>Utilisateur non connecté</p>`;

    const users = await Service.getAll("users");
    const salles = await Service.getAll("salles");
    const abonnements = await Service.getAll("abonnements");

    salle = salles.find(s => String(s.coachId) === String(coachConnect.id));

    if (!salle) return `<p>Aucune salle trouvée</p>`;

    const mesAbos = abonnements.filter(a => String(a.salleId) === String(salle.id));

    const mesClients = mesAbos.map(abo => {
        const client = users.find(u => String(u.id) === String(abo.clientId));
        return { ...abo, client };
    });

    const html = mesClients.map(a => {

        if (!a.client) return "";

        return `
            <article class="list-card">

                <div class="list-left">
                    <img src="${a.client.photo || ""}">
                    <div class="list-info">
                        <h3>${a.client.nom}</h3>
                        <p>${a.client.email}</p>
                    </div>
                </div>

                <div class="list-right">

                    <span class="list-days" data-id="${a.id}">
                        ${a.days || 15} jours restants
                    </span>

                    <button class="btn-edit-abo" data-id="${a.id}">
                        Modifier abo
                    </button>

                    <button class="btn-delete-abo" data-id="${a.id}">
                        Abandon
                    </button>

                </div>

            </article>
        `;
    }).join("");

    return `
        <section class="page active margin padd">

            <h2>Mes Clients</h2>

            <div class="list-container">
                ${mesClients.length ? html : "<p>Aucun client</p>"}
            </div>

        </section>
    `;
};

async function updateAbonnement(id, data) {

    const abonnements = await Service.getAll("abonnements");
    const index = abonnements.findIndex(a => String(a.id) === String(id));

    if (index === -1) return;

    const updated = { ...abonnements[index], ...data };

    await fetch(`http://localhost:3000/abonnements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });
}

async function deleteAbonnement(id) {

    await fetch(`http://localhost:3000/abonnements/${id}`, {
        method: "DELETE"
    });
}

MesClients.afterRender = () => {

    document.querySelectorAll(".btn-edit-abo").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = btn.dataset.id;
            const el = btn.closest(".list-card").querySelector(".list-days");

            const oldValue = el.textContent.replace("jours restants", "").trim();

            const input = document.createElement("input");
            input.className = "edit-input";
            input.value = oldValue;

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.className = "btn-save";

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Annuler";
            cancelBtn.className = "btn-cancel";

            const div = document.createElement("div");
            div.append(input, saveBtn, cancelBtn);

            el.replaceWith(div);

            saveBtn.addEventListener("click", async () => {

                await updateAbonnement(id, {
                    days: input.value
                });

                location.reload();
            });

            cancelBtn.addEventListener("click", () => {
                location.reload();
            });
        });
    });

    document.querySelectorAll(".btn-delete-abo").forEach(btn => {

        btn.addEventListener("click", async () => {

            const id = btn.dataset.id;

            const confirmDelete = confirm("Voulez-vous vraiment supprimer cet abonnement ?");
            if (!confirmDelete) return;

            await deleteAbonnement(id);

            location.reload();
        });
    });
};

export default MesClients;