#!/bin/bash

# Récupère le nom passé en argument
nom=$1

# Vérifie qu'un nom a été fourni
if [ -z "$nom" ]; then
    echo "Veuillez fournir un nom"
    exit 1
fi


# Dossier contenant les pages
chemin="/home/adja/Documents/Aly JS/Projet Gym/script/pages"

# Dossier de la nouvelle page
CIBLE="$chemin/$nom"

# Fichier JS à créer
cheminFichier="$CIBLE/$nom.js"

# Création du dossier
mkdir -p "$CIBLE"

# Création du fichier de la page
cat > "$cheminFichier" << EOF
import { navigate } from '../router.js';

const $nom = async () => {

}

$nom.afterRender = () => {

}

export default $nom
EOF

echo "$nom.js créé dans $CIBLE"

# -----------------------------
# Mise à jour du fichier routes.js
# -----------------------------

ROUTES="/home/adja/Documents/Aly JS/Projet Gym/script/router.js"

# Vérifie que routes.js existe
if [ ! -f "$ROUTES" ]; then
    echo "Erreur : router.js introuvable"
    exit 1
fi

# Vérifie si la route existe déjà
if grep -q "\"/$nom\"" "$ROUTES"; then
    echo "La route /$nom existe déjà dans routes.js"
else
    # Ajoute la route juste avant le premier };
    sed -i "0,/};/s/};/    ,\"\/$nom\": \"$nom\"\n};/" "$ROUTES"
    echo "Route ajoutée : \"/$nom\": \"$nom\""
fi