import AuthService from "../services/auth.services.js";
import Service from "../services/service.js";

const Profile = async () => {

    const userConnect = AuthService.getUserConnect();
    if (!userConnect) return `<p>Utilisateur non connecté</p>`;

    const salles = await Service.getAll("salles");
    const salleData = salles.find(s => String(s.coachId) === String(userConnect.id));

    if (!salleData) return `<p>Aucune salle trouvée</p>`;

    return `
    <section id="profile" class="page margin padd">

        <div class="profile-container">

            <!-- HEADER -->
            <div class="profile-header">

                <img
                    id="profileImage"
                    src="${userConnect?.photo || 'https://via.placeholder.com/150'}"
                    alt="profile"
                >

                <input
                    type="file"
                    id="photoInput"
                    accept="image/*"
                    style="display:none"
                >

                <div class="profile-info">

                    <h2>${userConnect?.nom || "Utilisateur"}</h2>
                    <p>${userConnect?.email || ""}</p>

                    <button class="profile-edit-btn">
                        Modifier la photo
                    </button>

                </div>

            </div>

            <!-- STATS -->
            <div class="profile-stats">

                <div class="profile-stat">
                    <h3>Description</h3>
                    <p>${userConnect.description || ""}</p>
                </div>

                <div class="profile-stat">
                    <h3>Types de salle</h3>
                    <p>${salleData?.types?.join(", ") || ""}</p>
                </div>

                <div class="profile-stat">
                    <h3>Membre depuis</h3>
                    <p>${salleData?.createdAt || "N/A"}</p>
                </div>

            </div>

            <!-- INFOS -->
            <div class="profile-gallery-section">

                <h2>Mes informations</h2>

                <div class="myblock">

                    <div class="donne">
                        <h3>Nom</h3>
                        <p>${userConnect.nom || ""}</p>
                    </div>

                    <div class="donne">
                        <h3>Email</h3>
                        <p>${userConnect.email || ""}</p>
                    </div>

                    <div class="donne">
                        <h3>Role</h3>
                        <p>${userConnect.role || ""}</p>
                    </div>

                    <div class="donne">
                        <h3>Description</h3>
                        <p>${userConnect.description || ""}</p>
                    </div>

                </div>

            </div>

        </div>

    </section>
    `;
};

Profile.afterRender = () => {

    const btn = document.querySelector(".profile-edit-btn");
    const input = document.querySelector("#photoInput");

    if (!btn || !input) return;

    btn.addEventListener("click", () => {
        input.click();
    });

    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
            const photoBase64 = reader.result;
            const user = AuthService.getUserConnect();

            if (!user) return;

            const updatedUser = await Service.update("users", user.id, {
                photo: photoBase64.substring(0, 100)
            });

            if (!updatedUser) return;

            localStorage.setItem("user", JSON.stringify(updatedUser));
            document.querySelector("#profileImage").src = photoBase64;
        };

        reader.readAsDataURL(file);
    });
};

export default Profile;