const fs = require('fs');
const path = require('path');
const { PNG } = require(path.join(__dirname, 'frontend', 'node_modules', 'pngjs'));

const dir = 'C:\\Users\\yuvar\\.gemini\\antigravity\\brain\\0356d35a-373b-4472-b305-3a6be009ae27\\.user_uploaded';

['media_1787064696220.png', 'media_1787064906567.png', 'media_1787061039036.png'].forEach(file => {
  const p = path.join(dir, file);
  fs.createReadStream(p)
    .pipe(new PNG())
    .on('parsed', function() {
      console.log(`File: ${file} | Dimensions: ${this.width} x ${this.height}`);
      console.log(`Pixel (0,0): RGB(${this.data[0]}, ${this.data[1]}, ${this.data[2]})`);
      console.log(`Pixel (${Math.floor(this.width/2)}, ${Math.floor(this.height/2)}): RGB(${this.data[(this.width * Math.floor(this.height/2) + Math.floor(this.width/2)) * 4]}, ${this.data[(this.width * Math.floor(this.height/2) + Math.floor(this.width/2)) * 4 + 1]}, ${this.data[(this.width * Math.floor(this.height/2) + Math.floor(this.width/2)) * 4 + 2]})`);
    });
});
