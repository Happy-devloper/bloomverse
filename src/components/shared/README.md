# CreationModeSelector Component

## Overview
The `CreationModeSelector` component allows users to choose between creating a flower bouquet or a vintage letter. This is the primary mode selection interface for the Bloomverse application.

## Features
✓ Two large, visually distinct buttons with custom SVG icons
✓ Rose-pink accent (#E85D75) highlighting for active mode
✓ Smooth 200ms transition animations using Framer Motion
✓ Hover effects with subtle elevation changes
✓ Animated checkmark indicator for selected mode
✓ Responsive layout that adapts to different screen sizes

## Usage

```jsx
import CreationModeSelector from './components/shared/CreationModeSelector';

function MyComponent() {
  const [mode, setMode] = useState('bouquet');

  return (
    <CreationModeSelector
      selectedMode={mode}
      onModeChange={setMode}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `selectedMode` | `'bouquet' \| 'letter'` | Yes | The currently selected creation mode |
| `onModeChange` | `(mode: 'bouquet' \| 'letter') => void` | Yes | Callback function triggered when mode changes |

## Design Requirements Met

### Requirements 1.1, 1.2 (Creation Mode Selection)
- ✓ Displays creation mode selector when user accesses builder
- ✓ Offers two clear options: "Flower Bouquet" and "Vintage Letter"
- ✓ Visual feedback for selection with rose-pink accent
- ✓ Smooth transitions between modes

## Styling

The component uses Tailwind CSS classes and follows the Bloomverse design system:

- **Primary Color**: `rose-pink` (#E85D75)
- **Background**: White with hover states
- **Selected State**: Light pink background (#FFF2F4) with rose-pink border
- **Typography**: Font Display for headings, light font for descriptions
- **Transitions**: 200ms duration for all animations

## Accessibility

- Semantic button elements for keyboard navigation
- Clear visual indicators for selected state
- Hover states for better user feedback
- Descriptive text for screen readers

## Animation Details

- **Button Tap**: Scale down to 0.97 on click
- **Button Hover**: Lift up by 2px
- **Mode Switch**: 200ms smooth transition
- **Checkmark**: Spring animation on appearance (stiffness: 300, damping: 20)

## Integration Notes

When integrating with BouquetBuilder:
1. Place at the top of the builder interface before step indicators
2. Store selected mode in parent component state
3. Reset step counter when mode changes
4. Preserve message data when switching modes
5. Conditionally render appropriate components based on selected mode

## Testing

A visual test component is available at `CreationModeSelector.test.jsx` for manual verification of:
- Icon rendering
- Color accuracy
- Animation smoothness
- State management
- Hover interactions

## Browser Support

Compatible with all modern browsers that support:
- CSS Grid
- CSS Flexbox
- Framer Motion animations
- SVG rendering
