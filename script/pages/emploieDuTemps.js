import Service from "../services/service.js";

const EmploieDuTemps = async () => {

    return `
        <section class="monabo-page margin padd">

            <div class="monabo-card">

                <div class="monabo-header">
                    <h2>Cette Semaine</h2>
                    <p>vous avez 5 séances</p>
                </div>

                <div class="monabo-calendar">

                    <div class="monabo-day">
                        <h4>MON</h4>

                        <div class="monabo-session">
                            <span>06:00 AM</span>
                            <h3>Iron Rise</h3>
                            <small>Coach Jax</small>
                        </div>
                    </div>

                    <div class="monabo-day">
                        <h4>TUE</h4>

                        <div class="monabo-session">
                            <span>06:00 PM</span>
                            <h3>Box & Burn</h3>
                            <small>Coach Roy</small>
                        </div>
                    </div>

                    <div class="monabo-day">
                        <h4>WED</h4>
                    </div>

                    <div class="monabo-day">
                        <h4>THU</h4>

                        <div class="monabo-session active">
                            <span>08:00 AM</span>
                            <h3>Pro Seminar</h3>
                            <small>Dr. Aris</small>
                        </div>
                    </div>

                    <div class="monabo-day">
                        <h4>FRI</h4>

                        <div class="monabo-session">
                            <span>06:00 AM</span>
                            <h3>Iron Rise</h3>
                            <small>Coach Jax</small>
                        </div>
                    </div>

                    <div class="monabo-day">
                        <h4>SAT</h4>

                        <div class="monabo-session">
                            <span>09:00 AM</span>
                            <h3>Weekend Warrior</h3>
                            <small>All staff</small>
                        </div>
                    </div>

                </div>

            </div>

            <div class="monabo-payment">

                <h2>
                    Il vous reste 20 jours avant le prochain paiement
                </h2>

                <div class="monabo-price">
                    10000 f / mois
                </div>

                <p>
                    en cas d'abandon nous ne rembourserons pas le paiement
                </p>

            </div>

            <button class="monabo-btn">
                Abandonner
            </button>

        </section>
    `;
};

export default EmploieDuTemps;