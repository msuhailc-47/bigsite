import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
                </div>
  );
}
