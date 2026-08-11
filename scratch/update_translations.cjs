const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'i18n', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// We need to inject mapUrl into both english and malayalam contacts.
// English is before line 350, Malayalam is after.
// It's easier to just match `formOptions:` line and add mapUrl after it in both contact objects.

content = content.replace(/formOptions: \['General Inquiry'.*?\]/g, "formOptions: ['General Inquiry', 'Business Opportunity', 'Product Inquiry', 'Service Request', 'Investment', 'Career', 'Other'],\n      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3514059046777!2d76.3142721!3d9.9877864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4c82701d71%3A0xc3f6e166e51cc145!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'");

content = content.replace(/formOptions: \['പൊതു അന്വേഷണം'.*?\]/g, "formOptions: ['പൊതു അന്വേഷണം', 'ബിസിനസ് അവസരം', 'ഉൽപ്പന്ന അന്വേഷണം', 'സേവന അഭ്യർത്ഥന', 'നിക്ഷേപം', 'കരിയർ', 'മറ്റുള്ളവ'],\n      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3514059046777!2d76.3142721!3d9.9877864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d4c82701d71%3A0xc3f6e166e51cc145!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'");

// Inject facebook, instagram, twitter, linkedin into footer for both languages
const englishFooter = `copyright: '© 2025 Dorek International Enterprises LLP. All Rights Reserved.',
      facebook: 'https://facebook.com/dorek',
      instagram: 'https://instagram.com/dorek',
      twitter: 'https://twitter.com/dorek',
      linkedin: 'https://linkedin.com/company/dorek'`;
      
content = content.replace(/copyright: '© 2025 Dorek International Enterprises LLP. All Rights Reserved.'/g, englishFooter);

const malayalamFooter = `copyright: '© 2025 ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.',
      facebook: 'https://facebook.com/dorek',
      instagram: 'https://instagram.com/dorek',
      twitter: 'https://twitter.com/dorek',
      linkedin: 'https://linkedin.com/company/dorek'`;

content = content.replace(/copyright: '© 2025 ഡോറെക് ഇന്റർനാഷണൽ എന്റർപ്രൈസസ് LLP. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.'/g, malayalamFooter);

fs.writeFileSync(filePath, content, 'utf8');
console.log("translations.js updated successfully.");
