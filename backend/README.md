## BACKEND - NODE

### Lancement du backend
###### Dans le dossier backend, lancez le backend avec les commandes:
node server

### Les fonctionalités du Backend

Le backend a été développé en utilisant Node.JS/Express, MongoDB et Mongoose. Les routes mises en place permettent de :

- Créer un utilisateur
- Se connecter
- Récupérer les informations d'un utilisateur spécifique
- Récupérer les informations de tous les utilisateurs
- Modifier un utilisateur et sa photo
- Supprimer un utilisateur

##### Une attention toute particulière a été portée à la sécurisation des données au niveau du Backend.
##### En particulier, nous avons mis en place une validation à la réception du formulaire et l'authentification des routes qui le nécessitent.
##### De plus, le mot de passe des utilisateurs est protégé et n'est jamais transmis au frontend avec le reste du profile.
