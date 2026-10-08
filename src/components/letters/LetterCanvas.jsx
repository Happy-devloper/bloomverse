import ClassicLetterTemplate from './ClassicLetterTemplate';

/**
 * LetterCanvas Component
 * Wrapper component that renders the vintage letter with selected handwriting style
 */
export default function LetterCanvas({ 
  recipientName, 
  senderName, 
  message,
  handwritingStyle = 'elegant-script',
  isPreview = false 
}) {
  const containerClass = "w-full px-4 py-6";

  return (
    <div className={containerClass}>
      <ClassicLetterTemplate
        recipientName={recipientName}
        senderName={senderName}
        message={message}
        handwritingStyle={handwritingStyle}
        isPreview={isPreview}
      />
    </div>
  );
}