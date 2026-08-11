const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'i18n', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// We'll just replace the footer object block directly in both en and ml to ensure all properties exist.
// Since we only want to ensure the keys exist, we can use a regex to inject them if they don't exist, but it's simpler to just inject them right after `youtube: ...`

const extraKeys = `
      quickLinks: 'Quick Links',
      legal: 'Legal',
      connect: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      refund: 'Refund Policy',
      disclaimer: 'Disclaimer',
      copyright: '© 2026 Dorek International LLP. All rights reserved.',`;

content = content.replace(/youtube:\s*'[^']+'/g, (match) => {
    return match + ',' + extraKeys;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("translations.js updated successfully with footer labels.");
