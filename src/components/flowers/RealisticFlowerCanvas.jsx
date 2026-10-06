import { useEffect, useRef } from 'react';

// Draws realistic flowers onto canvas
const drawFlower = (ctx, x, y, scale, type) => {
  const colors = {
    rose: { petal: '#E85D75', dark: '#C63D4A', light: '#FFB3C4', center: '#FFD700' },
    peony: { petal: '#FFB6C7', dark: '#FF7FB8', light: '#FFE5F0', center: '#FFE5EB' },
    tulip: { petal: '#FF9966', dark: '#FF6633', light: '#FFCCAA', center: '#FFE5CC' },
    sunflower: { petal: '#FFD700', dark: '#DAA520', light: '#FFEB3B', center: '#8B6914' },
    lily: { petal: '#FFE4E1', dark: '#FFB0C4', light: '#FFF5F5', center: '#FFCC99' },
    hydrangea: { petal: '#B8E0D2', dark: '#7BC5B5', light: '#D4E8E0', center: '#E8F5E9' },
    carnation: { petal: '#FFC0E0', dark: '#FF80D0', light: '#FFE0F0', center: '#FFE0E8' },
    iris: { petal: '#9370DB', dark: '#6F4FA5', light: '#B8A9E0', center: '#FFCC99' },
    magnolia: { petal: '#F5E8D4', dark: '#E0D0B8', light: '#FFFBF5', center: '#FFE8C4' },
    dahlia: { petal: '#FF9DB8', dark: '#FF6B9D', light: '#FFD4E5', center: '#FFF0A0' },
  };

  const color = colors[type] || colors.rose;
  const size = 25 * scale;

  ctx.save();
  ctx.translate(x, y);

  // Draw stem
  ctx.strokeStyle = '#3d5c3d';
  ctx.lineWidth = 3 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, size * 2);
  ctx.stroke();

  // Draw leaves
  ctx.fillStyle = '#4a7c4e';
  ctx.beginPath();
  ctx.ellipse(-8 * scale, size * 0.6, 4 * scale, 10 * scale, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(8 * scale, size * 0.6, 4 * scale, 10 * scale, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Draw petals with layering effect
  const drawPetal = (angle, radius, petalSize, fillColor, opacity) => {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = fillColor;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.ellipse(px, py, petalSize, petalSize * 1.2, angle, 0, Math.PI * 2);
    ctx.fill();
  };

  // Outer petals - lighter
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    drawPetal(angle, size * 0.8, size * 0.5, color.light, 0.7);
  }

  // Middle petals - darker
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    drawPetal(angle, size * 0.6, size * 0.45, color.petal, 0.85);
  }

  // Inner petals - dark
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    drawPetal(angle, size * 0.3, size * 0.35, color.dark, 0.9);
  }

  ctx.globalAlpha = 1;

  // Draw center
  ctx.fillStyle = color.center;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Add glow/shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 5 * scale;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const RealisticFlowerCanvas = ({ selectedFlowers, layout, width = 580, height = 725 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#FFF5F8');
    gradient.addColorStop(1, '#FDFCFB');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw vase base
    ctx.fillStyle = 'rgba(139, 115, 85, 0.08)';
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.65);
    ctx.lineTo(width * 0.15, height * 0.95);
    ctx.lineTo(width * 0.85, height * 0.95);
    ctx.lineTo(width * 0.8, height * 0.65);
    ctx.fill();

    // Draw stems
    ctx.strokeStyle = '#3d5c3d';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.6;

    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.45);
    ctx.quadraticCurveTo(width * 0.3, height * 0.7, width * 0.25, height * 0.95);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.45);
    ctx.quadraticCurveTo(width * 0.5, height * 0.8, width * 0.5, height * 0.95);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.65, height * 0.45);
    ctx.quadraticCurveTo(width * 0.7, height * 0.7, width * 0.75, height * 0.95);
    ctx.stroke();

    ctx.globalAlpha = 1;

    if (selectedFlowers && selectedFlowers.length > 0) {
      const centerX = width / 2;
      const centerY = height * 0.35;

      if (layout === 'classic') {
        // Circular arrangement
        selectedFlowers.forEach((flowerId, index) => {
          const angle = (index / selectedFlowers.length) * Math.PI * 2;
          const radius = selectedFlowers.length === 1 ? 0 : 80;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius * 0.5;
          const scale = index === 0 ? 1.2 : 1;

          drawFlower(ctx, x, y, scale, flowerId);
        });
      } else if (layout === 'cascade') {
        // Cascading arrangement
        selectedFlowers.forEach((flowerId, index) => {
          const x = centerX + (index % 2 === 0 ? -60 : 60) * Math.min(index, 1);
          const y = centerY + index * 60 - 50;
          const scale = Math.max(0.7, 1.2 - index * 0.08);

          drawFlower(ctx, x, y, scale, flowerId);
        });
      } else if (layout === 'modern') {
        // Linear arrangement
        selectedFlowers.forEach((flowerId, index) => {
          const x = centerX + (index - (selectedFlowers.length - 1) / 2) * 70;
          const y = centerY + (index % 2) * 50;
          const scale = 1;

          drawFlower(ctx, x, y, scale, flowerId);
        });
      } else if (layout === 'heart') {
        // Heart-shaped arrangement
        selectedFlowers.forEach((flowerId, index) => {
          const t = (index / selectedFlowers.length) * Math.PI * 2;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

          const x = centerX + hx * 6;
          const y = centerY + hy * 6 - 40;
          const scale = 1;

          drawFlower(ctx, x, y, scale, flowerId);
        });
      }
    }

    // Add subtle shadow/depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;
  }, [selectedFlowers, layout, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        borderRadius: '80px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        border: '1px solid #E8E8E8',
        display: 'block',
        maxWidth: '100%',
        aspectRatio: '4/5',
      }}
    />
  );
};

export default RealisticFlowerCanvas;
