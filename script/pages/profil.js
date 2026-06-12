import AuthService from "../services/auth.services.js";


const Profile = () => {

    const user = AuthService.getUserConnect();

    return `
    <section id="profile" class="page active padd">

        <div class="profile-container">

            <!-- HEADER -->
            <div class="profile-header">

                <img 
                    src="${user?.photo || 'https://via.placeholder.com/150'}" 
                    alt="profile"
                >

                <div class="profile-info">

                    <h2>${user?.nom || "Utilisateur"}</h2>
                    <p>${user?.email || ""}</p>

                    <button class="profile-edit-btn">
                        Modifier le profil
                    </button>

                </div>

            </div>

            <!-- STATS -->
            <div class="profile-stats">

                <div class="profile-stat">
                    <h3>Abonnement</h3>
                    <p>${user?.abonnement || "Basic"}</p>
                </div>

                <div class="profile-stat">
                    <h3>Objectif</h3>
                    <p>${user?.objectif || "Fitness"}</p>
                </div>

                <div class="profile-stat">
                    <h3>Membre depuis</h3>
                    <p>${user?.createdAt || "2026"}</p>
                </div>

            </div>

            <!-- GALLERY -->
            <div class="profile-gallery-section">

                <h3>Mes photos</h3>

                <div class="profile-gallery">

                    <img src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74">
                    <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438">
                    <img src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712">

                </div>

            </div>

        </div>

    </section>
    `;
};

Profile.afterRender = () => {

    const btn = document.querySelector(".profile-edit-btn");

    btn?.addEventListener("click", () => {
        alert("Modifier profil à implémenter 🚀");
    });
};

export default Profile;