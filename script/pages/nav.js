import { navigate } from '../router.js';
import AuthService from "../services/auth.services.js";
const authService = new AuthService();

const Nav = () => {
    const userConnect = AuthService.getUserConnect();

    if (!userConnect) {
        return `<p>Utilisateur non connecté</p>`;
    }
    
    const menuClient = `
                
                <button data-page="home" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="#ff6b21"
                            d="M24 12A12 12 0 1 1 12 0a12.01 12.01 0 0 1 12 12m-1.5 0A10.5 10.5 0 1 0 12 22.5A10.516 10.516 0 0 0 22.5 12M7.542 5.841l4.074 1.739l-1.739 4.073L5.8 9.914zm5.158 7.926l2.185 4.406H14.2l-2.343-4.687l-2.295 4.687h-.656l2.4-5.01l-1.046-.441l.282-.656l3.215 1.364l-.281.67Zm-.553-5.451l3.216 1.378l-1.378 3.2l-3.2-1.364l1.364-3.215Zm3.764 2.011l2.56 1.082l-1.1 2.546l-2.545-1.083l1.082-2.545Z" />
                    </svg>
                    Explorer
                </button>

                <button data-page="emploieDuTemps" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="#ff6b21" fill-rule="evenodd"
                            d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2zM5 8v12h14V8zm2 3h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2H7z" />
                    </svg>
                    temps
                </button>

                <button data-page="profile" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                        <path d="M0 0h50v50H0z" fill="none" />
                        <path fill="#ff6b21"
                            d="M25.1 42c-9.4 0-17-7.6-17-17s7.6-17 17-17s17 7.6 17 17s-7.7 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.8-15-15-15" />
                        <path fill="#ff6b21"
                            d="m15.3 37.3l-1.8-.8c.5-1.2 2.1-1.9 3.8-2.7s3.8-1.7 3.8-2.8v-1.5c-.6-.5-1.6-1.6-1.8-3.2c-.5-.5-1.3-1.4-1.3-2.6c0-.7.3-1.3.5-1.7c-.2-.8-.4-2.3-.4-3.5c0-3.9 2.7-6.5 7-6.5c1.2 0 2.7.3 3.5 1.2c1.9.4 3.5 2.6 3.5 5.3c0 1.7-.3 3.1-.5 3.8c.2.3.4.8.4 1.4c0 1.3-.7 2.2-1.3 2.6c-.2 1.6-1.1 2.6-1.7 3.1V31c0 .9 1.8 1.6 3.4 2.2c1.9.7 3.9 1.5 4.6 3.1l-1.9.7c-.3-.8-1.9-1.4-3.4-1.9c-2.2-.8-4.7-1.7-4.7-4v-2.6l.5-.3s1.2-.8 1.2-2.4v-.7l.6-.3c.1 0 .6-.3.6-1.1c0-.2-.2-.5-.3-.6l-.4-.4l.2-.5s.5-1.6.5-3.6c0-1.9-1.1-3.3-2-3.3h-.6l-.3-.5c0-.4-.7-.8-1.9-.8c-3.1 0-5 1.7-5 4.5c0 1.3.5 3.5.5 3.5l.1.5l-.4.5c-.1 0-.3.3-.3.7c0 .5.6 1.1.9 1.3l.4.3v.5c0 1.5 1.3 2.3 1.3 2.4l.5.3v2.6c0 2.4-2.6 3.6-5 4.6c-1.1.4-2.6 1.1-2.8 1.6" />
                    </svg>
                    Mon profil
                </button>
    `;

    const menuCoach = `

                <button data-page="home" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="#ff6b21"
                            d="M24 12A12 12 0 1 1 12 0a12.01 12.01 0 0 1 12 12m-1.5 0A10.5 10.5 0 1 0 12 22.5A10.516 10.516 0 0 0 22.5 12M7.542 5.841l4.074 1.739l-1.739 4.073L5.8 9.914zm5.158 7.926l2.185 4.406H14.2l-2.343-4.687l-2.295 4.687h-.656l2.4-5.01l-1.046-.441l.282-.656l3.215 1.364l-.281.67Zm-.553-5.451l3.216 1.378l-1.378 3.2l-3.2-1.364l1.364-3.215Zm3.764 2.011l2.56 1.082l-1.1 2.546l-2.545-1.083l1.082-2.545Z" />
                    </svg>
                    Explorer
                </button>

                <button data-page="maPage" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g class="users-outline">
                            <g fill="#ff6b21" fill-rule="evenodd" class="Vector" clip-rule="evenodd">
                                <path
                                    d="M8.75 9.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5m0 2a3.75 3.75 0 1 0 0-7.5a3.75 3.75 0 0 0 0 7.5m-5.484 3.027c.899-1.249 2.269-2.027 4.02-2.027h3.428c1.752 0 3.121.778 4.02 2.027C15.607 15.74 16 17.339 16 19a1 1 0 1 1-2 0c0-1.377-.33-2.527-.89-3.305c-.533-.742-1.307-1.195-2.396-1.195H7.286c-1.09 0-1.863.453-2.397 1.195C4.33 16.472 4 17.623 4 19a1 1 0 1 1-2 0c0-1.661.393-3.26 1.266-4.473" />
                                <path
                                    d="M2 19a1 1 0 0 1 1-1h11.971a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1M14.892 5.867l-.028-.002a2.3 2.3 0 0 1-.445-.07c-.345-.092-.655-.276-.796-.595l-.013-.028c-.208-.47.006-1.033.513-1.12a3.75 3.75 0 1 1 .596 7.448c-.514-.004-.815-.526-.684-1.023l.008-.03c.088-.338.366-.569.69-.714a2.3 2.3 0 0 1 .456-.147a1.887 1.887 0 0 0-.297-3.719M15.5 13.5a1 1 0 0 1 1-1h.214c1.752 0 3.121.778 4.02 2.027C21.607 15.74 22 17.339 22 19a1 1 0 1 1-2 0c0-1.377-.33-2.527-.89-3.305c-.533-.742-1.307-1.195-2.396-1.195H16.5a1 1 0 0 1-1-1" />
                                <path d="M17 19a1 1 0 0 1 1-1h2.971a1 1 0 0 1 0 2H18a1 1 0 0 1-1-1" />
                            </g>
                        </g>
                    </svg>
                    Ma salle
                </button>

                <button data-page="mesClients" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g class="users-outline">
                            <g fill="#ff6b21" fill-rule="evenodd" class="Vector" clip-rule="evenodd">
                                <path
                                    d="M8.75 9.5a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5m0 2a3.75 3.75 0 1 0 0-7.5a3.75 3.75 0 0 0 0 7.5m-5.484 3.027c.899-1.249 2.269-2.027 4.02-2.027h3.428c1.752 0 3.121.778 4.02 2.027C15.607 15.74 16 17.339 16 19a1 1 0 1 1-2 0c0-1.377-.33-2.527-.89-3.305c-.533-.742-1.307-1.195-2.396-1.195H7.286c-1.09 0-1.863.453-2.397 1.195C4.33 16.472 4 17.623 4 19a1 1 0 1 1-2 0c0-1.661.393-3.26 1.266-4.473" />
                                <path
                                    d="M2 19a1 1 0 0 1 1-1h11.971a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1M14.892 5.867l-.028-.002a2.3 2.3 0 0 1-.445-.07c-.345-.092-.655-.276-.796-.595l-.013-.028c-.208-.47.006-1.033.513-1.12a3.75 3.75 0 1 1 .596 7.448c-.514-.004-.815-.526-.684-1.023l.008-.03c.088-.338.366-.569.69-.714a2.3 2.3 0 0 1 .456-.147a1.887 1.887 0 0 0-.297-3.719M15.5 13.5a1 1 0 0 1 1-1h.214c1.752 0 3.121.778 4.02 2.027C21.607 15.74 22 17.339 22 19a1 1 0 1 1-2 0c0-1.377-.33-2.527-.89-3.305c-.533-.742-1.307-1.195-2.396-1.195H16.5a1 1 0 0 1-1-1" />
                                <path d="M17 19a1 1 0 0 1 1-1h2.971a1 1 0 0 1 0 2H18a1 1 0 0 1-1-1" />
                            </g>
                        </g>
                    </svg>
                    Mes clients
                </button>

                <button data-page="profile" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                        <path d="M0 0h50v50H0z" fill="none" />
                        <path fill="#ff6b21"
                            d="M25.1 42c-9.4 0-17-7.6-17-17s7.6-17 17-17s17 7.6 17 17s-7.7 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.8-15-15-15" />
                        <path fill="#ff6b21"
                            d="m15.3 37.3l-1.8-.8c.5-1.2 2.1-1.9 3.8-2.7s3.8-1.7 3.8-2.8v-1.5c-.6-.5-1.6-1.6-1.8-3.2c-.5-.5-1.3-1.4-1.3-2.6c0-.7.3-1.3.5-1.7c-.2-.8-.4-2.3-.4-3.5c0-3.9 2.7-6.5 7-6.5c1.2 0 2.7.3 3.5 1.2c1.9.4 3.5 2.6 3.5 5.3c0 1.7-.3 3.1-.5 3.8c.2.3.4.8.4 1.4c0 1.3-.7 2.2-1.3 2.6c-.2 1.6-1.1 2.6-1.7 3.1V31c0 .9 1.8 1.6 3.4 2.2c1.9.7 3.9 1.5 4.6 3.1l-1.9.7c-.3-.8-1.9-1.4-3.4-1.9c-2.2-.8-4.7-1.7-4.7-4v-2.6l.5-.3s1.2-.8 1.2-2.4v-.7l.6-.3c.1 0 .6-.3.6-1.1c0-.2-.2-.5-.3-.6l-.4-.4l.2-.5s.5-1.6.5-3.6c0-1.9-1.1-3.3-2-3.3h-.6l-.3-.5c0-.4-.7-.8-1.9-.8c-3.1 0-5 1.7-5 4.5c0 1.3.5 3.5.5 3.5l.1.5l-.4.5c-.1 0-.3.3-.3.7c0 .5.6 1.1.9 1.3l.4.3v.5c0 1.5 1.3 2.3 1.3 2.4l.5.3v2.6c0 2.4-2.6 3.6-5 4.6c-1.1.4-2.6 1.1-2.8 1.6" />
                    </svg>
                    Mon profil
                </button>
    `;

    const menu = userConnect.role === "coach" ? menuCoach : menuClient;

    return `
      <div class="sb">
        <div>
            <h2>Gim's Finder</h2>

            <div class="userConnect">
                <img
                    class="avatar"
                    style="background-size: cover"
                    src="${userConnect?.photo ?? ''}"
                >

                <div>
                    <h3 id="userName">${userConnect?.nom ?? ''}</h3>
                    <p id="userEmail">${userConnect?.email ?? ''}</p>
                </div>
            </div>

            <nav>
                ${menu}
            </nav>
        </div>
      
            <button class="logout jcc" id="btnDeconnexion">
                Déconnexion
            </button>
        </div>
    `;
}

Nav.afterRender = () => {
    let btnDeconnexion = document.getElementById("btnDeconnexion");

    let inputPhoto = document.getElementById("photo");
    let inputNom = document.getElementById("nom");
    let inputPassword = document.getElementById("password");
    let inputEmail = document.getElementById("email");
    let inputInsPassword = document.getElementById("passwordIns");
    let inputInsPasswordConf = document.getElementById("passwordInsConf");
    let inputInsEmail = document.getElementById("emailIns");
    if (btnDeconnexion) {
        btnDeconnexion.addEventListener("click", async function (e) {
            e.preventDefault();
            await authService.deconnexion();
            [
                inputEmail,
                inputPassword,
                inputNom,
                inputInsEmail,
                inputInsPassword,
                inputInsPasswordConf,
                inputPhoto

            ].forEach(input => {
                if (input) input.value = "";
            });
            navigate("/connexion");

        });
    }


    document.querySelectorAll("[data-page]").forEach(btn => {
        btn.addEventListener("click", () => {
            navigate("/" + btn.dataset.page);
        });
    });

};


export default Nav;
