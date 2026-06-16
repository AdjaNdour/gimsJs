#!/usr/bin/env bash

# ============================================================
#   create-spa.sh — Générateur de SPA Vanilla JS
#   Usage : ./create-spa.sh [nom-du-projet]
# ============================================================

set -e

# ── Couleurs ────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Icônes ──────────────────────────────────────────────────
CHECK="✓"
ARROW="→"
FOLDER="📁"
FILE="📄"
ROCKET="🚀"
WARN="⚠"

# ── Bannière ────────────────────────────────────────────────
banner() {
  echo ""
  echo -e "${CYAN}${BOLD}"
  echo "  ╔══════════════════════════════════════════╗"
  echo "  ║       SPA Vanilla JS  —  Framework       ║"
  echo "  ║          Générateur de projet v1.0        ║"
  echo "  ╚══════════════════════════════════════════╝"
  echo -e "${RESET}"
}

# ── Helpers ─────────────────────────────────────────────────
log_folder() { echo -e "  ${BLUE}${FOLDER}${RESET}  $1"; }
log_file()   { echo -e "  ${GREEN}${FILE}${RESET}  $1"; }
log_info()   { echo -e "  ${YELLOW}${ARROW}${RESET}  $1"; }
log_ok()     { echo -e "  ${GREEN}${CHECK}${RESET}  $1"; }
log_warn()   { echo -e "  ${RED}${WARN}${RESET}  $1"; }

# ── Vérification du nom du projet ───────────────────────────
get_project_name() {
  if [ -n "$1" ]; then
    PROJECT="$1"
  else
    echo -e "${YELLOW}Nom du projet :${RESET} \c"
    read -r PROJECT
  fi

  # Validation : pas vide, pas d'espaces
  if [ -z "$PROJECT" ]; then
    log_warn "Le nom du projet ne peut pas être vide."
    exit 1
  fi
  if [[ "$PROJECT" =~ [[:space:]] ]]; then
    log_warn "Le nom ne doit pas contenir d'espaces. Utilisez des tirets."
    exit 1
  fi

  if [ -d "$PROJECT" ]; then
    log_warn "Le dossier '${PROJECT}' existe déjà. Abandon."
    exit 1
  fi
}

# ── Choix du port de dev ─────────────────────────────────────
get_port() {
  echo -e "${YELLOW}Port de développement [3000] :${RESET} \c"
  read -r PORT
  PORT="${PORT:-3000}"
}

# ── Création de la structure ─────────────────────────────────
create_structure() {
  echo ""
  echo -e "${BOLD}Structure du projet :${RESET}"

  mkdir -p "$PROJECT/src/components"
  mkdir -p "$PROJECT/src/pages"
  mkdir -p "$PROJECT/src/styles"
  mkdir -p "$PROJECT/src/utils"
  mkdir -p "$PROJECT/src/services"
  mkdir -p "$PROJECT/public/assets/images"
  mkdir -p "$PROJECT/public/assets/fonts"
  mkdir -p "$PROJECT/public/assets/icons"

  log_folder "$PROJECT/"
  log_folder "$PROJECT/src/"
  log_folder "$PROJECT/src/components/"
  log_folder "$PROJECT/src/pages/"
  log_folder "$PROJECT/src/styles/"
  log_folder "$PROJECT/src/utils/"
  log_folder "$PROJECT/src/services/"
  log_folder "$PROJECT/public/assets/{images,fonts,icons}"
}

# ═══════════════════════════════════════════════════════════
#  FICHIERS À GÉNÉRER
# ═══════════════════════════════════════════════════════════

