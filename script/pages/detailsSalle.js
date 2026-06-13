import Service from "../services/service.js";

const DetailsSalle = async (id) => {

    const salle = await Service.getById("salles", id);
    const gallery = (salle.images || []).slice(1).map(image => `
                                                <img src="${image}" alt="">
                                                `).join("");

    const users = await Service.getAll("users");
    const coachs = users.filter(coach => coach.role === "coach") ;
    const coach = coachs.find(coach => coach.id === salle.coachId) ;
    
    return `
        <section class="detail-page  margin padd">

            <h2 class="detail-coach-title">
                Coaches Near You
            </h2>

            <div class="detail-coach-card">

                <div class="detail-coach-left">
                    <img src="${coach.photo}" alt="Coach">

                    <div class="detail-coach-info">
                        <h4>${coach.nom}</h4>
                        <p>${coach.description}</p>
                    </div>
                </div>

                <div class="detail-coach-price">
                    <span>$85/hr</span>
                    <small>⭐ 5.0</small>
                </div>

            </div>

        
            <div class="detail-gym-info">

                <h1 class="detail-gym-name">
                    ${salle.nom} -  ${salle.adresse}📍
                </h1>                           

                <div class="detail-gym-price">
                     ${salle.prix} FCFA / mois
                </div>

                <button class="detail-subscribe-btn" data-id="${salle.id}">
                    S'abonner
                </button>

            </div>
                <div class="detail-coach-card">
                    <div class="detail-coach-left">
                        <div class="detail-coach-info">
                            <h2> Equipements</h2>
                            <p> ${salle.equipements} </p>
                        </div>
                    </div>
                </div>
            <div class="detail-description">

                <h3>Description</h3>
                <p> ${salle.description} </p>

            </div>

            <div class="detail-gallery-header">
                <h2>Featured Gym</h2>
            </div>

            <div class="detail-gallery">
                <img src="${salle.images[0]}" alt="">
            </div>    
            <div class="detail-box-image"> 
                    ${gallery} 
            </div>

        </section>
    `;
};

DetailsSalle.afterRender = () => {
    let subscribe = document.querySelector(".detail-subscribe-btn");
        subscribe.addEventListener("click", () =>{
            const id = subscribe.dataset.id;
            location.hash = `subscription/${id}`;
        });
}
export default DetailsSalle;