# Bloomverse

Make a digital flower bouquet or write a vintage-style love letter, then share it with someone special. Bloomverse is a React app with animated previews and shareable links.

## Features

### Create a bouquet

- Pick from 10 flowers: red rose, yellow rose, lily, peony, sunflower, orchid, hydrangea, camellia, chrysanthemum, and magnolia.
- Arrange up to 20 flowers in Classic Round, Luxury Cascade, Minimal Modern, or Heart Shape layouts.
- Add recipient and sender names and a personal note.
- Preview your bouquet as you work, then download a card image, copy a share link, or share on WhatsApp.

### Write a vintage-style letter

- Choose from five cover themes and five handwriting styles.
- Write a personal letter and preview the cover or letter page.
- Share the letter with a link or WhatsApp, or download a card image.

Shared bouquets and letters open as animated greetings. Recipients can also download the card.

## Getting started

### Requirements

- Node.js supported by Vite 8
- npm

### Install and run

Open a terminal in the project folder, the folder containing `package.json`, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Available commands

```sh
npm run dev        # Start the local development server
npm run build      # Build the app into dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm test           # Run the test suite once
npm run test:watch # Run tests in watch mode
```

## Optional AdSense setup

Ads are disabled unless both public AdSense IDs are configured.

1. Copy `.env.example` to `.env`.
2. Set `VITE_ADSENSE_CLIENT_ID` and `VITE_ADSENSE_SLOT_ID` to your AdSense publisher and ad-slot IDs.
3. Restart the development server or rebuild the app.

In PowerShell, copy the example file with:

```powershell
Copy-Item .env.example .env
```

Local `.env` files are ignored by Git. Vite includes every `VITE_*` value in the browser bundle, so do not put passwords, private API keys, or other secrets in this frontend environment file.

## Sharing and privacy

Share links include the bouquet or letter details, names, and message as Base64-encoded data. Base64 is not encryption; anyone with the link can read its contents. Avoid including confidential information.

Links are generated in the browser. Bloomverse does not send your content to a URL-shortening service or require a database to share it.

## Technology

- React 19 and Vite 8
- Tailwind CSS compiled locally with PostCSS
- Framer Motion
- Vitest and ESLint

Google Fonts are loaded from Google Fonts. AdSense is optional.

## Project structure

- `src/pages/` contains the landing, bouquet builder, preview, and shared-content screens.
- `src/components/letters/` contains letter creation, themes, and previews.
- `src/components/bouquet/` and `src/components/flowers/` contain bouquet layout and rendering components.
- `src/data/` contains flower and letter theme data.
- `src/utils/` contains sharing, validation, placement, and card-download helpers.
- `public/` contains images and static assets.

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static hosting provider that supports Vite apps. Set the build command to `npm run build` and the output directory to `dist`. If you use AdSense, add the two `VITE_ADSENSE_*` settings to the provider's build environment.
