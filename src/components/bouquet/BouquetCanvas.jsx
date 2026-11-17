import ImageBouquetCanvas from '../flowers/ImageBouquetCanvas';
import BouquetWrapper from './BouquetWrapper';
import BouquetRibbon from './BouquetRibbon';

export default function BouquetCanvas({ selectedFlowers, layout }) {
  const layoutType = layout || 'classic';

  return (
    <div className="w-full flex justify-center py-4 select-none">
      {/* Container that provides a natural 3:4 aspect ratio for the bouquet */}
      <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[48px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-stone-100 bg-white">
        {/* Wrapper layer - behind flowers */}
        <BouquetWrapper 
          centerX={400} 
          centerY={400}
          width={800}
          color="#F5E6D3"
          opacity={0.85}
        />
        
        {/* Flowers canvas */}
        <ImageBouquetCanvas
          selectedFlowers={selectedFlowers}
          layout={layoutType}
          width={800}
          height={1066}
        />
        
        {/* Ribbon layer - in front of wrapper, integrated with flowers */}
        <BouquetRibbon 
          centerX={400}
          centerY={400}
          color="#E85D75"
          style="bow"
        />
      </div>
    </div>
  );
}
