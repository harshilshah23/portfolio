const fs = require('fs');
const path = require('path');

// We have assets/reference_hero_bg.png in the project directory
const srcPath = path.join(__dirname, 'assets', 'reference_hero_bg.png');
console.log('Exists:', fs.existsSync(srcPath), 'Size:', fs.statSync(srcPath).size);
