const fs = require('fs');
const adminPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');
let lines = content.split('\n');

const arrayConfigs = [
  { section: 'about', field: 'timelineItems', emptyObj: { year: '', title: '', desc: '' } },
  { section: 'businesses', field: 'items', emptyObj: { name: '', icon: '', desc: '' } },
  { section: 'whyChoose', field: 'items', emptyObj: { title: '', desc: '' } },
  { section: 'opportunities', field: 'items', emptyObj: { name: '', icon: '', desc: '' } },
  { section: 'software', field: 'items', emptyObj: { name: '', icon: '', desc: '' } },
  { section: 'investors', field: 'items', emptyObj: { name: '', desc: '' } },
  { section: 'careers', field: 'jobs', emptyObj: { title: '', dept: '', location: '', type: '' } },
  { section: 'news', field: 'items', emptyObj: { title: '', cat: '', date: '', excerpt: '' } },
  { section: 'downloads', field: 'items', emptyObj: { name: '', type: '', size: '' } },
  { section: 'testimonials', field: 'items', emptyObj: { name: '', role: '', category: 'All', text: '' } },
  { section: 'csr', field: 'items', emptyObj: { name: '', desc: '' } },
  { section: 'gallery', field: 'photos', emptyObj: "" },
  { section: 'gallery', field: 'videos', emptyObj: "" }
];

let newLines = [];
let i = 0;
while (i < lines.length) {
    let line = lines[i];
    
    // Check if this line is the start of a map we care about
    let matchedConfig = null;
    let matchStr = null;
    let mapMatch = line.match(/\{sectionData\[editLang\]\.(\w+)\.(\w+)\.map\(\(.*?, (\w+)\) => \(/);
    if (mapMatch) {
        let section = mapMatch[1];
        let field = mapMatch[2];
        let idxVar = mapMatch[3];
        matchedConfig = arrayConfigs.find(c => c.section === section && c.field === field);
        if (matchedConfig) {
            matchedConfig.idxVar = idxVar;
        }
    }
    
    newLines.push(line);
    
    if (matchedConfig) {
        // We found a map start. The next line should be `<div key={...} className="array-item-row...>`
        i++;
        let divLine = lines[i];
        newLines.push(divLine);
        
        // Now inject remove button
        newLines.push(`                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => removeArrayItem('${matchedConfig.section}', '${matchedConfig.field}', ${matchedConfig.idxVar})}>Remove Item</button>`);
        
        // We also need to find the end of this map to inject the Add button
        // Since maps end with `))} </div>` or similar, let's track the indent or look for `))}`
        let nestedLevel = 1;
        while (nestedLevel > 0 && i < lines.length - 1) {
            i++;
            let innerLine = lines[i];
            
            // Just look for `))}`
            if (innerLine.includes('))}')) {
                // Check if the next line or this line closes a div
                newLines.push(innerLine);
                // Inject Add Button here
                const templateStr = JSON.stringify(matchedConfig.emptyObj);
                newLines.push(`                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => addArrayItem('${matchedConfig.section}', '${matchedConfig.field}', ${templateStr})}>+ Add New</button>`);
                nestedLevel = 0;
            } else {
                newLines.push(innerLine);
            }
        }
    }
    
    i++;
}

let result = newLines.join('\n');

// Update gallery photos input to file input
result = result.replace(
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


fs.writeFileSync(adminPath, result, 'utf8');
console.log("Updated AdminDashboard arrays successfully.");
