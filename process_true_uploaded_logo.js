const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const logoPath = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded\\media_1787064906567.png';
const outputPathSrc = path.join(__dirname, 'frontend', 'src', 'assets', 'ethos_side_by_side.png');
const outputPathPublic = path.join(__dirname, 'frontend', 'public', 'ethos_side_by_side.png');
const outputPathRootAsset = path.join(__dirname, 'assets', 'ethos_side_by_side.png');
const outputPathRoot = path.join(__dirname, 'ethos_side_by_side.png');

fs.createReadStream(logoPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;
    console.log(`Processing True Uploaded Logo: ${W}x${H}`);

    // Crop Symbol (upper 0% to 64% of height)
    const symH = Math.floor(H * 0.64);
    const symW = W;

    // Crop Text Matter ("ETHOS DANCE STUDIO" from 64% to 92% of height)
    const textStartY = Math.floor(H * 0.64);
    const textH = Math.floor(H * 0.28);
    const textW = W;

    // Target composition dimensions
    const targetSymH = 100;
    const targetSymW = Math.floor((symW / symH) * targetSymH);

    const targetTextH = 50;
    const targetTextW = Math.floor((textW / textH) * targetTextH);

    const gap = 20;
    const totalW = targetSymW + gap + targetTextW;
    const totalH = Math.max(targetSymH, targetTextH);

    const out = new PNG({ width: totalW, height: totalH });

    // Initialize with 100% transparent pixels
    for (let i = 0; i < totalW * totalH * 4; i += 4) {
      out.data[i] = 0;
      out.data[i+1] = 0;
      out.data[i+2] = 0;
      out.data[i+3] = 0;
    }

    // 1. Process Symbol Emblem (Left side)
    for (let y = 0; y < symH; y++) {
      for (let x = 0; x < symW; x++) {
        const srcIdx = (W * y + x) << 2;
        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const a = this.data[srcIdx + 3];

        // Background pixels (dark gray outer area OR white inner canvas area) -> MAKE 100% TRANSPARENT!
        if ((r < 90 && g < 90 && b < 90) || (r > 190 && g > 190 && b > 190)) continue;

        const outX = Math.floor((x / symW) * targetSymW);
        const outY = Math.floor((y / symH) * targetSymH) + Math.floor((totalH - targetSymH) / 2);

        if (outX >= 0 && outX < totalW && outY >= 0 && outY < totalH) {
          const outIdx = (totalW * outY + outX) << 2;
          if (r > 140 && g < 100 && b < 120) {
            // Luminous Red/Pink Brush Stroke
            out.data[outIdx] = 255;
            out.data[outIdx + 1] = 0;
            out.data[outIdx + 2] = 85;
            out.data[outIdx + 3] = a;
          } else {
            // Black ring outline -> Crisp Luminous White
            out.data[outIdx] = 255;
            out.data[outIdx + 1] = 255;
            out.data[outIdx + 2] = 255;
            out.data[outIdx + 3] = a;
          }
        }
      }
    }

    // 2. Process Text Matter (Right side)
    const textOffsetX = targetSymW + gap;
    for (let y = 0; y < textH; y++) {
      for (let x = 0; x < textW; x++) {
        const srcY = textStartY + y;
        const srcIdx = (W * srcY + x) << 2;
        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const a = this.data[srcIdx + 3];

        // Background pixels -> MAKE 100% TRANSPARENT!
        if ((r < 90 && g < 90 && b < 90) || (r > 190 && g > 190 && b > 190)) continue;

        const outX = textOffsetX + Math.floor((x / textW) * targetTextW);
        const outY = Math.floor((y / textH) * targetTextH) + Math.floor((totalH - targetTextH) / 2);

        if (outX >= 0 && outX < totalW && outY >= 0 && outY < totalH) {
          const outIdx = (totalW * outY + outX) << 2;
          // Black brush text -> Crisp Luminous White
          out.data[outIdx] = 255;
          out.data[outIdx + 1] = 255;
          out.data[outIdx + 2] = 255;
          out.data[outIdx + 3] = a;
        }
      }
    }

    const buffer = PNG.sync.write(out);
    fs.writeFileSync(outputPathSrc, buffer);
    fs.writeFileSync(outputPathPublic, buffer);
    fs.writeFileSync(outputPathRootAsset, buffer);
    fs.writeFileSync(outputPathRoot, buffer);
    console.log('✓ Created perfect side-by-side logo PNG from true uploaded image media_1787064906567.png!');
  });
