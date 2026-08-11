const fs = require('fs');

const adminPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');

// Helper to inject add and remove buttons
function patchArray(content, section, field, emptyObj) {
  // Regex to find the map start
  const mapRegex = new RegExp(\`\\\\{sectionData\\\\[editLang\\\\]\\\\.\${section}\\\\.\${field}\\\\.map\\\\(\\\\(.*?, (\\\\w+)\\\\) => \\\\(\\\\s*<div key=\\\\{.*?\\\\} className="array-item-row.*?>\`);
  
  const match = content.match(mapRegex);
  if (!match) {
      console.warn("Could not match map for", section, field);
      return content;
  }
  
  // Inject remove button
  content = content.replace(
      match[0],
      \`\${match[0]}\\n                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => removeArrayItem('\${section}', '\${field}', \${match[1]})}>Remove Item</button>\`
  );

  // Inject Add button
  // Find the end of this map. This is tricky.
  // Instead, let's find the header text just above it to uniquely identify the section block and replace at the end of array-items-list
  const listEndRegex = new RegExp(\`(\\\\{sectionData\\\\[editLang\\\\]\\\\.\${section}\\\\.\${field}\\\\.map[\\\\s\\\\S]*?<\\\\/div>\\\\s*\\\\)\\\\)\\\\}\\\\s*<\\\\/div>)\`);
  const endMatch = content.match(listEndRegex);
  if (endMatch) {
      const templateStr = JSON.stringify(emptyObj);
      content = content.replace(
          endMatch[0],
          \`\${endMatch[0]}\n                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => addArrayItem('\${section}', '\${field}', \${templateStr})}>+ Add New</button>\`
      );
  }
  return content;
}

// 1. Timeline
content = patchArray(content, 'about', 'timelineItems', { year: '', title: '', desc: '' });
content = patchArray(content, 'businesses', 'items', { name: '', icon: '', desc: '' });
content = patchArray(content, 'whyChoose', 'items', { title: '', desc: '' });
content = patchArray(content, 'opportunities', 'items', { name: '', icon: '', desc: '' });
content = patchArray(content, 'software', 'items', { name: '', icon: '', desc: '' });
content = patchArray(content, 'investors', 'items', { name: '', desc: '' });
content = patchArray(content, 'careers', 'jobs', { title: '', dept: '', location: '', type: '' });
content = patchArray(content, 'news', 'items', { title: '', cat: '', date: '', excerpt: '' });
content = patchArray(content, 'downloads', 'items', { name: '', type: '', size: '' });
content = patchArray(content, 'testimonials', 'items', { name: '', role: '', category: 'All', text: '' });
content = patchArray(content, 'csr', 'items', { name: '', desc: '' });

// Gallery has simple strings instead of objects
content = patchArray(content, 'gallery', 'photos', "");
content = patchArray(content, 'gallery', 'videos', "");


// Now for gallery, change input to file input
content = content.replace(
    /className="array-item-row">\s*<input\s*type="text"\s*value=\{item\}\s*onChange=\{\(e\) => handleArrayItemChange\('gallery', 'photos', idx, '', e.target.value, 'stringArray'\)\}\s*className="form-control"\s*placeholder="Photo description"\s*\/>/g,
    `className="array-item-row">
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={item}
          onChange={(e) => handleArrayItemChange('gallery', 'photos', idx, '', e.target.value, 'stringArray')}
          className="form-control"
          placeholder="Image URL"
          style={{ flex: 1 }}
        />
        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'gallery', 'photos', idx, 'stringArray')} />
      </div>`
);


fs.writeFileSync(adminPath, content, 'utf8');
console.log("Updated AdminDashboard arrays successfully.");
