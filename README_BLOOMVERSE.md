# DigiBloom - Digital Flower Bouquet Greeting Cards

A mobile-first web application that allows users to create beautiful animated digital flower bouquets and send them as personalized greeting cards. Built with React, Vite, Framer Motion, and Tailwind CSS.

## Features

✨ **Core MVP Features:**
- 🌹 **Flower Selection** - Choose from 8 different flower types
- 🎨 **Bouquet Layouts** - 4 different arrangement styles (Classic Round, Luxury Cascade, Minimal Modern, Heart Shape)
- 💌 **Personalized Messages** - Add custom messages with recipient and sender names
- ✨ **Bloom Animation** - Beautiful animated bouquet with floating petal effects
- 🔗 **Shareable Links** - Generate unique URLs to share bouquets (URL-encoded data, no backend needed)
- 📱 **Mobile-First Design** - Optimized for iPhone 14/15 (390px × 844px)
- 💬 **Share Options** - Copy link or share directly on WhatsApp
- 📊 **AdSense Ready** - Ad integration on shared bouquet pages

## Quick Start

### Prerequisites
- A Node.js version supported by Vite 8
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bloomverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── flowers/
│   │   └── FlowerSelector.jsx
│   ├── bouquet/
│   │   ├── BouquetCanvas.jsx
│   │   ├── LayoutSelector.jsx
│   │   └── MessageEditor.jsx
│   └── AdBanner.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── BouquetBuilder.jsx
│   ├── PreviewScreen.jsx
│   └── SharedBouquetPage.jsx
├── data/
│   └── flowers.js
├── utils/
│   └── urlEncoding.js
├── App.jsx
├── main.jsx
└── index.css
```

## User Flow

### Creating a Bouquet (2-3 minutes)
1. **Landing Page** → Hero section with CTA
2. **Flower Selection** → Choose up to 8 flowers
3. **Layout Selection** → Pick arrangement style
4. **Message Editor** → Add recipient name, sender name, and message
5. **Preview** → Review bouquet and copy link
6. **Share** → Send via link, WhatsApp, or copy to clipboard

### Viewing a Shared Bouquet
1. **Open Link** → Bouquet loads with animation
2. **View Message** → Personal greeting is displayed
3. **Download Option** → Save card as image (coming soon)
4. **Advertisement** → AdSense banner
5. **CTA** → Option to create their own bouquet

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS (compiled locally for production)
- **Animations**: Framer Motion
- **Fonts**: Playfair Display (headings), Inter (body)
- **Hosting**: Vercel (recommended)

## Features & Customization

### Supported Flowers
- Rose
- Tulip
- Sunflower
- Peony
- Lily
- Daisy
- Orchid
- Lavender

### Bouquet Layouts
- **Classic Round** - Traditional circular arrangement
- **Luxury Cascade** - Flowing downward cascade
- **Minimal Modern** - Clean, tight cluster
- **Heart Shape** - Romantic heart formation

### Color Scheme
- **Primary**: Rose Pink (#E85D75)
- **Secondary**: Blush Pink (#FFD6E0)
- **Accent**: Lavender (#C8B6FF)
- **Background**: Cream White (#FFF9F5)
- **Text**: Dark Charcoal (#2D2D2D)

## Share & Monetization

### Shareable Links
Bouquet data is encoded into URL using Base64 encoding:
```
http://localhost:5173/?bouquet=<encoded-data>
```
No backend database needed for MVP!

### AdSense Integration
Copy `.env.example` to `.env` and set the public `VITE_ADSENSE_CLIENT_ID` and
`VITE_ADSENSE_SLOT_ID` values. Leave them blank to disable ads. These identifiers
are public browser configuration, not secrets.

Never store passwords or private API keys in a `VITE_*` variable: Vite includes
those values in the browser bundle. Bouquet share URLs contain their message
and names in readable (not encrypted) form. The app now creates those URLs
locally rather than sending them to shortening services.

## Performance

- ⚡ First Load: ~2 seconds
- 📊 Lighthouse Score: 90+
- 📱 Mobile Performance: 90+
- 🖼️ Optimized SVG animations
- 🚀 Lazy loading enabled

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Roadmap

### Phase 2
- AI-generated personalized messages
- Seasonal flower packs
- Premium themes and effects

### Phase 3
- Photo uploads within bouquets
- Video messages
- Background music

### Phase 4
- User accounts (optional)
- Bouquet history
- Creator analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues, feature requests, or questions, please open an issue on GitHub or contact the development team.

---

**Made with 💕 by the DigiBloom Team**

*Spreading joy, one digital bouquet at a time.*
