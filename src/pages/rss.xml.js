import rss from '@astrojs/rss';

const isDev = import.meta.env.DEV;

export async function GET(context) {
    const allPosts = Object
        .values(import.meta.glob('./posts/*.md', {eager: true}))
        .filter((post) => post.frontmatter.published || isDev)
        .map((post) => ({
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            link: post.url,
            pubDate: new Date(post.frontmatter.pubDate),
        }))

    return rss({
        title: 'Carnet d’Adrien',
        // Champ `<description>` dans le fichier xml de sortie
        description: "Les notes de production d’Adrien Saunier : développement, observabilité, SRE et gestion d’incidents.",
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
