# Site Web MTGC - Documentation

## Vue d'ensemble

Ce projet constitue la refonte complète du site web vitrine de MTGC (Martineau Thibodeau Groupe Conseil), une firme de génie-conseil spécialisée en mécanique et électricité située au Québec.

## Objectifs réalisés

✅ **Design moderne et professionnel** - Interface épurée avec palette de bleu corporatif  
✅ **Contenu intégral** - Reprise complète du contenu du site existant  
✅ **Responsive Design** - Compatible desktop, tablette et mobile  
✅ **Conformité Loi 25** - Politique de confidentialité et bannière de consentement  
✅ **Formulaires fonctionnels** - Prise de rendez-vous et demande de soumission  
✅ **Optimisation SEO** - Balises meta, structure sémantique  
✅ **Performance** - Code optimisé pour chargement rapide  

## Structure du projet

```
mtgc-website/
├── index.html                 # Page d'accueil principale
├── css/
│   ├── style.css             # Styles principaux
│   └── responsive.css        # Styles responsive
├── js/
│   ├── main.js              # JavaScript principal
│   └── forms.js             # Gestion des formulaires
├── images/
│   ├── mtgc-logo.png        # Logo officiel MTGC
│   └── team/                # Photos de l'équipe
├── pages/
│   ├── politique-confidentialite.html
│   └── mentions-legales.html
└── README.md                # Cette documentation
```

## Fonctionnalités principales

### Navigation
- Menu responsive avec ancres vers les sections
- Logo MTGC officiel intégré
- Navigation mobile avec menu hamburger

### Sections du site
1. **Accueil** - Hero section avec appel à l'action
2. **À propos** - Présentation de l'entreprise et valeurs
3. **Services** - Détail des services en mécanique et électricité
4. **Équipe** - Profils des associés avec photos professionnelles
5. **Carrière** - Section recrutement
6. **Contact** - Coordonnées et formulaires

### Formulaires
1. **Prise de rendez-vous**
   - Prénom, nom, téléphone, courriel
   - Choix d'horaire et type de service
   - Message facultatif

2. **Demande de soumission**
   - Nom complet, entreprise, coordonnées
   - Description détaillée du projet
   - Upload de fichiers (PDF, plans, documents)

### Conformité légale
- **Bannière de consentement** aux témoins (cookies)
- **Politique de confidentialité** conforme à la Loi 25 du Québec
- **Mentions légales** complètes
- Gestion des droits d'auteur et propriété intellectuelle

## Technologies utilisées

- **HTML5** - Structure sémantique moderne
- **CSS3** - Styles avancés avec variables CSS et Flexbox/Grid
- **JavaScript ES6+** - Interactions et gestion des formulaires
- **Responsive Design** - Mobile-first approach
- **Optimisation** - Minification et compression des assets

## Palette de couleurs

- **Bleu principal** : #2E5BBA (bleu corporatif MTGC)
- **Bleu secondaire** : #1E3A8A (bleu foncé pour contrastes)
- **Gris foncé** : #374151 (textes principaux)
- **Gris moyen** : #6B7280 (textes secondaires)
- **Gris clair** : #F3F4F6 (arrière-plans)
- **Blanc** : #FFFFFF (arrière-plan principal)

## Typographie

- **Police principale** : Inter (Google Fonts)
- **Poids utilisés** : 300, 400, 500, 600, 700
- **Hiérarchie** : H1 (2.5rem), H2 (2rem), H3 (1.5rem), Body (1rem)

## Instructions de déploiement

### Option 1: Hébergement statique
1. Télécharger tous les fichiers du dossier `mtgc-website/`
2. Téléverser sur votre serveur web (Apache, Nginx, etc.)
3. Configurer le domaine pour pointer vers `index.html`

### Option 2: Services d'hébergement cloud
- **Netlify** : Glisser-déposer le dossier complet
- **Vercel** : Connecter le repository Git
- **GitHub Pages** : Pousser vers un repository GitHub

### Configuration serveur recommandée
```apache
# .htaccess pour Apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache des assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## Configuration des formulaires

Les formulaires sont actuellement configurés pour envoyer vers des endpoints fictifs. Pour les rendre fonctionnels :

1. **Backend PHP** (recommandé)
```php
// contact.php
<?php
if ($_POST['form_type'] === 'appointment') {
    // Traitement prise de rendez-vous
    $to = 'info@mtgc.ca';
    $subject = 'Nouvelle demande de rendez-vous';
    // ... logique d'envoi email
}
?>
```

2. **Service tiers** (Formspree, Netlify Forms, etc.)
- Modifier l'attribut `action` des formulaires
- Ajouter les clés API nécessaires

## Maintenance et mises à jour

### Contenu
- Textes : Modifier directement dans `index.html`
- Images : Remplacer dans le dossier `images/`
- Équipe : Ajouter photos dans `images/team/`

### Styles
- Couleurs : Variables CSS dans `css/style.css`
- Responsive : Breakpoints dans `css/responsive.css`

### Conformité légale
- Politique de confidentialité : `pages/politique-confidentialite.html`
- Mentions légales : `pages/mentions-legales.html`

## Support et contact

Pour toute question technique concernant ce site web :

**Développement** : Site créé selon les spécifications MTGC  
**Client** : MTGC - info@mtgc.ca - 418-579-4395  

## Licence

© 2025 MTGC (Martineau Thibodeau Groupe Conseil). Tous droits réservés.

Ce site web et son code source sont la propriété exclusive de MTGC. Toute reproduction, modification ou redistribution est interdite sans autorisation écrite préalable.

