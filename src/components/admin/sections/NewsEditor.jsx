import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NewsEditor({
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
                  <h3>Edit News & Events Articles</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].news.title || ''}
                      onChange={(e) => handleTextChange('news', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].news.subtitle || ''}
                      onChange={(e) => handleTextChange('news', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>News Articles</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].news.items.map((item, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('news', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'title', e.target.value)}
                            className="form-control font-bold col-span-2"
                            placeholder="Article Title"
                          />
                          <input
                            type="text"
                            value={item.cat}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'cat', e.target.value)}
                            className="form-control"
                            placeholder="Category"
                          />
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'date', e.target.value)}
                            className="form-control"
                            placeholder="Date stamp"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            value={item.excerpt}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'excerpt', e.target.value)}
                            className="form-control"
                            placeholder="Excerpt summary details text"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('news', 'items', idx)}><Trash2 size={12} /> Remove Article</button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('news', 'items', {"title":"","cat":"","date":"","excerpt":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('news', 'items', { title: 'New Article', cat: 'News', date: 'August 2026', excerpt: 'Details summary' })}>
                    <Plus size={14} /> Add News Article
                  </button>
                </div>
  );
}
