import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function DownloadsEditor({
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
      <h3>Edit Download Files Center</h3>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={sectionData[editLang].downloads.title || ''}
          onChange={(e) => handleTextChange('downloads', 'title', e.target.value)}
          className="form-control"
        />
      </div>

      <h4>Download Documents</h4>
      <div className="array-items-list">
        {sectionData[editLang].downloads.items.map((item, idx) => (
          <div key={idx} className="array-item-row no-flex-row" style={{ padding: '18px 20px', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>
                #{idx + 1} — {item.name || 'Document'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Document"
                onClick={() => handleDeleteArrayItem('downloads', 'items', idx)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', width: '100%' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                  DOCUMENT LABEL
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'name', e.target.value)}
                  className="form-control font-bold"
                  placeholder="Document label"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                  FORMAT
                </label>
                <input
                  type="text"
                  value={item.type}
                  onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'type', e.target.value)}
                  className="form-control"
                  placeholder="e.g. PDF"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                  FILE SIZE
                </label>
                <input
                  type="text"
                  value={item.size}
                  onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'size', e.target.value)}
                  className="form-control"
                  placeholder="e.g. 1.2 MB"
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                FILE URL OR UPLOAD
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={item.url || ''}
                  onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'url', e.target.value)}
                  className="form-control"
                  placeholder="Document URL or Google Drive link"
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'downloads', 'items', 'url', idx)}
                  style={{ maxWidth: '200px' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="secondary-action-btn" style={{ marginTop: '12px' }} onClick={() => handleAddArrayItem('downloads', 'items', { name: 'New Doc Catalog', type: 'PDF', size: '1.0 MB' })}>
        <Plus size={14} /> Add Download Item
      </button>
    </div>
  );
}
