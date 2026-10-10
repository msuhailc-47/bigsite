import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function InvestorsEditor({
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
      <h3>Edit Investors Section</h3>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={sectionData[editLang].investors.title || ''}
          onChange={(e) => handleTextChange('investors', 'title', e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={sectionData[editLang].investors.subtitle || ''}
          onChange={(e) => handleTextChange('investors', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
        />
      </div>

      <h4>Investor Guidelines</h4>
      <div className="array-items-list">
        {sectionData[editLang].investors.items.map((item, idx) => (
          <div key={idx} className="array-item-row no-flex-row" style={{ padding: '18px 20px', gap: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>
                #{idx + 1} — {item.name || 'Investor Item'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Guideline"
                onClick={() => handleDeleteArrayItem('investors', 'items', idx)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="form-group" style={{ margin: 0, width: '100%' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                GUIDELINE / PROPOSITION HEADING
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'name', e.target.value)}
                className="form-control font-bold"
                placeholder="Heading Title"
              />
            </div>
            <div className="form-group" style={{ margin: 0, width: '100%' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                GUIDELINE DETAILS & DESCRIPTION
              </label>
              <textarea
                value={item.desc}
                onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Guideline details description"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="secondary-action-btn" style={{ marginTop: '12px' }} onClick={() => handleAddArrayItem('investors', 'items', { name: 'New Guideline', desc: 'Guideline terms details' })}>
        <Plus size={14} /> Add Investor Item
      </button>
    </div>
  );
}
