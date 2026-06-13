function showModal(text) {
    document.getElementById("modalText").innerText = text;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// URL params
const params = new URLSearchParams(window.location.search);
const salleId = params.get("salleId");
const type = params.get("type");

// afficher info
document.getElementById("info").innerHTML = `
    <p><b>Salle ID :</b> ${salleId}</p>
    <p><b>Type paiement :</b> ${type}</p>
`;

// paiement simulé
document.getElementById("payBtn").addEventListener("click", () => {

    setTimeout(() => {

        localStorage.setItem("payment_" + salleId, "paid");

        showModal("✅ Paiement Wave validé !");
        document.getElementById("payBtn").style.display = "none";

    }, 1500);

});
const alreadyPaid = localStorage.getItem("payment_" + salleId);

if (alreadyPaid) {
    document.getElementById("payBtn").style.display = "none";
    showModal("⚠️ Déjà payé pour cette salle");
}