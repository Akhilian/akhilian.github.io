---
layout: '../../layout/article.astro'
title: '📚 Observability Engineering : Fiche de lecture'
pubDate: 2025-01-13
description: 'Fiche de lecture du livre « Observability Engineering » de Charity Majors, Liz Fong-Jones et George Miranda : ce que le livre promet, ce que j’en ai retenu et ce que j’ai aimé.'
published: true
tags: [ "observability", "lecture"]
---

Une des choses qui me fascine le plus dans le secteur de l'informatique, c’est que celui-ci évolue constamment. Et qu’il
le fait à grande vitesse.

Les usages de nos utilisateurs, leurs attentes et les changements d'échelle de notre industrie nous ont poussés à des
innovations technologiques et à des changements de méthodes.

Dans les myriades de techniques qui ont évolué, changé ou muté, on parle évidemment de superviser nos systèmes en
production.

Lors de notre passage à la SRE Con, nous avions remarqué que l’observabilité était un thème qui revenait régulièrement
dans les talks et c’est à cette occasion que nous avons découvert le livre “Observability Engineering”.

## Observability Engineering

C’est en juin 2022 que Charity Majors, Liz Fong-Jones et George Miranda ont publié sur la plateforme O’Reilly un livre entièrement dédié au sujet de l’observabilité, dont la rédaction a commencé en 2019.

Il est important de noter que les auteur·ices de cet ouvrage appartiennent tous à Honeycomb (fondé en 2016), un éditeur de solution d’observabilité.

C’est une information importante, car si leur expérience combinée apporte du crédit aux points de vue développés dans le livre, elle peut également biaiser les recommandations de celui-ci.

Cependant, il est à noter que les auteur·ices font preuve de transparence sur ce sujet.

## Ce que la préface nous promet

Dans la préface, les auteur·ices se positionnent comme promoteurs de l’observabilité et cherchent à fournir une base de référence pour “déployer la pratique de l’observabilité dans une organisation”.

Ils observent notamment que la notion d’observabilité connaît une phase de popularité croissante depuis quelques années, mais souvent traitée comme un équivalent de monitoring ou de télémétrie.

> With its rise in popularity, “observability” has been unfortunately mischaracterized as a synonym for “monitoring” or “system telemetry.”

Le livre propose de redéfinir ce qu’est l’observabilité et de creuser les sujets suivants (traduction du livre) :

* Ce que l’observabilité signifie dans le contexte de livraison logicielle et des opérations
* Comment construire les composants fondamentaux qui aident à atteindre l’observabilité
* L’impact que l’observabilité a sur la dynamique d’équipe
* Des considérations sur l’observabilité à l’échelle
* Des façons pratiques de construire une culture de l’observabilité

### À qui s’adresse le livre

Puisque l’observabilité cherche avant tout à atteindre une meilleure compréhension de ce qui se passe dans nos systèmes une fois le code déployé, ce livre s’adresse avant tout aux ingénieurs qui se chargent de développer et exploiter ces systèmes.

Dans un second temps, le livre s’adresse aux managers pour qui l’observabilité pourrait être un moyen de faire progresser leur organisation.

Une grande partie de l’ouvrage consiste également à rappeler que construire et opérer du logiciel en production est avant tout un sport d’équipe et que l’adoption des pratiques est à la fois un défi technique et culturel.

## Ce que j’en ai retenu

Si la promesse du livre est globalement tenue, toutes les sections ne se valent pas.

Je vous propose de parcourir ce que j’ai retenu du livre, en bien comme en moins bien.

## Ce que j’ai aimé

Une bonne introduction à l’observabilité


Le livre pose des bases pour mieux définir l’observabilité, y compris en parlant de ce qui rend le concept parfois flou. Après tout, qu’est-ce que l’observabilité ? Un outil ? Une pratique ? Un concept ?

Selon les auteur·ices, l’observabilité vise à comprendre (traduction du livre) :
le fonctionnement interne de votre application
tous les états du système dans lesquels votre application peut se retrouver, y compris ceux que vous n'avez jamais vus auparavant et que vous n'auriez pas pu prédire.
le fonctionnement interne et l'état du système uniquement en l’observant et en l’interrogeant avec des outils externes
l'état interne du système sans modifier le code (parce que cela implique d’avoir besoin de connaissances préalables pour l'expliquer)
Le dernier me parle assez, car il m’est arrivé de devoir re-déployer une application en espérant que les quelques logs ajoutés au passage allaient m’aider à comprendre ce qui se produisait. Raté pour l’observabilité !

Cependant, cette définition manque d’une façon de s’y prendre.

Monitoring ou observabilité ? Quid du monitoring ?
Parfois présentés comme interchangeable, le livre explicite une différence assez fondamentale.

En quelques mots, le monitoring se réfère à la collecte de métriques, donc à la surveillance de comportements déjà connus.
Le monitoring décrit une approche réactive à des problèmes connus à l’avance ou déjà vécus. C’est efficace pour de l’alerting, mais ne permet pas de débugger le système quand celui-ci rentre dans un état inconnu jusqu’ici.

Ça entre dans les détails
Le livre n’hésite pas à aller dans les détails, y compris techniques, et c’est appréciable.


Par exemple, le livre couvre les types de données (log, trace et métrique) et prendre le temps de décomposer la structure interne avec des exemples à l’appui pour illustrer les mécanismes.

On parle de volumétrie et de stockage. On parle également de notion de cardinalité et de dimensions.
On évoque aussi les techniques de sampling pour mieux contrôler la volumétrie de données tout en limitant la perte en qualité d’observabilité.

Sur les points ardus, spécifiquement la propagation de contexte dans les traces, les explications sont claires, exemple de code à l’appui.


La fin de logs, métriques, traces ?
Ces trois types de données sont souvent présentés comme les “3 piliers de l’observabilité”.
C’est cependant ignorer la dimension socio-technique de nos pratiques.

Le livre insiste sur le fait que collecter ces données ne suffit pas pour atteindre de l’observabilité, même si c’est une étape obligatoire.

> Observability is often mischaracterized as being achieved when you have “three pillars” of different telemetry data types, so we aren’t fans of that model.

Pourquoi se fier à notre intuition est risqué ?
En cas d’incident, la réaction d’une équipe a tendance à s’appuyer sur pourra mettre en route sur deux biais cognitifs dangereux.

D’abord, quand un système est en panne et que le niveau d’information est insuffisant, l’équipe aura tendance à s’appuyer sur son intuition, une intuition qu’elle a accumulée par des expériences passées. Seulement, dans des systèmes qui se complexifient, il est peu probable que l’incident en cours soit un incident déjà rencontré par le passé. L’intuition pourra nous guider dans une mauvaise direction.

Ensuite, on s’appuiera volontiers sur les plus séniors de l’équipe, car ayant une connaissance plus approfondie du système.

L’observabilité, c’est être capable de comprendre l’état d’un système, indépendamment de notre connaissance du système ou des nouveaux états.
