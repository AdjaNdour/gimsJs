import Service from "../services/service.js";

const homeSection = document.getElementById("home");
homeSection.classList.add("active");

async function loadSalles() {
    const tableauSalle = await Service.getAll("salles");

    homeSection.innerHTML = `
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
    `;

    tableauSalle.forEach(salle => {
        homeSection.innerHTML += `
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
        `;
    });
}

loadSalles();