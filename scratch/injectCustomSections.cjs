const fs = require('fs');

const adminPath = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(adminPath, 'utf8');

// The new tab content
const customSectionJSX = `
        {/* Tab: Custom Sections */}
        {activeTab === 'customSections' && (
          <div className="admin-panel-card animate-fadeIn">
            <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2>Dynamic Custom Sections</h2>
                <p>Build and manage entirely new sections for the website.</p>
              </div>
              <button className="admin-btn" onClick={() => {
                const newSection = {
                  id: 'section-' + Date.now(),
                  label: 'New Section',
                  title: 'Section Title',
                  subtitle: 'Section Subtitle',
                  text: 'Add your content here...',
                  image: '',
                  backgroundColor: '#ffffff',
                  textColor: '#0A2E5D'
                };
                const currentSections = sectionData[editLang].customSections || [];
                handleSectionChange('customSections', '', [...currentSections, newSection]);
              }}>
                + Create New Section
              </button>
            </div>

            <div className="array-items-list">
              {(sectionData[editLang].customSections || []).map((section, idx) => (
                <div key={section.id || idx} className="array-item-row" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
                  <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h3>Section {idx + 1}: {section.label}</h3>
                    <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated.splice(idx, 1);
                      handleSectionChange('customSections', '', updated);
                    }}>Delete Section</button>
                  </div>

                  <div className="form-group">
                    <label>Label / Badge text</label>
                    <input type="text" className="form-control" value={section.label || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].label = e.target.value;
                      handleSectionChange('customSections', '', updated);
                    }} />
                  </div>
                  
                  <div className="form-group">
                    <label>Main Title</label>
                    <input type="text" className="form-control" value={section.title || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].title = e.target.value;
                      handleSectionChange('customSections', '', updated);
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Subtitle</label>
                    <input type="text" className="form-control" value={section.subtitle || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].subtitle = e.target.value;
                      handleSectionChange('customSections', '', updated);
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Content (Text / HTML)</label>
                    <textarea className="form-control" rows="5" value={section.text || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].text = e.target.value;
                      handleSectionChange('customSections', '', updated);
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Side Image</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" className="form-control" placeholder="Image URL" value={section.image || ''} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].image = e.target.value;
                        handleSectionChange('customSections', '', updated);
                      }} style={{ flex: 1 }} />
                      
                      {/* Simple file upload for custom section using the same handler if possible, but handleFileUpload expects field & idx.
                          Since customSections is an array of objects, we can write a custom inline handler for this file. */}
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        // Mock upload by creating local object URL or reading as Base64 so it previews instantly
                        const reader = new FileReader();
                        reader.onloadend = () => {
                           const updated = [...(sectionData[editLang].customSections || [])];
                           updated[idx].image = reader.result; // Data URL
                           handleSectionChange('customSections', '', updated);
                        };
                        reader.readAsDataURL(file);
                      }} />
                    </div>
                    {section.image && <img src={section.image} alt="preview" style={{width:'150px', marginTop:'10px', borderRadius:'8px'}} />}
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Background Color</label>
                      <input type="color" className="form-control" value={section.backgroundColor || '#ffffff'} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].backgroundColor = e.target.value;
                        handleSectionChange('customSections', '', updated);
                      }} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Text Color</label>
                      <input type="color" className="form-control" value={section.textColor || '#0A2E5D'} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].textColor = e.target.value;
                        handleSectionChange('customSections', '', updated);
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
`;

// Insert the new tab content right before the 'code' tab rendering block.
const codeTabRegex = /\{\/\* Tab 6: Code Settings \*\/\}/;

if (content.match(codeTabRegex)) {
    content = content.replace(codeTabRegex, customSectionJSX + '\n\n        {/* Tab 6: Code Settings */}');
    fs.writeFileSync(adminPath, content, 'utf8');
    console.log("Successfully injected Custom Sections UI into AdminDashboard.");
} else {
    console.log("Could not find Code Settings tab.");
}
