# O-M-Dev-Logiciel

Ce dépôt regroupe les travaux de conception et de développement logiciel réalisés
dans le cadre du module de développement logiciel.

## Contenu du dépôt

Le dépôt contient actuellement deux parties :

- `Gest Empr/` : application web de gestion d'une bibliothèque, développée avec
  React, TypeScript, Vite et Tailwind CSS.
- `inscription_doctoral/` : diagrammes d'activités UML liés aux processus
  d'inscription et de réinscription au cycle doctoral.

## Structure du dépôt

```text
O-M-Dev-Logiciel/
├── Gest Empr/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── manager/
│   │   │   ├── member/
│   │   │   └── ui/
│   │   ├── data/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── tsconfig*.json
│   └── vite.config.ts
├── inscription_doctoral/
│   ├── diagramme_activite_inscription_numerique.png
│   ├── diagramme_activite_inscription_reelle.png
│   ├── diagramme_activite_reinscription_numerique.png
│   └── diagramme_activite_reinscription_reelle.png
├── .gitignore
└── README.md
```

## Installation et lancement de l'application

Depuis la racine du dépôt :

```bash
cd "Gest Empr"
npm install
npm run dev
```

L'application est ensuite accessible à l'adresse indiquée par Vite, généralement
`http://localhost:5173`.

## Vérification de production

Pour vérifier que l'application se compile correctement :

```bash
cd "Gest Empr"
npm run build
```

Les fichiers générés dans `dist/` et les dépendances installées dans
`node_modules/` sont des fichiers locaux et ne sont pas suivis par Git.
