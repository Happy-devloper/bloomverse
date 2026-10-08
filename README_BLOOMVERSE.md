# Bloomverse

Create a digital flower bouquet or write a vintage-style love letter, then share it with someone special. Bloomverse is a browser-based React app with animated previews and shareable links.

## What you can make

### Digital bouquets

- Choose from 10 flowers: red rose, yellow rose, lily, peony, sunflower, orchid, hydrangea, camellia, chrysanthemum, and magnolia.
- Arrange up to 20 flowers in Classic Round, Luxury Cascade, Minimal Modern, or Heart Shape layouts.
- Add recipient and sender names, plus a personal note.
- Watch a live bouquet preview as you make changes.
- Review the finished card, download it as an image, copy its link, or share it on WhatsApp.

### Vintage-style letters

- Pick one of five cover themes: Passionate Rose, Moonlight Romance, Vintage Love, Garden Whisper, or Eternal Gold.
- Choose from five handwriting styles.
- Write a personal letter and preview its cover or letter page.
- Share the letter with a link or WhatsApp, and download a card image.

Shared bouquets and letters open as animated greetings. You can also download the card from the shared page.

## Getting started

### Requirements

- Node.js version supported by Vite 8
- npm

### Install and run

Clone the repository, then open a terminal in the project folder, the one containing `package.json`:

```sh
git clone <repository-url>
cd bloomverse
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Available commands

```sh
npm run dev        # Start the local development server
npm run build      # Create a production build in dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm test           # Run the Vitest test suite once
npm run test:watch # Run tests in watch mode
```

## Optional AdSense setup

Ads are disabled until both public AdSense values are configured.

1. Copy `.env.example` to `.env`.
2. Set `VITE_ADSENSE_CLIENT_ID` and `VITE_ADSENSE_SLOT_ID` to the public publisher and ad-slot IDs from your AdSense account.
3. Restart the development server or rebuild the app.

In PowerShell, copy the example file with:

```powershell
Copy-Item .env.example .env
```

The project ignores `.env` files so local settings are not added to Git. Vite exposes every variable prefixed with `VITE_` in the browser bundle. These AdSense IDs are public configuration; never put passwords, private API keys, or other secrets in this frontend environment file.

## Sharing and privacy

Bloomverse creates share links in the browser and does not send bouquet or letter content to a URL-shortening service. The link includes the selected flowers or letter settings, names, and message as Base64-encoded data. Base64 is not encryption: anyone with the link can read its contents. Avoid including confidential or sensitive information.

The app does not require a database or application server for creating and sharing content. Shared content travels in the link itself.

## Technology

- React 19
- Vite 8
- Tailwind CSS, compiled locally with PostCSS
- Framer Motion
- Vitest and ESLint

Google Fonts are loaded from Google Fonts. AdSense is optional and only loads when configured.

## Project layout

- `src/pages/` contains the landing, bouquet builder, preview, and shared-content screens.
- `src/components/letters/` contains the letter creation steps, themes, and previews.
- `src/components/bouquet/` and `src/components/flowers/` contain bouquet layout and rendering components.
- `src/data/` contains flower and letter theme data.
- `src/utils/` contains sharing, validation, placement, and card-download helpers.
- `public/` contains images and other static assets.

## Build for deployment

Run `npm run build` and deploy the generated `dist/` directory to a static hosting service that supports Vite apps. Configure the same build command and output directory in your hosting provider. If you use AdSense, add the two public `VITE_ADSENSE_*` values to the provider's build environment.

