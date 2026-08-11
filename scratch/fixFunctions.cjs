const fs = require('fs');
const adminPath = "src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');

// Fix 1: Replace all addArrayItem(...) with handleAddArrayItem(...)
const before1 = (content.match(/addArrayItem\(/g) || []).length;
content = content.replace(/\baddArrayItem\(/g, 'handleAddArrayItem(');
const after1 = (content.match(/handleAddArrayItem\(/g) || []).length;
console.log(`addArrayItem -> handleAddArrayItem: ${before1} replacements (total now: ${after1})`);

// Fix 2: Replace all removeArrayItem(...) with handleDeleteArrayItem(...)
const before2 = (content.match(/removeArrayItem\(/g) || []).length;
content = content.replace(/\bremoveArrayItem\(/g, 'handleDeleteArrayItem(');
const after2 = (content.match(/handleDeleteArrayItem\(/g) || []).length;
console.log(`removeArrayItem -> handleDeleteArrayItem: ${before2} replacements (total now: ${after2})`);

// Fix 3: Avoid double-naming (handleHandleAddArrayItem or handleHandleDeleteArrayItem)
content = content.replace(/handleHandleAddArrayItem/g, 'handleAddArrayItem');
content = content.replace(/handleHandleDeleteArrayItem/g, 'handleDeleteArrayItem');

fs.writeFileSync(adminPath, content, 'utf8');
console.log("All undefined function references fixed!");
