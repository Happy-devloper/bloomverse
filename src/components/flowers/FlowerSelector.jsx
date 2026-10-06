import { flowers } from '../../data/flowers';

export default function FlowerSelector({ selectedFlowers, onFlowerToggle, maxFlowers = 20 }) {
  const handleAdd = (flowerId) => {
    if (selectedFlowers.length < maxFlowers) {
      onFlowerToggle([...selectedFlowers, flowerId]);
    }
  };

  const handleRemove = (flowerId, e) => {
    e.stopPropagation();
    const index = selectedFlowers.indexOf(flowerId);
    if (index !== -1) {
      const next = [...selectedFlowers];
      next.splice(index, 1);
      onFlowerToggle(next);
    }
  };

  const getCount = (flowerId) => selectedFlowers.filter((id) => id === flowerId).length;

  const getPath = (flower) => {
    const pngAssets = {
      'rose-rose': '/Rose_custom.png',
      'rose-yellow': '/Rose_yellow.png',
      'red-rose': '/Rose_custom.png',
      lily: '/Lily.png',
      peony: '/Peony.png',
      tulip: '/Tulip.png',
      sunflower: '/Sunflower.png',
      orchid: '/Magnolia.png',
      hydrangea: '/Hydrangea.png',
      hibiscus: '/Hibiscus.png',
      camellia: '/Camellia.png',
      chrysanthemum: '/Chrysanthemum.png',
      magnolia: '/Magnolia.png',
      lavender: '/Camellia.png',
    };

    return pngAssets[flower.id] || '/Rose.png';
  };

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-slate-800">Pick your flowers</h2>
        <p className="mt-1 text-sm text-slate-500">Add as many as you like, up to 20 total.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {flowers.map((flower) => {
          const count = getCount(flower.id);
          const isSelected = count > 0;

          return (
            <button
              key={flower.id}
              onClick={() => handleAdd(flower.id)}
              className={`relative flex flex-col items-center rounded-[20px] border p-2 text-center transition-all ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4] shadow-sm'
                  : 'border-slate-200 bg-white hover:border-rose-pink/40 hover:shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 shadow-sm">
                  <span className="text-[11px] font-semibold text-rose-pink">{count}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleRemove(flower.id, e)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRemove(flower.id, e); }}
                    className="text-[11px] font-semibold text-slate-500 cursor-pointer select-none"
                  >
                    −
                  </span>
                </div>
              )}

              <div className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-[#fff5f6] p-2 sm:h-24 sm:w-24">
                <img
                  src={getPath(flower)}
                  alt={flower.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.src = '/Rose.png';
                  }}
                />
              </div>
              <div className="mt-2 w-full">
                <div className="text-[13px] font-semibold text-slate-700">{flower.name}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
