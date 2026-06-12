import Service from "../services/service.js";

const Home = async () => {

    const salles = await Service.getAll("salles");

    const sallesHTML = salles.map(salle => `
        <article class="home-gym-card">

            <div class="home-card-content">

                <div class="home-left">
                    <img src="${salle.photoPrincipal}" alt="Gym">
                    <h3>${salle.nom}</h3>
                    <span>${salle.prix} / mois</span>
                </div>

                <div class="home-right">
                    <h3>Description</h3>
                    <p>${salle.description}</p>
                </div>

            </div>

            <button class="home-membership-btn">
                Explore Membership
            </button>

        </article>
    `).join("");

    return `
        <section id="home" class="page active home-margin home-padd">

            <div class="home-search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search coaches, gyms, or sports...">
            </div>

            <div class="home-filters">

                <button class="home-active">
                    <i class="fa-solid fa-location-arrow"></i>
                    Near Me
                </button>

                <button>Yoga</button>
                <button>HIIT</button>
                <button>Boxing</button>
                <button>Pilates</button>

            </div>

            <div class="home-section-title">
                <h2>Featured Gym</h2>
                <a href="#">See all</a>
            </div>

            ${sallesHTML}

        </section>
    `;
};

Home.afterRender = () => {};

export default Home;