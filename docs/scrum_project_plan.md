# Plan de Projet Scrum - Plateforme d'Automatisation des Rendez-vous Immobiliers

## 📋 Vue d'ensemble du projet

### Objectif
Développer une application web complète pour automatiser la gestion des rendez-vous immobiliers avec une interface utilisateur moderne (React.js), une API robuste (Node.js), et une base de données PostgreSQL.

### Stack Technique
- **Frontend**: React.js, React Router, Axios, Material-UI/Tailwind CSS
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Base de données**: PostgreSQL
- **Authentification**: JWT (JSON Web Tokens)
- **Outils de développement**: Git, Docker, Jest, ESLint

---

## 👥 Équipe Scrum

### Rôles
- **Product Owner**: Définit les priorités et valide les fonctionnalités
- **Scrum Master**: Facilite les cérémonies et élimine les obstacles
- **Équipe de développement**: 
  - Développeur Frontend (React.js)
  - Développeur Backend (Node.js)
  - Développeur Full-Stack
  - Designer UI/UX (si disponible)

---

## 🎯 Product Backlog

### Epic 1: Infrastructure et Configuration
**Priorité**: Critique | **Estimation**: 13 points

#### User Stories

**US-001**: Configuration de l'environnement de développement
- **En tant que** développeur
- **Je veux** configurer l'environnement de développement complet
- **Afin de** pouvoir commencer à développer l'application
- **Critères d'acceptation**:
  - [ ] Node.js et npm installés
  - [ ] PostgreSQL installé et configuré
  - [ ] Repository Git initialisé
  - [ ] Structure de projet créée (frontend/backend)
  - [ ] Docker configuré pour PostgreSQL
- **Points de story**: 5

**US-002**: Configuration de la base de données PostgreSQL
- **En tant que** développeur backend
- **Je veux** créer le schéma de base de données
- **Afin de** stocker les données de l'application
- **Critères d'acceptation**:
  - [ ] Base de données créée
  - [ ] Tables principales définies (Users, Properties, Appointments, Agents)
  - [ ] Relations entre tables établies
  - [ ] Migrations Sequelize configurées
  - [ ] Seeds de données de test créés
- **Points de story**: 8

---

### Epic 0: Analyse, Conception et Recherche
**Priorité**: Haute | **Estimation**: 8 points

#### User Stories

**US-021**: Étude comparative des plateformes d'automatisation
- **En tant que** Product Owner
- **Je veux** comparer les solutions d'automatisation de workflow (Make, Zapier, n8n)
- **Afin de** choisir la solution la plus adaptée au projet
- **Critères d'acceptation**:
  - [ ] Analyse des fonctionnalités de Make (Integromat)
  - [ ] Analyse des fonctionnalités de Zapier
  - [ ] Analyse des fonctionnalités de n8n
  - [ ] Tableau comparatif (coût, flexibilité, intégrations)
  - [ ] Choix final justifié
- **Points de story**: 3

**US-022**: Conception des diagrammes système
- **En tant que** développeur
- **Je veux** concevoir les diagrammes techniques du système
- **Afin de** valider l'architecture avant le développement
- **Critères d'acceptation**:
  - [ ] Diagramme de Cas d'Utilisation (Use Case)
  - [ ] Diagramme de Classes
  - [ ] Diagramme de Séquence (flux de réservation)
  - [ ] Diagramme Entité-Relation (ERD)
- **Points de story**: 5

---


### Epic 2: Authentification et Gestion des Utilisateurs
**Priorité**: Haute | **Estimation**: 21 points

#### User Stories

**US-003**: Système d'inscription utilisateur
- **En tant que** visiteur
- **Je veux** créer un compte
- **Afin de** accéder aux fonctionnalités de la plateforme
- **Critères d'acceptation**:
  - [ ] Formulaire d'inscription avec validation
  - [ ] Hashage des mots de passe (bcrypt)
  - [ ] Validation email unique
  - [ ] Stockage sécurisé en base de données
  - [ ] Email de confirmation (optionnel)
- **Points de story**: 5

**US-004**: Système de connexion
- **En tant que** utilisateur enregistré
- **Je veux** me connecter à mon compte
- **Afin de** accéder à mes rendez-vous
- **Critères d'acceptation**:
  - [ ] Formulaire de connexion
  - [ ] Génération de JWT après authentification
  - [ ] Stockage du token côté client (localStorage/cookies)
  - [ ] Gestion des erreurs (identifiants incorrects)
  - [ ] Redirection après connexion
- **Points de story**: 5

**US-005**: Gestion des profils utilisateurs
- **En tant que** utilisateur connecté
- **Je veux** gérer mon profil
- **Afin de** maintenir mes informations à jour
- **Critères d'acceptation**:
  - [ ] Page de profil avec informations utilisateur
  - [ ] Modification des informations personnelles
  - [ ] Changement de mot de passe
  - [ ] Upload de photo de profil (optionnel)
- **Points de story**: 8

**US-006**: Gestion des rôles (Client, Agent, Admin)
- **En tant que** administrateur
- **Je veux** gérer les rôles des utilisateurs
- **Afin de** contrôler les accès aux fonctionnalités
- **Critères d'acceptation**:
  - [ ] Système de rôles implémenté (RBAC)
  - [ ] Middleware de vérification des permissions
  - [ ] Interface admin pour gérer les rôles
  - [ ] Protection des routes selon les rôles
- **Points de story**: 3

---

### Epic 3: Gestion des Propriétés Immobilières
**Priorité**: Haute | **Estimation**: 21 points

#### User Stories

**US-007**: Catalogue des propriétés
- **En tant que** visiteur
- **Je veux** consulter la liste des propriétés disponibles
- **Afin de** trouver un bien qui m'intéresse
- **Critères d'acceptation**:
  - [ ] Page de listing avec grille de propriétés
  - [ ] Affichage des informations clés (prix, surface, localisation)
  - [ ] Images des propriétés
  - [ ] Pagination ou scroll infini
  - [ ] Design responsive
- **Points de story**: 8

**US-008**: Filtres et recherche de propriétés
- **En tant que** visiteur
- **Je veux** filtrer les propriétés
- **Afin de** trouver rapidement ce qui correspond à mes critères
- **Critères d'acceptation**:
  - [ ] Filtres par prix, surface, type, localisation
  - [ ] Barre de recherche
  - [ ] Résultats mis à jour en temps réel
  - [ ] Sauvegarde des filtres dans l'URL
- **Points de story**: 5

**US-009**: Détails d'une propriété
- **En tant que** visiteur
- **Je veux** voir les détails complets d'une propriété
- **Afin de** prendre une décision éclairée
- **Critères d'acceptation**:
  - [ ] Page de détails avec toutes les informations
  - [ ] Galerie d'images
  - [ ] Description complète
  - [ ] Localisation sur carte (Google Maps/Leaflet)
  - [ ] Bouton "Demander un rendez-vous"
- **Points de story**: 5

**US-010**: Gestion des propriétés (Admin/Agent)
- **En tant que** agent immobilier
- **Je veux** ajouter/modifier/supprimer des propriétés
- **Afin de** maintenir le catalogue à jour
- **Critères d'acceptation**:
  - [ ] Formulaire d'ajout de propriété
  - [ ] Upload multiple d'images
  - [ ] Modification des propriétés existantes
  - [ ] Suppression avec confirmation
  - [ ] Validation des données
- **Points de story**: 3

---

### Epic 4: Système de Rendez-vous
**Priorité**: Critique | **Estimation**: 34 points

#### User Stories

**US-011**: Demande de rendez-vous
- **En tant que** client
- **Je veux** demander un rendez-vous pour visiter une propriété
- **Afin de** planifier ma visite
- **Critères d'acceptation**:
  - [ ] Formulaire de demande avec date/heure
  - [ ] Sélection de l'agent (automatique ou manuelle)
  - [ ] Vérification de disponibilité
  - [ ] Confirmation de la demande
  - [ ] Email/notification envoyé
- **Points de story**: 8

**US-012**: Calendrier des rendez-vous (Agent)
- **En tant que** agent immobilier
- **Je veux** voir mes rendez-vous dans un calendrier
- **Afin de** gérer mon planning
- **Critères d'acceptation**:
  - [ ] Vue calendrier (jour/semaine/mois)
  - [ ] Affichage des rendez-vous avec détails
  - [ ] Code couleur selon le statut
  - [ ] Navigation entre les dates
  - [ ] Intégration avec une bibliothèque calendrier (FullCalendar, React Big Calendar)
