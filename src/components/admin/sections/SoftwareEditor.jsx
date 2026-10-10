import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function SoftwareEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const softwareData = sectionData?.[editLang]?.software || {};
  const items = Array.isArray(softwareData.items) ? softwareData.items : [];

  return (
    <div className="section-form">
      <h3>Edit Software Products & Platforms</h3>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={softwareData.title || ''}
          onChange={(e) => handleTextChange('software', 'title', e.target.value)}
          className="form-control"
          placeholder="Enterprise Software Solutions"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={softwareData.subtitle || ''}
          onChange={(e) => handleTextChange('software', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
          placeholder="Proprietary platforms empowering logistics, inventory, and point-of-sale operations."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Software Modules ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('software', 'items', { name: 'New Module', icon: 'Code', desc: 'Software details specs' })}
        >
          <Plus size={15} /> Add Software Module
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
                #{idx + 1} — {item.name || 'Software Module'}
              </span>
              <div className="array-actions">
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Up"
                  onClick={() => handleMoveArrayItem('software', 'items', idx, 'up')}
                  disabled={idx === 0}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Down"
                  onClick={() => handleMoveArrayItem('software', 'items', idx, 'down')}
                  disabled={idx === items.length - 1}
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  className="nav-delete-btn"
                  title="Delete Module"
                  onClick={() => handleDeleteArrayItem('software', 'items', idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Module / Platform Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayItemChange('software', 'items', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Doorcarts Core POS"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Lucide Icon Name</label>
                <input
                  type="text"
                  value={item.icon || ''}
                  onChange={(e) => handleArrayItemChange('software', 'items', idx, 'icon', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Code, Database, Cpu"
                />
              </div>
            </div>

            {/* Description textarea on its own row underneath */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Module Specifications & Description</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => handleArrayItemChange('software', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Detailed specifications and capabilities..."
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
        onClick={() => handleAddArrayItem('software', 'items', { name: 'New Module', icon: 'Code', desc: 'Software details specs' })}
      >
        <Plus size={14} /> Add Another Module
      </button>
    </div>
  );
}
