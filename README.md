# CCC Social Toolkit 🚴

**Clondalkin Cycling Club** — Instagram & Facebook post generator + Spin Routes manager

A React + Vite web tool for creating consistent social media graphics and managing cycling routes. Hosted on GitHub Pages with real-time data persistence via Firebase Firestore.

---

## Features

### 📱 Social Media Templates

| Tab          | What it does                                            |
| ------------ | ------------------------------------------------------- |
| **Banner**   | Facebook/Instagram cover banner with club name & handle |
| **Spin**     | Weekly spin announcement post (1:1 square)              |
| **Result**   | Post-ride stats post with km, elevation, time, riders   |
| **Schedule** | Weekly Tue/Thu/Sun ride schedule post                   |
| **#Tags**    | One-click hashtag sets — copy and paste into captions   |

- ✅ All templates editable live — change text, see it update instantly
- ✅ Logo upload field — swap in a transparent PNG when ready
- ✅ Download as PNG (3× resolution, ready to post)
- ✅ Consistent CCC branding across all posts

### 🗺️ Spin Routes Manager

- ✅ Add cycling routes with distance, elevation, duration
- ✅ Auto-categorize by elevation (>600m = hilly) or route notes
- ✅ Categories: Hilly, Flat, Cafe Spins, Inter Group, Training
- ✅ Click to copy Strava URL to clipboard
- ✅ Real-time persistence to Firebase Firestore
- ✅ Shared across all users (no refresh needed for new routes)

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Firebase Firestore (real-time database)
- **Hosting:** GitHub Pages
- **Build:** Vite + ESBuild

---

## Getting Started

### Install

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and add your Firebase credentials:

```bash
cp .env.example .env.local
```

Then fill in:
- **Strava API** (optional — for route preview links)
- **Firebase** — project ID, API key, auth domain, etc.

### Run Locally

```bash
npm run dev
```

Dev server starts at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Outputs to `dist/` — ready to deploy to GitHub Pages.

---

## Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable **Firestore Database** (free tier)
3. Create two collections:
   - `spinRoutes` — individual route documents
   - `tags` — optional tag metadata

4. Set Firestore security rules:
   ```firestore
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /spinRoutes/{docId} {
         allow read, write: if true;
       }
       match /tags/{docId} {
         allow read, write: if true;
       }
     }
   }
   ```

5. Copy your Firebase web config into `.env.local`

---

## Deploy to GitHub Pages

1. Update `vite.config.js` with your repo name:
   ```javascript
   base: '/ccc-social-toolkit/'
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Push `dist/` to GitHub Pages or use GitHub Actions

---

## Project Structure

```
src/
  ├── App.jsx                 # Main app & Firestore persistence
  ├── firebase.js             # Firebase config
  ├── components/
  │   ├── Templates.jsx       # Renders all templates & spin routes
  │   ├── Sidebar.jsx         # Navigation & input panels
  │   ├── BannerPanel.jsx     # Banner editor
  │   ├── SpinPanel.jsx       # Spin post editor
  │   ├── SpinRoutesPanel.jsx # Route input form
  │   └── ...
  ├── data/
  │   ├── spinRoutes.js       # Initial route categories
  │   └── hashtags.js         # Hashtag sets
  └── styles.css              # Global styles

public/
  └── assets/                 # Logos & images

.env.example                  # Template for environment variables
.env.local                    # Your local credentials (not committed)
```

---

## Environment Variables

Required in `.env.local`:

```
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Strava (optional)
VITE_STRAVA_CLIENT_ID=...
VITE_STRAVA_CLIENT_SECRET=...
VITE_STRAVA_ACCESS_TOKEN=...
VITE_STRAVA_API_BASE_URL=https://www.strava.com/api/v3
```

---

## Contributing

This is a club-specific tool. To contribute or fork:

1. Clone the repo
2. Install dependencies
3. Create your own Firebase project
4. Update `.env.local` with your credentials
5. Run `npm run dev` and make changes
6. Test locally, then build and deploy

---

## License

Built for **Clondalkin Cycling Club** 🚴‍♂️

This app supports Vite env variables for local configuration.

- Keep your secret values in `.env`, `.env.local`, or another local env file.
- `.env` and `.env.local` are ignored by git.
- Do not commit private Strava client secrets or access tokens.

Example variables are in `.env.example`.

> Important: GitHub Pages is a static hosting platform. Any secret embedded into the built frontend bundle is still publicly visible. If you need a private Strava access token, use a server-side proxy or build pipeline that injects credentials securely.

## How to Use

1. Open the live link above
2. Click a tab (Banner, Spin, Result, etc.)
3. Fill in the fields on the left — the preview updates live
4. Click **⬇ Download PNG** to save the image
5. Post directly to Instagram or Facebook

### Hashtags

- Click the **#Tags** tab
- Pick a set (Core Club, Road Cycling, Weekend Spin, etc.)
- Click **Copy All** → paste into your caption

---

## Deploying to GitHub Pages

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Save — your site will be live at `https://YOUR-USERNAME.github.io/ccc-social-toolkit/`

---

## Updating the Logo

Replace `assets/ccc-logo.jpg` with your new logo file (same filename), or upload a transparent PNG directly in the tool using the logo upload field in the sidebar.

For best results with a transparent logo:

- Export as PNG with transparency
- Use the in-tool upload (it auto-detects PNG and removes the white background treatment)

---

## Adding New Templates

The project is structured for easy extension:

```
ccc-social-toolkit/
├── index.html        ← all template markup
├── css/
│   └── style.css     ← all styles & template design
├── js/
│   └── app.js        ← live update logic, hashtags, downloads
└── assets/
    └── ccc-logo.jpg  ← default logo
```

To add a new template:

1. Add a new nav button in `index.html`
2. Add a panel with fields in the sidebar
3. Add the template markup in the canvas area
4. Add an `update*()` function in `app.js`

---

## Content Strategy Tips

**Post frequency:** Aim for 3× per week minimum

- Tuesday/Thursday: Spin reminder (use the Spin template)
- Sunday: Post-ride result (use the Result template)
- Weekly: Pin the Schedule post

**Photography:** Action shots > posed group photos. Golden hour on evening spins is unbeatable.

**Reels:** A 15–30 second clip from a spin will 3–5× your reach vs a static post.

---

_Built for Clondalkin Cycling Club | Dublin_