- **Points de story**: 8

**US-013**: Gestion des rendez-vous (Agent)
- **En tant que** agent immobilier
- **Je veux** accepter/refuser/modifier des rendez-vous
- **Afin de** contrôler mon planning
- **Critères d'acceptation**:
  - [ ] Boutons d'action sur chaque rendez-vous
  - [ ] Modification de date/heure
  - [ ] Ajout de notes
  - [ ] Notification au client des changements
  - [ ] Historique des modifications
- **Points de story**: 8

**US-014**: Notifications de rendez-vous
- **En tant que** utilisateur
- **Je veux** recevoir des notifications pour mes rendez-vous
- **Afin de** ne pas les oublier
- **Critères d'acceptation**:
  - [ ] Email de confirmation
  - [ ] Rappel 24h avant
  - [ ] Notification de modification/annulation
  - [ ] Intégration Telegram (optionnel)
  - [ ] Notifications in-app
- **Points de story**: 5

**US-015**: Gestion de la disponibilité (Agent)
- **En tant que** agent immobilier
- **Je veux** définir mes plages de disponibilité
- **Afin de** ne recevoir que des demandes sur mes créneaux disponibles
- **Critères d'acceptation**:
  - [ ] Interface de configuration des disponibilités
  - [ ] Plages horaires par jour de la semaine
  - [ ] Exceptions (congés, jours fériés)
  - [ ] Validation lors de la demande de rendez-vous
- **Points de story**: 5

---

### Epic 5: Dashboard Administrateur
**Priorité**: Moyenne | **Estimation**: 21 points

#### User Stories

**US-016**: Tableau de bord statistiques
- **En tant que** administrateur
- **Je veux** voir les statistiques de la plateforme
- **Afin de** suivre l'activité
- **Critères d'acceptation**:
  - [ ] Nombre de propriétés actives
  - [ ] Nombre de rendez-vous (par statut)
  - [ ] Nombre d'utilisateurs
  - [ ] Graphiques de tendances
  - [ ] Taux de conversion
- **Points de story**: 8

**US-017**: Gestion des agents
- **En tant que** administrateur
- **Je veux** gérer les agents immobiliers
- **Afin de** contrôler l'équipe
- **Critères d'acceptation**:
  - [ ] Liste des agents
  - [ ] Ajout/modification/désactivation d'agents
  - [ ] Assignation de propriétés aux agents
  - [ ] Vue de la performance (nombre de visites, conversions)
- **Points de story**: 8

**US-018**: Logs et audit
- **En tant que** administrateur
- **Je veux** consulter les logs d'activité
- **Afin de** assurer la sécurité et tracer les actions
- **Critères d'acceptation**:
  - [ ] Logs des connexions
  - [ ] Logs des modifications de données
  - [ ] Filtres par utilisateur/date/action
  - [ ] Export des logs
- **Points de story**: 5

---

### Epic 6: Fonctionnalités Avancées
**Priorité**: Basse | **Estimation**: 13 points

#### User Stories

**US-019**: Messagerie interne
- **En tant que** client
- **Je veux** communiquer avec mon agent
- **Afin de** poser des questions
- **Critères d'acceptation**:
  - [ ] Interface de chat
  - [ ] Historique des conversations
  - [ ] Notifications de nouveaux messages
  - [ ] Temps réel (WebSocket/Socket.io)
- **Points de story**: 8

**US-020**: Intégration Google Calendar
- **En tant que** agent
- **Je veux** synchroniser mes rendez-vous avec Google Calendar
- **Afin de** centraliser mon planning
- **Critères d'acceptation**:
  - [ ] Authentification Google OAuth
  - [ ] Export des rendez-vous vers Google Calendar
  - [ ] Synchronisation bidirectionnelle (optionnel)
- **Points de story**: 5

---

## 🏃 Planification des Sprints

> **Structure hiérarchique**: Sprint → Epic → User Story → Tasks

---

### Sprint 0: Analyse et Conception (1 semaine)
**Objectif du Sprint**: Réaliser l'étude comparative et concevoir les diagrammes système.

**Dates du Sprint**: 03 février 2026 → 09 février 2026  
**Capacité**: 8 points

---

#### Epic 0.1: Analyse et Conception
**Priorité**: Haute | **Points**: 8

##### US-021: Étude comparative des plateformes d'automatisation
- **Story Points**: 3
- **Tâches**:
  - [ ] **T-021.1**: Recherche sur Make et Zapier | **SP**: 1 | **Début**: 03/02 | **Échéance**: 04/02
  - [ ] **T-021.2**: Recherche sur n8n | **SP**: 1 | **Début**: 04/02 | **Échéance**: 05/02
  - [ ] **T-021.3**: Rédaction du rapport comparatif | **SP**: 1 | **Début**: 05/02 | **Échéance**: 06/02

##### US-022: Conception des diagrammes système
- **Story Points**: 5
- **Tâches**:
  - [ ] **T-022.1**: Diagramme de Cas d'Utilisation | **SP**: 1 | **Début**: 06/02 | **Échéance**: 06/02
  - [ ] **T-022.2**: Diagramme de Classes | **SP**: 1.5 | **Début**: 07/02 | **Échéance**: 07/02
  - [ ] **T-022.3**: Diagramme de Séquence | **SP**: 1 | **Début**: 08/02 | **Échéance**: 08/02
  - [ ] **T-022.4**: Diagramme Entité-Relation (ERD) | **SP**: 1.5 | **Début**: 09/02 | **Échéance**: 09/02

---

### Sprint 1: Infrastructure et Configuration (1 semaine)
**Objectif du Sprint**: Mettre en place l'infrastructure complète et l'environnement de développement

**Dates du Sprint**: 10 février 2026 → 16 février 2026  
**Capacité**: 13 points

---

#### Epic 1.1: Configuration de l'Environnement de Développement
**Priorité**: Critique | **Points**: 5

##### US-001: Configuration de l'environnement de développement
- **En tant que** développeur
- **Je veux** configurer l'environnement de développement complet
- **Afin de** pouvoir commencer à développer l'application
- **Story Points**: 5
- **Description**: Installer et configurer tous les outils nécessaires (Node.js, PostgreSQL, Git) et créer la structure initiale du projet avec les dossiers frontend et backend. Mettre en place Docker pour faciliter le développement local.

**Tâches techniques**:
- [ ] **T-001.1**: Installer Node.js (v18+) et npm | **SP**: 0.5 | **Début**: 10/02 | **Échéance**: 10/02
- [ ] **T-001.2**: Installer PostgreSQL 15 localement | **SP**: 0.5 | **Début**: 10/02 | **Échéance**: 10/02
- [ ] **T-001.3**: Créer le repository Git et structure initiale | **SP**: 0.5 | **Début**: 10/02 | **Échéance**: 10/02
- [ ] **T-001.4**: Initialiser le projet React avec Vite/CRA | **SP**: 1 | **Début**: 11/02 | **Échéance**: 11/02
  ```bash
  npm create vite@latest frontend -- --template react
  ```
- [ ] **T-001.5**: Initialiser le projet Node.js backend | **SP**: 1 | **Début**: 11/02 | **Échéance**: 11/02
  ```bash
  mkdir backend && cd backend
  npm init -y
  npm install express sequelize pg pg-hstore
  ```
- [ ] **T-001.6**: Configurer ESLint et Prettier | **SP**: 0.5 | **Début**: 12/02 | **Échéance**: 12/02
- [ ] **T-001.7**: Créer docker-compose.yml pour PostgreSQL | **SP**: 0.5 | **Début**: 12/02 | **Échéance**: 12/02
- [ ] **T-001.8**: Documenter les instructions de setup dans README.md | **SP**: 0.5 | **Début**: 13/02 | **Échéance**: 13/02

**Critères d'acceptation**:
- [ ] Node.js et npm fonctionnels
- [ ] PostgreSQL accessible localement
- [ ] Repository Git avec .gitignore configuré
- [ ] Structure frontend/backend créée
- [ ] Docker Compose démarre PostgreSQL
- [ ] README avec instructions claires

---

#### Epic 1.2: Configuration de la Base de Données
**Priorité**: Critique | **Points**: 8

