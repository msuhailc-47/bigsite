import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function DownloadsEditor({
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
                  <h3>Edit Download Files Center</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].downloads.title || ''}
                      onChange={(e) => handleTextChange('downloads', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Download Documents</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].downloads.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('downloads', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Document label"
                          />
                          <input
                            type="text"
                            value={item.type}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'type', e.target.value)}
                            className="form-control"
                            placeholder="File format (e.g. PDF)"
                          />
                          <input
                            type="text"
                            value={item.size}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'size', e.target.value)}
                            className="form-control"
                            placeholder="Size size (e.g. 1.2 MB)"
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                          <input
                            type="text"
                            value={item.url || ''}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'url', e.target.value)}
                            className="form-control"
                            placeholder="Document URL or Google Drive link"
                            style={{ flex: 1 }}
                          />
                          <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, 'downloads', 'items', 'url', idx)}
                            style={{ maxWidth: '200px' }}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('downloads', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('downloads', 'items', {"name":"","type":"","size":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('downloads', 'items', { name: 'New Doc Catalog', type: 'PDF', size: '1.0 MB' })}>
                    <Plus size={14} /> Add Download Item
                  </button>
                </div>
  );
}
