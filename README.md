# Flapi - StarterKit BackEnd

## 🛠 Tech Stack

- TypeScript (Language)
- Adonis (Framework)
- CI / CD (Github Actions)
- Docker / DockerCompose (Development-Local)
- Kubernetes (Development-Remote, Staging and Production)
- Unit / Functional Tests (Japa)
- MariaDB (Database)

<br /><br /><br /><br />

## 🏗️ Architecture de l'Application / Infrastructure
Ce projet est structuré en quatre dépôts distincts pour assurer une modularité et une scalabilité maximales. Chaque dépôt est un microservice indépendant, permettant des mises à jour, des tests et un déploiement en continu pour chaque composant sans affecter les autres parties de l'application. Cette approche suit une architecture orientée microservices pour optimiser la flexibilité et la maintenabilité. <br /><br />

1. `crypto-viz-frontend` <br />
Rôle : Ce dépôt contient le code pour l'interface utilisateur (UI) de l'application. Il permet aux utilisateurs finaux de visualiser les données et les analyses en temps réel. <br />
Technologies : Développé avec Nuxt et TypeScript, le frontend utilise des librairies de visualisation (comme D3.js ou Chart.js) pour représenter les analyses de données avec une dimension temporelle. <br />
Responsabilité : Ce service consomme l'API fournie par crypto-viz-backend pour afficher les graphiques et les données mises à jour.
<br />

2. `crypto-viz-scraper` <br />
Rôle : Service de collecte de données en temps réel depuis un flux d’actualités sur les cryptomonnaies. <br />
Technologies : Utilise Node.js ou Python avec des outils de scraping comme Puppeteer (Node.js) ou BeautifulSoup (Python). <br />
Responsabilité : Il suit le modèle producteur/consommateur pour transmettre les données au broker de messages (crypto-viz-broker) dès qu'elles sont collectées. Ce composant est toujours actif pour assurer un flux continu de données.
<br />

3. `crypto-viz-backend` <br />
Rôle : Service d’analyse des données collectées, qui traite et transforme les données reçues pour générer des analyses exploitables par le frontend. <br />
Technologies : Construit avec un framework backend avec AdonisJS. <br />
Responsabilité : Le backend consomme les données via crypto-viz-broker, les analyse, et expose les résultats sous forme d’API pour le frontend. Ce service est en charge de la logique métier et du traitement des données pour en faire des insights significatifs.
<br />
 
4. `crypto-viz-broker` <br />
Rôle : Ce composant est le broker de messages et gère la communication entre le scraper, le backend, et le frontend. <br />
Technologies : Utilisation de NATS comme système de gestion de messages. <br />
Responsabilité : Assure le transfert efficace et en temps réel des messages entre le scraper (producteur de données) et le backend (consommateur/analyste des données). Il permet la scalabilité de l'application en découplant les composants.

<br /><br /><br /><br />

## 📦 Versionning

On utilise la convention SemVer : https://semver.org/lang/fr/ <br /><br />
Pour une Release classique : MAJOR.MINOR.PATCH <br />
Pour une Pre-Release, exemples : MAJOR.MINOR.PATCH-rc.0 OR MAJOR.MINOR.PATCH-beta.3 <br /><br />

Nous utilison release-please de Google pour versionner, via Github Actions. <br />
Pour que cela sois pris en compte il faut utiliser les conventionnal commits : https://www.conventionalcommits.org/en/v1.0.0/ <br />
Release Please crée une demande d'extraction de version après avoir remarqué que la branche par défaut contient des « unités publiables » depuis la dernière version. Une unité publiable est un commit sur la branche avec l'un des préfixes suivants : `feat` / `feat!` et `fix` / `fix!`. <br /><br />

La première Release que créer release-please automatiquement est la version : 1.0.0 <br />
Pour créer une Pre-Release faire un commit vide, par exemple si on'ai à la version 1.0.0, on peut faire :

```bash
git commit --allow-empty -m "chore: release 1.1.0-rc.0" -m "Release-As: 1.1.0-rc.0"
```

<br /><br /><br /><br />

## 🚀 Conventions de Commit
Nous utilisons les conventions de commit pour maintenir une cohérence dans l'historique du code et faciliter le versionnement automatique avec release-please. Voici les types de commits que nous utilisons, ainsi que leur impact sur le versionnage :

