import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AboutEditor({
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
                  <h3>Edit About Us</h3>
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.label || ''}
                      onChange={(e) => handleTextChange('about', 'label', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.title || ''}
                      onChange={(e) => handleTextChange('about', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle / Company Profile Description</label>
                    <div className="admin-form-group">
                    <label>About Section Image URL</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={sectionData[editLang].about.image || ''}
        onChange={(e) => handleTextChange('about', 'image', e.target.value)}
        placeholder="Paste image URL here"
        style={{ flex: 1 }}
      />
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about', 'image')} />
    </div>
                  </div>
                  <textarea
                      value={sectionData[editLang].about.subtitle || ''}
                      onChange={(e) => handleTextChange('about', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={4}
                    />
                  </div>
                  
                  <h4>History</h4>
                  <div className="form-group">
                    <label>History Label</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.history || ''}
                      onChange={(e) => handleTextChange('about', 'history', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>History Text</label>
                    <textarea
                      value={sectionData[editLang].about.historyText || ''}
                      onChange={(e) => handleTextChange('about', 'historyText', e.target.value)}
                      className="form-control"
                      rows={4}
                    />
                  </div>

                  <h4>Vision & Mission Statement</h4>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Vision Title</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.vision || ''}
                        onChange={(e) => handleTextChange('about', 'vision', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Vision Content</label>
                      <textarea
                        value={sectionData[editLang].about.visionText || ''}
                        onChange={(e) => handleTextChange('about', 'visionText', e.target.value)}
                        className="form-control"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Mission Title</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.mission || ''}
                        onChange={(e) => handleTextChange('about', 'mission', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Mission Content</label>
                      <textarea
                        value={sectionData[editLang].about.missionText || ''}
                        onChange={(e) => handleTextChange('about', 'missionText', e.target.value)}
                        className="form-control"
                        rows={2}
                      />
                    </div>
                  </div>

                  <h4>Founder & Management Message</h4>
                  <div className="form-group">
                    <label>Quote Message Text</label>
                    <textarea
                      value={sectionData[editLang].about.founderMsg || ''}
                      onChange={(e) => handleTextChange('about', 'founderMsg', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Person Name</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.founderName || ''}
                        onChange={(e) => handleTextChange('about', 'founderName', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Position / Role</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.founderRole || ''}
                        onChange={(e) => handleTextChange('about', 'founderRole', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Company Name</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.founderCompany || ''}
                        onChange={(e) => handleTextChange('about', 'founderCompany', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <h4>Timeline Milestones</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].about.timelineItems.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('about', 'timelineItems', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'year', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Year"
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'title', e.target.value)}
                            className="form-control"
                            placeholder="Milestone Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('about', 'timelineItems', idx, 'up')} disabled={idx === 0}><ArrowUp size={12} /></button>
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('about', 'timelineItems', idx, 'down')} disabled={idx === sectionData[editLang].about.timelineItems.length - 1}><ArrowDown size={12} /></button>
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('about', 'timelineItems', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('about', 'timelineItems', {"year":"","title":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('about', 'timelineItems', { year: '2026', title: 'New Event', desc: 'Event details' })}>
                    <Plus size={14} /> Add Timeline Milestone
                  </button>
                </div>
  );
}
