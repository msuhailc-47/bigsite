import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function NewsEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const newsData = sectionData?.[editLang]?.news || {};
  const items = Array.isArray(newsData.items) ? newsData.items : [];

  return (
    <div className="section-form">
      <h3>Edit News & Events Articles</h3>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={newsData.title || ''}
          onChange={(e) => handleTextChange('news', 'title', e.target.value)}
          className="form-control"
          placeholder="Latest News & Media"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={newsData.subtitle || ''}
          onChange={(e) => handleTextChange('news', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
          placeholder="Official announcements, milestones, and industry insights..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>News Articles ({items.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('news', 'items', { title: 'New Article', cat: 'Corporate', date: 'October 2026', excerpt: 'Article summary text' })}
        >
          <Plus size={15} /> Add News Article
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
                #{idx + 1} — {item.title || 'News Article'}
              </span>
              <div className="array-actions">
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Up"
                  onClick={() => handleMoveArrayItem('news', 'items', idx, 'up')}
                  disabled={idx === 0}
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="nav-order-btn"
                  title="Move Down"
                  onClick={() => handleMoveArrayItem('news', 'items', idx, 'down')}
                  disabled={idx === items.length - 1}
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  className="nav-delete-btn"
                  title="Delete Article"
                  onClick={() => handleDeleteArrayItem('news', 'items', idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Article Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleArrayItemChange('news', 'items', idx, 'title', e.target.value)}
                className="form-control font-bold"
                placeholder="e.g. Dorek Expands Commercial Solar Operations"
              />
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Category (e.g. Expansion, Award, Solar)</label>
                <input
                  type="text"
                  value={item.cat || ''}
                  onChange={(e) => handleArrayItemChange('news', 'items', idx, 'cat', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Expansion"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Date / Month</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => handleArrayItemChange('news', 'items', idx, 'date', e.target.value)}
                  className="form-control"
                  placeholder="e.g. October 2026"
                />
              </div>
            </div>

            {/* Excerpt textarea on its own row underneath */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Article Summary / Excerpt</label>
              <textarea
                value={item.excerpt || ''}
                onChange={(e) => handleArrayItemChange('news', 'items', idx, 'excerpt', e.target.value)}
                className="form-control"
                placeholder="Brief summary of the news announcement..."
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
        onClick={() => handleAddArrayItem('news', 'items', { title: 'New Article', cat: 'News', date: 'October 2026', excerpt: 'Article summary' })}
      >
        <Plus size={14} /> Add Another Article
      </button>
    </div>
  );
}
