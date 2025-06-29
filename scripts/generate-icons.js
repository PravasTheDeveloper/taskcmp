const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const iconSizes = [
  { size: 16, name: 'icon-16x16.png' },
  { size: 32, name: 'icon-32x32.png' },
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 96, name: 'shortcut-add.png' },
  { size: 96, name: 'shortcut-view.png' },
];

console.log('🎨 PWA Icon Generator');
console.log('====================');
console.log('');
console.log('To generate all PWA icons, you have several options:');
console.log('');

console.log('📋 **OPTION 1: Online Icon Generator (Recommended)**');
console.log('1. Visit: https://favicon.io/favicon-converter/');
console.log('2. Upload your SVG file: public/icons/icon.svg');
console.log('3. Download the generated package');
console.log('4. Extract and copy the icons to public/icons/');
console.log('');

console.log('📋 **OPTION 2: Using ImageMagick (Command Line)**');
console.log('First install ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)');
console.log('');
console.log('Then run these commands:');
console.log('');

iconSizes.forEach(({ size, name }) => {
  console.log(`magick convert public/icons/icon.svg -resize ${size}x${size} public/icons/${name}`);
});

console.log('');
console.log('📋 **OPTION 3: Using Sharp (Node.js)**');
console.log('Run: npm install sharp');
console.log('Then use the script below in a .js file:');
console.log('');
console.log(`
const sharp = require('sharp');
const fs = require('fs');

const iconSizes = ${JSON.stringify(iconSizes, null, 2)};

async function generateIcons() {
  const svgBuffer = fs.readFileSync('public/icons/icon.svg');
  
  for (const { size, name } of iconSizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(\`public/icons/\${name}\`);
    console.log(\`✅ Generated \${name}\`);
  }
  
  console.log('🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
`);

console.log('');
console.log('📋 **OPTION 4: Design Tool Export**');
console.log('1. Open public/icons/icon.svg in Figma, Sketch, or Adobe Illustrator');
console.log('2. Export each required size manually');
console.log('3. Save to public/icons/ with the correct names');
console.log('');

console.log('🎯 **Required Icon Files:**');
iconSizes.forEach(({ size, name }) => {
  const exists = fs.existsSync(path.join(__dirname, '../public/icons/', name));
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${name} (${size}x${size})`);
});

console.log('');
console.log('💡 **Tips:**');
console.log('- All icons should be square (same width and height)');
console.log('- Use PNG format for best compatibility');
console.log('- Ensure icons look good at small sizes (16x16, 32x32)');
console.log('- Test on different devices and browsers');
console.log('');

console.log('🚀 Once icons are generated, your PWA will be fully functional!'); 