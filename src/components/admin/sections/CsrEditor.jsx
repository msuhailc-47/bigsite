import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CsrEditor({
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
                  <h3>Edit CSR Campaigns</h3>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].csr.title || ''}
                      onChange={(e) => handleTextChange('csr', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].csr.subtitle || ''}
                      onChange={(e) => handleTextChange('csr', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>CSR Core Campaigns</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].csr.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('csr', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Program Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-3"
                            placeholder="Campaign program details description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('csr', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('csr', 'items', {"name":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('csr', 'items', { name: 'New Initiative', desc: 'Campaign description details' })}>
                    <Plus size={14} /> Add Campaign Initiative
                  </button>
                </div>
  );
}
