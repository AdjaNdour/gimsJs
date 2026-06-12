import Service from "../services/service.js";

const Home = async () => {

    const salles = await Service.getAll("salles");

    const sallesHTML = salles.map(salle => `
        <article class="gym-card">
            <div class="card-content">
                <div class="left">
                    <img src="${salle.photoPrincipal}" alt="Gym">
                    <h3>${salle.nom}</h3>
                    <span>${salle.prix} / mois</span>
                </div>

                <div class="right">
                    <h3>Description</h3>
                    <p>${salle.description}</p>
                </div>
            </div>

            <button class="membership-btn jcc">
                Explore Membership
            </button>
        </article>
    `).join("");

    return `
        <section id="home" class="page active">

            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search coaches, gyms, or sports...">
            </div>

            <div class="filters">
                <button class="active">
                    <i class="fa-solid fa-location-arrow"></i>
                    Near Me
                </button>

                <button>Yoga</button>
                <button>HIIT</button>
                <button>Boxing</button>
                <button>Pilates</button>
            </div>

            <div class="section-title">
                <h2>Featured Gym</h2>
                <a href="#">See all</a>
            </div>

            ${sallesHTML}

        </section>
    `;
};


Home.afterRender = () => {
    

};


export default Home;
