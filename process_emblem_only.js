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
    console.log(`Processing Uploaded Symbol Image: ${W}x${H}`);

    const out = new PNG({ width: W, height: H });

    let nonTrans = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Background is white/light -> 100% TRANSPARENT!
        if (r > 160 && g > 160 && b > 160) {
          out.data[idx] = 0;
          out.data[idx + 1] = 0;
          out.data[idx + 2] = 0;
          out.data[idx + 3] = 0;
        } else if (r > 140 && g < 100 && b < 120) {
          // Vibrant Red/Pink Brush Stroke
          out.data[idx] = 255;
          out.data[idx + 1] = 0;
          out.data[idx + 2] = 85;
          out.data[idx + 3] = a;
          nonTrans++;
        } else {
          // Black ring outline -> Crisp Luminous White
          out.data[idx] = 255;
          out.data[idx + 1] = 255;
          out.data[idx + 2] = 255;
          out.data[idx + 3] = a;
          nonTrans++;
        }
      }
    }

    const buffer = PNG.sync.write(out);
    fs.writeFileSync(outputPathSrc, buffer);
    fs.writeFileSync(outputPathPublic, buffer);
    fs.writeFileSync(outputPathRootAsset, buffer);
    fs.writeFileSync(outputPathRoot, buffer);
    console.log(`✓ Created pristine transparent emblem PNG! Non-transparent pixels: ${nonTrans}`);
  });
