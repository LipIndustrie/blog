---
name: seo-indexation-2026
description: Bonnes pratiques SEO 2026 (E-E-A-T, helpful content, structure, meta, SEO local industrie, données structurées) à appliquer lors de la rédaction des articles du blog LIP Industrie. À consulter AVANT de rédiger, optimiser ou relire tout article.
---

# SEO & indexation 2026 — Guide de rédaction du blog LIP Industrie

Objectif du blog : renforcer le référencement naturel du domaine principal **lip-industrie.com**
(mécanique de précision, Besançon). Chaque article doit viser une requête métier précise, apporter
une vraie valeur, et renvoyer de l'autorité vers le site principal.

> Pour toute donnée factuelle sur l'entreprise (machines, secteurs, certifications, coordonnées),
> utiliser le skill **entreprise-lip** — ne jamais inventer un chiffre ou une capacité.

---

## 1. E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

C'est devenu un facteur de classement concret en 2026, pas qu'une consigne qualité. À appliquer :

- **Experience** : ancrer le contenu dans le vécu de l'atelier — « voici comment on usine telle
  pièce », retours terrain, photos réelles des machines/pièces, +30 ans de métier. Pas de
  généralités que n'importe qui pourrait écrire.
- **Expertise** : contenu signé par une personne identifiée avec son rôle (ex. responsable atelier,
  qualité, méthodes). Montrer la profondeur technique (tolérances, matériaux, procédés).
- **Authoritativeness** : citer les certifications (ISO 9001), les secteurs exigeants servis
  (médical, aéronautique, spatial, armement), lier vers les pages de référence du site principal.
- **Trust** : informations exactes et vérifiables, cohérence NAP (nom/adresse/téléphone), pas de
  promesse non tenable. La confiance est le socle : une page non fiable a un E-E-A-T faible quelle
  que soit son expertise apparente.

## 2. Helpful content / people-first

- Écrire **pour un lecteur réel** (donneur d'ordre, acheteur industriel, bureau d'études), pas pour
  le moteur.
- Répondre réellement à une intention : « comment choisir un sous-traitant pour une pièce médicale »,
  « tournage CNC vs traditionnel », « qu'est-ce que l'électroérosion fil ».
- **Bannir le contenu générique / mass-produced** (y compris IA sans valeur ajoutée). Différencier
  avec : exemples concrets, cas d'usage, données chiffrées, visuels originaux, point de vue métier.
- Un article = un sujet net. Mieux vaut un contenu profond qu'un survol superficiel.

## 3. Structure d'article

- **1 seul H1** (= le titre de l'article).
- Hiérarchie **H2 / H3** claire et logique ; mots-clés insérés **naturellement** dans les titres.
- Paragraphes **courts**, listes à puces, **étapes numérotées** pour les process.
- Mettre une accroche qui répond à l'intention dès l'introduction.
- Terminer par un **résumé / points clés** et un appel à l'action vers le site principal (devis,
  contact).

## 4. Title tag (balise titre)

- **50–60 caractères**.
- Mot-clé principal **au début**.
- Format recommandé : `Mot-clé principal | LIP Industrie` (ou variante avec modificateur).
- Modificateurs utiles pour le longue-traîne : « guide », « Besançon », année, « CNC ».
- Titre juste et attractif → Google le réécrit moins.

Dans Astro, le title vient du frontmatter `title` de l'article (voir `src/content.config.ts`).

## 5. Meta description

- **150–160 caractères** (~920 px desktop).
- Résume l'article + **donne une raison de cliquer**.
- Contient le mot-clé principal **une fois**.
- **Jamais identique** au title, phrase naturelle.

Dans Astro, elle vient du frontmatter `description` de l'article.

## 6. Mots-clés & intention de recherche

Secteur B2B de niche : **faible volume mais prospects ultra-qualifiés**. Prioriser l'intention et le
vocabulaire métier précis plutôt que le volume brut.

Exemples de requêtes à cibler :
- « sous-traitant mécanique de précision Besançon / Franche-Comté »
- « usinage CNC [secteur] » (médical, aéronautique, spatial…)
- « tournage fraisage précision Bourgogne-Franche-Comté »
- « électroérosion fil sous-traitance »
- « rectification plane / cylindrique petite série »
- « fabricant pièces usinées unitaire et moyenne série »

