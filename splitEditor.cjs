const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'admin', 'ContentEditorTab.jsx');
const content = fs.readFileSync(filePath, 'utf8');

const parts = content.split('{/* SECTION: ');
const pre = parts[0];

const sections = [];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  
  // Extract title
  const titleEnd = part.indexOf(' */}');
  const sectionTitle = part.substring(0, titleEnd).trim();
  
  // Extract key
  const editLangMatch = part.match(/\{editingSection === '(.*?)' && \(/);
  const sectionKey = editLangMatch[1];
  
  // Extract JSX (everything after editLangMatch until the last `)}`)
  let jsxStart = editLangMatch.index + editLangMatch[0].length;
  // find the last `)}` which closes the editingSection condition
  let jsxEnd = part.lastIndexOf(')}');
  
  let jsxContent = part.substring(jsxStart, jsxEnd).trim();
  
  const componentName = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) + 'Editor';
  
  sections.push({ title: sectionTitle, key: sectionKey, componentName, jsx: jsxContent });
}

let imports = '';
sections.forEach(s => {
  imports += `import ${s.componentName} from './sections/${s.componentName}';\n`;
});

let renders = '';
sections.forEach(s => {
  renders += `
              {/* SECTION: ${s.title} */}
              {editingSection === '${s.key}' && (
                <${s.componentName}
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}
`;
});

// find post part from the last part (it contains the end of the file after `)}`)
const lastPart = parts[parts.length - 1];
const post = lastPart.substring(lastPart.lastIndexOf(')}') + 2);

const preWithImports = pre.replace(/import \{ storage \} from '\.\.\/\.\.\/firebase';/, `${imports}import { storage } from '../../firebase';`);
const newContent = preWithImports + renders + post;

fs.writeFileSync(filePath, newContent);

// Write components
sections.forEach(s => {
  const compCode = `import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ${s.componentName}({
  sectionData,
  setSectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem,
  handleFileUpload
}) {
  return (
    ${s.jsx}
  );
}
`;
  fs.writeFileSync(path.join(__dirname, 'src', 'components', 'admin', 'sections', `${s.componentName}.jsx`), compCode);
});

console.log(`Extracted ${sections.length} sections safely!`);
