# CCC Social Toolkit 🚴

**Clondalkin Cycling Club** — Instagram & Facebook post generator

A lightweight, no-dependency web tool for creating consistent social media graphics for the CCC page. Hosted on GitHub Pages and available to all club admins.

---

## 🚀 Live Tool

**[Open the Toolkit →](https://YOUR-USERNAME.github.io/ccc-social-toolkit/)**

---

## Features

| Tab | What it does |
|-----|-------------|
| **Banner** | Facebook/Instagram cover banner with club name & handle |
| **Spin** | Weekly spin announcement post (1:1 square) |
| **Result** | Post-ride stats post with km, elevation, time, riders |
| **Schedule** | Weekly Tue/Thu/Sun ride schedule post |
| **#Tags** | One-click hashtag sets — copy and paste into captions |

- ✅ All templates editable live — change text, see it update instantly
- ✅ Logo upload field — swap in a transparent PNG when ready
- ✅ Download as PNG (3× resolution, ready to post)
- ✅ Italian tricolour stripe (red → white → green) throughout
- ✅ Consistent CCC branding across all posts

---

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

*Built for Clondalkin Cycling Club | Dublin*
