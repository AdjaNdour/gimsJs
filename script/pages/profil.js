import AuthService from "../services/auth.services.js";
import Service from "../services/service.js";

const Profile = async () => {

    const userConnect = AuthService.getUserConnect();
    if (!userConnect) return `<p>Utilisateur non connecté</p>`;
    const salles = await Service.getAll("salles");
    const salleData = salles.find(s => String(s.coachId) === String(userConnect.id));
    if (!salleData) return `<p>Aucune salle trouvée</p>`;
    const abonnements = await Service.getAll("abonnements");
    const tousMesABos = abonnements.filter(abo => abo.salleId === salleData.coachId) ;

    return `
    <section id="profile" class="page margin padd">

        <div class="profile-container">

            <!-- HEADER -->
            <div class="profile-header">

                <img 
                    src="${userConnect?.photo || 'https://via.placeholder.com/150'}" 
                    alt="profile"
                >

                <div class="profile-info">

                    <h2>${userConnect?.nom || "Utilisateur"}</h2>
                    <p>${userConnect?.email || ""}</p>

                    <button class="profile-edit-btn">
                        Modifier le profil
                    </button>

                </div>

            </div>

            <!-- STATS -->
            <div class="profile-stats">

                <div class="profile-stat">
                    <h3>Abonnement</h3>
                    <p>${tousMesABos.lenght || ""}</p>
                </div>

                <div class="profile-stat">
                    <h3>my types </h3>
                    <p>${salleData?.types || ""}</p>
                </div>

                <div class="profile-stat">
                    <h3>Membre depuis</h3>
                    <p>${salleData?.createdAt || ""}</p>
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