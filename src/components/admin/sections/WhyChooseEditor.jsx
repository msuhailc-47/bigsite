import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function WhyChooseEditor({
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
                  <h3>Edit Value Proposition</h3>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].whyChoose.title || ''}
                      onChange={(e) => handleTextChange('whyChoose', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Values List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].whyChoose.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('whyChoose', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Heading"
                          />
                          <input
                            type="text"
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'desc', e.target.value)}
                            className="form-control"
                            placeholder="Summary description"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('whyChoose', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('whyChoose', 'items', {"title":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('whyChoose', 'items', { title: 'New Value', desc: 'Description' })}>
                    <Plus size={14} /> Add Proposition Value
                  </button>
                </div>
  );
}
