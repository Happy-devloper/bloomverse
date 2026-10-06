// Word wrap text helper for Canvas
const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
};

// Helper: Convert SVG element to image data URL
const svgToImage = async (svgElement) => {
  return new Promise((resolve) => {
    if (!svgElement) {
      resolve(null);
      return;
    }

    try {
      // Get SVG bounds
      const bbox = svgElement.getBoundingClientRect();
      const svgWidth = bbox.width || 390;
      const svgHeight = bbox.height || 450;

      // Clone and prepare SVG for rendering
      const clonedSvg = svgElement.cloneNode(true);
      clonedSvg.setAttribute('width', svgWidth);
      clonedSvg.setAttribute('height', svgHeight);
      
      // Serialize to string
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(clonedSvg);

      // Add XML declaration
      svgString = '<?xml version="1.0" encoding="UTF-8"?>' + svgString;

      // Create blob
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      // Create image and load
      const img = new Image();
      img.onload = () => {
        resolve({
          image: img,
          width: svgWidth,
          height: svgHeight,
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    } catch (error) {
      console.error('Error converting SVG to image:', error);
      resolve(null);
    }
  });
};

// Helper: Find the SVG bouquet element
const findBouquetSvg = () => {
  // Try multiple selectors
  const selectors = [
    'svg[viewBox]',
    '[class*="bouquet"] svg',
    'svg[class*="canvas"]',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.innerHTML && element.innerHTML.length > 100) {
      return element;
    }
  }

  // Last resort: find any large SVG
  const allSvgs = document.querySelectorAll('svg[viewBox]');
  for (const svg of allSvgs) {
    if (svg.innerHTML.length > 500) {
      return svg;
    }
  }

  return null;
};

// Main download exporter function
export const downloadBouquetCard = async (bouquetData) => {
  const width = 1080;
  const height = 1350;
  
  // 1. Capture the actual rendered SVG bouquet
  const bouquetSvgElement = findBouquetSvg();
  const bouquetImage = await svgToImage(bouquetSvgElement);
  
  // 2. Create off-screen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Enable smooth rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 3. Draw Background
  // Soft cream white background
  ctx.fillStyle = '#FFF9F5';
  ctx.fillRect(0, 0, width, height);
  
  // Soft pink radial glow under the bouquet
  const bgGlow = ctx.createRadialGradient(width / 2, 450, 50, width / 2, 450, 450);
  bgGlow.addColorStop(0, 'rgba(255, 214, 224, 0.28)');
  bgGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, width, height);
  
  // Define scale and center positioning
  const scaleFactor = 2.5;
  const centerX = width / 2;
  const centerY = 400;

  // 4. Draw the captured SVG bouquet (instead of manually redrawing)
  if (bouquetImage && bouquetImage.image) {
    // Scale and center the bouquet image
    const bouquetWidth = bouquetImage.width * scaleFactor;
    const bouquetHeight = bouquetImage.height * scaleFactor;
    const bouquetX = (width - bouquetWidth) / 2;
    const bouquetY = 200;
    
    ctx.drawImage(bouquetImage.image, bouquetX, bouquetY, bouquetWidth, bouquetHeight);
  }
  
  // 5. Draw wrapper paper (stays on top of bouquet)
  
  // 5. Draw WRAPPING PAPER BACK (on top of bouquet)
  ctx.save();
  ctx.translate(centerX, centerY - 95 * scaleFactor);
  
  const pinkPaperGrad = ctx.createLinearGradient(-150 * scaleFactor, -150 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor);
  pinkPaperGrad.addColorStop(0, '#FFF2F4');
  pinkPaperGrad.addColorStop(0.4, '#FFD6E0');
  pinkPaperGrad.addColorStop(1, '#FFA6B9');
  
  ctx.fillStyle = pinkPaperGrad;
  
  // Shadow under back wrap
  ctx.shadowColor = 'rgba(45, 45, 45, 0.05)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 15;
  
  ctx.beginPath();
  ctx.moveTo(-110 * scaleFactor, 10 * scaleFactor);
  ctx.bezierCurveTo(-170 * scaleFactor, -140 * scaleFactor, -145 * scaleFactor, -240 * scaleFactor, -100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(-55 * scaleFactor, -225 * scaleFactor, 0 * scaleFactor, -225 * scaleFactor, 0 * scaleFactor, -225 * scaleFactor);
  ctx.bezierCurveTo(0 * scaleFactor, -225 * scaleFactor, 55 * scaleFactor, -225 * scaleFactor, 100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(145 * scaleFactor, -240 * scaleFactor, 170 * scaleFactor, -140 * scaleFactor, 110 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Fold lines on back wrap
  ctx.strokeStyle = '#F3A3B4';
  ctx.lineWidth = 2 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(-100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(-135 * scaleFactor, -160 * scaleFactor, -115 * scaleFactor, -60 * scaleFactor, -35 * scaleFactor, 0 * scaleFactor);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(135 * scaleFactor, -160 * scaleFactor, 115 * scaleFactor, -60 * scaleFactor, 35 * scaleFactor, 0 * scaleFactor);
  ctx.stroke();
  
  ctx.restore();

  // 6. Draw WRAPPING PAPER FRONT
  ctx.save();
  ctx.translate(centerX, centerY + 100 * scaleFactor);
  
  const pinkPaperFrontGrad = ctx.createLinearGradient(0, -60 * scaleFactor, 0, 90 * scaleFactor);
  pinkPaperFrontGrad.addColorStop(0, '#FFF2F4');
  pinkPaperFrontGrad.addColorStop(0.6, '#FFC2D1');
  pinkPaperFrontGrad.addColorStop(1, '#E85D75');
  
  ctx.fillStyle = pinkPaperFrontGrad;
  
  // Left flap shadow
  ctx.shadowColor = 'rgba(0,0,0,0.07)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.moveTo(-90 * scaleFactor, -60 * scaleFactor);
  ctx.bezierCurveTo(-70 * scaleFactor, -40 * scaleFactor, 0 * scaleFactor, -10 * scaleFactor, 30 * scaleFactor, 60 * scaleFactor);
  ctx.bezierCurveTo(10 * scaleFactor, 80 * scaleFactor, -25 * scaleFactor, 90 * scaleFactor, -40 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(-75 * scaleFactor, 40 * scaleFactor, -100 * scaleFactor, -20 * scaleFactor, -90 * scaleFactor, -60 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right flap overlapping
  ctx.beginPath();
  ctx.moveTo(90 * scaleFactor, -60 * scaleFactor);
  ctx.bezierCurveTo(70 * scaleFactor, -40 * scaleFactor, 0 * scaleFactor, -10 * scaleFactor, -30 * scaleFactor, 60 * scaleFactor);
  ctx.bezierCurveTo(-10 * scaleFactor, 80 * scaleFactor, 25 * scaleFactor, 90 * scaleFactor, 40 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(75 * scaleFactor, 40 * scaleFactor, 100 * scaleFactor, -20 * scaleFactor, 90 * scaleFactor, -60 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();

  // 7. Draw SILK RIBBON BOW
  ctx.save();
  ctx.translate(centerX, centerY + 95 * scaleFactor);
  
  const ribbonGrad = ctx.createLinearGradient(-30 * scaleFactor, 0, 30 * scaleFactor, 0);
  ribbonGrad.addColorStop(0, '#E85D75');
  ribbonGrad.addColorStop(0.5, '#FF8E9F');
  ribbonGrad.addColorStop(1, '#D23B55');
  ctx.fillStyle = ribbonGrad;
  
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 4;
  
  // Left tail
  ctx.beginPath();
  ctx.moveTo(-4 * scaleFactor, 0);
  ctx.bezierCurveTo(-15 * scaleFactor, 20 * scaleFactor, -28 * scaleFactor, 50 * scaleFactor, -32 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(-22 * scaleFactor, 75 * scaleFactor, -12 * scaleFactor, 55 * scaleFactor, -4 * scaleFactor, 25 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right tail
  ctx.beginPath();
  ctx.moveTo(4 * scaleFactor, 0);
  ctx.bezierCurveTo(15 * scaleFactor, 20 * scaleFactor, 28 * scaleFactor, 50 * scaleFactor, 32 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(22 * scaleFactor, 75 * scaleFactor, 12 * scaleFactor, 55 * scaleFactor, 4 * scaleFactor, 25 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Left loop
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-25 * scaleFactor, -20 * scaleFactor, -40 * scaleFactor, 0, -12 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right loop
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(25 * scaleFactor, -20 * scaleFactor, 40 * scaleFactor, 0, 12 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Knot
  const knotGrad = ctx.createLinearGradient(0, -4 * scaleFactor, 0, 5 * scaleFactor);
  knotGrad.addColorStop(0, '#FF8E9F');
  knotGrad.addColorStop(1, '#D23B55');
  ctx.fillStyle = knotGrad;
  ctx.shadowOffsetY = 2;
  
  ctx.beginPath();
  ctx.roundRect(-7 * scaleFactor, -4 * scaleFactor, 14 * scaleFactor, 9 * scaleFactor, 3.5 * scaleFactor);
  ctx.fill();
  
  ctx.restore();

  // 8. Draw GREETING CARD PANEL (Glassmorphism card)
  const cardWidth = 900;
  const cardHeight = 350;
  const cardX = (width - cardWidth) / 2;
  const cardY = 900;
  
  ctx.shadowColor = 'rgba(0,0,0,0.06)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 12;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 24);
  ctx.fill();
  
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.strokeStyle = 'rgba(232, 93, 117, 0.15)';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  
  // Recipient Title Text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E85D75';
  ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
  ctx.fillText(`For ${bouquetData.recipientName}`, width / 2, cardY + 70);
  
  // Decorative separator
  ctx.fillStyle = '#C8B6FF';
  ctx.font = '22px Arial';
  ctx.fillText('❦  •  ❀  •  ❦', width / 2, cardY + 110);
  
  // Custom message
  ctx.fillStyle = '#2D2D2D';
  ctx.font = '400 28px "Inter", Arial, sans-serif';
  const maxTextWidth = cardWidth - 100;
  drawWrappedText(ctx, bouquetData.message, width / 2, cardY + 175, maxTextWidth, 42);
  
  // Sender name
  ctx.fillStyle = '#777777';
  ctx.font = 'italic 26px "Playfair Display", Georgia, serif';
  ctx.fillText(`With love from  ${bouquetData.senderName}`, width / 2, cardY + 295);
  
  // 9. Draw BRANDING (Footer)
  ctx.fillStyle = '#E85D75';
  ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('B L O O M V E R S E', width / 2, height - 55);
  
  ctx.fillStyle = '#888888';
  ctx.font = '400 16px "Inter", Arial, sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('Create your own digital bouquet at bloomverse.com', width / 2, height - 30);
  
  // 10. Trigger Download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Bloomverse_Gift_to_${bouquetData.recipientName.replace(/\s+/g, '_')}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
