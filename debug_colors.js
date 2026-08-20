const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const logoPath = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded\\media_1787040560901.png';

fs.createReadStream(logoPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Image size: ${this.width} x ${this.height}`);
    
    // Sample 10 random pixels across the image background and lines
    for (let y = 0; y < this.height; y += Math.floor(this.height / 5)) {
      for (let x = 0; x < this.width; x += Math.floor(this.width / 5)) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];
        console.log(`Pixel (${x}, ${y}): RGB(${r}, ${g}, ${b}), Alpha: ${a}`);
      }
    }
  });
