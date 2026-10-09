# Skill : Traitement des images pour le blog LIP

Procédure complète pour préparer les photos brutes avant intégration dans le blog Astro.
À consulter avant tout ajout d'images, quel que soit l'article.

---

## Objectifs

1. **Anonymiser** les métadonnées EXIF (GPS, appareil, date de prise de vue…)
2. **Optimiser** pour le web (WebP, max 1920 px, qualité 85)
3. **Filigraner** avec le logo LIP vert forêt (`#007453`) et un QR code vers `https://www.lip-industrie.com`

---

## Prérequis

- Python 3.x installé
- Librairies : `Pillow`, `piexif`, `qrcode`

```powershell
pip install Pillow piexif qrcode --user
```

- Script de traitement : `D:\blog.lip-industrie.com\process-images.py`
- Logo source : `D:\blog.lip-industrie.com\logos\logo-lip.png` (fond transparent, pixels blancs recolorés en vert par le script)

---

## Usage du script

```powershell
python "D:\blog.lip-industrie.com\process-images.py" <dossier_source> <dossier_sortie> --prefix <préfixe>
```

### Paramètres

| Paramètre | Description | Exemple |
|---|---|---|
| `dossier_source` | Dossier des photos JPG/PNG brutes | `D:\blog.lip-industrie.com\elecro-erosion` |
| `dossier_sortie` | Dossier de destination dans le projet Astro | `src\assets\photos\electroerosion` |
| `--prefix` | Préfixe court pour nommer les fichiers WebP | `edm` |

Le script crée le dossier de sortie s'il n'existe pas.

### Exemples par sujet

```powershell
# Électroérosion
python "D:\blog.lip-industrie.com\process-images.py" ^
  "D:\blog.lip-industrie.com\elecro-erosion" ^
  "D:\blog.lip-industrie.com\blog.lip-industrie.com\src\assets\photos\electroerosion" ^
  --prefix edm

# Fraisage
python "D:\blog.lip-industrie.com\process-images.py" ^
  "D:\blog.lip-industrie.com\fraisage" ^
  "D:\blog.lip-industrie.com\blog.lip-industrie.com\src\assets\photos\fraisage" ^
  --prefix fra

# Tournage
python "D:\blog.lip-industrie.com\process-images.py" ^
  "D:\blog.lip-industrie.com\tournage" ^
  "D:\blog.lip-industrie.com\blog.lip-industrie.com\src\assets\photos\tournage" ^
  --prefix trn
```

---

## Ce que fait le script (étape par étape)

1. **Lecture** de chaque fichier JPG/PNG du dossier source
2. **Correction d'orientation** via `ImageOps.exif_transpose` (évite les photos retournées)
3. **Anonymisation EXIF** : tous les blocs EXIF (0th, Exif, GPS, 1st) sont vidés via `piexif`
4. **Redimensionnement** : si largeur > 1920 px, redimensionnement proportionnel
5. **Filigrane** :
   - Logo `logo-lip.png` recolorisé en vert `#007453`, positionné en bas à droite
   - QR code vert `#007453` pointant vers `https://www.lip-industrie.com`, positionné à gauche du logo
   - Opacité : 180/255 (semi-transparent)
   - Taille relative à la photo (environ 1/12e de hauteur pour le logo, 1/10e pour le QR)
6. **Export WebP** : qualité 85, méthode 6 (compression lente mais optimale)
7. **Nommage** : `{prefix}-{nom_original}.webp` (ex: `edm-1826.webp`)

---

## Intégration dans un article Astro (.mdx)

Après traitement, importer les images via le composant `<Image>` d'Astro :

```mdx
---
heroImage: '../../../assets/photos/electroerosion/edm-1826.webp'
heroAlt: "Description alt précise pour SEO"
---

import { Image } from 'astro:assets';
import maPhoto from '../../../assets/photos/electroerosion/edm-1835.webp';

<Image
  src={maPhoto}
  alt="Description alt précise pour l'accessibilité et le SEO"
  title="Titre affiché au survol — LIP Industrie Précision, Besançon"
/>
```

**Règles de nommage alt/title :**
- `alt` : description factuelle de ce qu'on voit (pour SEO + accessibilité)
- `title` : peut inclure le nom de l'entreprise et la ville (Besançon) pour le SEO local

---

## Constantes modifiables dans le script

Ouvrir `D:\blog.lip-industrie.com\process-images.py` et ajuster en haut du fichier :

| Constante | Valeur par défaut | Rôle |
|---|---|---|
| `LIP_GREEN` | `(0, 116, 83)` | Couleur vert forêt `#007453` |
| `WATERMARK_OPACITY` | `180` | Transparence filigrane (0=invisible, 255=opaque) |
| `WEB_MAX_WIDTH` | `1920` | Largeur max sortie en pixels |
| `WEB_QUALITY` | `85` | Qualité WebP (70-90 recommandé) |
| `SITE_URL` | `https://www.lip-industrie.com` | URL encodée dans le QR code |

---

## Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| `ModuleNotFoundError: piexif` | piexif non installé | `pip install piexif --user` |
| `UnicodeEncodeError` dans le terminal | Encodage Windows cp1252 | Le script évite les caractères spéciaux — vérifier qu'il n'y en a pas dans les chemins |
| Image pivotée | EXIF d'orientation ignoré | Déjà géré par `ImageOps.exif_transpose` |
| Filigrane trop gros/petit | Photo très petite ou très grande | Ajuster les ratios `logo_h = h // 12` dans `apply_watermark()` |
