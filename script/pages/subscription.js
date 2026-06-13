import Service from "../services/service.js";

const Subscription = async (salleId) => {

    const salle = Service.get("salles", salleId);

    const qrWave = `scan.html?type=wave&salleId=${salleId}`;
    const qrOrange = `scan.html?type=orange&salleId=${salleId}`;

    return `
     <section class="abonnement-page margin padd">

    <h1 class="abonnement-title">ABONNEMENT</h1>

    <form class="abonnement-form">

        <div class="abonnement-group">
            <h3>Votre adresse</h3>
            <input id="adresse" type="text" placeholder="votre adresse">
        </div>

        <div class="abonnement-content">

            <div class="abonnement-objectif">
                <div class="abonnement-group">
                    <h3>Votre objectif</h3>
                    <textarea id="objectif" placeholder="veillez décrire vos objectifs"></textarea>
                </div>
            </div>

            <div class="abonnement-paiement">
                <h3>QR de Paiement</h3>
                <div class="abonnement-qr-container">
                    <div id="qrWave"></div>
                    <div id="qrOrange"></div>
                </div>

            </div>

        </div>

        <div class="abonnement-salle">
            <h2>Zenith Wellness</h2>
            <div class="abonnement-prix">
                📍 10000 f / mois
            </div>
        </div>

        <button class="abonnement-btn">
            Valider
        </button>

    </form>

</section>    
    `;
}

Subscription.afterRender = () => {

    const baseUrl = "http://172.20.10.6:5500";

    const hash = window.location.hash.replace("#", "");
    const parts = hash.split("/");

    const salleId = parts[1];

    console.log("HASH =", hash);
    console.log("Salle ID =", salleId);

    if (!salleId) {
        console.error("Salle ID manquant dans le router !");
        return;
    }

    const waveEl = document.getElementById("qrWave");
    const orangeEl = document.getElementById("qrOrange");

    if (!waveEl || !orangeEl) return;

    waveEl.innerHTML = "";
    orangeEl.innerHTML = "";

    new QRCode(waveEl, {
        text: `${baseUrl}/scan.html?salleId=${salleId}`,
        width: 150,
        height: 150
    });

    new QRCode(orangeEl, {
        text: `${baseUrl}/scan.html?salleId=${salleId}`,
        width: 150,
        height: 150
    });

    const form = document.querySelector(".abonnement-form");
    const inputAdresse = document.getElementById("adresse");
    const inputObjectif = document.getElementById("objectif");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const adresse = inputAdresse.value.trim();
        const objectif = inputObjectif.value.trim();

        if (adresse === "" || objectif === "") {
            if (adresse === "") inputAdresse.style.border = "2px solid red";
            if (objectif === "") inputObjectif.style.border = "2px solid red";
            return;
        }

        inputAdresse.style.border = "1px solid #ddd";
        inputObjectif.style.border = "1px solid #ddd";

        
    });

};
export default Subscription;