write_index_html() {
  cat > "$PROJECT/index.html" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Application SPA Vanilla JS" />
  <title>Mon App</title>

  <!-- Styles -->
  <link rel="stylesheet" href="src/styles/reset.css" />
  <link rel="stylesheet" href="src/styles/main.css" />

  <!-- Favicon -->
  <link rel="icon" href="public/assets/icons/favicon.svg" type="image/svg+xml" />
</head>
<body>

  <!-- Barre de navigation -->
  <nav id="navbar"></nav>

  <!-- Point de montage principal (router outlet) -->
  <main id="app"></main>

  <!-- Pied de page -->
  <footer id="footer"></footer>

  <!-- Point d'entrée JS (module) -->
  <script type="module" src="src/app.js"></script>
</body>
</html>
HTMLEOF
  log_file "$PROJECT/index.html"
}

write_app_js() {
  cat > "$PROJECT/src/app.js" << 'JSEOF'
/**
 * app.js — Point d'entrée de l'application
 */
import { Router }    from './router.js';
import { Navbar }    from './components/Navbar.js';
import { Footer }    from './components/Footer.js';
import { Home }      from './pages/Home.js';
import { About }     from './pages/About.js';
import { NotFound }  from './pages/NotFound.js';

// ── Routes ───────────────────────────────────────────────────
const routes = [
  { path: '/',        component: Home     },
  { path: '/about',   component: About    },
  { path: '*',        component: NotFound },
];

// ── Initialisation ───────────────────────────────────────────
const router = new Router(routes, '#app');

// Composants statiques (montés une seule fois)
Navbar.mount('#navbar', router);
Footer.mount('#footer');

// Démarre le routing
router.init();

// Expose le router globalement (utile pour les liens internes)
window.$router = router;
JSEOF
  log_file "$PROJECT/src/app.js"
}

write_router_js() {
  cat > "$PROJECT/src/router.js" << 'JSEOF'
/**
 * router.js — Router SPA basé sur l'History API
 */
export class Router {
  /**
   * @param {Array<{path: string, component: Object}>} routes
   * @param {string} outlet  — sélecteur CSS du conteneur de page
   */
  constructor(routes, outlet) {
    this.routes  = routes;
    this.outlet  = document.querySelector(outlet);
    this._listeners = [];

    if (!this.outlet) {
      throw new Error(`Router: outlet "${outlet}" introuvable dans le DOM.`);
    }
  }

  // ── Démarrage ─────────────────────────────────────────────
  init() {
    // Clic sur les liens <a data-link>
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (!link) return;
      e.preventDefault();
      this.navigate(link.getAttribute('href'));
    });

    // Boutons précédent / suivant du navigateur
    window.addEventListener('popstate', () => this._render());

    // Affiche la page courante
    this._render();
  }

  // ── Navigation programmatique ─────────────────────────────
  navigate(path) {
    if (window.location.pathname === path) return;
    history.pushState(null, '', path);
    this._render();
  }

  // ── Résolution de la route ────────────────────────────────
  _resolve(path) {
    // Correspondance exacte
    let route = this.routes.find(r => r.path === path);
    // Wildcard 404
    if (!route) route = this.routes.find(r => r.path === '*');
    return route;
  }

  // ── Rendu ─────────────────────────────────────────────────
  async _render() {
    const path  = window.location.pathname;
    const route = this._resolve(path);

    if (!route) {
      this.outlet.innerHTML = '<p>404 — Page introuvable.</p>';
      return;
    }

    // Vide le conteneur et monte le composant
    this.outlet.innerHTML = '';
    await route.component.mount(this.outlet, this);

    // Défilement vers le haut à chaque navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Notifie les écouteurs externes
    this._listeners.forEach(fn => fn(path));
  }

  // ── Abonnements aux changements de route ──────────────────
  onChange(fn) { this._listeners.push(fn); }
}
JSEOF
  log_file "$PROJECT/src/router.js"
}