##### US-002: Configuration de la base de données PostgreSQL
- **En tant que** développeur backend
- **Je veux** créer le schéma de base de données
- **Afin de** stocker les données de l'application
- **Story Points**: 8
- **Description**: Créer la base de données PostgreSQL avec tous les modèles nécessaires (Users, Properties, Appointments, etc.) en utilisant Sequelize ORM. Configurer les migrations pour gérer les changements de schéma et créer des données de test (seeds) pour faciliter le développement.

**Tâches techniques**:
- [ ] **T-002.1**: Créer la base de données `real_estate_db` | **SP**: 0.5 | **Début**: 13/02 | **Échéance**: 13/02
- [ ] **T-002.2**: Configurer Sequelize CLI | **SP**: 1 | **Début**: 13/02 | **Échéance**: 13/02
  ```bash
  npm install sequelize-cli
  npx sequelize-cli init
  ```
- [ ] **T-002.3**: Créer le modèle User avec Sequelize | **SP**: 1 | **Début**: 13/02 | **Échéance**: 14/02
  - Champs: id, email, password, first_name, last_name, phone, role, avatar_url
- [ ] **T-002.4**: Créer le modèle Property | **SP**: 1 | **Début**: 14/02 | **Échéance**: 14/02
  - Champs: id, title, description, price, surface, rooms, type, status, address, city
- [ ] **T-002.5**: Créer le modèle Appointment | **SP**: 1 | **Début**: 14/02 | **Échéance**: 14/02
  - Champs: id, property_id, client_id, agent_id, appointment_date, status
- [ ] **T-002.6**: Créer le modèle PropertyImage | **SP**: 0.5 | **Début**: 14/02 | **Échéance**: 14/02
- [ ] **T-002.7**: Créer le modèle AgentAvailability | **SP**: 0.5 | **Début**: 14/02 | **Échéance**: 15/02
- [ ] **T-002.8**: Définir les associations entre modèles | **SP**: 1 | **Début**: 15/02 | **Échéance**: 15/02
  - User hasMany Appointments
  - Property hasMany Appointments
  - Property hasMany PropertyImages
- [ ] **T-002.9**: Créer les migrations pour toutes les tables | **SP**: 1 | **Début**: 15/02 | **Échéance**: 15/02
- [ ] **T-002.10**: Créer les seeders avec données de test | **SP**: 1 | **Début**: 15/02 | **Échéance**: 16/02
  - 5 utilisateurs (1 admin, 2 agents, 2 clients)
  - 10 propriétés
  - 5 rendez-vous
- [ ] **T-002.11**: Tester les migrations et seeds | **SP**: 0.5 | **Début**: 16/02 | **Échéance**: 16/02

**Critères d'acceptation**:
- [ ] Base de données créée et accessible
- [ ] Toutes les tables créées avec relations
- [ ] Migrations s'exécutent sans erreur
- [ ] Seeds génèrent des données cohérentes
- [ ] Documentation du schéma dans README

**Définition of Done**:
- [ ] Code versionné sur Git
- [ ] Migrations testées (up/down)
- [ ] Seeds exécutés avec succès
- [ ] Schéma documenté

---

### Sprint 2: Authentification et Gestion des Utilisateurs (2 semaines)
**Objectif du Sprint**: Implémenter un système d'authentification complet et sécurisé

**Dates du Sprint**: 17 février 2026 → 02 mars 2026  
**Capacité**: 21 points

---

#### Epic 2.1: Système d'Authentification Backend
**Priorité**: Haute | **Points**: 10

##### US-003: Système d'inscription utilisateur
- **En tant que** visiteur
- **Je veux** créer un compte
- **Afin de** accéder aux fonctionnalités de la plateforme
- **Story Points**: 5
- **Description**: Développer l'API d'inscription permettant aux nouveaux utilisateurs de créer un compte. Le système doit valider les données, hasher les mots de passe avec bcrypt, et générer un JWT pour l'authentification automatique après inscription.

**Tâches techniques**:
- [ ] **T-003.1**: Créer le controller `authController.js` | **SP**: 0.5 | **Début**: 17/02 | **Échéance**: 17/02
- [ ] **T-003.2**: Implémenter la fonction `register()` | **SP**: 2 | **Début**: 17/02 | **Échéance**: 18/02
  - Validation des données (email, password, etc.)
  - Vérification email unique
  - Hashage du mot de passe avec bcrypt
- [ ] **T-003.3**: Créer la route POST `/api/auth/register` | **SP**: 0.5 | **Début**: 18/02 | **Échéance**: 18/02
- [ ] **T-003.4**: Créer le middleware de validation avec express-validator | **SP**: 1 | **Début**: 18/02 | **Échéance**: 19/02
- [ ] **T-003.5**: Implémenter la génération de JWT | **SP**: 0.5 | **Début**: 19/02 | **Échéance**: 19/02
  ```javascript
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
  ```
- [ ] **T-003.6**: Gérer les erreurs (email déjà utilisé, etc.) | **SP**: 0.5 | **Début**: 19/02 | **Échéance**: 19/02
- [ ] **T-003.7**: Écrire les tests unitaires avec Jest | **SP**: 1.5 | **Début**: 20/02 | **Échéance**: 21/02
- [ ] **T-003.8**: Tester avec Postman | **SP**: 0.5 | **Début**: 21/02 | **Échéance**: 21/02

**Critères d'acceptation**:
- [ ] API `/api/auth/register` fonctionnelle
- [ ] Validation des données côté serveur
- [ ] Mot de passe hashé (bcrypt)
- [ ] JWT retourné après inscription
- [ ] Gestion des erreurs appropriée
- [ ] Tests unitaires passent (>80% coverage)

---

##### US-004: Système de connexion
- **En tant que** utilisateur enregistré
- **Je veux** me connecter à mon compte
- **Afin de** accéder à mes rendez-vous
- **Story Points**: 5
- **Description**: Créer l'API de connexion qui vérifie les identifiants de l'utilisateur et génère un JWT pour les sessions authentifiées. Implémenter un middleware de protection des routes pour sécuriser les endpoints nécessitant une authentification.

**Tâches techniques**:
- [ ] **T-004.1**: Implémenter la fonction `login()` dans authController | **SP**: 2 | **Début**: 21/02 | **Échéance**: 22/02
  - Vérification email existe
  - Comparaison mot de passe avec bcrypt
  - Génération JWT si succès
- [ ] **T-004.2**: Créer la route POST `/api/auth/login` | **SP**: 0.5 | **Début**: 22/02 | **Échéance**: 22/02
- [ ] **T-004.3**: Créer le middleware `authMiddleware.js` pour protéger les routes | **SP**: 1.5 | **Début**: 22/02 | **Échéance**: 23/02
  ```javascript
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // Vérifier et décoder le token
  };
  ```
- [ ] **T-004.4**: Implémenter la route GET `/api/auth/me` | **SP**: 0.5 | **Début**: 23/02 | **Échéance**: 23/02
  - Retourne les infos de l'utilisateur connecté
- [ ] **T-004.5**: Créer la fonction `logout()` (optionnel, blacklist token) | **SP**: 0.5 | **Début**: 24/02 | **Échéance**: 24/02
- [ ] **T-004.6**: Gérer les erreurs (identifiants incorrects) | **SP**: 0.5 | **Début**: 24/02 | **Échéance**: 24/02
- [ ] **T-004.7**: Écrire les tests unitaires | **SP**: 1.5 | **Début**: 24/02 | **Échéance**: 25/02
- [ ] **T-004.8**: Tester avec Postman | **SP**: 0.5 | **Début**: 25/02 | **Échéance**: 25/02

**Critères d'acceptation**:
- [ ] API `/api/auth/login` fonctionnelle
- [ ] JWT retourné après connexion réussie
- [ ] Middleware de protection des routes opérationnel
- [ ] Gestion des erreurs (401, 403)
- [ ] Tests unitaires passent

---

#### Epic 2.2: Interface d'Authentification Frontend
**Priorité**: Haute | **Points**: 8

##### US-005: Pages d'inscription et connexion (Frontend)
- **En tant que** visiteur
- **Je veux** des interfaces pour m'inscrire et me connecter
- **Afin de** utiliser l'application facilement
- **Story Points**: 8
- **Description**: Créer des formulaires React modernes et responsives pour l'inscription et la connexion. Utiliser Formik pour la gestion des formulaires et Yup pour la validation. Implémenter un système de gestion d'état global (Context API) pour maintenir l'état d'authentification de l'utilisateur.

