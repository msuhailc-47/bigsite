const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'i18n', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// Add youtube to english
content = content.replace(/linkedin: 'https:\/\/linkedin\.com\/company\/dorek'/g, "linkedin: 'https://linkedin.com/company/dorek',\n      youtube: 'https://youtube.com/@dorek'");

fs.writeFileSync(filePath, content, 'utf8');
console.log("translations.js updated successfully with youtube.");
