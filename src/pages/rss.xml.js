import rss from '@astrojs/rss';

const isDev = import.meta.env.DEV;

export async function GET(context) {
    const allPosts = Object
        .values(import.meta.glob('./posts/*.md', {eager: true}))
        .filter((post) => post.frontmatter.published || isDev)
        .map((post) => ({
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            url: post.url,
            date: post.frontmatter.pubDate,
        }))

    console.log(allPosts);

    return rss({
        title: 'Adrien Saunier - Blog',
        // Champ `<description>` dans le fichier xml de sortie
        description: "De temps en temps, j'écris des articles.",
        // Extraire la propriété "site" de votre projet dans le contexte du point de terminaison.
        // https://docs.astro.build/fr/reference/api-reference/#site
        site: context.site,
        // Tableau des `<item>`s dans la sortie xml
        // Voir la section "Génération d'éléments" pour des exemples utilisant des collections de contenu et des importations globales.
        items: allPosts,
        // (optional) injecter du xml personnalisé
        customData: `<language>fr-fr</language>`,
    });
}
