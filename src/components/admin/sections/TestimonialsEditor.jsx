import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function TestimonialsEditor({
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
                  <h3>Edit Client & Partner Testimonials</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].testimonials.title || ''}
                      onChange={(e) => handleTextChange('testimonials', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Testimonials Feedback List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].testimonials.items.map((item, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('testimonials', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Person Name"
                          />
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'role', e.target.value)}
                            className="form-control"
                            placeholder="Role description"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'category', e.target.value)}
                            className="form-control"
                          >
                            <option value="Customers">Customers</option>
                            <option value="Associates">Associates</option>
                            <option value="Dealers">Dealers</option>
                            <option value="Investors">Investors</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <textarea
                            value={item.text}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'text', e.target.value)}
                            className="form-control"
                            placeholder="Feedback message text content"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('testimonials', 'items', idx)}><Trash2 size={12} /> Remove Testimonial</button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('testimonials', 'items', {"name":"","role":"","category":"All","text":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('testimonials', 'items', { name: 'Customer Name', role: 'Partner', text: 'Feedback reviews details', category: 'Customers' })}>
                    <Plus size={14} /> Add Testimonial Item
                  </button>
                </div>
  );
}
