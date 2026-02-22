# Dubai Luxury Properties - Automation Bot

Ce dossier contient les éléments nécessaires au workflow d'automatisation des rendez-vous via Telegram, n8n et Google Calendar.

## Architecture du dossier
- `/workflows` : Contient les exports JSON des workflows n8n.
- `/scripts` : Contient les scripts JavaScript personnalisés utilisés dans les nodes "Code" de n8n.
- `/config` : Contient les fichiers de configuration ou exemples de variables d'environnement pour le bot.

## Installation rapide
1. Importez les fichiers `.json` du dossier `/workflows` dans votre instance n8n.
2. Configurez les credentials pour Telegram, OpenAI et Google Calendar dans n8n.
3. Assurez-vous que le backend est accessible par n8n pour l'enregistrement des rendez-vous.

## Scripts Utiles
- `calculateVacancies.js` : Permet de calculer les créneaux libres de 30 minutes à partir d'une liste d'événements Google Calendar.
