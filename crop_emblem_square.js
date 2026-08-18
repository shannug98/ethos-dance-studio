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
    const H = this.height; // 359
    const W = H; // 359 square for circle!

    console.log(`Cropping Emblem Square: ${W}x${H}`);

    const out = new PNG({ width: W, height: H });

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const srcIdx = (this.width * y + x) << 2;
        const outIdx = (W * y + x) << 2;

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
    console.log(`✓ Created perfect square emblem circle PNG (${W}x${H})!`);
  });
