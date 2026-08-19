import React from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Trash2, Image as ImageIcon, Link, FileText, Type } from 'lucide-react';
import { optimizeImage } from '../../utils/imageOptimizer';

export default function CustomSectionsTab({
  sectionData,
  setSectionData,
  editLang,
  triggerNotification
}) {
  return (
    <div className="admin-panel-card animate-fadeIn">
      <div className="section-header-flex">
        <div>
          <h3>Dynamic Custom Sections</h3>
          <p className="section-description">Build and manage custom sections outside of the standard template. They will render sequentially at the bottom of the page before the footer.</p>
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
          setSectionData(prev => {
            const copy = { ...prev };
            ['en', 'ml'].forEach(l => {
              if (copy[l]) {
                const current = copy[l].customSections || [];
                copy[l] = { ...copy[l], customSections: [...current, { ...newSection }] };
              }
            });
            return copy;
          });
        }}>
          <Plus size={16} /> Create New Section
        </button>
      </div>

      <div className="array-items-list" style={{ marginTop: '20px' }}>
        {(sectionData[editLang].customSections || []).map((section, idx) => (
          <div key={section.id || idx} className="array-item-row">
            <div className="section-header-flex" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
              <h4><FileText size={16} style={{display:'inline', marginRight:'8px', verticalAlign:'middle'}}/> Section {idx + 1}: {section.label || 'Untitled'} 
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '10px' }}>(Path: <strong>#{section.id || `custom-section-${idx}`}</strong>)</span>
              </h4>
              <button className="delete-btn" onClick={() => {
                setSectionData(prev => {
                  const copy = { ...prev };
                  ['en', 'ml'].forEach(l => {
                    if (copy[l] && copy[l].customSections) {
                      const updated = [...copy[l].customSections];
                      updated.splice(idx, 1);
                      copy[l] = { ...copy[l], customSections: updated };
                    }
                  });
                  return copy;
                });
              }}>
                <Trash2 size={16} /> Delete
              </button>
            </div>

            <div className="form-group">
              <label>Section Label / Badge</label>
              <div className="input-with-icon">
                <Type size={16} className="input-icon" />
                <input type="text" className="form-control" value={section.label || ''} onChange={(e) => {
                  const updated = [...(sectionData[editLang].customSections || [])];
                  updated[idx].label = e.target.value;
                  setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                }} />
              </div>
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
              <label>Subtitle (Optional)</label>
              <input type="text" className="form-control" value={section.subtitle || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].subtitle = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>

            <div className="form-group">
              <label>Body Content (Accepts HTML)</label>
              <textarea className="form-control" rows="5" value={section.text || ''} onChange={(e) => {
                const updated = [...(sectionData[editLang].customSections || [])];
                updated[idx].text = e.target.value;
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
              }} />
            </div>

            <div className="form-group">
              <label>Side Image (Optional)</label>
              <div className="image-upload-row">
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <Link size={16} className="input-icon" />
                  <input type="text" className="form-control" placeholder="Direct Image URL" value={section.image || ''} onChange={(e) => {
                    const updated = [...(sectionData[editLang].customSections || [])];
                    updated[idx].image = e.target.value;
                    setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                  }} />
                </div>
                
                <label className="admin-btn-outline upload-btn">
                  <ImageIcon size={16} /> Upload Image
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                      triggerNotification("Optimizing image...");
                      const optimized = await optimizeImage(file, 1200, 0.8);
                      triggerNotification("Uploading to storage...");
                      const fileRef = ref(storage, 'custom/' + Date.now() + '_' + optimized.name);
                      await uploadBytes(fileRef, optimized);
                      const url = await getDownloadURL(fileRef);
                      setSectionData(prev => {
                        const copy = { ...prev };
                        ['en', 'ml'].forEach(l => {
                          if (copy[l] && copy[l].customSections) {
                            const updated = [...copy[l].customSections];
                            if(updated[idx]) updated[idx].image = url;
                            copy[l] = { ...copy[l], customSections: updated };
                          }
                        });
                        return copy;
                      });
                      triggerNotification("Image added successfully!");
                    } catch (err) {
                      console.error(err);
                      triggerNotification("Upload failed.");
                    }
                  }} />
                </label>
              </div>
              {section.image && (
                <div className="image-preview" style={{ marginTop: '10px' }}>
                  <img src={section.image} alt="preview" style={{ height: '80px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Image Position</label>
              <select className="form-control" value={section.imagePosition || 'right'} onChange={(e) => {
                setSectionData(prev => {
                  const copy = { ...prev };
                  ['en', 'ml'].forEach(l => {
                    if (copy[l] && copy[l].customSections) {
                      const updated = [...copy[l].customSections];
                      if(updated[idx]) updated[idx].imagePosition = e.target.value;
                      copy[l] = { ...copy[l], customSections: updated };
                    }
                  });
                  return copy;
                });
              }}>
                <option value="right">Image on Right (Default)</option>
                <option value="left">Image on Left</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
