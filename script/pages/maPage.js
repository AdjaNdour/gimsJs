import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";
const authService = new AuthService();

const MaPage = async (id) => {
    const userConnect = AuthService.getUserConnect();

    if (!userConnect) {
        return `<p>Utilisateur non connecté</p>`;
    }

    const salles = await Service.getAll("salles");
    const salle = salles.find(s=> String(s.coachId) ===String(userConnect.id));
    const gallery = (salle.images || []).slice(1).map(image => `
                                                <img src="${image}" alt="">
                                                `).join("");

    const users = await Service.getAll("users");
    const coachs = users.filter(coach => coach.role === "coach");
    const coach = coachs.find(coach => coach.id === salle.coachId);

    return `
        <section class="detail-page  margin padd">

            <h2 class="detail-coach-title">
                Coaches Near You
            </h2>

            <div class="detail-coach-card">

                <div class="detail-coach-left">
                    <img src="${coach.photo}" alt="Coach">

                    <div class="detail-coach-info">
                        <h4>${coach.nom}</h4>
                        <p>${coach.description}</p>
                    </div>
                </div>

                <div class="detail-coach-price">
                    <span>$85/hr</span>
                    <small>⭐ 5.0</small>
                </div>

            </div>

        
            <div class="detail-gym-info bgcp">

                <div class="detail-title-row  ">
                    <h1 class="detail-gym-name">
                        ${salle.nom} - ${salle.adresse}📍
                    </h1>

                    <button class="edit-btn" data-field="nom">Modifier</button>
                </div>                         

                <div class="detail-gym-price">
                     ${salle.prix} FCFA / mois
                </div>

                <button class="detail-subscribe-btn" data-id="${salle.id}">
                    page d'abonnement
                </button>

            </div>
            <div class="detail-coach-card">
                <div class="detail-coach-left">
                    <div class="detail-coach-info">
                        <h2> Equipements</h2>
                        <p> ${salle.equipements} </p>
                    </div>
                </div>
            </div>
        
            <div class="detail-description">
                <div class="detail-title-row">
                    <h3>Description</h3>
                    <button class="edit-btn" data-field="description">Modifier</button>
                </div>
                <p>${salle.description}</p>
            </div>

            <div class="bgcp"> 
                <div class="detail-title-row ">
                    <h2>Featured Gym</h2>
                    <button class="edit-btn" data-field="gallery">Modifier</button>
                </div>

                <div class="detail-gallery">
                    <img src="${salle.images[0]}" alt="">
                </div>    
                <div class="detail-box-image"> 
                        ${gallery} 
                </div>
            </div>

        </section>
    `;
};

MaPage.afterRender = () => {

    const buttons = document.querySelectorAll(".edit-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            const field = btn.dataset.field;

            if (field === "nom") {
                const newValue = prompt("Modifier le nom de la salle");
                console.log("nouveau nom:", newValue);
            }

            if (field === "description") {
                const newValue = prompt("Modifier la description");
                console.log("nouvelle description:", newValue);
            }

            if (field === "gallery") {
                const newValue = prompt("Ajouter une image (URL)");
                console.log("nouvelle image:", newValue);
            }

        });
    });

    let subscribe = document.querySelector(".detail-subscribe-btn");
    subscribe.addEventListener("click", () => {
        const id = subscribe.dataset.id;
        location.hash = `subscription/${id}`;
    });

};
export default MaPage;