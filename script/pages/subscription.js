import Service from "../services/service.js";


const Subscription = async () => {

      return `
     <section class="abonnement-page margin padd">

    <h1 class="abonnement-title">ABONNEMENT</h1>

    <form class="abonnement-form">

        <div class="abonnement-group">
            <h3>Email de connexion</h3>
            <input type="email" placeholder="veuillez entrer votre mail">
        </div>

        <div class="abonnement-group">
            <h3>Votre adresse</h3>
            <input type="text" placeholder="votre adresse">
        </div>

        <div class="abonnement-content">

            <div class="abonnement-objectif">
                <div class="abonnement-group">
                    <h3>Votre objectif</h3>
                    <textarea placeholder="veillez décrire vos objectifs"></textarea>
                </div>
            </div>

            <div class="abonnement-paiement">
                <h3>QR de Paiement</h3>
                <div class="abonnement-qr-container">
                    <img src="https://i.pinimg.com/736x/d7/89/ab/d789abc5c5a0398edf4b4c2e0385f69b.jpg" alt="QR Code">
                    <img src="https://i.pinimg.com/736x/d7/89/ab/d789abc5c5a0398edf4b4c2e0385f69b.jpg" alt="QR Code">
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
    
}

export default Subscription;