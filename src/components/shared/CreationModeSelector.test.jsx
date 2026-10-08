import { useState } from 'react';
import CreationModeSelector from './CreationModeSelector';

/**
 * Visual test component for CreationModeSelector
 * Run with: npm run dev and navigate to test page
 */
export default function CreationModeSelectorTest() {
  const [selectedMode, setSelectedMode] = useState('bouquet');

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-charcoal mb-8 text-center">
          CreationModeSelector Component Test
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <CreationModeSelector
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">Component State:</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Selected Mode:</span>{' '}
              <span className="text-rose-pink">{selectedMode}</span>
            </p>
            <p className="text-sm text-gray-600">
              Click the buttons above to test the mode switching functionality.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-bold text-charcoal mb-4">Test Checklist:</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Two buttons displayed: "Flower Bouquet" and "Vintage Letter"</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Icons visible for each mode</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Active mode highlighted with rose-pink accent (#E85D75)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Smooth 200ms transition animation when switching</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Hover effects work on inactive button</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Checkmark indicator appears on selected mode</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
