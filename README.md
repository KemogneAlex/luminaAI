<div align="center">
  <img src="./public/image.png" alt="LuminaAI image" width="200" />
  
  # LuminaAI - Plateforme IA Complète

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.3-000000?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.16.1-2D3748?logo=prisma)](https://www.prisma.io/)
  [![Stripe](https://img.shields.io/badge/Stripe-18.5.0-635BFF?logo=stripe)](https://stripe.com/)

  *La plateforme ultime pour la création et la gestion de contenu visuel professionnel*  
  *Une solution tout-en-un combinant facilité d'utilisation et fonctionnalités avancées pour les créateurs de contenu*
</div>

## 🌟 Qu'est-ce que LuminaAI ?

LuminaAI est une plateforme de création de contenu visuel innovante qui révolutionne la façon dont les créateurs, les marketeurs et les entreprises produisent des visuels de haute qualité. Notre solution tout-en-un intègre des technologies d'intelligence artificielle de pointe avec une interface utilisateur intuitive pour offrir une expérience de création fluide et puissante.

### 🔍 Pourquoi choisir LuminaAI ?
- **Création intuitive** : Une interface utilisateur moderne et réactive conçue pour les professionnels comme pour les débutants
- **Technologie IA avancée** : Générez et modifiez des visuels en quelques clics grâce à notre moteur IA performant
- **Collaboration en temps réel** : Travaillez en équipe sur des projets créatifs où que vous soyez
- **Écosystème complet** : Tous les outils dont vous avez besoin dans une seule plateforme unifiée
- **Sécurité renforcée** : Vos créations et données sont protégées par des protocoles de sécurité avancés

## 🚀 Fonctionnalités Principales

### 🔐 Authentification et Sécurité
- **Connexion sécurisée** avec NextAuth.js et fournisseurs OAuth (Google)
- **Gestion des sessions** avec chiffrement JWT
- **Gestion des cookies** sécurisée avec chiffrement et protection CSRF
- **Politique de cookies** conforme au RGPD avec consentement utilisateur
- **Protection des routes** et contrôle d'accès granulaire
- **Validation des formulaires** avec react-hook-form et Zod

### 🖥️ Interface Utilisateur Avancée
- **Design moderne** avec shadcn/ui, basé sur Radix UI et Tailwind CSS
- **Bibliothèque complète** de composants accessibles et personnalisables
- **Système de thèmes** clair/sombre avec support du mode système
- **Interface responsive** qui s'adapte parfaitement à tous les appareils
- **Animations fluides** avec Framer Motion pour une expérience utilisateur engageante
- **Composants riches** :
  - Menus déroulants et contextuels
  - Modales et dialogues accessibles
  - Système d'onglets et d'accordeons
  - Barres de progression et indicateurs de chargement
  - Outils de navigation avancés (breadcrumbs, pagination)
  - Éléments de formulaire stylisés et accessibles
- **Personnalisation** via les variables CSS et la configuration Tailwind

### 💰 Paiements et Abonnements
- **Paiements sécurisés** avec Stripe
- **Gestion des abonnements** et facturation récurrente
- **Tableau de bord client** pour gérer les abonnements
- **Webhooks** pour les événements de paiement

### ☁️ Stockage et Médias
- **Stockage cloud** avec Cloudinary
- **Optimisation d'images** automatique
- **Gestion des médias** avec ImageKit
- **Téléchargement** de fichiers sécurisé

### 📊 Tableau de Bord et Analytiques
- **Visualisation de données** avec Recharts
- **Statistiques** en temps réel
- **Téléchargement de données** en différents formats
- **Panneaux redimensionnables** pour une expérience personnalisée

## 🛠️ Stack Technologique

### Frontend
- **Framework**: Next.js 15.5.3 avec App Router
- **Langage**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 4 avec classes utilitaires
- **UI Components**: Radix UI Primitives
- **Animations**: Framer Motion
- **Gestion d'État**: React Context API
- **Formulaires**: React Hook Form avec validation Zod

### Backend
- **Base de données**: MongoDB avec Prisma ORM
- **Authentification**: NextAuth.js avec JWT
- **Paiements**: Stripe (abonnements et paiements uniques)
- **Stockage**: 
  - **Cloudinary** pour le stockage et l'optimisation des images
  - **ImageKit** pour la diffusion et la transformation d'images en temps réel
- **API Routes**: Next.js API Routes

### Outils de Développement
- **Validation**: Zod pour la validation des schémas
- **Formatage**: Prettier et ESLint
- **Gestion d'état**: React Hooks
- **Gestion des dates**: date-fns
- **Notifications**: Sonner pour les toasts

## 🚀 Mise en Route

### Prérequis
- Node.js 18+
- MongoDB Atlas ou local
- Comptes Stripe, Cloudinary et ImageKit

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/luminaai.git
   cd luminaai
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration de l'environnement**
   Créez un fichier `.env.local` à la racine du projet et ajoutez vos variables d'environnement :
   ```env
   # Base de données
   DATABASE_URL="mongodb+srv://votre-utilisateur:votre-mot-de-passe@cluster0.xxx.mongodb.net/votre-base-de-donnees"
   
   # Authentification
   NEXTAUTH_SECRET=votre_secret_tres_long_et_securise
   NEXTAUTH_URL=http://localhost:3000
   
   # Google OAuth
   GOOGLE_CLIENT_ID=votre-google-client-id
   GOOGLE_CLIENT_SECRET=votre-google-client-secret
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_ID=price_...
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=votre-cloud-name
   CLOUDINARY_API_KEY=votre-api-key
   CLOUDINARY_API_SECRET=votre-api-secret
   
   # ImageKit
   IMAGEKIT_PUBLIC_KEY=votre-public-key
   IMAGEKIT_PRIVATE_KEY=votre-private-key
   ```

4. **Initialiser la base de données**
   ```bash
   npx prisma db push
   ```

5. **Lancer l'application en mode développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. **Accéder à l'application**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du Projet

```
luminaai/
├── app/                    # Dossier principal de l'application
│   ├── api/               # Routes API
│   ├── dashboard/         # Tableau de bord utilisateur
│   ├── auth/              # Pages d'authentification
│   └── (marketing)/       # Pages marketing
├── components/            # Composants réutilisables
│   ├── ui/                # Composants UI de base
│   └── shared/            # Composants partagés
├── lib/                   # Utilitaires et configurations
│   ├── auth.ts            # Configuration d'authentification
│   ├── db.ts              # Configuration de la base de données
│   └── stripe.ts          # Configuration Stripe
├── public/                # Fichiers statiques
│   └── image.png          # Logo de l'application
├── styles/                # Fichiers de style globaux
└── types/                 # Définitions de types TypeScript
```

## 🛠️ Commandes Utiles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm start` - Lance l'application en production
- `npx prisma studio` - Ouvre l'interface Prisma Studio pour la base de données
- `npx prisma generate` - Génère le client Prisma

## 📚 Documentation Complète

### Configuration des Services Externes

#### Configuration de Stripe
1. Créez un compte Stripe et récupérez vos clés API
2. Configurez les webhooks pour gérer les événements de paiement
3. Mettez à jour les variables d'environnement avec vos clés Stripe

#### Configuration de Cloudinary
1. Créez un compte Cloudinary
2. Récupérez vos identifiants API
3. Configurez les paramètres de transformation d'images si nécessaire

#### Configuration d'ImageKit
1. Créez un compte ImageKit
2. Configurez votre espace de stockage
3. Mettez à jour les variables d'environnement avec vos clés API

### Sécurité
- Toutes les routes d'API sont protégées par défaut
- Les mots de passe sont hachés avec bcrypt
- Les jetons JWT sont utilisés pour l'authentification
- Protection CSRF intégrée
- Téléchargements de fichiers sécurisés avec validation des types

## 📄 Licence

Ce projet est sous licence MIT. 

## 📞 Support

Pour toute question ou assistance, veuillez nous contacter à [kemognemalone@gmail.com](mailto:kemognemalone@gmail.com).

---

<div align="center">
  <p>Développé avec ❤️ par Kemogne Alex</p>
  <p>© 2025 LuminaAI - Tous droits réservés</p>
</div>
## 🎨 Personnalisation

Vous pouvez facilement personnaliser l'apparence de l'application en modifiant les thèmes et les couleurs dans le fichier `tailwind.config.js`.

## ☁️ Déploiement

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js. Pour les déploiements avancés, consultez notre [documentation de déploiement](https://nextjs.org/docs/app/building-your-application/deploying).
