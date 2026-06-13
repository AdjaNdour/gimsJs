import Service from "../services/service.js";

const DetailsSalle = async (id) => {

    const salle = await Service.getById("salles", id);
    const gallery = (salle.images || []).slice(1).map(image => `
                                                <img src="${image}" alt="">
                                                `).join("");
    

    return `
        <section class="detail-page  margin padd">

            <h2 class="detail-coach-title">
                Coaches Near You
            </h2>

            <div class="detail-coach-card">

                <div class="detail-coach-left">
                    <img src="https://i.pinimg.com/736x/d7/89/ab/d789abc5c5a0398edf4b4c2e0385f69b.jpg" alt="Coach">

                    <div class="detail-coach-info">
                        <h4>Marcus Chen</h4>
                        <p>Olympic Lifting • 0.5 mi</p>
                    </div>
                </div>

                <div class="detail-coach-price">
                    <span>$85/hr</span>
                    <small>⭐ 5.0</small>
                </div>

            </div>

        
            <div class="detail-gym-info">

                <h1 class="detail-gym-name">
                    ${salle.nom}
                </h1>

                <div class="detail-gym-price">
                    📍 ${salle.prix} FCFA / mois
                </div>

                <button class="detail-subscribe-btn">
                    S'abonner
                </button>

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

export default DetailsSalle;