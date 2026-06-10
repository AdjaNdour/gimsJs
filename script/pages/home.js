const homeSection = document.getElementById("home");

homeSection.classList.add("active");

homeSection.innerHTML = `
    <!-- Recherche -->
    <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search coaches, gyms, or sports...">
    </div>

    <!-- Filtres -->
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

    <!-- Titre -->
    <div class="section-title">
        <h2>Featured Gym</h2>
        <a href="#">See all</a>
    </div>

    <!-- Carte salle -->
    <article class="gym-card">

        <div class="card-content">

            <div class="left">

                <img src="https://i.pinimg.com/1200x/40/e6/c5/40e6c5f5681473f4914d7a5b98245cdd.jpg" alt="Gym">

                <h3>Zenith Wellness</h3>

                <span>10000 f / mois</span>

            </div>

            <div class="right">

                <h3>Description</h3>

                <p>
                    Découvrez kay trun, une salle de sport moderne de 100 m²
                    conçue pour tous les niveaux, du débutant à l'athlète confirmé.
                    Notre espace se distingue par une zone de musculation équipée
                    de matériel professionnel et un vaste plateau cardio avec vue
                    panoramique.
                </p>

            </div>

        </div>

        <button class="membership-btn jcc">
            Explore Membership
        </button>

    </article>
`;