
const clientSection = document.getElementById("mesClients");

clientSection.innerHTML = `
        <h2>Mes clients</h2>

            <table>

                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Abonnement</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Marco Chen</td>
                        <td>Actif</td>
                        <td>
                            <button>Modifier</button>
                        </td>
                    </tr>

                </tbody>

            </table>
    `