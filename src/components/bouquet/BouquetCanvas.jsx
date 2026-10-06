import ImageBouquetCanvas from '../flowers/ImageBouquetCanvas';

export default function BouquetCanvas({ selectedFlowers, layout }) {
  const layoutType = layout || 'classic';

  return (
    <div className="w-full flex justify-center py-4 select-none">
      {/* Container that provides a natural 3:4 aspect ratio for the bouquet */}
      <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[48px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-stone-100 bg-white">
        <ImageBouquetCanvas
          selectedFlowers={selectedFlowers}
          layout={layoutType}
          width={800}
          height={1066}
        />
      </div>
    </div>
  );
}
