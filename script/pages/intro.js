const Intro = () => `
<section id="intro" class="page active">

    <div class="intro-page">

        <!-- LEFT: Branding -->
        <div class="intro-left">

            <h1 class="logo">Gim’s Finder</h1>

            <p class="tagline">
                Trouvez la salle de sport parfaite, gérez vos entraînements et atteignez vos objectifs plus rapidement.
            </p>

            <button id="goToLogin" class="primary-btn">
                Commencer
            </button>

        </div>

        <!-- RIGHT: Description card -->
        <div class="intro-right">

            <div class="card">

                <h2 class ="orange">Pourquoi Gim’s Finder ?</h2>

                <p>
                    Une application moderne qui vous aide à découvrir, comparer et gérer facilement des salles de sport adaptées à votre style de vie.
                </p>

                <ul>
                    <li>Trouvez des salles proches de vous</li>
                    <li>Comparez équipements et offres</li>
                    <li>Organisez vos séances</li>
                    <li>Gérez votre profil</li>
                    <li>Abonnements adaptés à votre budget</li>
                </ul>

            </div>

        </div>

    </div>

</section>
`;

Intro.afterRender = () => {
    const btn = document.getElementById('goToLogin');

    btn?.addEventListener('click', () => {
        window.location.hash = '/connexion';
    });
};

export default Intro;