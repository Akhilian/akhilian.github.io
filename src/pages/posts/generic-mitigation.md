---
layout: '../../layout/article.astro'
title: '🚨 En cas d’urgence, brisez la glace : “generic mitigations” et gestion d’incident'
pubDate: 2024-07-24
description: 'Cet article propose de détailler quatre exemples de generic mitigation, qui m’ont été bien utiles par le passé.'
published: true
tags: [ "site reliability engineering", "production", "incident"]
---

> Cet article a été initialement publié sur le blog
> de [OCTO](https://blog.octo.com/en-cas-d%27urgence-brisez-la-glace--generic-mitigations-et-gestion-d%27incident).

J’ai une mauvaise nouvelle pour vous.

Demain, la semaine prochaine, le mois prochain ou celui d’après, dans l’année avec un peu de chance, votre système
informatique va rencontrer des incidents. Et la **[loi de Murphy](https://fr.wikipedia.org/wiki/Loi_de_Murphy)** ne nous
épargnant jamais, cet incident se produira toujours au pire moment possible.

Si le système en question est d’importance secondaire, l’impact sera faible, avec une urgence modérée, ce qui nous
laissera le temps de réagir et de trouver une solution pérenne. Dans l’idéal, on aura un peu de monitoring à notre
disposition pour détecter puis agir avant que les utilisateurs ne s’en rendent compte.

Mais si le système en question est crucial pour l’entreprise, alors, **il vaut mieux être préparé à gérer cette
situation
d’incident**. La situation étant déjà assez stressante, autant mettre toutes les chances de notre côté.

S’il est impossible d’envisager toutes les sources, il est cependant possible de prévoir quelques réponses qui
permettront de protéger les utilisateurs en cas d’incident.

Vous l’aurez compris, dans cet article, nous allons parler de gestion d’incident.
Plus précisément, nous allons parler de **_generic mitigations_**.

# Incident, résolution et mitigation

Puisque nous allons parler de gestion d’incident, commençons par du vocabulaire.

Il n’existe pas de définition universelle d’un **_incident_**. En fonction du contexte, le mot incident peut couvrir des
réalités et des urgences différentes. Cependant, pour le reste de l’article, je vous propose la définition suivante :

Un **incident** survient quand le système se retrouve dans un état qui demande une intervention **immédiate**, et que *
*les
utilisateurs de ce système sont impactés**.

La gestion d’incident, c’est alors l’ensemble des processus, personnes et actions mises en œuvre pour permettre
l’identification de la (ou les) panne(s), pour assurer la communication, et essayer de limiter autant que possible
l’impact sur les utilisateurs. Cette situation inhabituelle est souvent stressante pour les équipes et – sans
préparation – parfois redoutée.

Il y a beaucoup de choses à dire sur le sujet, mais concentrons-nous aujourd’hui sur deux concepts : **résolution** et
**mitigation**.

Si la **résolution** d’un incident correspond au moment où les dysfonctionnements du système ainsi que ses effets de
bord
ont été gérés (au point où le système retrouve un état stable), on parlera plutôt de mitigation quand les solutions
déployées visent à contenir l’effet (ou les effets) de l’incident afin d’impacter au minimum nos utilisateurs. Une
mitigation fait souvent office de solution transitoire.

Plus le système que l’on opère est complexe, plus il peut être difficile d’isoler la cause d’un dysfonctionnement. Entre
un système monolithique servant des pages HTML, et une architecture distribuée à base de chorégraphie entre
microservices, les efforts d’investigation demandés pourront passer de triviaux à titanesques.

Et même si on aimerait bien maîtriser à 100% nos systèmes, il y aura toujours des facteurs imprévisibles. Par exemple,
difficile d’anticiper qu’un reportage au journal télévisé qui parlerait d’un de nos systèmes donne envie à des milliers
de personnes de se connecter soudainement.

Il vaut mieux avoir quelques réponses prévues dans sa besace, pour réagir **rapidement** et en **toute sécurité**.

## Les “generic mitigations”

Une _generic mitigation_, c’est une **mitigation prévue** qui vise à réagir **rapidement** à une large variété de pannes
qui pourraient impacter nos utilisateurs et dégénérer en incident.

La force de cette catégorie de mitigations, c’est qu’elles sont peu spécifiques, et permettent d’agir sur une catégorie
de problème et non un problème précis. Et c’est tout l’intérêt ! **Pas besoin de comprendre l’ensemble du problème et
ses
implications pour activer une generic mitigation**.

L’ambition des _generic mitigations_ est de **se donner du temps** afin de résoudre le problème plus sereinement. Il
faudra
malgré tout identifier la cause du problème, trouver une solution et la mettre en place, mais elle permettra d’épargner
nos utilisateurs durant l’intervalle.

# Zoom sur 4 types de generic mitigation

Pour cet article, je vous propose de détailler quatre exemples de generic mitigation, qui m’ont été bien utiles par le
passé. Ce ne sont que quatre exemples, il existe plein d’autres façons d’imaginer des mitigations, gardez en tête que la
liste n’est pas exhaustive.

## Rollback

Cette mitigation est probablement la plus commune de toutes. Si automatiser le processus de déploiement d’une nouvelle
version est maintenant une pratique assez commune, le processus de retour à la version précédente n’est pas toujours
aussi outillé, et c’est bien dommage.

Dans le stress de l’incident, il est tentant d’essayer de trouver une solution rapidement pour pousser un correctif, en
approche move forward.

Le risque : proposer une solution basée sur une compréhension partielle et parfois d’aggraver la situation.

**Recommandations :**

- Mettre en place un outillage pour être capable de revenir rapidement à la version précédente
- Conserver les artefacts de la version (image ou tag) permettant de cibler une version particulière sans ambiguïté…
  Croyez-moi, les commits id ne sont pas vos amis sous la pression.
- Essayer de réduire la taille des changements. Revenir en arrière sur quelques jours de travail n’est pas aussi
  impactant que quelques semaines, et permet une relative sérénité.

## Schéma rollback

Cette mitigation est une variante assez délicate de la précédente. Lorsque le logiciel évolue, la structure de nos bases
de données peut évoluer en même temps (on parle de migration de base de données). Ces évolutions impliquent souvent deux
étapes, la première étant la mise à jour du schema de la base de données et la seconde une adaptation des données
existantes.
C’est une opération sensible, car elle peut provoquer des indisponibilités ou des ralentissements.

Le code et la structure de la base de données allant souvent de pair, il est parfois nécessaire de revenir à la
structure précédente. Malheureusement, cette partie n’est pas si régulièrement testée.

**Recommandation :**

- Tester la procédure de temps en temps sera salutaire le jour où il faudra le faire en production (Ce conseil est
  également valable pour la mitigation précédente).

**Pour aller plus loin :** Il existe des techniques permettant de limiter – voire supprimer – les ralentissements, voire
des
downtime liés aux migrations de schéma des données. On retrouve certaines de ces techniques sous le terme de [Zero
Downtime Deployment](https://blog.octo.com/zero-downtime-deployment).

## Dégrader la qualité de service

Une autre situation qui met parfois nos systèmes en échec, c’est quand ils doivent encaisser une charge plus importante
que prévu ou que l’un des composants se met à moins bien fonctionner que d’ordinaire. Dans ces conditions, le service va
montrer des signes de faiblesses sous la forme de temps de réponse qui se dégradent ou d’erreurs qui augmentent sans
pour autant être totalement hors service.

Par exemple, chez un de nos clients, notre application dépendait d’un système partenaire de validation d’identité pour
la création de compte. Après quelques secondes de validation, nous pouvions confirmer à l’utilisateur que la création
s’était correctement passée. Nous avions identifié que ce partenaire ne serait pas en mesure d’encaisser une forte
sollicitation. Le site étant très médiatisé, il était probable que ce système ne tiendrait pas en cas d’exposition
médiatique forte.

**Quelle option ?**
L’objectif de cette mitigation est de remplacer les opérations/features les plus coûteuses (en CPU par exemple) par des
versions dégradées de celles-ci.

**Exemple : Temporiser les traitements**

Par exemple, on mettra en place des files permettant de temporiser le traitement. On pourra aussi s’autoriser une
fraîcheur de la donnée plus faible ou moins précise. De cette manière, on soulage la tension sur le système tout en
continuant à rendre le service, mais dans un mode dégradé.

Notre solution avait été de protéger le système en question via un mécanisme de seuil. En activant cette mitigation, les
utilisateurs étaient informés que la validation de leur compte arriverait un peu plus tard. L’expérience est alors un
peu dégradée. Cependant, quand notre application est passée dans les médias à plusieurs reprises et que nous avons
activé cette mitigation, le système est resté opérationnel, y compris lors de l’afflux massif d’utilisateurs.

**Pour aller plus loin :**

Cette generic mitigation nécessite de prendre un peu de recul sur notre design et d’identifier ce qui pourrait causer
des problèmes sous certaines conditions et voir s’il est possible de rendre le service plus résilient. Il s’agit
d’adopter une philosophie de Design for failure et plus précisément ici, ce qu’on pourra qualifier de Graceful
degradation.

Pour démarrer, représenter son architecture et identifier les risques est un bon point de départ. Des tests de
performance type stress test peuvent permettre de confirmer les hypothèses ou découvrir d’autres points d’attention.

En fonction des résultats, il s’agira d’identifier si une generic mitigation est possible ou si d’autres actions sont
nécessaires.

## Augmenter la taille du système (upsize)

Historiquement, augmenter la taille de l’infrastructure était une opération longue et difficile, ce qui limitait notre
capacité à faire croître le système en cas de besoin. Il n’était donc pas inhabituel de provisionner plus de capacités
en prévision, car notre capacité de réaction était réduite.

Cette époque a bien changé. Avec la généralisation des techniques d’infrastructure-as-code, des clouds providers et des
technologies de conteneurisation, il est maintenant possible de modifier (sous certaines conditions) le dimensionnement
de l’infrastructure avec beaucoup plus de souplesse allant jusqu’à l’automatisation (ce qu’on appelle l’auto-scaling).
On parlera de scaling horizontal quand il s’agit d’ajouter des réplicas ou des machines) ou vertical en augmentant le
CPU ou la RAM par exemple.

**Ce qu’il faut considérer**

Augmenter la taille d’une machine ou modifier le nombre de réplicas n’est pas une opération triviale et implique d’avoir
rendu son système scalable. Ce n’est donc pas disponible “par défaut”, et rendre un système scalable ne se fait pas
pendant la gestion d’un incident (les pré-requis à la scalabilité sont nombreux, que je ne détaillerai pas ici).

De plus, sous la pression d’un incident, il est tentant de croire que le scaling sera la réponse ultime à des problèmes
de surcharge et de performance. Seulement, votre système ne pourra pas s’étendre uniformément et certaines parties ne
pourront tout simplement pas scaler sereinement en période d’incident.

Enfin, augmenter la taille d’une infrastructure implique aussi des coûts à surveiller.

**Un exemple : Quand le scaling n’est plus une solution.**

Nous intervenions sur une application qui s’occupait de calculs complexes à partir d’un outil de gestion de stock. Suite
à une communication Instagram qui est devenue virale, le système a été progressivement de plus en plus sollicité et
l’application a commencé à générer des erreurs. La puissance de calcul prévue n’étant plus adaptée à la demande, nous
l’avons augmentée, ce qui a temporairement réglé le problème.

Manque de chance, le trafic a continué d’augmenter jusqu’à que ce soit au tour de l’outil de gestion de stock de devenir
la cause du problème. Malheureusement, impossible de faire croître cet outil sans causer une indisponibilité totale de
la plateforme.

En scalant une partie du système, nous n’avions fait que **déplacer la tension** sur une autre section du système.

## Conclusion

On sous-estime souvent notre besoin de préparation quand il s’agit de gérer un système en production. Puisqu’il n’est
pas possible d’anticiper quelle sera la prochaine panne, on est souvent mal armé pour réagir quand celle-ci survient.

C’est là qu’interviennent les *generic mitigation*! En mettant en place quelques outils, je dote mon système d’un “red
button” que je peux activer sereinement quand des dysfonctionnements menacent mes utilisateurs. Un sacré outil à ne pas
sous-estimer !

Évidemment, ce n’est pas une solution à tout. Les generic mitigations sont une façon de se préparer, mais il existe
d’autres pratiques qui permettent d’anticiper, d’expérimenter, réduire notre temps de réaction, etc. Notamment,
n’oublions pas que pour debugger l’incident et identifier la/les causes racines, investir sur l’observabilité sera un
allié précieux.

Pour avoir vécu des incidents avec et sans ces outils à ma disposition, je ne peux que vous inviter à envisager quels
seraient les “red buttons” dont vous auriez besoin, car ils se sont révélés très précieux pour nos utilisateurs… et
moi !

**Quelques sources annexes :**

- L’article [“Generic Mitigation”](https://www.oreilly.com/content/generic-mitigations/) (EN) qui a inspiré celui-ci
- Le livre “Anatomy of an incident” (Ayelet Sachto & Adrienne Walcer - OReilly)
- [Zero Downtime Deployment](https://blog.octo.com/zero-downtime-deployment)
- [SRE : Les bonnes pratiques pour améliorer la fiabilité de ses services](https://blog.octo.com/sre-les-bonnes-pratiques-pour-ameliorer-la-fiabilite-de-ses-services)
