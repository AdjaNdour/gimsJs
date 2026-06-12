
const Intro = () => `
    <div class="">
        <h2>Bienvenue sur l'application SPA</h2>
        <p>Ceci est la page d'introduction.</p>
        <button id="goToLogin">Aller à la page Connexion</button>
    </div>
`;

Intro.afterRender = () => {
    const btn = document.getElementById('goToLogin');
    if (btn) {
        btn.addEventListener('click', () => {
            window.location.hash = '/connexion';
        });
    }
};

export default Intro;