Méthode : une **requête cible par article**, décliner les variantes dans H2/H3 et le corps.

## 7. SEO local

- Ancrer géographiquement : **Besançon**, **Doubs (25)**, **Franche-Comté**,
  **Bourgogne-Franche-Comté**.
- Cohérence **NAP** stricte (voir skill entreprise-lip) : même nom, même adresse, même téléphone
  partout.
- Articles qui renforcent la **fiche Google Business**.
- Le SEO local sert la sous-traitance de proximité ; pour les marchés nationaux/export, viser plutôt
  le secteur + le procédé.

## 8. Maillage interne

- Lier **vers les pages du site principal** avec des ancres descriptives :
  - Usinage : https://www.lip-industrie.com/usinage-numerique-traditionnel/
  - Solutions adaptées : https://www.lip-industrie.com/des-solutions-adaptees/
  - Moyens techniques & humains : https://www.lip-industrie.com/nos-moyens-techniques-humains/
  - Contrôle & qualité : https://www.lip-industrie.com/controle-qualite/
  - Contact : https://www.lip-industrie.com/nous-contacter/
- Lier **entre articles** du blog (cocon sémantique).
- Ancres descriptives (« notre parc de tournage CNC ») plutôt que « cliquez ici ».

## 9. Données structurées (JSON-LD)

Types prioritaires en 2026 : **Organization / LocalBusiness**, **BlogPosting**.

- **BlogPosting** sur chaque article : `headline`, `datePublished` (ISO 8601), `dateModified`,
  `author` (Person ou Organization avec au moins un `name`), `image`.
- **Organization / LocalBusiness** au niveau du site : nom, adresse, téléphone, URL, logo (voir
  skill entreprise-lip pour les valeurs).

Implémentation Astro : injecter un `<script type="application/ld+json">` dans le layout partagé
(`src/components/BaseHead.astro` ou `src/layouts/BlogPost.astro`), alimenté par le frontmatter.
Valider avec le Rich Results Test de Google.

## 10. Checklist pré-publication

- [ ] Requête cible unique identifiée
- [ ] Title 50–60 car., mot-clé au début, marque
- [ ] Meta description 150–160 car., incitation au clic, ≠ title
- [ ] 1 seul H1, hiérarchie H2/H3 propre
- [ ] Paragraphes courts, listes, résumé final
- [ ] Attribut `alt` descriptif sur chaque image
- [ ] Slug court et lisible
- [ ] Maillage interne (site principal + autres articles)
- [ ] Ancrage local si pertinent (Besançon / Franche-Comté)
- [ ] Faits vérifiés via skill entreprise-lip (aucun chiffre inventé)
- [ ] Auteur identifié (E-E-A-T)
- [ ] Données structurées BlogPosting présentes
- [ ] Appel à l'action vers devis/contact

---

## Sources (SEO 2026)

- Google's March 2026 Core Update — content best practices : https://www.evertune.ai/resources/insights-on-ai/googles-march-2026-core-update-a-content-best-practices-guide-for-seo-and-ai-search
- Google E-E-A-T, guide complet 2026 : https://www.incremys.com/en/resources/blog/eeat
- Helpful Content en 2026 : https://www.hobo-web.co.uk/the-google-helpful-content-update-and-its-relevance-in-2026/
- 47 SEO best practices 2026 : https://almcorp.com/blog/seo-best-practices-complete-guide-2026/
- Title tags & meta descriptions 2026 : https://seeklab.io/blog/on-page-seo-titles-metas-structure/
- SEO industrie / sous-traitance mécanique (FR) : https://agence810.fr/secteurs/industrie/
- Référencement local 2026 : https://jonathan-boetsch.fr/blog/referencement-local-encore-efficace-2026/
- JSON-LD / structured data pour Astro : https://www.maviklabs.com/blog/astro-structured-data-guide-2026
- LocalBusiness schema guide 2026 : https://flawlessschema.com/blog/local-business-schema-guide-2026
