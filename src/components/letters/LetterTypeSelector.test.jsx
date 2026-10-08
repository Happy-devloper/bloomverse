import { useState } from 'react';
import LetterTypeSelector from './LetterTypeSelector';

/**
 * Visual test component for LetterTypeSelector
 * Run with: npm run dev and navigate to test page
 */
export default function LetterTypeSelectorTest() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic-letter');

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-charcoal mb-8 text-center">
          LetterTypeSelector Component Test
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <LetterTypeSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">Component State:</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Selected Template:</span>{' '}
              <span className="text-rose-pink">{selectedTemplate}</span>
            </p>
            <p className="text-sm text-gray-600">
              Click the buttons above to test the template selection functionality.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-bold text-charcoal mb-4">Test Checklist:</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Two template options displayed in 2-column grid layout</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Miniature preview icons for "Classic Letter" and "Vintage Postcard"</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Template descriptions shown below each option</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Selected template highlighted with rose-pink border and background</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Checkmark indicator on selected template</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Update within 200ms of selection (smooth transition)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Hover effects work on unselected template</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Scale animation on tap/click (whileTap effect)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-bold text-charcoal mb-4">Requirements Validated:</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-rose-pink font-bold">2.1</span>
              <span>Display available letter template options</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-pink font-bold">2.3</span>
              <span>Display preview when template is selected</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-pink font-bold">2.6</span>
              <span>Update preview within 200 milliseconds</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