**Tâches techniques**:
- [ ] **T-005.1**: Installer les dépendances (React Router, Axios, Formik) | **SP**: 0.5 | **Début**: 25/02 | **Échéance**: 25/02
  ```bash
  npm install react-router-dom axios formik yup
  ```
- [ ] **T-005.2**: Configurer React Router | **SP**: 1 | **Début**: 25/02 | **Échéance**: 26/02
- [ ] **T-005.3**: Créer le service API `authService.js` | **SP**: 1 | **Début**: 26/02 | **Échéance**: 26/02
  ```javascript
  export const register = (userData) => axios.post('/api/auth/register', userData);
  export const login = (credentials) => axios.post('/api/auth/login', credentials);
  ```
- [ ] **T-005.4**: Créer le composant `RegisterForm.jsx` | **SP**: 2 | **Début**: 26/02 | **Échéance**: 27/02
  - Formulaire avec Formik
  - Validation avec Yup
  - Gestion des erreurs
  - Design responsive
- [ ] **T-005.5**: Créer le composant `LoginForm.jsx` | **SP**: 1.5 | **Début**: 27/02 | **Échéance**: 28/02
- [ ] **T-005.6**: Créer les pages `Register.jsx` et `Login.jsx` | **SP**: 0.5 | **Début**: 28/02 | **Échéance**: 28/02
- [ ] **T-005.7**: Implémenter le stockage du JWT (localStorage) | **SP**: 0.5 | **Début**: 28/02 | **Échéance**: 28/02
- [ ] **T-005.8**: Créer un contexte AuthContext pour gérer l'état utilisateur | **SP**: 1.5 | **Début**: 28/02 | **Échéance**: 01/03
- [ ] **T-005.9**: Créer le composant `PrivateRoute` pour protéger les routes | **SP**: 0.5 | **Début**: 01/03 | **Échéance**: 01/03
- [ ] **T-005.10**: Styliser les formulaires (Material-UI ou CSS custom) | **SP**: 2 | **Début**: 01/03 | **Échéance**: 02/03
- [ ] **T-005.11**: Tester l'inscription et la connexion end-to-end | **SP**: 0.5 | **Début**: 02/03 | **Échéance**: 02/03

**Critères d'acceptation**:
- [ ] Formulaires d'inscription et connexion fonctionnels
- [ ] Validation côté client
- [ ] Affichage des erreurs API
- [ ] Redirection après connexion réussie
- [ ] JWT stocké et utilisé pour les requêtes
- [ ] Design responsive et moderne

---

#### Epic 2.3: Gestion des Profils et Rôles
**Priorité**: Moyenne | **Points**: 3

##### US-006: Gestion des rôles (Client, Agent, Admin)
- **En tant que** administrateur
- **Je veux** gérer les rôles des utilisateurs
- **Afin de** contrôler les accès aux fonctionnalités
- **Story Points**: 3
- **Description**: Implémenter un système de contrôle d'accès basé sur les rôles (RBAC) avec trois niveaux : Client, Agent, et Admin. Créer un middleware pour vérifier les permissions et une interface admin pour modifier les rôles des utilisateurs.

**Tâches techniques**:
- [ ] **T-006.1**: Créer le middleware `checkRole.js` | **SP**: 1 | **Début**: 26/02 | **Échéance**: 26/02
  ```javascript
  const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
  ```
- [ ] **T-006.2**: Appliquer le middleware aux routes protégées | **SP**: 0.5 | **Début**: 27/02 | **Échéance**: 27/02
- [ ] **T-006.3**: Créer l'API PUT `/api/users/:id/role` (admin only) | **SP**: 1 | **Début**: 27/02 | **Échéance**: 28/02
- [ ] **T-006.4**: Créer l'interface admin pour changer les rôles | **SP**: 1.5 | **Début**: 01/03 | **Échéance**: 02/03
- [ ] **T-006.5**: Tester les permissions | **SP**: 0.5 | **Début**: 02/03 | **Échéance**: 02/03

**Critères d'acceptation**:
- [ ] Middleware de vérification des rôles fonctionnel
- [ ] Routes protégées selon les rôles
- [ ] Admin peut modifier les rôles
- [ ] Tests de permissions

---

### Sprint 3: Gestion des Propriétés Immobilières (2 semaines)
**Objectif du Sprint**: Créer le catalogue de propriétés avec recherche et filtres

**Dates du Sprint**: 03 mars 2026 → 16 mars 2026  
**Capacité**: 21 points

---

#### Epic 3.1: API de Gestion des Propriétés
**Priorité**: Haute | **Points**: 8

##### US-007: CRUD des propriétés (Backend)
- **En tant que** développeur backend
- **Je veux** créer l'API de gestion des propriétés
- **Afin de** permettre la manipulation des données immobilières
- **Points**: 8

**Tâches techniques**:
- [ ] **T-007.1**: Créer le controller `propertyController.js` (30min)
- [ ] **T-007.2**: Implémenter GET `/api/properties` - Liste avec pagination (2h)
  ```javascript
  const { page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;
  ```
- [ ] **T-007.3**: Implémenter GET `/api/properties/:id` - Détails (1h)
- [ ] **T-007.4**: Implémenter POST `/api/properties` - Création (agent/admin) (2h)
- [ ] **T-007.5**: Implémenter PUT `/api/properties/:id` - Modification (2h)
- [ ] **T-007.6**: Implémenter DELETE `/api/properties/:id` - Suppression (1h)
- [ ] **T-007.7**: Ajouter les filtres (prix, surface, type, ville) (3h)
- [ ] **T-007.8**: Implémenter la recherche par mots-clés (2h)
- [ ] **T-007.9**: Configurer multer pour l'upload d'images (2h)
- [ ] **T-007.10**: Créer le endpoint POST `/api/properties/:id/images` (2h)
- [ ] **T-007.11**: Écrire les tests unitaires (3h)
- [ ] **T-007.12**: Documenter l'API avec Swagger (1h)

**Critères d'acceptation**:
- [ ] CRUD complet fonctionnel
- [ ] Pagination implémentée
- [ ] Filtres et recherche opérationnels
- [ ] Upload d'images fonctionnel
- [ ] Tests unitaires passent
- [ ] Documentation API complète

---

#### Epic 3.2: Interface Catalogue de Propriétés
**Priorité**: Haute | **Points**: 13

##### US-008: Catalogue des propriétés (Frontend)
- **En tant que** visiteur
- **Je veux** consulter la liste des propriétés disponibles
- **Afin de** trouver un bien qui m'intéresse
- **Points**: 8

**Tâches techniques**:
- [ ] **T-008.1**: Créer le service `propertyService.js` (1h)
- [ ] **T-008.2**: Créer le composant `PropertyCard.jsx` (3h)
  - Image, titre, prix, surface, localisation
  - Bouton "Voir détails"
  - Design moderne avec hover effects
- [ ] **T-008.3**: Créer le composant `PropertyList.jsx` (2h)
  - Grille responsive (CSS Grid ou Flexbox)
- [ ] **T-008.4**: Créer la page `Properties.jsx` (2h)
- [ ] **T-008.5**: Implémenter la pagination (2h)
- [ ] **T-008.6**: Gérer le loading et les états vides (1h)
- [ ] **T-008.7**: Optimiser les images (lazy loading) (1h)
- [ ] **T-008.8**: Tester sur mobile/tablet/desktop (1h)

**Critères d'acceptation**:
- [ ] Liste de propriétés affichée
- [ ] Design responsive
- [ ] Pagination fonctionnelle
- [ ] Performance acceptable

---

##### US-009: Filtres et recherche de propriétés
- **En tant que** visiteur
- **Je veux** filtrer les propriétés
- **Afin de** trouver rapidement ce qui correspond à mes critères
- **Points**: 5

**Tâches techniques**:
- [ ] **T-009.1**: Créer le composant `FilterBar.jsx` (3h)
  - Filtres: prix (min/max), surface, type, ville
  - Barre de recherche
- [ ] **T-009.2**: Implémenter la logique de filtrage (2h)
- [ ] **T-009.3**: Synchroniser les filtres avec l'URL (query params) (2h)
- [ ] **T-009.4**: Ajouter un bouton "Réinitialiser les filtres" (1h)
- [ ] **T-009.5**: Afficher le nombre de résultats (30min)
- [ ] **T-009.6**: Tester les combinaisons de filtres (1h)

