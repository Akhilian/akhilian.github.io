---
layout: '../../layout/article.astro'
title: '📚 Observability Engineering : Fiche de lecture'
pubDate: 2025-01-13
description: 'This is the first post of my new Astro blog.'
published: true
tags: [ "astro", "blogging", "learning in public" ]
---

## What I've accomplished

Une des choses qui me fascine le plus dans le secteur de l'informatique, c’est que celui-ci évolue constamment. Et qu’il
le fait à grande vitesse.

Les usages de nos utilisateurs, leurs attentes et les changements d'échelle de notre industrie nous ont poussés à des
innovations technologiques et à des changements de méthodes.

Dans les myriades de techniques qui ont évolué, changé ou muté, on parle évidemment de superviser nos systèmes en
production.

Lors de notre passage à la SRE Con, nous avions remarqué que l’observabilité était un thème qui revenait régulièrement
dans les talks et c’est à cette occasion que nous avons découvert le livre “Observability Engineering”.

## What's next

I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.

```html
<div class="blog">
    <h1>{frontmatter.title}</h1>
    <p>{frontmatter.pubDate}</p>
    <div>
        <slot/>
    </div>
</div>
```
