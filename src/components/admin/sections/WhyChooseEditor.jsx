import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function WhyChooseEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const whyChooseData = sectionData?.[editLang]?.whyChoose || {};
  const items = Array.isArray(whyChooseData.items) ? whyChooseData.items : [];

  return (
    <div className="section-form">
      <h3>Edit Value Proposition</h3>
      <div className="form-group">
        <label>Main Title</label>
        <input
          type="text"
          value={whyChooseData.title || ''}
          onChange={(e) => handleTextChange('whyChoose', 'title', e.target.value)}
          className="form-control"
          placeholder="Why Choose Dorek International"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Values List ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('whyChoose', 'items', { title: 'New Value', desc: 'Summary description' })}
        >
          <Plus size={15} /> Add Value Item
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
                #{idx + 1} — {item.title || 'Value Proposition'}
              </span>
              <div className="array-actions">
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Up"
                  onClick={() => handleMoveArrayItem('whyChoose', 'items', idx, 'up')}
                  disabled={idx === 0}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Down"
                  onClick={() => handleMoveArrayItem('whyChoose', 'items', idx, 'down')}
                  disabled={idx === items.length - 1}
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  className="nav-delete-btn"
                  title="Delete Value"
                  onClick={() => handleDeleteArrayItem('whyChoose', 'items', idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Heading / Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'title', e.target.value)}
                className="form-control font-bold"
                placeholder="e.g. Uncompromising Quality"
              />
            </div>

            {/* Description textarea on its own row underneath */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Summary Description</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Details about this value proposition..."
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
        onClick={() => handleAddArrayItem('whyChoose', 'items', { title: 'New Value', desc: 'Summary description' })}
      >
        <Plus size={14} /> Add Another Value
      </button>
    </div>
  );
}
