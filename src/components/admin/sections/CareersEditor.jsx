import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CareersEditor({
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
                  <h3>Edit Careers & Training</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].careers.title || ''}
                      onChange={(e) => handleTextChange('careers', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].careers.subtitle || ''}
                      onChange={(e) => handleTextChange('careers', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Active Open Job Openings</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].careers.jobs.map((job, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'jobs', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={job.dept}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'dept', e.target.value)}
                            className="form-control"
                            placeholder="Department"
                          />
                          <input
                            type="text"
                            value={job.location}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'location', e.target.value)}
                            className="form-control"
                            placeholder="Location"
                          />
                          <input
                            type="text"
                            value={job.type}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'type', e.target.value)}
                            className="form-control"
                            placeholder="e.g. Full-time / Open"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('careers', 'jobs', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'jobs', {"title":"","dept":"","location":"","type":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'jobs', { title: 'Sales Executive', dept: 'Sales', location: 'Kerala', type: 'Full-time' })}>
                    <Plus size={14} /> Add Job Opening
                  </button>

                  <h4 style={{ marginTop: '30px' }}>Internships</h4>
                  <div className="array-items-list">
                    {(sectionData[editLang].careers.internships || []).map((internship, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'internships', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={internship.title}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Internship Title"
                          />
                          <input
                            type="text"
                            value={internship.dept}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'dept', e.target.value)}
                            className="form-control"
                            placeholder="Department"
                          />
                          <input
                            type="text"
                            value={internship.duration}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'duration', e.target.value)}
                            className="form-control"
                            placeholder="Duration (e.g. 3 Months)"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('careers', 'internships', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'internships', {"title":"","dept":"","duration":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'internships', { title: 'Marketing Intern', dept: 'Marketing', duration: '3 Months' })}>
                    <Plus size={14} /> Add Internship
                  </button>

                  <h4 style={{ marginTop: '30px' }}>Training Programs</h4>
                  <div className="array-items-list">
                    {(sectionData[editLang].careers.training || []).map((training, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'training', idx)}>Remove Item</button>
                        <div className="form-group">
                          <input
                            type="text"
                            value={training.title}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Training Title"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            value={training.desc}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'desc', e.target.value)}
                            className="form-control"
                            placeholder="Description"
                            rows={2}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="checkbox"
                            checked={!!training.certification}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'certification', e.target.checked)}
                          />
                          <label style={{ margin: 0 }}>Offers Certification</label>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'training', {"title":"","desc":"","certification":false})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'training', { title: 'New Training', desc: 'Training details', certification: true })}>
                    <Plus size={14} /> Add Training Program
                  </button>
                </div>
  );
}