**Critères d'acceptation**:
- [ ] Filtres fonctionnels
- [ ] Résultats mis à jour en temps réel
- [ ] URL reflète les filtres actifs
- [ ] UX fluide

---

### Sprint 4: Système de Rendez-vous - Partie 1 (2 semaines)
**Objectif du Sprint**: Implémenter la demande et la gestion des rendez-vous

**Dates du Sprint**: 17 mars 2026 → 30 mars 2026  
**Capacité**: 21 points

---

#### Epic 4.1: API de Gestion des Rendez-vous
**Priorité**: Critique | **Points**: 13

##### US-011: Demande de rendez-vous (Backend)
- **En tant que** développeur backend
- **Je veux** créer l'API de gestion des rendez-vous
- **Afin de** permettre la réservation de visites
- **Points**: 8

**Tâches techniques**:
- [ ] **T-011.1**: Créer le controller `appointmentController.js` (30min)
- [ ] **T-011.2**: Implémenter POST `/api/appointments` - Création (3h)
  - Validation des données
  - Vérification disponibilité agent
  - Vérification pas de conflit horaire
- [ ] **T-011.3**: Créer le service `availabilityService.js` (3h)
  ```javascript
  const checkAvailability = async (agentId, date, duration) => {
    // Vérifier les rendez-vous existants
    // Vérifier les plages de disponibilité
  };
  ```
- [ ] **T-011.4**: Implémenter GET `/api/appointments` - Liste (2h)
  - Filtres par client, agent, statut, date
- [ ] **T-011.5**: Implémenter GET `/api/appointments/:id` - Détails (1h)
- [ ] **T-011.6**: Implémenter PUT `/api/appointments/:id/status` - Changer statut (2h)
- [ ] **T-011.7**: Créer les validations (date future, durée valide) (1h)
- [ ] **T-011.8**: Écrire les tests unitaires (3h)

**Critères d'acceptation**:
- [ ] API de création de rendez-vous fonctionnelle
- [ ] Vérification des conflits opérationnelle
- [ ] Gestion des statuts (pending, confirmed, cancelled)
- [ ] Tests passent

---

##### US-013: Gestion des rendez-vous (Agent)
- **En tant que** agent immobilier
- **Je veux** gérer mes rendez-vous
- **Afin de** contrôler mon planning
- **Points**: 5

**Tâches techniques**:
- [ ] **T-013.1**: Implémenter PUT `/api/appointments/:id` - Modification (2h)
- [ ] **T-013.2**: Implémenter POST `/api/appointments/:id/reschedule` (2h)
- [ ] **T-013.3**: Implémenter DELETE `/api/appointments/:id` - Annulation (1h)
- [ ] **T-013.4**: Ajouter le champ `notes` modifiable (1h)
- [ ] **T-013.5**: Créer l'historique des modifications (2h)
- [ ] **T-013.6**: Écrire les tests (2h)

**Critères d'acceptation**:
- [ ] Agent peut modifier ses rendez-vous
- [ ] Historique des changements sauvegardé
- [ ] Notifications envoyées aux clients

---

#### Epic 4.2: Interface de Demande de Rendez-vous
**Priorité**: Haute | **Points**: 8

##### US-012: Formulaire de demande de rendez-vous (Frontend)
- **En tant que** client
- **Je veux** demander un rendez-vous pour visiter une propriété
- **Afin de** planifier ma visite
- **Points**: 8

**Tâches techniques**:
- [ ] **T-012.1**: Créer le service `appointmentService.js` (1h)
- [ ] **T-012.2**: Créer le composant `AppointmentForm.jsx` (4h)
  - Sélection de date (react-datepicker)
  - Sélection d'heure
  - Sélection d'agent (optionnel)
  - Notes additionnelles
- [ ] **T-012.3**: Implémenter la vérification de disponibilité en temps réel (2h)
- [ ] **T-012.4**: Afficher les créneaux disponibles (3h)
- [ ] **T-012.5**: Gérer la soumission du formulaire (1h)
- [ ] **T-012.6**: Afficher la confirmation (1h)
- [ ] **T-012.7**: Styliser le formulaire (2h)
- [ ] **T-012.8**: Tester le flow complet (1h)

**Critères d'acceptation**:
- [ ] Formulaire intuitif et moderne
- [ ] Créneaux disponibles affichés
- [ ] Validation côté client
- [ ] Confirmation visuelle après soumission

---

### Sprint 5: Système de Rendez-vous - Partie 2 (2 semaines)
**Objectif du Sprint**: Ajouter le calendrier et les notifications

**Dates du Sprint**: 31 mars 2026 → 13 avril 2026  
**Capacité**: 13 points

---

#### Epic 4.3: Calendrier des Rendez-vous
**Priorité**: Haute | **Points**: 8

##### US-014: Calendrier des rendez-vous (Agent)
- **En tant que** agent immobilier
- **Je veux** voir mes rendez-vous dans un calendrier
- **Afin de** gérer mon planning visuellement
- **Points**: 8

**Tâches techniques**:
- [ ] **T-014.1**: Installer FullCalendar ou React Big Calendar (30min)
  ```bash
  npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid
  ```
- [ ] **T-014.2**: Créer le composant `AppointmentCalendar.jsx` (4h)
- [ ] **T-014.3**: Configurer les vues (jour/semaine/mois) (2h)
- [ ] **T-014.4**: Mapper les rendez-vous au format calendrier (1h)
- [ ] **T-014.5**: Implémenter le code couleur par statut (1h)
  - Pending: orange
  - Confirmed: green
  - Cancelled: red
- [ ] **T-014.6**: Ajouter les tooltips avec détails (1h)
- [ ] **T-014.7**: Implémenter le clic sur événement → modal détails (2h)
- [ ] **T-014.8**: Créer la page `AgentDashboard.jsx` (2h)
- [ ] **T-014.9**: Styliser le calendrier (2h)
- [ ] **T-014.10**: Tester la navigation entre les vues (1h)

**Critères d'acceptation**:
- [ ] Calendrier affiche tous les rendez-vous
- [ ] Vues jour/semaine/mois fonctionnelles
- [ ] Code couleur clair
- [ ] Navigation fluide

---

#### Epic 4.4: Système de Notifications
**Priorité**: Haute | **Points**: 5

##### US-015: Notifications de rendez-vous
- **En tant que** utilisateur
- **Je veux** recevoir des notifications pour mes rendez-vous
- **Afin de** ne pas les oublier
- **Points**: 5

**Tâches techniques**:
- [ ] **T-015.1**: Installer Nodemailer (30min)
  ```bash
  npm install nodemailer
  ```
- [ ] **T-015.2**: Configurer le service email (Gmail/SendGrid) (1h)
- [ ] **T-015.3**: Créer `emailService.js` (1h)
- [ ] **T-015.4**: Créer les templates d'emails (HTML) (3h)
  - Confirmation de rendez-vous
  - Rappel 24h avant
  - Modification/Annulation
- [ ] **T-015.5**: Implémenter l'envoi d'email à la création (1h)
- [ ] **T-015.6**: Créer un cron job pour les rappels (2h)
  ```javascript
  const cron = require('node-cron');
  cron.schedule('0 9 * * *', sendReminders); // Tous les jours à 9h
  ```
- [ ] **T-015.7**: Créer le modèle Notification pour les notifications in-app (1h)
- [ ] **T-015.8**: Implémenter GET `/api/notifications` (1h)
- [ ] **T-015.9**: Créer le composant `NotificationBell.jsx` (2h)
- [ ] **T-015.10**: Tester l'envoi d'emails (1h)

**Critères d'acceptation**:
- [ ] Emails envoyés correctement
- [ ] Templates professionnels
- [ ] Rappels automatiques fonctionnels
- [ ] Notifications in-app affichées

---

### Sprint 6: Dashboard Administrateur (2 semaines)
**Objectif du Sprint**: Créer le tableau de bord administrateur avec statistiques

**Dates du Sprint**: 14 avril 2026 → 27 avril 2026  
**Capacité**: 21 points

---

#### Epic 5.1: Statistiques et Analytics
**Priorité**: Moyenne | **Points**: 8

##### US-016: Tableau de bord statistiques
- **En tant que** administrateur
- **Je veux** voir les statistiques de la plateforme
- **Afin de** suivre l'activité et la performance
- **Points**: 8

