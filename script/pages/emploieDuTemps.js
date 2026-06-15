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
        const j = p.jour.toLowerCase();
        if (jours[j]) jours[j].push(p);
    });

    const dayCard = (label, sessions) => `
        <div class="monabo-day">
            <h4>${label}</h4>

            ${sessions.length > 0 ? sessions.map(s => `
                <div class="monabo-session">
                    <span>${s.heure}</span>
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
                    ${dayCard("MON", jours.lundi)}
                    ${dayCard("TUE", jours.mardi)}
                    ${dayCard("WED", jours.mercredi)}
                    ${dayCard("THU", jours.jeudi)}
                    ${dayCard("FRI", jours.vendredi)}
                    ${dayCard("SAT", jours.samedi)}
                    ${dayCard("SUN", jours.dimanche)}
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

export default EmploieDuTemps;