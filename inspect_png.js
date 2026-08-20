const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const imgPath = path.join(__dirname, 'frontend', 'src', 'assets', 'ethos_side_by_side.png');

fs.createReadStream(imgPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Dimensions: ${this.width} x ${this.height}`);
    let nonTrans = 0;
    let whitePixels = 0;
    let pinkPixels = 0;

    for (let i = 0; i < this.data.length; i += 4) {
      const r = this.data[i];
      const g = this.data[i+1];
      const b = this.data[i+2];
      const a = this.data[i+3];

      if (a > 0) nonTrans++;
      if (r === 255 && g === 255 && b === 255) whitePixels++;
      if (r === 255 && g === 0 && b === 85) pinkPixels++;
    }

    console.log(`Non-transparent pixels: ${nonTrans}`);
    console.log(`White pixels: ${whitePixels}`);
    console.log(`Pink/Red pixels: ${pinkPixels}`);
  });
