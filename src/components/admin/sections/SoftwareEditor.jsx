import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SoftwareEditor({
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
                  <h3>Edit Software Products</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].software.title || ''}
                      onChange={(e) => handleTextChange('software', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].software.subtitle || ''}
                      onChange={(e) => handleTextChange('software', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Software Modules</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].software.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('software', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Module name"
                          />
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon Name"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Module specs details"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('software', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('software', 'items', {"name":"","icon":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('software', 'items', { name: 'New Module', icon: 'Code', desc: 'Software details specs' })}>
                    <Plus size={14} /> Add Module Option
                  </button>
                </div>
  );
}
