const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const inputPath = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded\\media_1787040560901.png';
const outputPathSrc = 'C:\\Users\\yuvar\\.gemini\\antigravity\\scratch\\dance-studio-app\\frontend\\src\\assets\\ethos_symbol_transparent.png';
const outputPathPublic = 'C:\\Users\\yuvar\\.gemini\\antigravity\\scratch\\dance-studio-app\\frontend\\public\\ethos_symbol_transparent.png';
const outputPathRootAsset = 'C:\\Users\\yuvar\\.gemini\\antigravity\\scratch\\dance-studio-app\\assets\\ethos_symbol_transparent.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Crop upper 64% of height to isolate the circular symbol emblem
    const cropHeight = Math.floor(this.height * 0.64);
    const cropped = new PNG({ width: this.width, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Isolate white / near-white background
        if (r > 190 && g > 190 && b > 190) {
          cropped.data[idx] = 0;
          cropped.data[idx + 1] = 0;
          cropped.data[idx + 2] = 0;
          cropped.data[idx + 3] = 0; // 100% transparent!
        }
        // Crimson / Red stroke
        else if (r > 140 && g < 100 && b < 120) {
          cropped.data[idx] = 255;    // Luminous Rose Pink / Red
          cropped.data[idx + 1] = 0;
          cropped.data[idx + 2] = 85;
          cropped.data[idx + 3] = a;
        }
        // Black / Dark circle outline -> Convert to Crisp Luminous White!
        else {
          cropped.data[idx] = 255;
          cropped.data[idx + 1] = 255;
          cropped.data[idx + 2] = 255;
          cropped.data[idx + 3] = a;
        }
      }
    }

    const buffer = PNG.sync.write(cropped);
    fs.writeFileSync(outputPathSrc, buffer);
    fs.writeFileSync(outputPathPublic, buffer);
    fs.writeFileSync(outputPathRootAsset, buffer);
    console.log('✓ Transparent Ethos Symbol PNG created successfully!');
  });