- feat : Introduction d'une nouvelle fonctionnalité pour l'utilisateur. Entraîne une augmentation de la version mineure (par exemple, de 1.0.0 à 1.1.0).

- feat! : Introduction d'une nouvelle fonctionnalité avec des modifications incompatibles avec les versions antérieures (breaking changes). Entraîne une augmentation de la version majeure (par exemple, de 1.0.0 à 2.0.0).

- fix : Correction d'un bug pour l'utilisateur. Entraîne une augmentation de la version patch (par exemple, de 1.0.0 à 1.0.1).

- fix! : Correction d'un bug avec des modifications incompatibles avec les versions antérieures (breaking changes). Entraîne une augmentation de la version majeure.

- docs : Changements concernant uniquement la documentation. N'affecte pas la version.

- style : Changements qui n'affectent pas le sens du code (espaces blancs, mise en forme, etc.). N'affecte pas la version.

- refactor : Modifications du code qui n'apportent ni nouvelle fonctionnalité ni correction de bug. N'affecte pas la version.

- perf : Changements de code qui améliorent les performances. Peut entraîner une augmentation de la version mineure.

- test : Ajout ou correction de tests. N'affecte pas la version.

- chore : Changements qui ne modifient ni les fichiers source ni les tests (par exemple, mise à jour des dépendances). N'affecte pas la version.

- ci : Changements dans les fichiers de configuration et les scripts d'intégration continue (par exemple, GitHub Actions). N'affecte pas la version.

- build : Changements qui affectent le système de build ou les dépendances externes (par exemple, npm, Docker). N'affecte pas la version.

- revert : Annulation d'un commit précédent. N'affecte pas la version.

Pour indiquer qu'un commit introduit des modifications incompatibles avec les versions antérieures (breaking changes), ajoutez un ! après le type de commit, par exemple feat! ou fix!.

Pour plus de détails sur les conventions de commit, consultez : [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

<br /><br /><br /><br />

## 📚 Domains of different environments

- Production : https://test.crzcommon.com
- Staging : https://staging.test.crzcommon.com
- Development-Remote : https://dev.test.crzcommon.com

<br /><br /><br /><br />

## ⚙️ Setup Environment Development

1. Clone the project repository using the following commands :

```bash
git clone git@github.com:corentin35000/crypto-viz-back-end.git
```

2. Steps by Platform :

```bash
# Windows :
1. Requirements : Windows >= 10
2. Download and Install WSL2 : https://learn.microsoft.com/fr-fr/windows/wsl/install
3. Download and Install Docker Desktop : https://docs.docker.com/desktop/install/windows-install/

# macOS :
1. Requirements : macOS Intel x86_64 or macOS Apple Silicon arm64
2. Requirements (2) : macOS 11.0 (Big Sur)
2. Download and Install Docker Desktop : https://docs.docker.com/desktop/install/mac-install/

# Linux (Ubuntu / Debian) :
1. Requirements : Ubuntu >= 20.04 or Debian >= 10
2. Download and Install Docker (Ubuntu) : https://docs.docker.com/engine/install/ubuntu/
3. Download and Install Docker (Debian) : https://docs.docker.com/engine/install/debian/
```

<br /><br /><br /><br />

## 🔄 Cycle Development

1. Open Docker Desktop
2. Run command :

```bash
   # Start the development server on http://localhost:3555 (AdonisJS)
   # Start the development server on http://localhost:7450 (PhpMyAdmin)
   # Start MariaDB port is : 3308
   npm install # just for the idea
   npm run dev:docker
```

<br /><br /><br /><br />

## 🔄 Unit / Functional Tests

1. Run command :

```bash
# Environment : Development
npm run test:develop

# Environment : Staging / Production
npm run test:staging-prod
```

<br /><br /><br /><br />

## 🚀 Production

### ⚙️➡️ Automatic Distribution Process (CI / CD)

#### Si c'est un nouveau projet suivez les instructions :

1. Ajoutées les SECRETS_GITHUB pour :
   - DOCKER_HUB_USERNAME
   - DOCKER_HUB_ACCESS_TOKEN
   - KUBECONFIG
   - PAT (crée un nouveau token si besoin sur le site de github puis dans le menu du "Profil" puis -> "Settings" -> "Developper Settings' -> 'Personnal Access Tokens' -> Tokens (classic))
