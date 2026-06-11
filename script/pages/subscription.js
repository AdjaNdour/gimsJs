
const subsSection = document.getElementById("subscription");

subsSection.innerHTML = `
            <form class="subscription-form">

                <h2>ABONNEMENT</h2>

                <input type="text" placeholder="Nom">
                <input type="email" placeholder="Email">
                <input type="tel" placeholder="Téléphone">

                <textarea placeholder="Objectif"></textarea>

                <div class="payment">

                    <div class="orange-money">
                        QR Orange Money
                    </div>

                    <div class="wave">
                        QR Wave
                    </div>

                </div>

                <button>Valider</button>

            </form>
`
