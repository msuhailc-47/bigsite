import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import translations from '../../../i18n/translations';
import { convertDriveUrl } from '../../../utils/getOptimizedUrl';

export default function AboutEditor({
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
  const aboutData = (sectionData[editLang] && sectionData[editLang].about) ? sectionData[editLang].about : {};
  const rawFounders = aboutData.founders;
  const foundersList = (Array.isArray(rawFounders) && rawFounders.length > 0)
    ? rawFounders
    : (translations[editLang]?.about?.founders || translations.en?.about?.founders || []);

  const loadDefaultFounders = () => {
    const defaults = (translations[editLang]?.about?.founders || translations.en?.about?.founders || []).map(f => ({ ...f }));
    setSectionData(prev => {
      const copy = { ...prev };
      if (!copy[editLang]) copy[editLang] = {};
      if (!copy[editLang].about) copy[editLang].about = {};
      copy[editLang].about.founders = defaults;
      return copy;
    });
  };

  return (
    <div className="section-form">
                  <h3>Edit About Us</h3>
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={aboutData.label || ''}
                      onChange={(e) => handleTextChange('about', 'label', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={aboutData.title || ''}
                      onChange={(e) => handleTextChange('about', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle / Company Profile Description</label>
                    <div className="admin-form-group">
                    <label>About Section Image URL</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={aboutData.image || ''}
        onChange={(e) => handleTextChange('about', 'image', e.target.value)}
        placeholder="Paste image URL here"
        style={{ flex: 1 }}
      />
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about', 'image')} />
    </div>
                  </div>
                  <textarea
                      value={aboutData.subtitle || ''}
                      onChange={(e) => handleTextChange('about', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={4}
                    />
                  </div>
                  
                  <h4>History</h4>
                  <div className="form-group">
                    <label>History Label</label>
                    <input
                      type="text"
                      value={aboutData.history || ''}
                      onChange={(e) => handleTextChange('about', 'history', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>History Text</label>
                    <textarea
                      value={aboutData.historyText || ''}
                      onChange={(e) => handleTextChange('about', 'historyText', e.target.value)}
                      className="form-control"
                      rows={4}
                    />
                  </div>

                  <h4>Vision & Mission Statement</h4>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Vision Title</label>
                      <input
                        type="text"
                        value={aboutData.vision || ''}
                        onChange={(e) => handleTextChange('about', 'vision', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Vision Content</label>
                      <textarea
                        value={aboutData.visionText || ''}
                        onChange={(e) => handleTextChange('about', 'visionText', e.target.value)}
                        className="form-control"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Mission Title</label>
                      <input
                        type="text"
                        value={aboutData.mission || ''}
                        onChange={(e) => handleTextChange('about', 'mission', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Mission Content</label>
                      <textarea
                        value={aboutData.missionText || ''}
                        onChange={(e) => handleTextChange('about', 'missionText', e.target.value)}
                        className="form-control"
                        rows={2}
                      />
                    </div>
                  </div>

                  <h4>Founder & Management Message</h4>
                  <div className="form-group">
                    <label>Quote Message Text</label>
                    <textarea
                      value={aboutData.founderMsg || ''}
                      onChange={(e) => handleTextChange('about', 'founderMsg', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Person Name</label>
                      <input
                        type="text"
                        value={aboutData.founderName || ''}
                        onChange={(e) => handleTextChange('about', 'founderName', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Position / Role</label>
                      <input
                        type="text"
                        value={aboutData.founderRole || ''}
                        onChange={(e) => handleTextChange('about', 'founderRole', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Company Name</label>
                      <input
                        type="text"
                        value={aboutData.founderCompany || ''}
                        onChange={(e) => handleTextChange('about', 'founderCompany', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0 }}>Founders & Board of Leadership (6 Founders)</h4>
                    <button
                      type="button"
                      className="admin-btn-outline"
                      onClick={loadDefaultFounders}
                      style={{ fontSize: '12px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      title="Load default 6 founder profiles"
                    >
                      <RefreshCw size={13} /> Restore Default 6 Founders
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #D4AF37' }}>
                    💡 <strong>Google Drive Photo Support:</strong> Paste any Google Drive image link in the photo field — it auto-converts to a direct image URL and compresses for fast page performance!
                  </p>

                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Leadership Section Heading</label>
                      <input
                        type="text"
                        value={aboutData.foundersTitle || ''}
                        onChange={(e) => handleTextChange('about', 'foundersTitle', e.target.value)}
                        className="form-control"
                        placeholder="Founders & Board of Leadership"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Leadership Subtitle</label>
                      <input
                        type="text"
                        value={aboutData.foundersSubtitle || ''}
                        onChange={(e) => handleTextChange('about', 'foundersSubtitle', e.target.value)}
                        className="form-control"
                        placeholder="Meet the visionary founders..."
                      />
                    </div>
                  </div>

                  <div className="array-items-list" style={{ marginBottom: '32px' }}>
                    {foundersList.map((founder, idx) => (
                      <div key={idx} className="array-item-row" style={{ display: 'block', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <strong style={{ color: 'var(--primary, #0A2E5D)', fontSize: '14px' }}>
                            Founder #{idx + 1}: {founder.name || 'Untitled Founder'}
                          </strong>
                          <div className="array-actions">
                            <button className="nav-order-btn" title="Move Up" onClick={() => handleMoveArrayItem('about', 'founders', idx, 'up')} disabled={idx === 0}><ArrowUp size={12} /></button>
                            <button className="nav-order-btn" title="Move Down" onClick={() => handleMoveArrayItem('about', 'founders', idx, 'down')} disabled={idx === foundersList.length - 1}><ArrowDown size={12} /></button>
                            <button className="nav-delete-btn" title="Remove Founder" onClick={() => handleDeleteArrayItem('about', 'founders', idx)}><Trash2 size={12} /></button>
                          </div>
                        </div>

                        <div className="form-row" style={{ marginBottom: '10px' }}>
                          <div className="form-group col-6">
                            <label style={{ fontSize: '12px' }}>Full Name *</label>
                            <input
                              type="text"
                              value={founder.name || ''}
                              onChange={(e) => handleArrayItemChange('about', 'founders', idx, 'name', e.target.value)}
                              className="form-control font-bold"
                              placeholder="e.g. Abdulla Ullattil"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label style={{ fontSize: '12px' }}>Designation / Role</label>
                            <input
                              type="text"
                              value={founder.role || ''}
                              onChange={(e) => handleArrayItemChange('about', 'founders', idx, 'role', e.target.value)}
                              className="form-control"
                              placeholder="e.g. Founder & Managing Partner"
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '10px' }}>
                          <label style={{ fontSize: '12px' }}>Founder Photo (Upload, Google Drive link, or direct URL)</label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={founder.photo || ''}
                              onChange={(e) => {
                                let val = e.target.value;
                                if (val && (val.includes('drive.google.com') || val.includes('docs.google.com') || val.includes('google.com/file'))) {
                                  val = convertDriveUrl(val);
                                }
                                handleArrayItemChange('about', 'founders', idx, 'photo', val);
                              }}
                              className="form-control"
                              placeholder="Paste Google Drive share link or image URL..."
                              style={{ flex: 1 }}
                            />
                            <input 
                              type="file" 
                              accept="image/*" 
                              id={`founder-photo-${idx}`}
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileUpload(e, 'about', 'photo', 'founders', idx)} 
                            />
                            <label 
                              htmlFor={`founder-photo-${idx}`}
                              className="admin-btn-outline" 
                              style={{ padding: '8px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            >
                              <Upload size={14} /> Upload
                            </label>
                            {founder.photo && (
                              <button
                                type="button"
                                title="Clear Photo"
                                onClick={() => handleArrayItemChange('about', 'founders', idx, 'photo', '')}
                                style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '6px', color: '#dc2626', padding: '6px 8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                          {founder.photo && (
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img 
                                src={convertDriveUrl(founder.photo)} 
                                alt={founder.name} 
                                referrerPolicy="no-referrer"
                                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4AF37' }} 
                              />
                              <div>
                                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✓ Photo active</span>
                                {founder.photo.includes('googleusercontent.com') && (
                                  <span style={{ fontSize: '10px', color: '#0A2E5D', display: 'block' }}>⚡ Google Drive link auto-converted & compressed</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label style={{ fontSize: '12px' }}>Short Description / Bio (ചെറിയ കുറിപ്പ്)</label>
                          <textarea
                            value={founder.bio || ''}
                            onChange={(e) => handleArrayItemChange('about', 'founders', idx, 'bio', e.target.value)}
                            className="form-control"
                            placeholder="Brief description about founder's contribution, focus, and leadership..."
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}

                    <button 
                      type="button"
                      className="secondary-action-btn" 
                      style={{ marginTop: '8px', width: 'auto' }}
                      onClick={() => handleAddArrayItem('about', 'founders', { 
                        name: 'Co-Founder Name', 
                        role: 'Co-Founder & Director', 
                        photo: '', 
                        bio: 'Brief description about founder responsibilities and vision.' 
                      })}
                    >
                      <Plus size={14} /> Add Founder Profile
                    </button>
                  </div>

                  <h4>Timeline Milestones</h4>
                  <div className="array-items-list">
                    {(aboutData.timelineItems || []).map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('about', 'timelineItems', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'year', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Year"
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'title', e.target.value)}
                            className="form-control"
                            placeholder="Milestone Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('about', 'timelineItems', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('about', 'timelineItems', idx, 'up')} disabled={idx === 0}><ArrowUp size={12} /></button>
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('about', 'timelineItems', idx, 'down')} disabled={idx === (aboutData.timelineItems || []).length - 1}><ArrowDown size={12} /></button>
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('about', 'timelineItems', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('about', 'timelineItems', {"year":"","title":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('about', 'timelineItems', { year: '2026', title: 'New Event', desc: 'Event details' })}>
                    <Plus size={14} /> Add Timeline Milestone
                  </button>
                </div>
  );
}
