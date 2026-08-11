const fs = require('fs');

const adminPath = "src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');

// 1. Add Firebase storage imports
if (!content.includes("from 'firebase/storage'")) {
    content = content.replace(
        "import { Globe",
        "import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';\nimport { storage } from '../firebase';\nimport { Globe"
    );
}

// 2. Define handleFileUpload and update handleMediaUpload
const uploadFuncs = `
  // Master File Upload Handler (Firebase Storage)
  const handleFileUpload = async (e, section, key, arrayName = null, index = null, nestedKey = null) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      triggerNotification("Uploading image...");
      const fileRef = ref(storage, 'dorek/' + Date.now() + '_' + file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      if (arrayName !== null && index !== null) {
        handleArrayItemChange(section, arrayName, index, key, downloadURL);
      } else {
        handleTextChange(section, key, downloadURL, nestedKey);
      }
      triggerNotification("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      triggerNotification("Failed to upload image. Is Firebase Storage configured?");
    }
  };

  // Media upload handler (Firebase Storage)
  const handleMediaUpload = async (e) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      triggerNotification("Uploading media to library...");
      const fileRef = ref(storage, 'media/' + Date.now() + '_' + file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const newFile = {
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: downloadURL
      };
      addMedia(newFile);
      triggerNotification("Media file added to library!");
    } catch (error) {
      console.error("Error uploading media: ", error);
      triggerNotification("Failed to upload media.");
    }
  };
`;

// Replace existing handleMediaUpload (which used FileReader)
const regexMediaUpload = /\/\/\s*Media upload handler[\s\S]*?reader\.readAsDataURL\(file\);\s*\};/;
if (content.match(regexMediaUpload)) {
    content = content.replace(regexMediaUpload, uploadFuncs);
} else {
    // If not found, inject right before // Save Advanced scripts
    content = content.replace(/\/\/\s*Save Advanced scripts/, uploadFuncs + '\n\n  // Save Advanced scripts');
}

// 3. Update the custom sections image file upload inline logic
const customSectionRegex = /reader\.onloadend = \(\) => \{[\s\S]*?handleSectionChange\('customSections', '', updated\);\s*\};\s*reader\.readAsDataURL\(file\);/g;

const replaceStr = `
                        triggerNotification("Uploading image...");
                        const fileRef = ref(storage, 'custom/' + Date.now() + '_' + file.name);
                        uploadBytes(fileRef, file).then(() => {
                           return getDownloadURL(fileRef);
                        }).then((url) => {
                           const updated = [...(sectionData[editLang].customSections || [])];
                           updated[idx].image = url;
                           handleSectionChange('customSections', '', updated);
                           triggerNotification("Image uploaded!");
                        }).catch(err => {
                           console.error(err);
                           triggerNotification("Image upload failed");
                        });
`;

content = content.replace(customSectionRegex, replaceStr);

fs.writeFileSync(adminPath, content, 'utf8');
console.log("Successfully injected Firebase Storage logic!");
