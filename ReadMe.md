# Inspira

**Inspira** est une application web de citations inspirantes qui permet aux utilisateurs de consulter, ajouter et gérer des citations. Elle fonctionne hors ligne grâce à un Service Worker et utilise IndexedDB pour le stockage local.

---

## Fonctionnalités

- **Affichage des citations** : Les citations sont présentées sous forme de cartes dynamiques avec leur texte et leur auteur.
- **Ajout de nouvelles citations** : Les utilisateurs peuvent ajouter leurs propres citations via un formulaire.
- **Fonctionnement hors ligne** : Grâce au Service Worker, l’application peut être utilisée sans connexion internet.
- **PWA (Progressive Web App)** : L’application peut être installée sur un appareil mobile ou desktop pour une expérience native.
- **Stockage local** : Les citations sont enregistrées localement via IndexedDB pour garantir leur persistance.

---

## Prérequis

- PHP à partir de la version 8.0 avec l'extension pdo_sqlite activée (pour l’API backend)
- Navigateur moderne compatible avec les PWA et IndexedDB (Chrome, Firefox, Edge, etc.)
- Serveur web local (comme celui intégré à PHP ou un outil comme XAMPP ou WAMP)

---

## Installation

1. Clonez le dépôt GitHub sur votre machine locale :
   ```bash
   git clone https://github.com/<votre-repository>/Inspira.git
   ```

2. Placez-vous dans le dossier principal :
   ```bash
   cd Inspira
   ```

3. Lancez un serveur PHP local depuis la racine du projet :
   ```bash
   php -S localhost:8000
   ```

4. Ouvrez votre navigateur et accédez à l'application :
   - [Inspira](http://localhost:8000)

---

## Structure du projet

```
Inspira/
├── Back/
│   ├── api.php                         # Point d'entrée pour les requêtes API
│   ├── citations.db                    # Script SQL pour créer la table Quotes
├── Front/             
│   ├── main.js                         # Logique principale de l'application
│   ├── IndexDB.js                      # Gestion IndexedDB
│   ├── myComponent.js                  # Composant custom de carte de citation
├── img/                                # Images pour l'application
│   ├── web-app-manifest-192x192.png
│   ├── web-app-manifest-512x512.png
│   ├── web-app-manifest-144x144.png
├── index.html                          # Page principale
├── service-worker.js                   # Service Worker pour fonctionnement offline
├── site.webmanifest                    # Manifest pour la PWA
```

---

## API Backend

### Endpoint : `api.php`

- **GET** : Retourne toutes les citations sous forme de JSON.
- **POST** : Ajoute une nouvelle citation à la base de données.

### Exemple de Réponse GET
```json
[
    {
        "id": 1,
        "quote": "Le plus grand risque est de ne prendre aucun risque.",
        "author": "Mark Zuckerberg"
    },
    {
        "id": 2,
        "quote": "La vie est ce que vous en faites.",
        "author": "Eleanor Roosevelt"
    }
]
```

---

## Utilisation

### Ajouter une citation
1. Remplissez le formulaire dédié dans l’application avec le texte de la citation et le nom de l’auteur.
2. Cliquez sur « Ajouter la citation ».

### Mode hors ligne
- L’application fonctionne normalement sans connexion internet.
- Les citations ajoutées hors ligne seront synchronisées lors du retour en ligne.

---

## Développement

### Base de données
L'application utilise **SQLite**. La table `Quotes` contient :
- `id` (INTEGER, clé primaire)
- `quote` (TEXT, le texte de la citation)
- `author` (TEXT, le nom de l'auteur)

### Personnalisation
Vous pouvez ajouter de nouvelles fonctionnalités ou modifier l’apparence en éditant les fichiers directement dans le projet.

---

## Améliorations futures

- **Pagination des citations**
- **Filtrage par auteur**
- **Ajout d'une fonctionnalité de favori**
- **Intégration avec une base de données externe**

---

## Licence

Ce projet est sous licence [MIT](LICENSE).

