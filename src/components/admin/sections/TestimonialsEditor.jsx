import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function TestimonialsEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem
}) {
  const testimonialsData = sectionData?.[editLang]?.testimonials || {};
  const items = Array.isArray(testimonialsData.items) ? testimonialsData.items : [];

  return (
    <div className="section-form">
      <h3>Edit Client & Partner Testimonials</h3>
      <div className="form-group">
        <label>Section Heading</label>
        <input
          type="text"
          value={testimonialsData.title || ''}
          onChange={(e) => handleTextChange('testimonials', 'title', e.target.value)}
          className="form-control"
          placeholder="What People Say"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Testimonials Feedback List ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('testimonials', 'items', { name: 'New Client', role: 'Partner / Client', text: 'Great service and quality products.', category: 'Customers' })}
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="array-items-list">
        {items.map((item, idx) => (
          <div key={idx} className="array-item-row no-flex-row" style={{ padding: '20px 22px', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(10, 46, 93, 0.06)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A2E5D' }}>
                #{idx + 1} — {item.name || 'Anonymous'} {item.role ? `(${item.role})` : ''}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Testimonial"
                onClick={() => handleDeleteArrayItem('testimonials', 'items', idx)}
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Person / Client Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Kumari"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Role / Designation</label>
                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'role', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Customer, Contractor, Architect"
                />
              </div>

              <div className="form-group col-span-2" style={{ marginBottom: 0 }}>
                <label>Feedback Category</label>
                <select
                  value={item.category || 'Customers'}
                  onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'category', e.target.value)}
                  className="form-control"
                >
                  <option value="Customers">Customers</option>
                  <option value="Associates">Associates</option>
                  <option value="Dealers">Dealers</option>
                  <option value="Investors">Investors</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Feedback Message / Review Text</label>
              <textarea
                value={item.text || ''}
                onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'text', e.target.value)}
                className="form-control"
                placeholder="Enter feedback review details..."
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="secondary-action-btn"
        style={{ marginTop: '8px' }}
        onClick={() => handleAddArrayItem('testimonials', 'items', { name: 'Customer Name', role: 'Partner', text: 'Feedback reviews details', category: 'Customers' })}
      >
        <Plus size={14} /> Add Another Testimonial
      </button>
    </div>
  );
}
