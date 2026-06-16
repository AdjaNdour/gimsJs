const fs = require("fs");
const path = require("path");


const nom = process.argv[2];

// [
//   '/usr/bin/node',           Le programme Node
//   '/home/adja/create.js',    Le fichier exécuté
//   'home'                     Ton premier argument
// ]

// arg = argument
// v = vector (liste/tableau)


if (!nom) {
    console.log("Veuillez fournir un nom");
    process.exit();
}

const chemin = "/home/adja/Documents/Aly JS/Projet Gym/script/pages";

const CIBLE = path.join(chemin, `/${nom}`);

const cheminFichier = path.join(CIBLE, `${nom}.js`);

fs.mkdirSync(CIBLE, { recursive: true });

const contenu =
    `import { navigate } from '../router.js';

const ${nom} = async () => {\n\n}\n

${nom}.afterRender = ()=>{}

export default ${nom}`

fs.writeFileSync(cheminFichier, contenu);

console.log(`${nom}.js créé dans ${CIBLE}`);


const ROUTES = "/home/adja/Documents/Aly JS/Projet Gym/script/router.js";

if (!fs.existsSync(ROUTES)) {
    console.log("Erreur : router.js introuvable");
    process.exit(1);
}

let router = fs.readFileSync(ROUTES, "utf-8");

if (router.includes(`"/${nom}"`)) {
    console.log(`La route /${nom} existe déjà dans router.js`);
    process.exit(0);
}


const newRoute = `    ,"/${nom}": "${nom}"\n`;

const index = router.indexOf("};");

if (index === -1) {
    console.log("Format router.js invalide");
    process.exit(1);
}

const updatedRouter =
    router.slice(0, index) +
    newRoute +
    "};";

fs.writeFileSync(ROUTES, updatedRouter);

console.log(`Route ajoutée : /${nom}`);