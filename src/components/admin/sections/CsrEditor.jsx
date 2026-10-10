import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CsrEditor({
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
      <h3>Edit CSR Campaigns</h3>
      <div className="form-group">
        <label>Main Title</label>
        <input
          type="text"
          value={sectionData[editLang].csr.title || ''}
          onChange={(e) => handleTextChange('csr', 'title', e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={sectionData[editLang].csr.subtitle || ''}
          onChange={(e) => handleTextChange('csr', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
        />
      </div>

      <h4>CSR Core Campaigns</h4>
      <div className="array-items-list">
        {sectionData[editLang].csr.items.map((item, idx) => (
          <div key={idx} className="array-item-row no-flex-row" style={{ padding: '18px 20px', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>
                #{idx + 1} — {item.name || 'CSR Campaign'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Campaign"
                onClick={() => handleDeleteArrayItem('csr', 'items', idx)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                PROGRAM / INITIATIVE TITLE
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'name', e.target.value)}
                className="form-control font-bold"
                placeholder="Program Title"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                CAMPAIGN DETAILS & DESCRIPTION
              </label>
              <textarea
                value={item.desc}
                onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Campaign program details description"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="secondary-action-btn" style={{ marginTop: '12px' }} onClick={() => handleAddArrayItem('csr', 'items', { name: 'New Initiative', desc: 'Campaign description details' })}>
        <Plus size={14} /> Add Campaign Initiative
      </button>
    </div>
  );
}
