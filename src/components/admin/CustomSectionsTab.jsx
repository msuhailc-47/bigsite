import React from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CustomSectionsTab({
  sectionData,
  setSectionData,
  editLang,
  triggerNotification
}) {
  return (
    <div className="admin-panel-card animate-fadeIn">
      <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>Dynamic Custom Sections</h2>
          <p>Build and manage entirely new sections for the website.</p>
        </div>
        <button className="admin-btn" onClick={() => {
          const newSection = {
            id: 'custom-section-' + Date.now(),
            label: 'New Section',
            title: 'Custom Content',
            subtitle: '',
            text: 'Add your content here...',
            image: '',
            backgroundColor: '#ffffff',
            textColor: '#0A2E5D'
          };
          const currentSections = sectionData[editLang].customSections || [];
          setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: [...currentSections, newSection] } }));
        }}>
          + Create New Section
        </button>
      </div>

      <div className="array-items-list">
        {(sectionData[editLang].customSections || []).map((section, idx) => (
          <div key={section.id || idx} className="array-item-row" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
            <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3>Section {idx + 1}: {section.label} <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal', marginLeft: '10px' }}>(Use Path: <strong>#{section.id || `custom-section-${idx}`}</strong> in Navigation)</span></h3>
              <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated.splice(idx, 1);
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }}>Delete Section</button>
            </div>

            <div className="form-group">
              <label>Label / Badge text</label>
              <input type="text" className="form-control" value={section.label || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].label = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>
            
            <div className="form-group">
              <label>Main Title</label>
              <input type="text" className="form-control" value={section.title || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].title = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input type="text" className="form-control" value={section.subtitle || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].subtitle = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>

            <div className="form-group">
              <label>Content (Text / HTML)</label>
              <textarea className="form-control" rows="5" value={section.text || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].text = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>

            <div className="form-group">
              <label>Side Image</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="form-control" placeholder="Image URL" value={section.image || ''} onChange={(e) => {
                  const updated = [...(sectionData[editLang].customSections || [])];
                  updated[idx].image = e.target.value;
                  setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                }} style={{ flex: 1 }} />
                
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  triggerNotification("Uploading image...");
                  const fileRef = ref(storage, 'custom/' + Date.now() + '_' + file.name);
                  uploadBytes(fileRef, file).then(() => {
                      return getDownloadURL(fileRef);
                  }).then((url) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].image = url;
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                      triggerNotification("Image uploaded!");
                  }).catch(err => {
                      console.error(err);
                      triggerNotification("Image upload failed");
                  });

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
                  setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                }} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Text Color</label>
                <input type="color" className="form-control" value={section.textColor || '#0A2E5D'} onChange={(e) => {
                  const updated = [...(sectionData[editLang].customSections || [])];
                  updated[idx].textColor = e.target.value;
                  setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