write_pages() {
  # Home
  cat > "$PROJECT/src/pages/Home.js" << 'JSEOF'
/**
 * pages/Home.js — Page d'accueil
 */
import { createElement } from '../utils/dom.js';

export const Home = {
  async mount(container, router) {
    const page = createElement('div', { class: 'page page--home' }, `
      <section class="hero">
        <h1>Bienvenue 👋</h1>
        <p>Votre SPA Vanilla JS est prête. Commencez à construire !</p>
        <a href="/about" data-link class="btn btn--primary">En savoir plus</a>
      </section>
    `);
    container.appendChild(page);
  }
};
JSEOF
  log_file "$PROJECT/src/pages/Home.js"

  # About
  cat > "$PROJECT/src/pages/About.js" << 'JSEOF'
/**
 * pages/About.js — Page À propos
 */
import { createElement } from '../utils/dom.js';

export const About = {
  async mount(container, router) {
    const page = createElement('div', { class: 'page page--about' }, `
      <h1>À propos</h1>
      <p>Ce projet est basé sur un framework SPA maison en Vanilla JS.</p>
      <ul>
        <li>Zéro dépendance</li>
        <li>Router History API</li>
        <li>Architecture orientée composants</li>
      </ul>
      <a href="/" data-link class="btn btn--secondary">← Retour</a>
    `);
    container.appendChild(page);
  }
};
JSEOF
  log_file "$PROJECT/src/pages/About.js"

  # NotFound
  cat > "$PROJECT/src/pages/NotFound.js" << 'JSEOF'
/**
 * pages/NotFound.js — Page 404
 */
import { createElement } from '../utils/dom.js';

export const NotFound = {
  async mount(container, router) {
    const page = createElement('div', { class: 'page page--404' }, `
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <a href="/" data-link class="btn btn--primary">Retour à l'accueil</a>
    `);
    container.appendChild(page);
  }
};
JSEOF
  log_file "$PROJECT/src/pages/NotFound.js"
}

write_components() {
  # Navbar
  cat > "$PROJECT/src/components/Navbar.js" << 'JSEOF'
/**
 * components/Navbar.js — Barre de navigation
 */
import { createElement } from '../utils/dom.js';

export const Navbar = {
  mount(selector, router) {
    const nav = document.querySelector(selector);
    if (!nav) return;

    const links = [
      { href: '/',       label: 'Accueil' },
      { href: '/about',  label: 'À propos' },
    ];

    nav.innerHTML = `
      <div class="navbar__inner">
        <a href="/" data-link class="navbar__brand">MonApp</a>
        <ul class="navbar__links">
          ${links.map(l => `
            <li>
              <a href="${l.href}" data-link class="navbar__link">${l.label}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    // Lien actif au changement de route
    const setActive = (path) => {
      nav.querySelectorAll('.navbar__link').forEach(a => {
        a.classList.toggle('navbar__link--active', a.getAttribute('href') === path);
      });
    };

    router.onChange(setActive);
    setActive(window.location.pathname);
  }
};
JSEOF
  log_file "$PROJECT/src/components/Navbar.js"

  # Footer
  cat > "$PROJECT/src/components/Footer.js" << 'JSEOF'
/**
 * components/Footer.js — Pied de page
 */
export const Footer = {
  mount(selector) {
    const footer = document.querySelector(selector);
    if (!footer) return;
    footer.innerHTML = `
      <p class="footer__text">
        &copy; ${new Date().getFullYear()} MonApp — Construit avec ❤️ en Vanilla JS
      </p>
    `;
  }
};
JSEOF
  log_file "$PROJECT/src/components/Footer.js"
}

write_utils() {
  # dom.js
  cat > "$PROJECT/src/utils/dom.js" << 'JSEOF'
/**
 * utils/dom.js — Utilitaires de manipulation du DOM
 */

/**
 * Crée un élément HTML avec attributs et contenu HTML interne.
 * @param {string} tag
 * @param {Object} attrs
 * @param {string} html
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, html = '') {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  el.innerHTML = html;
  return el;
}

/**
 * Sélectionne un élément ou lève une erreur.
 * @param {string} selector
 * @param {Document|HTMLElement} root
 */
export function $(selector, root = document) {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`DOM: "${selector}" introuvable.`);
  return el;
}

/**
 * Sélectionne tous les éléments correspondants.
 */
