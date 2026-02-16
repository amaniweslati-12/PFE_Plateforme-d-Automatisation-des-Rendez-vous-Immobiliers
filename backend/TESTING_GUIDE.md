# Guide de Test du Backend

Ce guide vous explique comment tester manuellement votre API backend pour vous assurer que tout fonctionne correctement.

## 1. Tests Automatisés (Jest)
Pour lancer les tests automatisés :
```bash
cd backend
npm test
```
*Ces tests vérifient la connectivité et les principaux points d'accès (endpoints).*

## 2. Tests Manuels via le Navigateur
Assurez-vous que le serveur backend est lancé (`node index.js`).

- **Liste des propriétés** : Ouvrez [http://localhost:5000/api/properties](http://localhost:5000/api/properties). Vous devriez voir un JSON contenant 30 propriétés.
- **Liste des agents** : Ouvrez [http://localhost:5000/api/agents](http://localhost:5000/api/agents).
- **Détails d'une propriété** : Ouvrez [http://localhost:5000/api/properties/1](http://localhost:5000/api/properties/1).

## 3. Test de Création de Rendez-vous (POST)
Pour tester l'enregistrement d'un rendez-vous, vous pouvez utiliser une commande PowerShell :

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/appointments `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"bien_id": 1, "client_id": 1, "agent_id": 1, "date_heure": "2026-03-01T10:00:00Z", "notes": "Test de visite"}'
```

## 4. Vérification dans pgAdmin
Après avoir effectué un test POST, vous pouvez vérifier dans votre table `rendez_vous` que la nouvelle ligne a bien été ajoutée.
