import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function OpportunitiesEditor({
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
                  <h3>Edit Opportunities & Partnership Programs</h3>
                  <div className="form-group">
                    <label>Main Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].opportunities.title || ''}
                      onChange={(e) => handleTextChange('opportunities', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].opportunities.subtitle || ''}
                      onChange={(e) => handleTextChange('opportunities', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Partnership Models</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].opportunities.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('opportunities', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Partnership Name"
                          />
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon (e.g. Users)"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Partnership terms details"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('opportunities', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('opportunities', 'items', {"name":"","icon":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('opportunities', 'items', { name: 'New Model', icon: 'Briefcase', desc: 'Opportunity terms details' })}>
                    <Plus size={14} /> Add Model Option
                  </button>
                </div>
  );
}
