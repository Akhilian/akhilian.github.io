---
layout: '../../layout/article.astro'
title: 'Trois semaines avec Cursor AI : entre promesses et agacement'
pubDate: 2025-04-20
published: true
tags: ['IA', 'Cursor AI', 'Développement']
---
> **Note :** Cet article a été écrit en avril 2025, après trois semaines d'utilisation de Cursor AI. Pour aller au bout de l'expérience, l'article a été rédigé par une IA mais alimenté par mes réflexions et retours d'expérience.
> 
> **Disclaimer:** Le monde de l'IA évolue rapidement, l'expérience (mitigée) pourrait évoluer. 

Depuis trois semaines, je code avec Cursor AI, un éditeur "augmenté par l’IA" censé booster la productivité des développeurs. **Spoiler :** l’expérience oscille entre moments d’euphorie et soupirs agacés.

Dans cet article, je partage mes observations en mode vibe coding, sans filtre. Pas un test exhaustif, mais un retour pragmatique sur ce que ça change, ce que ça casse, et les questions que ça ouvre.

## Un copilote qui écrit beaucoup… parfois trop
Premier constat : Cursor génère du code. **Beaucoup**. Presque trop.

Il complète, extrapole, suggère. C’est impressionnant, mais pas toujours pertinent. Il m’est arrivé de voir l’éditeur installer une dépendance… puis l’oublier quelques minutes plus tard. Ou la réinstaller, sans explication. Résultat : du bruit dans le package.json, des erreurs au runtime, et cette désagréable sensation de manque de contrôle.

Ce n’est pas qu’un bug technique. C’est un problème de confiance.

## Une vélocité artificielle, un feedback loop frustrant
Cursor détecte des duplications, propose de les factoriser, parfois avec brio. Mais chaque modification déclenche une phase de « réflexion IA », puis une autre pour « appliquer les changements », et encore une pour « sauvegarder ».

**Ce qui donne :**

Tu proposes un changement → tu attends → l’IA mouline → tu patientes → tu testes → tu te demandes pourquoi l’ancienne feature ne marche plus.

Résultat : une expérience morcelée, avec une appli souvent cassée après des modifications IA, des reverts aléatoires, et des features qui disparaissent sans prévenir. J’ai passé plus de temps à observer des « preview » qu’à coder réellement.

## Graphisme, terminal & monorepos : l’IA a ses angles morts
Si vous confiez à Cursor la création d’un design ou d’une interface, attendez-vous à des résultats… disons, discutables.
Le goût graphique de l’outil est franchement douteux, sauf si vous aimez les UI style années 2010.

Côté terminal, Cursor semble souvent perdu. Il perd le contexte dès qu’on enchaîne quelques commandes, comme s’il n’avait pas une mémoire de session fiable.

Idem pour les monorepos : le lien entre les projets est difficile à maintenir, et l’IA fait rapidement des raccourcis risqués. Faire la distinction entre les différents projets d’un monorepo est un vrai défi pour elle, surtout si les technologies sont variées (NodeJs & Terraform par exemple).

## L’importance du guidage : deux expériences très différentes

J’ai tenté deux approches :

1. **Mode freestyle:** je laisse Cursor proposer, compléter, s’exprimer. Résultat : du bruit, du code parfois utile, parfois inutile, et beaucoup de frustration.
2. **Mode coaché:** je guide chaque étape, je pose des questions ciblées, je fais écrire les tests avant l’implémentation (TDD), je le ramène dans les rails dès qu’il dévie. Là, l’expérience est nettement meilleure.

**Exemple :** la mise en place d’une infra avec Backstage en self-hosted. Cursor a galéré sur les volumes Kubernetes, mais a su s’appuyer sur la doc (heureusement bien écrite).

Mieux encore : si je l’interrompais pour corriger un point, il reprenait le fil là où on s’était arrêté. On aimerait que ça soit tout le temps le cas.

## Quand il bricole un Helm chart… mais utilise une version de 2021

Autre test : génération d’un Helm Chart umbrella. Le code était globalement bon, mais il a utilisé une version de chart obsolète (5.55) alors que j'avais besoin de la 7.18.

**Leçon : ne jamais faire confiance à Cursor pour la gestion des versions**. Vérifiez systématiquement ce qu’il génère. Il hallucine parfois des APIs qui n’existent plus depuis 3 ans.

Ce qu’il fait bien (quand même)
Malgré tout, Cursor peut être utile, notamment pour :
* Générer une doc technique assez correcte (README.md)
* Réécrire/refactoriser du code verbeux 
* Réagir rapidement quand il est guidé avec précision

# En conclusion: une IA pas encore dev-friendly par défaut.

Cursor est un outil prometteur, mais encore immature pour une utilisation sereine en environnement de production. Il a besoin :
* d’un meilleur contexte global (pour suivre une logique de repo ou de projet)
* d’un feedback loop plus rapide et fiable
* d’un encadrement plus strict (TDD, specs claires, étapes décomposées)

Utilisé avec précaution, il peut devenir un assistant utile. Mais si vous le laissez prendre les commandes, attendez-vous à nettoyer derrière lui.

**TL;DR**

* ✅ Génère beaucoup de code, parfois utile
* ❌ Perds le contexte (terminal, monorepo…)
* ❌ Casses fréquentes, reverts surprenants
* ✅ Se débrouille avec la doc, reprend bien le fil
* ❌ Mauvaise gestion des versions
* ✅ README techniques corrects
* ⚠️ Nécessite un guidage précis pour devenir utile



