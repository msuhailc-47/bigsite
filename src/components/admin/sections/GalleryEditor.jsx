import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function GalleryEditor({
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
      <h3>Edit Media Gallery</h3>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={sectionData[editLang].gallery.title || ''}
          onChange={(e) => handleTextChange('gallery', 'title', e.target.value)}
          className="form-control"
        />
      </div>

      <h4>📷 Photos</h4>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px' }}>
        💡 Paste any Google Drive link — it auto-converts to a direct image URL!
      </p>
      <div className="array-items-list">
        {(sectionData[editLang].gallery.photos || []).map((item, idx) => {
          const photo = typeof item === 'string' ? { title: item, url: '' } : item;
          return (
            <div key={idx} className="array-item-row" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong>Photo {idx + 1}</strong>
                <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => handleDeleteArrayItem('gallery', 'photos', idx)}>
                  <Trash2 size={12} /> Remove
                </button>
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Title / Caption</label>
                <input
                  type="text"
                  value={photo.title || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'photos', idx, 'title', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Corporate Office"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Image URL (paste direct link or Google Drive link)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={photo.url || ''}
                    onChange={(e) => handleArrayItemChange('gallery', 'photos', idx, 'url', e.target.value)}
                    className="form-control"
                    placeholder="https://... or Google Drive link"
                    style={{ flex: 1 }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'gallery', 'photos', 'photos', idx)}
                    style={{ maxWidth: '180px' }}
                  />
                </div>
              </div>
              {photo.url && (
                <img src={photo.url} alt={photo.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid #ddd' }} referrerPolicy="no-referrer" />
              )}
            </div>
          );
        })}
      </div>
      <button className="secondary-action-btn mb-20" onClick={() => handleAddArrayItem('gallery', 'photos', { title: '', url: '' })}>
        <Plus size={14} /> Add New Photo
      </button>

      <h4>🎬 Videos</h4>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px' }}>
        Paste YouTube video links below. They will be auto-embedded.
      </p>
      <div className="array-items-list">
        {(sectionData[editLang].gallery.videos || []).map((item, idx) => {
          const video = typeof item === 'string' ? { title: item, url: '' } : item;
          return (
            <div key={idx} className="array-item-row" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong>Video {idx + 1}</strong>
                <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => handleDeleteArrayItem('gallery', 'videos', idx)}>
                  <Trash2 size={12} /> Remove
                </button>
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Title / Caption</label>
                <input
                  type="text"
                  value={video.title || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'videos', idx, 'title', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Corporate Overview"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Video URL (YouTube link)</label>
                <input
                  type="text"
                  value={video.url || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'videos', idx, 'url', e.target.value)}
                  className="form-control"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              {video.url && video.url.includes('youtu') && (
                <div style={{ marginTop: '8px' }}>
                  <iframe
                    width="200" height="120"
                    src={`https://www.youtube.com/embed/${video.url.includes('v=') ? video.url.split('v=')[1]?.split('&')[0] : video.url.split('/').pop()}`}
                    style={{ borderRadius: '6px', border: '1px solid #ddd' }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="secondary-action-btn mb-20" onClick={() => handleAddArrayItem('gallery', 'videos', { title: '', url: '' })}>
        <Plus size={14} /> Add New Video
      </button>

      <h4>🏆 Achievements</h4>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px' }}>
        Add company achievements, awards, and milestones.
      </p>
      <div className="array-items-list">
        {(sectionData[editLang].gallery.achievements || []).map((item, idx) => {
          const ach = typeof item === 'string' ? { title: item, description: '', year: '' } : item;
          return (
            <div key={idx} className="array-item-row" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong>Achievement {idx + 1}</strong>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="admin-btn-outline" onClick={() => handleMoveArrayItem('gallery', 'achievements', idx, 'up')} disabled={idx === 0}>
                    <ArrowUp size={12} />
                  </button>
                  <button className="admin-btn-outline" onClick={() => handleMoveArrayItem('gallery', 'achievements', idx, 'down')} disabled={idx === (sectionData[editLang].gallery.achievements || []).length - 1}>
                    <ArrowDown size={12} />
                  </button>
                  <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => handleDeleteArrayItem('gallery', 'achievements', idx)}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Title</label>
                <input
                  type="text"
                  value={ach.title || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'achievements', idx, 'title', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Best Enterprise Award 2024"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Description</label>
                <textarea
                  value={ach.description || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'achievements', idx, 'description', e.target.value)}
                  className="form-control"
                  placeholder="Brief description of the achievement..."
                  rows={2}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '0.8rem', color: '#666' }}>Year</label>
                <input
                  type="text"
                  value={ach.year || ''}
                  onChange={(e) => handleArrayItemChange('gallery', 'achievements', idx, 'year', e.target.value)}
                  className="form-control"
                  placeholder="e.g. 2024"
                  style={{ maxWidth: '150px' }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button className="secondary-action-btn mb-20" onClick={() => handleAddArrayItem('gallery', 'achievements', { title: '', description: '', year: '' })}>
        <Plus size={14} /> Add New Achievement
      </button>
    </div>
  );
}
