const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'i18n', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// Add formOptions array after formSubmit in the contact section for English
content = content.replace(
  /formSubmit:\s*'Send Message'/,
  `formSubmit: 'Send Message',\n      formOptions: ['Business Inquiry', 'Career', 'Customer Support', 'Other']`
);

// Add formOptions for Malayalam (look for Malayalam formSubmit)
content = content.replace(
  /formSubmit:\s*'സന്ദേശം അയക്കുക'/,
  `formSubmit: 'സന്ദേശം അയക്കുക',\n      formOptions: ['ബിസിനസ് അന്വേഷണം', 'കരിയർ', 'കസ്റ്റമർ സപ്പോർട്ട്', 'മറ്റുള്ളവ']`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("translations.js updated with formOptions.");