**Tâches techniques**:
- [ ] **T-016.1**: Créer le controller `statsController.js` (30min)
- [ ] **T-016.2**: Implémenter GET `/api/stats/overview` (3h)
  ```javascript
  {
    totalProperties: 150,
    totalAppointments: 320,
    totalUsers: 450,
    conversionRate: 0.65
  }
  ```
- [ ] **T-016.3**: Implémenter GET `/api/stats/appointments-by-status` (1h)
- [ ] **T-016.4**: Implémenter GET `/api/stats/appointments-by-month` (2h)
- [ ] **T-016.5**: Installer Chart.js ou Recharts (30min)
  ```bash
  npm install recharts
  ```
- [ ] **T-016.6**: Créer le composant `StatCard.jsx` (2h)
- [ ] **T-016.7**: Créer le composant `AppointmentChart.jsx` (3h)
- [ ] **T-016.8**: Créer le composant `ConversionChart.jsx` (2h)
- [ ] **T-016.9**: Créer la page `AdminDashboard.jsx` (3h)
- [ ] **T-016.10**: Styliser le dashboard (3h)
- [ ] **T-016.11**: Ajouter des filtres par période (2h)

**Critères d'acceptation**:
- [ ] Statistiques en temps réel
- [ ] Graphiques clairs et informatifs
- [ ] Filtres par période fonctionnels
- [ ] Design professionnel

---

#### Epic 5.2: Gestion des Agents
**Priorité**: Moyenne | **Points**: 8

##### US-017: Gestion des agents
- **En tant que** administrateur
- **Je veux** gérer les agents immobiliers
- **Afin de** contrôler l'équipe et les performances
- **Points**: 8

**Tâches techniques**:
- [ ] **T-017.1**: Implémenter GET `/api/agents` - Liste des agents (1h)
- [ ] **T-017.2**: Implémenter GET `/api/agents/:id/stats` - Statistiques agent (2h)
  - Nombre de rendez-vous
  - Taux de conversion
  - Propriétés assignées
- [ ] **T-017.3**: Implémenter PUT `/api/agents/:id/status` - Activer/Désactiver (1h)
- [ ] **T-017.4**: Créer le composant `AgentTable.jsx` (3h)
- [ ] **T-017.5**: Créer le composant `AgentStatsModal.jsx` (2h)
- [ ] **T-017.6**: Implémenter l'assignation de propriétés (2h)
- [ ] **T-017.7**: Créer la page `AgentManagement.jsx` (2h)
- [ ] **T-017.8**: Tester les fonctionnalités (1h)

**Critères d'acceptation**:
- [ ] Liste des agents affichée
- [ ] Statistiques par agent visibles
- [ ] Activation/Désactivation fonctionnelle
- [ ] Interface intuitive

---

#### Epic 5.3: Logs et Audit
**Priorité**: Basse | **Points**: 5

##### US-018: Logs et audit
- **En tant que** administrateur
- **Je veux** consulter les logs d'activité
- **Afin de** assurer la sécurité et tracer les actions
- **Points**: 5

**Tâches techniques**:
- [ ] **T-018.1**: Créer le modèle AuditLog (1h)
  - Champs: user_id, action, resource, details, ip_address, timestamp
- [ ] **T-018.2**: Créer le middleware `auditMiddleware.js` (2h)
- [ ] **T-018.3**: Implémenter GET `/api/logs` avec filtres (2h)
- [ ] **T-018.4**: Créer le composant `LogsTable.jsx` (3h)
- [ ] **T-018.5**: Implémenter l'export CSV (1h)
- [ ] **T-018.6**: Tester le logging (1h)

**Critères d'acceptation**:
- [ ] Logs enregistrés automatiquement
- [ ] Filtres fonctionnels
- [ ] Export CSV opérationnel

---

### Sprint 7: Fonctionnalités Avancées et Finalisation (2 semaines)
**Objectif du Sprint**: Ajouter les fonctionnalités bonus et finaliser l'application

**Dates du Sprint**: 28 avril 2026 → 11 mai 2026  
**Capacité**: 13 points + corrections

---

#### Epic 6.1: Messagerie Interne
**Priorité**: Basse | **Points**: 8

##### US-019: Messagerie interne
- **En tant que** client
- **Je veux** communiquer avec mon agent
- **Afin de** poser des questions sur les propriétés
- **Points**: 8

**Tâches techniques**:
- [ ] **T-019.1**: Installer Socket.io (30min)
  ```bash
  npm install socket.io socket.io-client
  ```
- [ ] **T-019.2**: Configurer Socket.io côté serveur (2h)
- [ ] **T-019.3**: Créer le modèle Message (1h)
- [ ] **T-019.4**: Implémenter les événements Socket.io (3h)
  - `send_message`
  - `receive_message`
  - `typing`
- [ ] **T-019.5**: Créer le composant `ChatWindow.jsx` (4h)
- [ ] **T-019.6**: Créer le composant `MessageList.jsx` (2h)
- [ ] **T-019.7**: Créer le composant `MessageInput.jsx` (1h)
- [ ] **T-019.8**: Implémenter les notifications de nouveaux messages (2h)
- [ ] **T-019.9**: Styliser l'interface de chat (3h)
- [ ] **T-019.10**: Tester le chat en temps réel (1h)

**Critères d'acceptation**:
- [ ] Chat en temps réel fonctionnel
- [ ] Historique des conversations sauvegardé
- [ ] Notifications de nouveaux messages
- [ ] Interface moderne

---

#### Epic 6.2: Intégrations Externes
**Priorité**: Basse | **Points**: 5

##### US-020: Intégration Google Calendar
- **En tant que** agent
- **Je veux** synchroniser mes rendez-vous avec Google Calendar
- **Afin de** centraliser mon planning
- **Points**: 5

**Tâches techniques**:
- [ ] **T-020.1**: Configurer Google Cloud Console (1h)
- [ ] **T-020.2**: Installer googleapis (30min)
  ```bash
  npm install googleapis
  ```
- [ ] **T-020.3**: Implémenter OAuth 2.0 pour Google (3h)
- [ ] **T-020.4**: Créer `googleCalendarService.js` (2h)
- [ ] **T-020.5**: Implémenter l'export de rendez-vous (2h)
- [ ] **T-020.6**: Créer l'interface de connexion Google (2h)
- [ ] **T-020.7**: Tester la synchronisation (1h)

**Critères d'acceptation**:
- [ ] Authentification Google fonctionnelle
- [ ] Rendez-vous exportés vers Google Calendar
- [ ] Synchronisation fiable

---

#### Epic 6.3: Finalisation et Déploiement
**Priorité**: Critique | **Points**: N/A

##### Tâches de finalisation
- [ ] **T-FIN-1**: Corriger tous les bugs critiques (8h)
- [ ] **T-FIN-2**: Optimiser les performances (4h)
  - Lazy loading des images
  - Code splitting
  - Minification
- [ ] **T-FIN-3**: Audit de sécurité (3h)
  - Vérifier les injections SQL
  - Vérifier les XSS
  - Vérifier les CSRF
- [ ] **T-FIN-4**: Tester sur différents navigateurs (2h)
- [ ] **T-FIN-5**: Rédiger la documentation utilisateur (4h)
- [ ] **T-FIN-6**: Rédiger le guide de déploiement (2h)
- [ ] **T-FIN-7**: Créer le fichier docker-compose pour production (2h)
- [ ] **T-FIN-8**: Déployer en staging (3h)
- [ ] **T-FIN-9**: Tests d'acceptation utilisateur (4h)
- [ ] **T-FIN-10**: Déployer en production (2h)

**Critères d'acceptation**:
- [ ] Aucun bug critique
- [ ] Performance acceptable (Lighthouse >80)
- [ ] Documentation complète
- [ ] Application déployée et accessible

---

## 📊 Résumé de la Planification

| Sprint | Durée | Epics | User Stories | Points | Objectif Principal |
|--------|-------|-------|--------------|--------|-------------------|
| Sprint 0 | 1 sem | 1 | 2 | 8 | Analyse & Conception |
| Sprint 1 | 1 sem | 2 | 2 | 13 | Infrastructure |
| Sprint 2 | 2 sem | 2 | 3 | 21 | Authentification |
| Sprint 3 | 2 sem | 2 | 2 | 21 | Propriétés |
| Sprint 4 | 2 sem | 2 | 2 | 21 | Rendez-vous (Base) |
| Sprint 5 | 2 sem | 2 | 2 | 13 | Calendrier & Notifications |
| Sprint 6 | 2 sem | 3 | 3 | 21 | Dashboard Admin |
| Sprint 7 | 2 sem | 3 | 2+ | 13+ | Fonctionnalités avancées |
| **TOTAL** | **14 sem** | **18** | **18+** | **131+** | **Application complète** |

