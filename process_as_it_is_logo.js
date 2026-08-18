const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const logoPath = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded\\media_1787065459242.png';
const outputPathSrc = path.join(__dirname, 'frontend', 'src', 'assets', 'ethos_pure_logo.png');
const outputPathPublic = path.join(__dirname, 'frontend', 'public', 'ethos_pure_logo.png');
const outputPathRootAsset = path.join(__dirname, 'assets', 'ethos_pure_logo.png');
const outputPathRoot = path.join(__dirname, 'ethos_pure_logo.png');

fs.createReadStream(logoPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;
    console.log(`Processing Shared Image: ${W}x${H}`);

    const out = new PNG({ width: W, height: H });

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // White background -> 100% TRANSPARENT!
        if (r > 170 && g > 170 && b > 170) {
          out.data[idx] = 0;
          out.data[idx + 1] = 0;
          out.data[idx + 2] = 0;
          out.data[idx + 3] = 0;
        } else if (r > 140 && g < 100 && b < 120) {
          // Keep Red Brush Stroke
          out.data[idx] = 255;
          out.data[idx + 1] = 30;
          out.data[idx + 2] = 70;
          out.data[idx + 3] = a;
        } else {
          // Black ring -> Crisp Luminous White for dark theme
          out.data[idx] = 255;
          out.data[idx + 1] = 255;
          out.data[idx + 2] = 255;
          out.data[idx + 3] = a;
        }
      }
    }

    const buffer = PNG.sync.write(out);
    fs.writeFileSync(outputPathSrc, buffer);
    fs.writeFileSync(outputPathPublic, buffer);
    fs.writeFileSync(outputPathRootAsset, buffer);
    fs.writeFileSync(outputPathRoot, buffer);
    console.log(`✓ Created ethos_pure_logo.png!`);
  });
