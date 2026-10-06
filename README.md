# Bloomverse

Bloomverse is a React and Vite app for creating, previewing, downloading, and sharing digital flower bouquets.

## Setup

```sh
npm install
npm run dev
```

## Production build and lint

```sh
npm run lint
npm run build
```

## Optional AdSense configuration

Copy `.env.example` to `.env` and set `VITE_ADSENSE_CLIENT_ID` and
`VITE_ADSENSE_SLOT_ID` to your public AdSense values. Leave them blank to
disable ads.

Vite includes every `VITE_*` value in the browser bundle. Do not store
passwords, private API keys, or other secrets in this frontend `.env` file.

## Sharing and privacy

Share links contain bouquet flowers, recipient and sender names, and the
message in the URL. The data is encoded, not encrypted, so anyone with the
link can read it. Link generation stays in the browser and does not submit
bouquet details to a URL-shortening service.
