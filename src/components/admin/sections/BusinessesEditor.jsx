import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function BusinessesEditor({
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
    <div className="section-form">
                  <h3>Edit Business Divisions</h3>
                  <div className="form-group">
                    <label>Section Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].businesses.title || ''}
                      onChange={(e) => handleTextChange('businesses', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].businesses.subtitle || ''}
                      onChange={(e) => handleTextChange('businesses', 'subtitle', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Divisions List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].businesses.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('businesses', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Division Name"
                          />
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'tag', e.target.value)}
                            className="form-control"
                            placeholder="Tag badge (e.g. Flagship)"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Short description (shown on card)"
                            rows={2}
                          />
                        </div>
                        <div className="form-group" style={{ marginTop: '10px' }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A2E5D' }}>📄 Learn More Details (Popup Content)</label>
                          <textarea
                            value={item.details || ''}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'details', e.target.value)}
                            className="form-control"
                            placeholder="Detailed description shown when user clicks 'Learn More'... Add paragraphs, features, etc."
                            rows={4}
                            style={{ marginTop: '6px' }}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'up')} disabled={idx === 0}><ArrowUp size={12} /></button>
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'down')} disabled={idx === sectionData[editLang].businesses.items.length - 1}><ArrowDown size={12} /></button>
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('businesses', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('businesses', 'items', {"name":"","tag":"","desc":"","details":""})}> + Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('businesses', 'items', { name: 'New Division', tag: 'New', desc: 'Description', details: '' })}>
                    <Plus size={14} /> Add Business Division
                  </button>
                </div>
  );
}
