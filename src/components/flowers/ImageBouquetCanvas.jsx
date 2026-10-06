import { useEffect, useRef } from 'react';
import { flowers as flowerData } from '../../data/flowers';

const imageCache = new Map();

const getFlowerImagePath = (id) => {
  const flower = flowerData.find((item) => item.id === id);
  if (!flower) {
    return id === 'tulip' || id === 'magnolia' ? '/Chrysanthemum.png' : '/Rose.png';
  }
  if (flower.type === 'svg') return `/assets/${flower.id}.svg`;

  const pngMap = {
    'rose-rose': '/Rose.png',
    'rose-yellow': '/Rose_yellow.png',
    lily: '/Lily.png',
    peony: '/Peony.png',
    sunflower: '/Sunflower.png',
    orchid: '/Magnolia.png',
    camellia: '/Camellia.png',
    chrysanthemum: '/Chrysanthemum.png',
    hibiscus: '/Hibiscus.png',
    hydrangea: '/Hydrangea.png',
  };
  return pngMap[id] || '/Rose.png';
};

const loadImage = (src) => {
  if (!imageCache.has(src)) {
    imageCache.set(src, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load bouquet image: ${src}`));
      image.src = src;
    }));
  }
  return imageCache.get(src);
};

const getFlowerPositions = (selectedIds, layoutType, width, height) => {
  if (selectedIds.length === 0) return [];

  const positions = [];
  const centerX = width / 2;
  const centerY = height * 0.38;
  const count = selectedIds.length;

  selectedIds.forEach((id, i) => {
    let x, y, scale, rotation;
    const flowerInfo = flowerData.find((flower) => flower.id === id) || { baseScale: 1.0 };
    const baseScale = flowerInfo.baseScale || 1.0;

    if (layoutType === 'classic' || !layoutType) {
      const angle = i * 2.4;
      const radius = Math.sqrt(i) * 55;

      x = centerX + Math.cos(angle) * radius * 1.1;
      y = centerY + Math.sin(angle) * radius * 0.85;
      scale = baseScale * (1.05 - (i * 0.03));
      rotation = Math.sin(i * 2.4) * 0.6;
    } else if (layoutType === 'cascade') {
      const row = Math.floor(i / 2);
      const col = i % 2;
      x = centerX + (col - 0.5) * 160;
      y = (centerY - 50) + (row * 110);
      scale = baseScale * (1.1 - row * 0.1);
      rotation = (col - 0.5) * 0.3;
    } else if (layoutType === 'modern') {
      x = centerX + (i % 2 === 0 ? -100 : 100);
      y = centerY + (i * 90) - 100;
      scale = baseScale * 1.1;
      rotation = Math.sin(i + 1) * 0.2;
    } else if (layoutType === 'heart') {
      const t = (i / count) * Math.PI * 2 - Math.PI / 2;
      const spread = 28;
      x = centerX + spread * (16 * Math.pow(Math.sin(t), 3));
      y = centerY + spread * -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      scale = baseScale * 0.95;
      rotation = t + Math.PI / 2;
    }

    positions.push({ id, x, y, scale, rotation });
  });

  return positions.sort((a, b) => a.y - b.y);
};

const ImageBouquetCanvas = ({ selectedFlowers, layout, width = 800, height = 1066 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let isCancelled = false;

    const render = async () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const positions = getFlowerPositions(selectedFlowers, layout, width, height);
      const uniqueIds = [...new Set(positions.map(p => p.id))];
      const imageCache = {};
      await Promise.all(uniqueIds.map(async id => {
        try {
          imageCache[id] = await loadImage(getFlowerImagePath(id));
        } catch {
          imageCache[id] = await loadImage('/Rose.png');
        }
      }));

      if (isCancelled) return;

      const centerX = width / 2;
      const stemGatherY = height * 0.74;

      const flowerMetrics = positions.map((pos) => {
        const img = imageCache[pos.id];
        const maxSize = 190;
        const finalScale = (maxSize / Math.max(img.width, img.height)) * pos.scale;
        const dW = img.width * finalScale;
        const dH = img.height * finalScale;
        return { ...pos, img, dW, dH };
      });

      // 1. Draw Stems attached to the flower bases
      ctx.save();
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#23391b';
      flowerMetrics.forEach((flower, i) => {
        ctx.beginPath();
        ctx.moveTo(flower.x, flower.y + flower.dH * 0.5);
        const ctrlX = centerX + (flower.x - centerX) * 0.12;
        const ctrlY = (flower.y + stemGatherY) / 2 + 24;
        ctx.quadraticCurveTo(ctrlX, ctrlY, centerX + (i - positions.length / 2) * 4, stemGatherY + 150);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Draw Flowers on top of their stems
      flowerMetrics.forEach((flower) => {
        const { img, dW, dH, x, y, rotation } = flower;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;

        ctx.drawImage(img, -dW / 2, -dH / 2, dW, dH);
        ctx.restore();
      });

    };

    render().catch((error) => {
      if (!isCancelled) console.error('Failed to render bouquet:', error);
    });
    return () => { isCancelled = true; };
  }, [selectedFlowers, layout, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-auto block select-none bg-white rounded-3xl shadow-sm"
    />
  );
};

export default ImageBouquetCanvas;