---

## 🎯 Définition of Done par Niveau

### Au niveau de la Tâche
- [ ] Code écrit et fonctionnel
- [ ] Code respecte les standards (ESLint)
- [ ] Testé localement

### Au niveau de la User Story
- [ ] Toutes les tâches complétées
- [ ] Tests unitaires écrits et passent
- [ ] Code reviewé
- [ ] Critères d'acceptation validés
- [ ] Documentation mise à jour

### Au niveau de l'Epic
- [ ] Toutes les user stories complétées
- [ ] Tests d'intégration passent
- [ ] Fonctionnalité démontrée au Product Owner
- [ ] Feedback intégré

### Au niveau du Sprint
- [ ] Tous les epics complétés
- [ ] Sprint Review effectuée
- [ ] Rétrospective effectuée
- [ ] Code mergé dans main
- [ ] Déployé en environnement de test
**Objectif**: Mettre en place l'infrastructure et l'environnement de développement

**Sprint Backlog**:
- US-001: Configuration de l'environnement de développement (5 pts)
- US-002: Configuration de la base de données PostgreSQL (8 pts)

**Livrables**:
- Repository Git configuré
- Structure de projet frontend/backend
- Base de données PostgreSQL opérationnelle
- Schéma de base de données initial
- Docker Compose pour l'environnement local

**Définition of Done**:
- [ ] Code versionné sur Git
- [ ] README avec instructions de setup
- [ ] Base de données accessible localement
- [ ] Migrations exécutées avec succès
- [ ] Seeds de données de test fonctionnels

---

### Sprint 1: Authentification et Base (2 semaines)
**Objectif**: Implémenter le système d'authentification complet

**Sprint Backlog**:
- US-003: Système d'inscription utilisateur (5 pts)
- US-004: Système de connexion (5 pts)
- US-005: Gestion des profils utilisateurs (8 pts)
- US-006: Gestion des rôles (3 pts)

**Livrables**:
- API d'authentification (register, login, logout)
- Pages React d'inscription et connexion
- Gestion des tokens JWT
- Middleware de protection des routes
- Système de rôles fonctionnel

**Définition of Done**:
- [ ] Tests unitaires pour l'API auth (>80% coverage)
- [ ] Validation des formulaires côté client et serveur
- [ ] Gestion des erreurs appropriée
- [ ] Documentation API (Swagger/Postman)
- [ ] Code review effectué

---

### Sprint 2: Gestion des Propriétés (2 semaines)
**Objectif**: Créer le catalogue de propriétés

**Sprint Backlog**:
- US-007: Catalogue des propriétés (8 pts)
- US-008: Filtres et recherche de propriétés (5 pts)
- US-009: Détails d'une propriété (5 pts)
- US-010: Gestion des propriétés (Admin/Agent) (3 pts)

**Livrables**:
- API CRUD pour les propriétés
- Page de listing avec filtres
- Page de détails de propriété
- Interface d'administration des propriétés
- Upload d'images

**Définition of Done**:
- [ ] API testée avec Postman/Jest
- [ ] Interface responsive (mobile/tablet/desktop)
- [ ] Images optimisées et stockées correctement
- [ ] Pagination fonctionnelle
- [ ] Validation des données

---

### Sprint 3: Système de Rendez-vous - Partie 1 (2 semaines)
**Objectif**: Implémenter la demande et la gestion basique des rendez-vous

**Sprint Backlog**:
- US-011: Demande de rendez-vous (8 pts)
- US-013: Gestion des rendez-vous (Agent) (8 pts)
- US-015: Gestion de la disponibilité (Agent) (5 pts)

**Livrables**:
- API de gestion des rendez-vous
- Formulaire de demande de rendez-vous
- Interface de gestion pour les agents
- Système de vérification de disponibilité

**Définition of Done**:
- [ ] Validation des conflits de rendez-vous
- [ ] Tests d'intégration
- [ ] Gestion des statuts (pending, confirmed, cancelled)
- [ ] Interface utilisateur intuitive

---

### Sprint 4: Système de Rendez-vous - Partie 2 (2 semaines)
**Objectif**: Ajouter le calendrier et les notifications

**Sprint Backlog**:
- US-012: Calendrier des rendez-vous (Agent) (8 pts)
- US-014: Notifications de rendez-vous (5 pts)

**Livrables**:
- Vue calendrier interactive
- Système de notifications par email
- Notifications in-app
- Intégration Telegram (optionnel)

**Définition of Done**:
- [ ] Calendrier fonctionnel avec toutes les vues
- [ ] Emails envoyés correctement
- [ ] Templates d'emails professionnels
- [ ] Notifications temps réel

---

### Sprint 5: Dashboard Administrateur (2 semaines)
**Objectif**: Créer le tableau de bord administrateur

**Sprint Backlog**:
- US-016: Tableau de bord statistiques (8 pts)
- US-017: Gestion des agents (8 pts)
- US-018: Logs et audit (5 pts)

**Livrables**:
- Dashboard avec statistiques
- Graphiques interactifs
- Interface de gestion des agents
- Système de logs

**Définition of Done**:
- [ ] Données en temps réel
- [ ] Graphiques clairs et informatifs
- [ ] Export de données (CSV/PDF)
- [ ] Logs sécurisés

---

### Sprint 6: Fonctionnalités Avancées et Polish (2 semaines)
**Objectif**: Ajouter les fonctionnalités bonus et finaliser l'application

**Sprint Backlog**:
- US-019: Messagerie interne (8 pts)
- US-020: Intégration Google Calendar (5 pts)
- Corrections de bugs
- Optimisations de performance
- Documentation finale

**Livrables**:
- Chat en temps réel
- Intégration Google Calendar
- Application optimisée
- Documentation complète

**Définition of Done**:
- [ ] Tous les bugs critiques résolus
- [ ] Performance acceptable (Lighthouse score >80)
- [ ] Documentation utilisateur
- [ ] Guide de déploiement

---

## 📅 Cérémonies Scrum

### Sprint Planning (Début de chaque sprint)
- **Durée**: 2-4 heures
- **Participants**: Toute l'équipe
- **Objectifs**:
  - Sélectionner les user stories du sprint
  - Décomposer en tâches techniques
  - Estimer la capacité de l'équipe
  - Définir l'objectif du sprint

### Daily Scrum (Chaque jour)
- **Durée**: 15 minutes
- **Participants**: Équipe de développement + Scrum Master
- **Questions**:
  - Qu'ai-je fait hier ?
  - Que vais-je faire aujourd'hui ?
  - Y a-t-il des obstacles ?

### Sprint Review (Fin de sprint)
- **Durée**: 1-2 heures
- **Participants**: Toute l'équipe + Product Owner + Stakeholders
- **Objectifs**:
  - Démonstration des fonctionnalités développées
  - Recueillir les feedbacks
  - Valider les critères d'acceptation

### Sprint Retrospective (Fin de sprint)
- **Durée**: 1 heure
- **Participants**: Équipe de développement + Scrum Master
- **Objectifs**:
  - Ce qui a bien fonctionné
  - Ce qui peut être amélioré
  - Actions d'amélioration pour le prochain sprint

### Backlog Refinement (Mi-sprint)
- **Durée**: 1 heure
- **Participants**: Product Owner + Équipe
- **Objectifs**:
  - Affiner les user stories futures
  - Clarifier les critères d'acceptation
  - Estimer les nouvelles stories

---

## 🏗️ Architecture Technique

