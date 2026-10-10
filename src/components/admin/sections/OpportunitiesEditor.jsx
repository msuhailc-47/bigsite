import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function OpportunitiesEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const oppData = sectionData?.[editLang]?.opportunities || {};
  const items = Array.isArray(oppData.items) ? oppData.items : [];

  return (
    <div className="section-form">
      <h3>Edit Opportunities & Partnership Programs</h3>
      <div className="form-group">
        <label>Main Heading</label>
        <input
          type="text"
          value={oppData.title || ''}
          onChange={(e) => handleTextChange('opportunities', 'title', e.target.value)}
          className="form-control"
          placeholder="Opportunities & Partnerships"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={oppData.subtitle || ''}
          onChange={(e) => handleTextChange('opportunities', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
          placeholder="Collaborate with Dorek International across diverse business verticals..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Partnership Models ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('opportunities', 'items', { name: 'New Model', icon: 'Briefcase', desc: 'Opportunity terms details' })}
        >
          <Plus size={15} /> Add Partnership Model
        </button>
      </div>

      <div className="array-items-list">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="array-item-row no-flex-row"
            style={{
              padding: '20px 22px',
              gap: '14px',
              background: '#ffffff',
              border: '1px solid rgba(10, 46, 93, 0.09)',
              borderRadius: '14px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(10, 46, 93, 0.06)'
            }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A2E5D' }}>
                #{idx + 1} — {item.name || 'Partnership Model'}
              </span>
              <div className="array-actions">
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Up"
                  onClick={() => handleMoveArrayItem('opportunities', 'items', idx, 'up')}
                  disabled={idx === 0}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Down"
                  onClick={() => handleMoveArrayItem('opportunities', 'items', idx, 'down')}
                  disabled={idx === items.length - 1}
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  className="nav-delete-btn"
                  title="Delete Model"
                  onClick={() => handleDeleteArrayItem('opportunities', 'items', idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Partnership Model Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Channel Partner"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Lucide Icon Name</label>
                <input
                  type="text"
                  value={item.icon || ''}
                  onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'icon', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Users, Briefcase, Zap"
                />
              </div>
            </div>

            {/* Terms description textarea on its own row underneath */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Partnership Terms & Details</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Comprehensive partnership details and benefits..."
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="secondary-action-btn"
        style={{ marginTop: '10px' }}
        onClick={() => handleAddArrayItem('opportunities', 'items', { name: 'New Model', icon: 'Briefcase', desc: 'Opportunity terms details' })}
      >
        <Plus size={14} /> Add Another Model
      </button>
    </div>
  );
}
