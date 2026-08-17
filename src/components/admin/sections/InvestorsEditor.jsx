import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function InvestorsEditor({
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
                  <h3>Edit Investors Section</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].investors.title || ''}
                      onChange={(e) => handleTextChange('investors', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].investors.subtitle || ''}
                      onChange={(e) => handleTextChange('investors', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Investor Guidelines</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].investors.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('investors', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Heading Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-3"
                            placeholder="Guideline details description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('investors', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('investors', 'items', {"name":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('investors', 'items', { name: 'New Guideline', desc: 'Guideline terms details' })}>
                    <Plus size={14} /> Add Investor Item
                  </button>
                </div>
  );
}
