import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";

const EmploieDuTemps = async () => {

    const user = AuthService.getUserConnect();
    if (!user) return `<p>Non connecté</p>`;

    const abonnements = await Service.getAll("abonnements");
    const emplois = await Service.getAll("emploisDuTemps");

    const monAbonnement = abonnements.find(a =>
        String(a.clientId) === String(user.id) &&
        a.statut === "actif"
    );

    if (!monAbonnement) {
        return `<p>Aucun abonnement actif</p>`;
    }

    const monPlanning = emplois.filter(e =>
        String(e.abonnementId) === String(monAbonnement.id)
    );

    const jours = {
        lundi: [],
        mardi: [],
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: []
    };

    monPlanning.forEach(p => {
        p.jour.forEach(jour => {
            const j = jour.toLowerCase();
            if (jours[j]) {
                jours[j].push(p);
            }
        });
    });

    const dayCard = (label, sessions) => `
        <div class="monabo-day">
            
            <button class="monabo-day-header" data-jour="${label.toLowerCase()}">
                <h4>+${label}</h4>
            </button>

            ${sessions.length > 0 ? sessions.map(s => `
                <div class="monabo-session">
                    <span> rv </span>
                    <h3>${s.activite}</h3>
                    <small>Coach</small>
                </div>
            `).join("") : ""}
            
        </div>
    `;

    return `
        <section class="monabo-page margin padd">

            <div class="monabo-card">

                <div class="monabo-header">
                    <h2>Cette Semaine</h2>
                    <p>vous avez ${monPlanning.length} séances</p>
                </div>

                <div class="monabo-calendar">
                    ${dayCard("Lundi", jours.lundi)}
                    ${dayCard("Mardi", jours.mardi)}
                    ${dayCard("Mercredi", jours.mercredi)}
                    ${dayCard("Jeudi", jours.jeudi)}
                    ${dayCard("vendredi", jours.vendredi)}
                    ${dayCard("Samedi", jours.samedi)}
                    <div class="monabo-day">          
                        <button >
                            <h4>Dimanche</h4>
                        </button>        
                    </div>
                </div>
            </div>

            <div class="detail-t1">
                Il vous reste 15 jours avant le prochain paiement 
            </div>
            <div class="detail-t2">
                10000 FCFA / mois 
            </div>
            <div class="detail-t3">
                En cas d'abandon nous ne rembourseront pas le paiement
            </div>

        </section>
    `;
};


EmploieDuTemps.afterRender = () => {

    const boutons = document.querySelectorAll(".monabo-day-header");

    boutons.forEach(btn => {

        btn.addEventListener("click", async () => {

            const user = AuthService.getUserConnect();

            const abonnements = await Service.getAll("abonnements");

            const monAbonnement = abonnements.find(
                a =>
                    String(a.clientId) === String(user.id) &&
                    a.statut === "actif"
            );

            if (!monAbonnement) return;

            const jour = btn.dataset.jour.toLowerCase();

            const emplois = await Service.getAll("emploisDuTemps");

            let edt = emplois.find(
                e =>
                    String(e.abonnementId) ===
                    String(monAbonnement.id)
            );

            // Création si inexistant
            if (!edt) {

                edt = {
                    abonnementId: monAbonnement.id,
                    jour: [],
                    activite: "Non définie"
                };

                edt = await Service.add("emploisDuTemps", edt);
            }

            // Ajout du jour
            if (!edt.jour.includes(jour)) {

                edt.jour.push(jour);

                await Service.update(
                    "emploisDuTemps",
                    edt.id,
                    edt
                );
            }

            console.log("Jour ajouté :", jour);
        });

    });

};


export default EmploieDuTemps;