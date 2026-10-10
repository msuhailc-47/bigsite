import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function BusinessesEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const businessesData = sectionData?.[editLang]?.businesses || {};
  const items = Array.isArray(businessesData.items) ? businessesData.items : [];

  return (
    <div className="section-form">
      <h3>Edit Business Divisions</h3>
      <div className="form-group">
        <label>Section Title</label>
        <input
          type="text"
          value={businessesData.title || ''}
          onChange={(e) => handleTextChange('businesses', 'title', e.target.value)}
          className="form-control"
          placeholder="Our Businesses & Divisions"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Text</label>
        <input
          type="text"
          value={businessesData.subtitle || ''}
          onChange={(e) => handleTextChange('businesses', 'subtitle', e.target.value)}
          className="form-control"
          placeholder="Dorek International operates through multiple specialized divisions..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Divisions List ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('businesses', 'items', { name: 'New Division', tag: 'New', desc: 'Short card description', details: '' })}
        >
          <Plus size={15} /> Add Business Division
        </button>
      </div>

      <div className="array-items-list">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="array-item-row no-flex-row"
            style={{
              padding: '22px 24px',
              gap: '16px',
              background: '#ffffff',
              border: '1px solid rgba(10, 46, 93, 0.09)',
              borderRadius: '14px',
              boxShadow: '0 2px 8px rgba(10, 46, 93, 0.03)'
            }}
          >
            {/* Header of Division Card */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(10, 46, 93, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  background: '#0A2E5D',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '6px'
                }}>
                  #{idx + 1}
                </span>
                <strong style={{ fontSize: '1.02rem', color: '#0A2E5D' }}>
                  {item.name || 'Unnamed Division'}
                </strong>
                {item.tag && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    color: '#b45309'
                  }}>
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="array-actions">
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Up"
                  onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'up')}
                  disabled={idx === 0}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Down"
                  onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'down')}
                  disabled={idx === items.length - 1}
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  className="nav-delete-btn"
                  title="Delete Division"
                  onClick={() => handleDeleteArrayItem('businesses', 'items', idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Row 1: Division Name & Tag (2 columns) */}
            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Division Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Retail Network"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Tag Badge (e.g. Flagship, Retail)</label>
                <input
                  type="text"
                  value={item.tag || ''}
                  onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'tag', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Flagship, Retail"
                />
              </div>
            </div>

            {/* Row 2: Short Card Description - Full Width */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Short Description (Shown on Main Card)</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="A growing network of branded retail outlets across Kerala, ensuring product accessibility at every doorstep."
                rows={2}
              />
            </div>

            {/* Row 3: Learn More Details (Popup Content) - FULL WIDTH UNDERNEATH (ADIYIL) */}
            <div className="form-group" style={{
              marginBottom: 0,
              background: '#f8fafc',
              border: '1px solid rgba(10, 46, 93, 0.08)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <label style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#0A2E5D',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                📄 Learn More Details (Popup Content — Full Width Modal)
              </label>
              <textarea
                value={item.details || ''}
                onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'details', e.target.value)}
                className="form-control"
                placeholder="Detailed description shown when user clicks 'Learn More'... Add paragraphs, key services, division strengths, etc."
                rows={4}
                style={{ background: '#ffffff' }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="secondary-action-btn"
        style={{ marginTop: '12px' }}
        onClick={() => handleAddArrayItem('businesses', 'items', { name: 'New Division', tag: 'New', desc: 'Short card description', details: '' })}
      >
        <Plus size={14} /> Add Another Business Division
      </button>
    </div>
  );
}
