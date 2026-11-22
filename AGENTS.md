# Carnet d'Adrien — consignes pour les agents

Blog personnel d'Adrien Saunier (« Carnet d'Adrien — Notes de production »), site statique Astro 7 publié sur GitHub Pages à https://asaunier.dev. On échange en français, et les textes du site, les commentaires et les messages de commit sont en français.

## Commandes

- Gestionnaire de paquets : **Yarn v1** (`yarn.lock`). Si `yarn` n'est pas installé : `npx -y yarn@1 <commande>`.
- `yarn dev` : serveur de dev, brouillons visibles.
- `yarn build` puis `npx astro preview --port 4329` : vérifier le rendu de production.
- La CI utilise Node 24.

## Déploiement et dépendances

- Tout push sur `main` déclenche `.github/workflows/deploy.yml`, qui déploie sur GitHub Pages. On travaille sur une branche, puis on passe par une PR.
- Dependabot ouvre chaque lundi des PR groupées (npm et actions). `.github/workflows/dependabot.yml` les construit, les fusionne automatiquement si le build passe, puis relance le déploiement par `workflow_dispatch` : une fusion faite avec `GITHUB_TOKEN` ne déclenche pas le workflow de push.
- Commits : format `feat(): Description en français`, `chore(deps): …` pour les dépendances. La signature SSH (1Password) n'est pas configurée dans les sessions d'agent : commiter avec `git -c commit.gpgsign=false commit …`. Les commits de `main` ne sont pas signés.

## Articles

- Un article = un fichier `src/pages/posts/<slug>.md` avec `layout: '../../layout/article.astro'`.
- Frontmatter : `title`, `description`, `pubDate`, `tags` (liste) et `published`.
  - La `description` est obligatoire : elle sert de chapô sur la une, de meta description et de texte dans le flux RSS.
  - Avec `published: false`, l'article n'apparaît qu'en dev et porte un `noindex`.
- Les émojis en tête de titre sont un choix du propriétaire : on les garde.
- Une citation dans une autre langue s'écrit en HTML avec sa langue (`<blockquote lang="en"><p>…</p></blockquote>`), pas avec `>`.
- Le temps de lecture est calculé au build (`src/utils/reading-time.ts`, 200 mots par minute).
- Ne jamais inventer de contenu : pas de chiffre, de citation ou de logo qui ne viennent pas du propriétaire.

## Direction visuelle « journal »

- **Tokens** : toutes les couleurs et polices passent par les variables de `:root` dans `src/style/global.css`. Aucune couleur ni `font-family` en dur ailleurs.
- **Polices** : Fraunces (titres) et Source Serif 4 (texte), auto-hébergées via Fontsource. Aucune requête vers Google Fonts. Le seul script externe est Simple Analytics.
- **Héritage** : police, taille et couleur sont posées sur `body` puis héritées. Ne pas réintroduire de règle `* { … }`, qui casse les tailles du gras, de l'italique et des liens.
- **Couleurs de la photo de profil** : `--color-accent` (orange) et `--color-accent-soft` (jaune). Elles servent uniquement à de petites touches : point final, curseur, barre de progression, survol, tags. Jamais pour du texte courant.
- **Lecture des articles** (`src/layout/article.astro`) :
  - à partir de 900 × 600 px, colonnes de toute la hauteur avec défilement horizontal (`column-fill: auto`) ;
  - en dessous, lecture verticale classique ;
  - les règles `break-*` évitent les titres orphelins et les listes coupées : les vérifier quand on touche au contenu.
- **`FillTitle`** (`src/components/FillTitle.astro`) : titre en lettres creuses qui se remplissent au curseur, styles dans `global.css` (`.fill-title`). Il doit rester rapide (environ 1 s), car le propriétaire le trouve vite trop long.
- **Styles scopés Astro** : ils n'atteignent pas les éléments rendus par un composant enfant (par exemple le `h1` de `FillTitle`). Il faut passer par `:global(...)`.
- **Revue de design** : elle se fait avec le skill Hallmark.
  - Le tampon en tête de `global.css` (checked, waive, dismissed, answered) est à garder à jour.
  - Vérification : `node ~/.claude/skills/hallmark/scripts/sloplint.mjs <fichiers> --genre editorial --render --url http://localhost:4329/`.
  - Le FAIL 34 sur `template.astro` est un faux positif : le fichier est analysé sans `global.css`.

## Accessibilité et SEO

- Dans le code, le titre vient avant la date et les sujets ; l'ordre visuel est rétabli avec `order` en CSS.
- Les tags sont des listes (`<ul>` contenant des `<li class="tag">`).
- Un lien d'évitement mène à `#contenu`.
- Les SVG décoratifs portent `aria-hidden="true"`.
- Les métadonnées (titre, Open Graph, JSON-LD, RSS) sont centralisées dans `src/layout/template.astro`. Le nom du site est « Carnet d’Adrien », l'auteur « Adrien Saunier ».
- Repères Lighthouse mobile : performance ≥ 97, et 100 en accessibilité, bonnes pratiques et SEO. Le CSS est intégré aux pages (`inlineStylesheets: 'always'`) et les polices latines sont préchargées.
- À faire : des images de partage 1200×630 par article. L'image actuelle est l'avatar de 210 px.