### Architecture Globale

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           React.js Application                  │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │    │
│  │  │  Pages   │  │Components│  │  Redux   │     │    │
│  │  └──────────┘  └──────────┘  └──────────┘     │    │
│  │  ┌──────────────────────────────────────┐     │    │
│  │  │         Axios (HTTP Client)          │     │    │
│  │  └──────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS/REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    SERVER (Node.js)                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │              Express.js API                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │    │
│  │  │  Routes  │  │Controllers│ │Middleware│     │    │
│  │  └──────────┘  └──────────┘  └──────────┘     │    │
│  │  ┌──────────────────────────────────────┐     │    │
│  │  │      Sequelize ORM (Models)          │     │    │
│  │  └──────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Users   │  │Properties│  │Appointments│            │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐                            │
│  │  Agents  │  │  Roles   │                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
```

### Structure des Dossiers

```
real-estate-appointment-automation/
│
├── frontend/                    # Application React
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/          # Composants réutilisables
│   │   │   ├── common/          # Boutons, inputs, modals
│   │   │   ├── layout/          # Header, Footer, Sidebar
│   │   │   ├── properties/      # PropertyCard, PropertyList
│   │   │   ├── appointments/    # Calendar, AppointmentForm
│   │   │   └── auth/            # LoginForm, RegisterForm
│   │   ├── pages/               # Pages principales
│   │   │   ├── Home.jsx
│   │   │   ├── Properties.jsx
│   │   │   ├── PropertyDetail.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Admin/
│   │   ├── services/            # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── propertyService.js
│   │   │   └── appointmentService.js
│   │   ├── store/               # Redux store
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── utils/               # Helpers
│   │   ├── hooks/               # Custom hooks
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── backend/                     # API Node.js
│   ├── src/
│   │   ├── config/              # Configuration
│   │   │   ├── database.js
│   │   │   └── config.js
│   │   ├── models/              # Sequelize models
│   │   │   ├── User.js
│   │   │   ├── Property.js
│   │   │   ├── Appointment.js
│   │   │   ├── Agent.js
│   │   │   └── index.js
│   │   ├── controllers/         # Logique métier
│   │   │   ├── authController.js
│   │   │   ├── propertyController.js
│   │   │   ├── appointmentController.js
│   │   │   └── userController.js
│   │   ├── routes/              # Routes API
│   │   │   ├── auth.js
│   │   │   ├── properties.js
│   │   │   ├── appointments.js
│   │   │   └── users.js
│   │   ├── middleware/          # Middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/            # Services métier
│   │   │   ├── emailService.js
│   │   │   ├── notificationService.js
│   │   │   └── availabilityService.js
│   │   ├── utils/               # Utilitaires
│   │   │   ├── jwt.js
│   │   │   └── validators.js
│   │   ├── migrations/          # Migrations DB
│   │   ├── seeders/             # Seeds
│   │   └── app.js               # Point d'entrée
│   ├── tests/                   # Tests
│   ├── package.json
│   └── .env
│
├── docker-compose.yml           # Configuration Docker
├── .gitignore
└── README.md
```

### Schéma de Base de Données

```sql
-- Table Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'client', -- client, agent, admin
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Properties
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    surface DECIMAL(8, 2),
    rooms INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    type VARCHAR(50), -- apartment, house, villa, etc.
    status VARCHAR(20) DEFAULT 'available', -- available, sold, rented
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    agent_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Property Images
CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table Appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id),
    client_id INTEGER REFERENCES users(id),
    agent_id INTEGER REFERENCES users(id),
    appointment_date TIMESTAMP NOT NULL,
    duration INTEGER DEFAULT 60, -- minutes
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Agent Availability
CREATE TABLE agent_availability (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER REFERENCES users(id),
    day_of_week INTEGER, -- 0-6 (Sunday-Saturday)
    start_time TIME,
    end_time TIME,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50), -- email, telegram, in-app
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour optimisation
CREATE INDEX idx_properties_agent ON properties(agent_id);
CREATE INDEX idx_appointments_client ON appointments(client_id);
CREATE INDEX idx_appointments_agent ON appointments(agent_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
```

---

## 📊 Métriques et KPIs

### Métriques de Développement
- **Velocity**: Points de story complétés par sprint
- **Burn-down chart**: Progression du sprint
- **Code coverage**: >80% pour le backend
- **Code quality**: Pas de bugs critiques, dette technique maîtrisée

### Métriques Produit
- **Nombre d'utilisateurs inscrits**
- **Nombre de propriétés publiées**
- **Nombre de rendez-vous créés**
- **Taux de conversion** (demandes → rendez-vous confirmés)
- **Taux d'annulation**
- **Temps moyen de réponse des agents**

---

## 🔧 Outils et Technologies

### Développement
- **IDE**: VS Code, WebStorm
- **Version Control**: Git + GitHub/GitLab
- **API Testing**: Postman, Insomnia
- **Database Client**: pgAdmin, DBeaver

### CI/CD
- **GitHub Actions** ou **GitLab CI**
- **Docker** pour la containerisation
- **Jest** pour les tests unitaires
- **Cypress** pour les tests E2E (optionnel)

### Monitoring (Production)
- **Sentry** pour le tracking d'erreurs
- **Google Analytics** pour l'usage
- **PM2** pour la gestion des processus Node.js

---

## 📝 Définition of Done (DoD) Globale

Une user story est considérée comme terminée quand:
- [ ] Le code est écrit et respecte les standards (ESLint)
- [ ] Les tests unitaires sont écrits et passent (>80% coverage)
- [ ] Le code est reviewé et approuvé
- [ ] La fonctionnalité est testée manuellement
- [ ] La documentation est mise à jour
- [ ] Le code est mergé dans la branche principale
- [ ] La fonctionnalité est déployée en environnement de test
- [ ] Le Product Owner a validé la fonctionnalité

---

## 🚀 Roadmap de Déploiement

### Phase 1: Développement Local
- Tous les sprints se font en local
- Tests continus

### Phase 2: Environnement de Staging
- Déploiement sur serveur de test
- Tests d'intégration
- Validation par le Product Owner

### Phase 3: Production
- Déploiement final
- Monitoring actif
- Support utilisateurs

### Options d'Hébergement
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Database**: AWS RDS, DigitalOcean Managed Database, ElephantSQL

---

## 📚 Ressources et Documentation

### Documentation à Créer
- **README.md**: Instructions de setup
- **API Documentation**: Swagger/OpenAPI
- **User Guide**: Guide utilisateur
- **Developer Guide**: Guide développeur
- **Deployment Guide**: Guide de déploiement

### Ressources Externes
- [React Documentation](https://react.dev)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Sequelize Documentation](https://sequelize.org)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## ⚠️ Risques et Mitigation

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Retard dans le développement | Moyenne | Élevé | Buffer de temps, priorisation stricte |
| Problèmes de performance | Faible | Moyen | Tests de charge, optimisation continue |
| Sécurité (failles) | Moyenne | Critique | Audit de sécurité, bonnes pratiques |
| Changements de requirements | Élevée | Moyen | Backlog flexible, communication régulière |
| Problèmes d'intégration | Faible | Moyen | Tests d'intégration, CI/CD |

---

## 🎓 Conseils pour le PFE

### Présentation
- Démontrer l'application fonctionnelle
- Préparer des scénarios de démonstration
- Avoir des données de test réalistes
- Montrer le processus Scrum (board, burndown charts)

### Documentation
- Rapport de projet structuré
- Diagrammes UML (cas d'utilisation, séquence, classes)
- Captures d'écran de l'application
- Métriques de développement

### Soutenance
- Expliquer les choix techniques
- Montrer la valeur ajoutée
- Discuter des difficultés rencontrées
- Présenter les perspectives d'évolution

---

## 📅 Timeline Globale

**Durée totale**: 13 semaines (3 mois environ)

- **Sprint 0**: Semaine 1
- **Sprint 1**: Semaines 2-3
- **Sprint 2**: Semaines 4-5
- **Sprint 3**: Semaines 6-7
- **Sprint 4**: Semaines 8-9
- **Sprint 5**: Semaines 10-11
- **Sprint 6**: Semaines 12-13

**Livraison finale**: Fin de la semaine 13

---

## ✅ Checklist de Démarrage

Avant de commencer le Sprint 0:
- [ ] Équipe constituée et rôles assignés
- [ ] Outils de communication configurés (Slack, Discord, etc.)
- [ ] Repository Git créé
- [ ] Board Scrum configuré (Jira, Trello, GitHub Projects)
- [ ] Environnements de développement installés
- [ ] Product Backlog initial validé
- [ ] Sprint 0 planifié

---

**Bonne chance pour votre projet ! 🚀**

*Ce plan est un guide. N'hésitez pas à l'adapter selon vos besoins spécifiques et les retours de votre équipe.*