export function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}
JSEOF
  log_file "$PROJECT/src/utils/dom.js"

  # helpers.js
  cat > "$PROJECT/src/utils/helpers.js" << 'JSEOF'
/**
 * utils/helpers.js — Fonctions utilitaires générales
 */

/** Formate une date en français */
export function formatDate(date, locale = 'fr-FR') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(date));
}

/** Debounce : limite la fréquence d'appel d'une fonction */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Génère un identifiant unique */
export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/** Clone profond d'un objet JSON-sérialisable */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
JSEOF
  log_file "$PROJECT/src/utils/helpers.js"

  # http.js (service HTTP)
  cat > "$PROJECT/src/services/http.js" << 'JSEOF'
/**
 * services/http.js — Client HTTP léger (wrapper autour de fetch)
 */

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status} — ${res.statusText}`);
    error.status = res.status;
    throw error;
  }

  // Si la réponse est vide (204 No Content)
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const http = {
  get:    (url, opts)        => request(url, { method: 'GET', ...opts }),
  post:   (url, body, opts)  => request(url, { method: 'POST',   body: JSON.stringify(body), ...opts }),
  put:    (url, body, opts)  => request(url, { method: 'PUT',    body: JSON.stringify(body), ...opts }),
  patch:  (url, body, opts)  => request(url, { method: 'PATCH',  body: JSON.stringify(body), ...opts }),
  delete: (url, opts)        => request(url, { method: 'DELETE', ...opts }),
};
JSEOF
  log_file "$PROJECT/src/services/http.js"
}

write_styles() {
  # reset.css
  cat > "$PROJECT/src/styles/reset.css" << 'CSSEOF'
/* reset.css — Normalisation des styles navigateurs */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html { font-size: 16px; scroll-behavior: smooth; }
body { line-height: 1.6; -webkit-font-smoothing: antialiased; }
img, video { max-width: 100%; display: block; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
ul { list-style: none; }
a { text-decoration: none; color: inherit; }
CSSEOF
  log_file "$PROJECT/src/styles/reset.css"

  # main.css
  cat > "$PROJECT/src/styles/main.css" << 'CSSEOF'
/* main.css — Styles globaux de l'application */

/* ── Variables CSS ──────────────────────────────────────── */
:root {
  --color-primary:    #4f46e5;
  --color-primary-h:  #4338ca;
  --color-secondary:  #7c3aed;
  --color-bg:         #ffffff;
  --color-surface:    #f9fafb;
  --color-border:     #e5e7eb;
  --color-text:       #111827;
  --color-muted:      #6b7280;

  --font-sans:   'Segoe UI', system-ui, sans-serif;
  --font-mono:   'Fira Code', 'Courier New', monospace;

  --radius:       0.5rem;
  --shadow-sm:    0 1px 3px rgba(0,0,0,.1);
  --shadow-md:    0 4px 12px rgba(0,0,0,.15);

  --transition:   180ms ease;
  --max-width:    1100px;
}

/* ── Base ───────────────────────────────────────────────── */
body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* ── Navbar ─────────────────────────────────────────────── */
#navbar {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 1.5rem;
}

.navbar__brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.navbar__links {
  display: flex;
  gap: 1.5rem;
}

.navbar__link {
  color: var(--color-muted);
  font-weight: 500;
  transition: color var(--transition);
}
.navbar__link:hover,
.navbar__link--active {
  color: var(--color-primary);
}

/* ── Boutons ────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .6rem 1.4rem;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  border: 2px solid transparent;
}
.btn:hover { transform: translateY(-1px); }

.btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.btn--primary:hover { background: var(--color-primary-h); }

.btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.btn--secondary:hover { background: var(--color-primary); color: #fff; }

/* ── Page hero ──────────────────────────────────────────── */
.hero {
  text-align: center;
  padding: 5rem 1rem;
}
.hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
}
.hero p {
  color: var(--color-muted);
  font-size: 1.125rem;
  max-width: 520px;
  margin: 0 auto 2rem;
}

/* ── Footer ─────────────────────────────────────────────── */
#footer {
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: .875rem;
}
CSSEOF
  log_file "$PROJECT/src/styles/main.css"
}

write_favicon() {
  cat > "$PROJECT/public/assets/icons/favicon.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#4f46e5"/>
  <text x="7" y="24" font-size="20" font-family="sans-serif" fill="white">S</text>
</svg>
SVGEOF
  log_file "$PROJECT/public/assets/icons/favicon.svg"
}

write_readme() {
  cat > "$PROJECT/README.md" << MDEOF
# ${PROJECT}

> SPA Vanilla JS — Généré avec **create-spa.sh**

## 🗂 Structure

\`\`\`
${PROJECT}/
├── index.html                 # Point d'entrée HTML
├── src/
│   ├── app.js                 # Initialisation & montage
│   ├── router.js              # Router History API
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── NotFound.js
│   ├── styles/
│   │   ├── reset.css
│   │   └── main.css
│   ├── utils/
│   │   ├── dom.js             # Helpers DOM
│   │   └── helpers.js         # Utilitaires généraux
│   └── services/
│       └── http.js            # Client fetch
└── public/
    └── assets/
        ├── images/
        ├── fonts/
        └── icons/
\`\`\`

## 🚀 Démarrage

Les modules ES nécessitent un serveur HTTP (pas de \`file://\`).

\`\`\`bash
# Option 1 — Python
python3 -m http.server ${PORT}

# Option 2 — Node.js (npx)
npx serve . -l ${PORT}

# Option 3 — VS Code
# Installer l'extension "Live Server"
\`\`\`

Puis ouvrir : **http://localhost:${PORT}**

## ➕ Ajouter une page

1. Créer \`src/pages/MaPage.js\` :
\`\`\`js
import { createElement } from '../utils/dom.js';

export const MaPage = {
  async mount(container, router) {
    container.appendChild(
      createElement('div', { class: 'page' }, '<h1>Ma Page</h1>')
    );
  }
};
\`\`\`

2. Enregistrer la route dans \`src/app.js\` :
\`\`\`js
import { MaPage } from './pages/MaPage.js';
// ...
{ path: '/ma-page', component: MaPage },
\`\`\`

3. Ajouter un lien dans \`Navbar.js\` :
\`\`\`js
{ href: '/ma-page', label: 'Ma Page' },
\`\`\`

---
*Généré le $(date '+%d/%m/%Y') avec create-spa.sh*
MDEOF
  log_file "$PROJECT/README.md"
}

write_gitignore() {
  cat > "$PROJECT/.gitignore" << 'GIEOF'
# OS
.DS_Store
Thumbs.db

# Éditeurs
.vscode/
.idea/
*.swp

# Node (si ajouté plus tard)
node_modules/
.env
.env.local
GIEOF
  log_file "$PROJECT/.gitignore"
}

# ═══════════════════════════════════════════════════════════
#  RÉSUMÉ FINAL
# ═══════════════════════════════════════════════════════════
print_summary() {
  echo ""
  echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════${RESET}"
  echo -e "${GREEN}${BOLD}  ${ROCKET}  Projet '${PROJECT}' créé avec succès !${RESET}"
  echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════${RESET}"
  echo ""
  echo -e "  ${ARROW}  Lancer le serveur de développement :"
  echo ""
  echo -e "  ${CYAN}cd ${PROJECT}${RESET}"
  echo -e "  ${CYAN}python3 -m http.server ${PORT}${RESET}"
  echo ""
  echo -e "  Puis ouvrir : ${BOLD}http://localhost:${PORT}${RESET}"
  echo ""
}

# ═══════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════
main() {
  banner
  get_project_name "$1"
  get_port

  echo ""
  echo -e "${BOLD}Génération des fichiers...${RESET}"

  create_structure
  echo ""

  write_index_html
  write_app_js
  write_router_js
  write_pages
  write_components
  write_utils
  write_styles
  write_favicon
  write_readme
  write_gitignore

  print_summary
}

main "$@"