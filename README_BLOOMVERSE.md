# 🌸 Bloomverse

> Create beautiful digital flower bouquets and romantic love letters to share with your loved ones

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://blooomverse.vercel.app)
[![Built with React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)
[![Animated with Framer Motion](https://img.shields.io/badge/Framer-Motion-ff69b4)](https://www.framer.com/motion/)

Bloomverse is a modern, romantic web application that lets you create and share two types of heartfelt greetings:
- **🌹 Digital Flower Bouquets** - Compose custom bouquets with intelligent flower placement
- **💌 Romantic Love Letters** - Write letters with 5 beautiful themes and elegant handwriting styles

![Bloomverse Preview](public/hero.png)

---

## ✨ Features

### 🌸 Flower Bouquets

#### **Beautiful Flower Selection**
- 10 premium flower varieties: Roses (Red & Yellow), Lily, Peony, Sunflower, Orchid, Hydrangea, Camellia, Chrysanthemum, and Hibiscus
- High-quality SVG graphics with realistic botanical details
- Mix and match unlimited combinations

#### **Smart Flower Placement**
- **Intelligent Placement Engine** with collision detection
- **4 Professional Layouts:**
  - 🎯 Classic Round - Traditional circular arrangement
  - 💫 Luxury Cascade - Elegant flowing waterfall design
  - 🎨 Minimal Modern - Contemporary tight grouping
  - 💝 Heart Shape - Romantic heart formation

#### **Advanced Positioning Features**
- Automatic depth layering (z-index based on position)
- Dynamic scaling based on flower count
- Natural rotation (-30° to +30°) for organic look
- Collision avoidance algorithm
- Boundary validation to keep flowers in frame

### 💌 Romantic Love Letters

#### **5 Stunning Themes**
Each theme includes a full-screen cover page and beautifully styled letter:

1. **🌹 Passionate Rose**
   - Deep burgundy and romantic red palette
   - Rose petal decorations
   - Gold ornate frame on cover
   - Perfect for intense, passionate declarations

2. **🌙 Moonlight Romance**
   - Dreamy night sky with stars and crescent moon
   - Purple and blue celestial colors
   - Constellation decorations
   - Ideal for poetic, ethereal messages

3. **📜 Vintage Love**
   - Sepia tones and nostalgic aesthetic
   - Torn paper edges with watercolor stains
   - Dried flower decorations
   - Classic timeless romance

4. **🌿 Garden Whisper**
   - Soft pastel colors with wildflowers
   - Hand-painted botanical illustrations
   - Gentle, nature-inspired design
   - Perfect for tender messages

5. **✨ Eternal Gold**
   - Elegant ivory and gold luxury
   - Ornate baroque decorations
   - Gold leaf embellishments
   - Sophisticated and precious

#### **5 Handwriting Styles**
- Dancing Script - Elegant and flowing
- Shadows Into Light - Casual and personal
- Cedarville Cursive - Classic handwritten
- Patrick Hand - Modern and friendly
- Reenie Beanie - Vintage ink style

#### **4-Step Guided Creation**
1. **Choose Theme** - Preview all themes with cover pages
2. **Select Handwriting** - Pick your writing style
3. **Write Message** - Compose with live preview (up to 2000 characters)
4. **Preview & Share** - Toggle between cover and letter, generate shareable link

### 🎨 Shared Features

#### **Personalization**
- Custom recipient and sender names
- Personal messages with your own words
- Real-time preview as you create

#### **Beautiful Animations**
- Smooth transitions powered by Framer Motion
- Floating rose petals and twinkling stars
- Heart burst celebration on reveal
- Elegant fade-ins and scale effects
- Respects `prefers-reduced-motion` for accessibility

#### **Instant Sharing**
- Generate compact, shareable URLs
- No accounts or sign-ups required
- Links work forever
- One-click copy to clipboard
- Recipients see your creation with reveal animation

#### **Download & Save**
- Save bouquets and letters as images
- High-quality PNG export
- Perfect for printing or social media

#### **Mobile-First Design**
- Fully responsive on all devices
- Touch-optimized interactions
- 44px minimum touch targets (WCAG compliant)
- Works beautifully on phones, tablets, and desktops

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Happy-devloper/bloomverse.git
   cd bloomverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be in the `dist/` folder, ready to deploy.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Happy-devloper/bloomverse)

Or manually:
```bash
npm install -g vercel
vercel
```

---

## 🏗️ Project Structure

```
bloomverse/
├── src/
│   ├── components/
│   │   ├── bouquet/
│   │   │   ├── BouquetCanvas.jsx          # Main bouquet renderer
│   │   │   ├── FlowerSelector.jsx         # Flower picker UI
│   │   │   ├── LayoutSelector.jsx         # Layout chooser
│   │   │   └── MessageEditor.jsx          # Message input
│   │   ├── letters/
│   │   │   ├── LetterCreationFlow.jsx     # 4-step letter wizard
│   │   │   ├── ThemeCoverSelector.jsx     # Theme picker
│   │   │   ├── ThemeCoverPage.jsx         # Cover page renderer
│   │   │   ├── ThemedLetterPage.jsx       # Letter page renderer
│   │   │   ├── LetterMessageInput.jsx     # Message composer
│   │   │   ├── HandwritingStyleSelector.jsx
│   │   │   └── decorations/
│   │   │       ├── CoverIllustration.jsx  # SVG centerpieces
│   │   │       ├── CoverFrame.jsx         # SVG borders
│   │   │       └── ThemeDecoration.jsx    # SVG decorations
│   │   └── shared/
│   │       ├── CreationModeSelector.jsx   # Bouquet/Letter toggle
│   │       └── FeatureIcons.jsx
│   ├── data/
│   │   ├── flowers.js                     # Flower & layout definitions
│   │   ├── letterThemes.js                # Theme configurations
│   │   └── letterTemplates.js             # Handwriting styles
│   ├── pages/
│   │   ├── LandingPage.jsx                # Home page
│   │   ├── BouquetBuilder.jsx             # Bouquet creation
│   │   ├── PreviewScreen.jsx              # Preview & share
│   │   └── SharedContentPage.jsx          # Recipient view
│   ├── utils/
│   │   ├── placementEngine.js             # Smart flower positioning
│   │   ├── urlEncoding.js                 # URL compression
│   │   ├── validation.js                  # Content validation
│   │   └── cardDownloader.js              # Image export
│   └── styles/
│       ├── letter-flow.css                # Letter creation styles
│       ├── letter-themes.css              # Theme-specific styles
│       ├── cover-pages.css                # Cover page styles
│       ├── decorations.css                # Animation styles
│       └── index.css                      # Global styles
├── public/
│   ├── assets/                            # Flower SVGs
│   └── icons.svg                          # UI icons
├── package.json
└── vite.config.js
```

---

## 🎯 Key Technologies

- **React 18** - UI framework with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **SVG Graphics** - Scalable vector flowers
- **Web APIs** - Clipboard, Canvas, Local Storage

---

## 🧪 Features in Detail

### Intelligent Placement Engine

The bouquet placement system uses advanced algorithms:

```javascript
// Key features:
- Deterministic positioning (same flowers = same arrangement)
- Collision detection with minimum 10px spacing
- Z-index layering (closer to center = higher priority)
- Scale adjustment (0.5-1.2x based on flower count)
- Natural rotation (-30° to +30° for organic look)
- Layout-specific positioning patterns
```

### URL Encoding System

Efficient compression keeps shareable URLs short:

```javascript
// v3 Format supports:
- Type discriminator (bouquet or letter)
- Compact flower/layout mapping
- Base64 URL-safe encoding
- Backward compatibility with v2
- Maximum 2000 character URLs
```

### Theme System

Declarative theme definitions make it easy to add new themes:

```javascript
{
  id: 'passionate-rose',
  name: 'Passionate Rose',
  coverPage: {
    background: 'linear-gradient(...)',
    centerpiece: 'rose-bouquet',
    frame: 'ornate-gold'
  },
  letterPage: {
    paperColor: '#FFF5F5',
    decorations: [...],
    accentColor: '#8B0000'
  }
}
```

---

## 🎨 Customization

### Adding a New Flower

1. Add SVG to `public/assets/`
2. Update `src/data/flowers.js`:
   ```javascript
   {
     id: 'new-flower',
     name: 'New Flower',
     baseScale: 1.0,
     category: 'romantic'
   }
   ```
3. Add to validation whitelist in `src/utils/validation.js`

### Adding a New Theme

1. Add theme definition to `src/data/letterThemes.js`
2. Create SVG illustrations in `src/components/letters/decorations/`
3. Add theme ID to validation whitelist

### Adding a New Layout

1. Define layout in `src/data/flowers.js`
2. Implement positioning logic in `src/utils/placementEngine.js`
3. Add layout ID to validation whitelist

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## ♿ Accessibility

- WCAG AA compliant color contrast (4.5:1)
- Keyboard navigation support
- Screen reader friendly
- 44px minimum touch targets
- `prefers-reduced-motion` support
- Semantic HTML structure
- ARIA labels where needed

---

## 🔒 Privacy & Security

- ✅ No user accounts required
- ✅ No data stored on servers
- ✅ All data encoded in URL
- ✅ Client-side only processing
- ✅ No tracking or analytics
- ✅ Input validation and sanitization
- ✅ XSS protection

---

## 📊 Performance

- **First Load:** < 2 seconds on 4G
- **Bundle Size:** 394 KB JS (121 KB gzipped)
- **CSS Size:** 40 KB (8 KB gzipped)
- **Lighthouse Score:** 95+ Performance
- **60 FPS animations** using GPU-accelerated transforms

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test on multiple browsers
- Ensure responsive design
- Update documentation
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgments

- Flower SVGs inspired by botanical illustrations
- Handwriting fonts from Google Fonts
- Animation inspiration from Framer Motion showcase
- Color palettes from romantic design systems

---

## 🐛 Known Issues

- Safari < 14 may have SVG rendering issues
- IE 11 not supported
- Some older Android browsers may not support Clipboard API

---

## 🗺️ Roadmap

- [ ] More flower varieties (Daffodils, Tulips, Carnations)
- [ ] Additional letter themes (Ocean Breeze, Sunset Romance)
- [ ] Animation customization options
- [ ] Multiple language support
- [ ] Social media integration
- [ ] Advanced bouquet editing (drag & drop)
- [ ] Print-optimized layouts
- [ ] PDF export option

---

## 📞 Support

Having issues? Here's how to get help:

- 🐛 **Bug Reports:** [Open an issue](https://github.com/Happy-devloper/bloomverse/issues)
- 💡 **Feature Requests:** [Suggest a feature](https://github.com/Happy-devloper/bloomverse/issues)
- 💬 **Questions:** [Start a discussion](https://github.com/Happy-devloper/bloomverse/discussions)

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

---

<div align="center">

**Made with 💝 by [Ravi]**

[Website](https://blooomverse.vercel.app) • [Report Bug](https://github.com/Happy-devloper/bloomverse/issues) • [Request Feature](https://github.com/Happy-devloper/bloomverse/issues)

</div>
