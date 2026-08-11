const fs = require('fs');

const adminPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');

// 1. Imports
if (!content.includes("firebase/storage")) {
  content = content.replace(
    /import \{ useCMS \} from '\.\.\/context\/CMSContext';/,
    `import { useCMS } from '../context/CMSContext';\nimport { storage } from '../firebase';\nimport { ref, uploadBytes, getDownloadURL } from 'firebase/storage';`
  );
}

// 2. Add handleFileUpload, addArrayItem, removeArrayItem
const functionInsertion = `
  const handleFileUpload = async (e, section, field, index = null, subfield = null) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!storage) {
        alert("Firebase Storage is not configured. Please add your real API keys in src/firebase.js");
        return;
    }
    try {
      const fileRef = ref(storage, \`cms_uploads/\${Date.now()}_\${file.name}\`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      if (index !== null && subfield !== null) {
          handleArrayItemChange(section, field, index, subfield, url);
      } else {
          handleTextChange(section, field, url);
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed. Make sure your Firebase Storage rules allow uploads and your config is correct.");
    }
  };

  const addArrayItem = (section, field, template) => {
    setSectionData(prev => {
        const newData = { ...prev };
        const arr = [...newData[editLang][section][field]];
        arr.push(template);
        newData[editLang][section][field] = arr;
        return newData;
    });
  };

  const removeArrayItem = (section, field, index) => {
    if(!window.confirm("Are you sure you want to remove this item?")) return;
    setSectionData(prev => {
        const newData = { ...prev };
        const arr = [...newData[editLang][section][field]];
        arr.splice(index, 1);
        newData[editLang][section][field] = arr;
        return newData;
    });
  };
`;

if (!content.includes("const handleFileUpload = async")) {
  content = content.replace(
    /const handleArrayItemChange = \(section, arrayField, index, field, value\) => \{/,
    `${functionInsertion}\n  const handleArrayItemChange = (section, arrayField, index, field, value) => {`
  );
}

// 3. Update Hero and About image inputs
content = content.replace(
    /<input\s*type="text"\s*value=\{sectionData\[editLang\]\.hero\.image \|\| ''\}\s*onChange=\{\(e\) => handleTextChange\('hero', 'image', e\.target\.value\)\}\s*placeholder="Paste image URL here"\s*\/>/g,
    `<div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={sectionData[editLang].hero.image || ''}
        onChange={(e) => handleTextChange('hero', 'image', e.target.value)}
        placeholder="Paste image URL here"
        style={{ flex: 1 }}
      />
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero', 'image')} />
    </div>`
);

content = content.replace(
    /<input\s*type="text"\s*value=\{sectionData\[editLang\]\.about\.image \|\| ''\}\s*onChange=\{\(e\) => handleTextChange\('about', 'image', e\.target\.value\)\}\s*placeholder="Paste image URL here"\s*\/>/g,
    `<div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={sectionData[editLang].about.image || ''}
        onChange={(e) => handleTextChange('about', 'image', e.target.value)}
        placeholder="Paste image URL here"
        style={{ flex: 1 }}
      />
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about', 'image')} />
    </div>`
);


fs.writeFileSync(adminPath, content, 'utf8');
console.log("Updated AdminDashboard - Phase 1");
