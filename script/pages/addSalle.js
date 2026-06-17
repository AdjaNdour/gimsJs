import Service from "../services/service.js";
import AuthService from "../services/auth.services.js";

const AddSalle = () => `
<section class="add-salle-page margin padd">

    <div class="add-salle-container">

        <div class="page-title">
            <h2> Ajouter une salle</h2>
        </div>

        <form class="add-salle-form">

            <div class="card-form">

                <h2>Informations du coach</h2>

                <div class="form-grid">

                    <input class="add-input" type="text" id="photo" placeholder="Photo URL">
                    <input class="add-input" type="text" id="coachNom" placeholder="Nom coach">
                    <input class="add-input" type="email" id="email" placeholder="Email">
                    <input class="add-input" type="numero" id="numero" placeholder="numero">
                    <input class="add-input" type="password" id="passwordIns" placeholder="Mot de passe">
                    <input class="add-input" type="password" id="passwordInsConf" placeholder="Confirmation">

                </div>
            </div>

            <div class="card-form">

                <h2>Informations de la salle</h2>

                <div class="form-grid">

                    <input class="add-input" type="text" id="nom" placeholder="Nom salle">
                    <input class="add-input" type="text" id="adresse" placeholder="Adresse">
                    <input class="add-input" type="number" id="prix" placeholder="Prix">
                    <input class="add-input" type="text" id="types" placeholder="yoga,fitness">

                </div>

                <textarea class="add-textarea" id="description" placeholder="Description"></textarea>
                <input class="add-input" id="equipements" placeholder="Equipements">
                <input class="add-input" id="qrWave" placeholder="QR Wave">
                <input class="add-input" id="qrOrange" placeholder="QR Orange">
                <textarea class="add-textarea" id="images" placeholder="Images"></textarea>

            </div>

            <button type="submit" class="btn-add-salle">
                + Ajouter la salle
            </button>

        </form>

    </div>

</section>
`;

AddSalle.afterRender = () => {

    const form = document.querySelector(".add-salle-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const gEBI = (id) => document.getElementById(id);

        const photo = gEBI("photo");
        const coachNom = gEBI("coachNom");
        const email = gEBI("email");
        const password = gEBI("passwordIns");
        const confirm = gEBI("passwordInsConf");
        const numero = gEBI("numero");

        const nom = gEBI("nom");
        const adresse = gEBI("adresse");
        const prix = gEBI("prix");
        const types = gEBI("types");
        const description = gEBI("description");
        const equipements = gEBI("equipements");
        const qrWave = gEBI("qrWave");
        const qrOrange = gEBI("qrOrange");
        const images = gEBI("images");

        const champs = [
            coachNom, email, password, numero, confirm,
            nom, adresse, prix, types, description,
            equipements
        ];

        let valide = true;

        champs.forEach(c => {
            if (!c.value.trim()) {
                c.style.border = "2px solid red";
                valide = false;
            } else {
                c.style.border = "1px solid #374151";
            }
        });

        if (!valide) return;

        const users = await Service.get("users");
        const exist = users.find(u => u.email === email);
        if (exist) return null;

        if (password.value !== confirm.value) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        const coach = {
            nom: coachNom.value.trim(),
            photo: photo.value.trim() || "",
            email: email.value.trim(),
            password: password.value.trim(),
            role: "coach"
        };
        const qrWaveUrl =
            `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Wave-${numero}`;

        const qrOrangeUrl =
            `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=OrangeMoney-${numero}`;
        const newCoach = await Service.add("users", coach);

        const salle = {
            nom: nom.value.trim(),
            types: types.value.split(",").map(t => t.trim()),
            adresse: adresse.value.trim(),
            prix: Number(prix.value),
            description: description.value.trim(),
            equipements: equipements.value.split(",").map(e => e.trim()),
            qrWave: qrWaveUrl,
            qrOrange: qrOrangeUrl,
            images: images.value.split("\n").map(i => i.trim()).filter(Boolean),
            coachId: newCoach.id,
            createdAt: new Date().toISOString()
        };

        await Service.add("salles", salle);

        alert("Salle créée avec succès !");
        form.reset();
    });
};

export default AddSalle;