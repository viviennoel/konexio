# TEST TECHNIQUE KONEXIO

Pour lancer l'application web locallement, importez ce repository à l'aide de la commande: 
git clone https://github.com/viviennoel/konexio.git
Vous pourrez ensuite accéder au dossier frontend et au dossier backend.

## LANCEMENT

### Lancement du backend
###### Dans le dossier backend, lancez le backend avec les commandes:
node server

### Lancement du frontend
###### Dans le dossier frontend, lancez le frontend avec les commandes:
npm install
npm start

## FRONTEND - REACT

### Les fonctionnalités du Frontend
Pour mettre en place ce frontend, nous avons utilisé Reactjs, redux et Bootstrap.
Cela nous a permis de mettre en place une application monopage permettant aux utilisateurs de:
- Créer un compte avec validation des champs avant l'envoi. Les utilisateurs sont également prévenus si un champs est incorrect ou manquant.
- Se connecter en utilisant ses identifiants secrets.
- Voir tous les membres de Konexio déja enregistrés et les modifier (seulement si le status de l'utilisateur connecté est "teacher".
- Voir son propre profil, modifier son status et sa photo de profile.
- Voir le staus des membres (uniquement si il s'agit d'un professeur ou de son assitant car cette section contient des informations sensibles.
- Modifier le nom et prénom d'un utilisateur,
- Se déconnecter.

##### Une attention toute particulière a été portée au design et à la navigation (component ScrollToTop, utilisation de Bootstrap et Animations, Design responsif...)

## BACKEND - NODE

### Les fonctionalités du Backend

Le backend a été développé en utilisant Node.JS/Express, MongoDB et Mongoose.
Les routes mises en place permettent de : 
- Créer un utilisateur
- Se connecter
- Récupérer les informations d'un utilisateur spécifique
- Récupérer les informations de tous les utilisateurs
- Modifier un utilisateur et sa photo
- Supprimer un utilisateur

##### Une attention toute particulière a été portée à la sécurisation des données au niveau du Backend.
##### En particulier, nous avons mis en place une validation à la réception du formulaire et l'authentification des routes qui le nécessitent.
##### De plus, le mot de passe des utilisateurs est protégé et n'est jamais transmis au frontend avec le reste du profile.

## AXES D'AMELIORATION
- L'utilisation de Traefik et Docker serait intéressante à mettre en place pour le lancement en production de cette application.
- La mise en place de tests en utilisant Mocha serait également intéressante pour cette application.
- La modification du status par l'utilisateur lui même me semble risqué, car il change les droits sur la modification des profiles. Une vérification au niveau du Backend avec certains E-mails authorisés pour le poste de professeur serait souhaitable.

