# Harbour 2 Home — Fresh on Wheels

Premium mobile-first website for a Kerala harbour-to-home fish business. The conversion path is:

**QR scan → landing page → location → Fish Club → WhatsApp**

This is a static frontend. There is no backend, database, or admin panel. It deploys directly to Vercel.

## 1. Install dependencies

```bash
npm install
```

Requires Node.js 20 or later.

## 2. Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 3. Build

```bash
npm run build
```

## 4. Preview the production build

```bash
npm run preview
```

## 5. Deploy to Vercel

1. Push this folder to GitHub (or import it in the Vercel dashboard).
2. Create a new Vercel project from the repo.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

`vercel.json` already rewrites all routes to `index.html` so `/location` and `/club/vithura` work.

Optional production env var:

- `VITE_WA_GROUP_VITHURA` — official `https://chat.whatsapp.com/...` invite for Vithura.

Never put fake WhatsApp group links in production.

## 6. Add or edit locations

Edit only `src/data/locations.ts`. The rest of the app reads from `src/services/locationService.ts`.

Example:

```ts
{
  id: "nedumangad",
  name: "Nedumangad",
  nameMalayalam: "നെടുമങ്ങാട്",
  displayName: "Fish Club Nedumangad",
  keywords: ["nedumangad", "നെടുമങ്ങാട്"],
  whatsappGroupLink: null,
  active: true,
  latitude: 8.6034,
  longitude: 77.0028,
}
```

- **Disable a location:** `active: false`
- **Malayalam search:** put the same script in `nameMalayalam` and `keywords`
- **Coordinates:** area centre; used only in the browser for “Use my location”

## 7. Add WhatsApp group links

Paste an official WhatsApp invite URL:

```ts
whatsappGroupLink: "https://chat.whatsapp.com/YOUR_REAL_INVITE"
```

Until a group exists, keep `whatsappGroupLink: null`. The site will show “coming soon” and a **Request this Fish Club** button that opens WhatsApp to **+91 99619 12442**.

Direct chat always uses:

`https://wa.me/919961912442`

## 8. Create location-specific QR codes

Print QR codes that open:

| Sticker | URL |
| --- | --- |
| General vehicle | `https://yourdomain.com/` |
| Vithura route | `https://yourdomain.com/?location=vithura` |
| Nedumangad route | `https://yourdomain.com/?location=nedumangad` |

A `?location=` code skips the search screen and offers **Join Fish Club**, with **Change location** still available.

## WhatsApp behaviour

The website never adds people to groups automatically. It only opens official invite links or `wa.me` chats. Customers join with their own tap in WhatsApp.

## Project structure

```
src/
  components/
  pages/
  data/locations.ts
  services/locationService.ts
  config/business.ts
  utils/geo.ts
  utils/whatsapp.ts
  types/location.ts
```
