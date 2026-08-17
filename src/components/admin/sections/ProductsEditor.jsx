import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProductsEditor({
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
                  <h3>Edit Products & Services Catalog</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].products.title || ''}
                      onChange={(e) => handleTextChange('products', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Description</label>
                    <textarea
                      value={sectionData[editLang].products.subtitle || ''}
                      onChange={(e) => handleTextChange('products', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Category Divisions & Details</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].products.categories.map((cat, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Category Group Name"
                          />
                          <input
                            type="text"
                            value={cat.icon}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon Name (e.g. Sun, Zap)"
                          />
                        </div>
                        <div className="form-group">
                          <label>Comma-separated products</label>
                          <textarea
                            value={cat.items ? cat.items.join(', ') : ''}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'items', e.target.value.split(',').map(s => s.trim()))}
                            className="form-control"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('products', 'categories', idx)}><Trash2 size={12} /> Remove Category</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('products', 'categories', { name: 'New Category', icon: 'Package', items: [] })}>
                    <Plus size={14} /> Add Product Category
                  </button>
                </div>
  );
}
