const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const logoPath = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded\\media_1787065080535.png';
const outputPathSrc = path.join(__dirname, 'frontend', 'src', 'assets', 'ethos_emblem_symbol.png');
const outputPathPublic = path.join(__dirname, 'frontend', 'public', 'ethos_emblem_symbol.png');
const outputPathRootAsset = path.join(__dirname, 'assets', 'ethos_emblem_symbol.png');
const outputPathRoot = path.join(__dirname, 'ethos_emblem_symbol.png');

fs.createReadStream(logoPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;

    // Find bounding box of non-white pixels
    let minX = W, minY = H, maxX = 0, maxY = 0;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // If pixel is NOT white/light background
        if (!(r > 160 && g > 160 && b > 160)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log(`Bounding box of symbol: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    console.log(`Cropped dimensions: ${cropW} x ${cropH}`);

    const out = new PNG({ width: cropW, height: cropH });

    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcX = minX + x;
        const srcY = minY + y;
        const srcIdx = (W * srcY + srcX) << 2;
        const outIdx = (cropW * y + x) << 2;

        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const a = this.data[srcIdx + 3];

        if (r > 160 && g > 160 && b > 160) {
          // Transparent
          out.data[outIdx] = 0;
          out.data[outIdx + 1] = 0;
          out.data[outIdx + 2] = 0;
          out.data[outIdx + 3] = 0;
        } else if (r > 140 && g < 100 && b < 120) {
          // Vibrant Red/Pink Brush Stroke
          out.data[outIdx] = 255;
          out.data[outIdx + 1] = 0;
          out.data[outIdx + 2] = 85;
          out.data[outIdx + 3] = a;
        } else {
          // Black ring outline -> Luminous White
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
    console.log(`✓ Created tightly cropped transparent emblem PNG (${cropW}x${cropH})!`);
  });
