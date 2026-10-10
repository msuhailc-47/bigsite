import React from 'react';
import { Trash2, Plus } from 'lucide-react';

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
      <h3>Edit Products Section</h3>
      <div className="form-group">
        <label>Section Title</label>
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
          <div key={idx} className="array-item-row no-flex-row" style={{ padding: '18px 20px', gap: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>
                #{idx + 1} — {cat.name || 'Category'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Remove Category"
                onClick={() => handleDeleteArrayItem('products', 'categories', idx)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>CATEGORY GROUP NAME</label>
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="Category Group Name"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>ICON NAME</label>
                <input
                  type="text"
                  value={cat.icon}
                  onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'icon', e.target.value)}
                  className="form-control"
                  placeholder="Lucide Icon Name (e.g. Sun, Zap, Package)"
                />
              </div>
            </div>
            <div className="form-group" style={{ margin: 0, width: '100%' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                COMMA-SEPARATED PRODUCTS LIST
              </label>
              <textarea
                value={cat.items ? cat.items.join(', ') : ''}
                onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'items', e.target.value.split(',').map(s => s.trim()))}
                className="form-control"
                rows={3}
                placeholder="Product 1, Product 2, Product 3..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="secondary-action-btn" style={{ marginTop: '12px' }} onClick={() => handleAddArrayItem('products', 'categories', { name: 'New Category', icon: 'Package', items: [] })}>
        <Plus size={14} /> Add Product Category
      </button>
    </div>
  );
}
