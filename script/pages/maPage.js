import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";

let salleData = null;
let salleId = null;

const MaPage = async () => {
    const userConnect = AuthService.getUserConnect();
    if (!userConnect) return `<p>Utilisateur non connecté</p>`;

    const salles = await Service.getAll("salles");
    salleData = salles.find(s => String(s.coachId) === String(userConnect.id));

    if (!salleData) return `<p>Aucune salle trouvée</p>`;

    salleId = salleData.id;

    const gallery = (salleData.images || []).slice(1).map(img => `
        <img src="${img}" alt="">
    `).join("");

    const users = await Service.getAll("users");
    const coach = users.find(u => String(u.id) === String(salleData.coachId));

    return `
        <section class="detail-page margin padd">

            <h2 class="detail-coach-title">Coaches Near You</h2>

            <div class="detail-coach-card">
                <div class="detail-coach-left">
                    <img src="${coach?.photo || ''}" />
                    <div class="detail-coach-info">
                        <h4>${coach?.nom || ''}</h4>
                        <p>${coach?.description || ''}</p>
                    </div>
                </div>
            </div>

            <div class="detail-gym-info bgcp">
                <div class="detail-title-row">
                    <h1 class="detail-gym-name">
                        ${salleData.nom} - ${salleData.adresse}
                    </h1>
                    <button class="edit-btn" data-field="nom">Modifier</button>
                </div>

                <div class="detail-gym-price">
                    ${salleData.prix} FCFA / mois
                </div>

                <button class="detail-subscribe-btn" data-id="${salleData.id}">
                    page d'abonnement
                </button>
            </div>

            <div class="bgcp">
                <div class="detail-title-row">
                    <h2>Equipements</h2>
                    <button class="edit-btn" data-field="equipements">Modifier</button>
                </div>
                <p class="equipements-text">
                    ${(salleData.equipements || []).join(", ")}
                </p>
            </div>

            <div class="detail-description">
                <div class="detail-title-row">
                    <h3>Description</h3>
                    <button class="edit-btn" data-field="description">Modifier</button>
                </div>
                <p class="description-text">
                    ${salleData.description}
                </p>
            </div>

            <div class="bgcp">
                <div class="detail-title-row">
                    <h2>Featured Gym</h2>
                    <button class="edit-btn" data-field="gallery">Modifier</button>
                </div>

                <div class="detail-gallery">
                    <img src="${salleData.images?.[0] || ''}" />
                </div>

                <div class="detail-box-image">
                    ${gallery}
                </div>
            </div>

        </section>
    `;
};


async function updateSalle(partialData) {
    const salles = await Service.getAll("salles");
    const index = salles.findIndex(s => String(s.id) === String(salleId));

    if (index === -1) return;

    const updated = { ...salles[index], ...partialData };

    await fetch(`http://localhost:3000/salles/${salleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });

    salles[index] = updated;
}

function modification({ selector, getValue, save }) {

    const el = document.querySelector(selector);

    el.addEventListener("click", () => {

        const target = getValue();
        const oldValue = target.textContent;

        const div = document.createElement("div");

        const input = document.createElement(target.tagName === "P" ? "textarea" : "input");
        input.value = oldValue;
        input.className = target.tagName === "P" ? "edit-textarea" : "edit-input";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.className = "btn-save";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Annuler";
        cancelBtn.className = "btn-cancel";

        div.appendChild(input);
        div.appendChild(saveBtn);
        div.appendChild(cancelBtn);

        target.replaceWith(div);
        input.focus();

        saveBtn.addEventListener("click", async () => {
            await save(input.value);
            location.reload();
        });

        cancelBtn.addEventListener("click", () => {
            location.reload();
        });
    });
}

MaPage.afterRender = () => {

    if (!salleData) return;

    modification({
        selector: "[data-field='nom']",
        getValue: () => document.querySelector(".detail-gym-name"),
        save: (value) => updateSalle({ nom: value })
    });

    modification({
        selector: "[data-field='description']",
        getValue: () => document.querySelector(".description-text"),
        save: (value) => updateSalle({ description: value })
    });

    modification({
        selector: "[data-field='equipements']",
        getValue: () => document.querySelector(".equipements-text"),
        save: (value) => updateSalle({ equipements: value.split(",").map(e => e.trim())})
    });

    document.querySelector("[data-field='gallery']").addEventListener("click", async () => {
        const url = prompt("URL image ?");
        if (!url) return;

        await updateSalle({
            images: [...(salleData.images || []), url]
        });

        location.reload();
    });

    document.querySelector(".detail-subscribe-btn").addEventListener("click", (e) => {
        location.hash = `subscription/${e.target.dataset.id}`;
    });
};

export default MaPage;