import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw } from 'lucide-react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ContentEditorTab({
  editingSection, setEditingSection,
  sectionVisibility, toggleSectionVisibility,
  sectionData, setSectionData,
  editLang, handleTextChange, handleFileUpload,
  handleArrayItemChange, handleAddArrayItem, handleDeleteArrayItem, handleMoveArrayItem,
  triggerNotification
}) {
  return (
        
          <div className="admin-pages-layout animate-fadeIn">
            {/* Left page sub-navigator */}
            <aside className="admin-pages-sidebar">
              <h4>Select Section</h4>
              {[
                { key: 'hero', label: 'Hero Banner' },
                { key: 'about', label: 'About Us' },
                { key: 'businesses', label: 'Businesses' },
                { key: 'whyChoose', label: 'Why Choose Us' },
                { key: 'products', label: 'Products & Services' },
                { key: 'opportunities', label: 'Opportunities' },
                { key: 'software', label: 'Software Solutions' },
                { key: 'network', label: 'Network Stats' },
                { key: 'investors', label: 'Investors' },
                { key: 'careers', label: 'Careers' },
                { key: 'news', label: 'News & Events' },
                { key: 'gallery', label: 'Gallery' },
                { key: 'downloads', label: 'Downloads' },
                { key: 'testimonials', label: 'Testimonials' },
                { key: 'csr', label: 'CSR Section' },
                { key: 'contact', label: 'Contact Info' },
                { key: 'footer', label: 'Footer Links', noToggle: true }
              ].map(sec => (
                <div key={sec.key} className={`page-side-row ${editingSection === sec.key ? 'active' : ''} ${sectionVisibility[sec.key] === false ? 'hidden-section' : ''}`}>
                  <button className="page-side-btn" onClick={() => setEditingSection(sec.key)}>
                    {sec.label}
                  </button>
                  {!sec.noToggle && (
                    <button
                      className={`visibility-toggle ${sectionVisibility[sec.key] === false ? 'off' : 'on'}`}
                      onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(sec.key); }}
                      title={sectionVisibility[sec.key] === false ? 'Section Hidden — Click to Show' : 'Section Visible — Click to Hide'}
                    >
                      {sectionVisibility[sec.key] === false ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
              ))}
            </aside>

            {/* Right page content form */}
            <div className="admin-page-content-fields">
              {/* SECTION: Hero Banner */}
              {editingSection === 'hero' && (
                <div className="section-form">
                  <h3>Edit Hero Banner</h3>
                  <div className="form-group">
                    <label>Tagline Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.tagline || ''}
                      onChange={(e) => handleTextChange('hero', 'tagline', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Text</label>
                    <textarea
                      value={sectionData[editLang].hero.subtitle || ''}
                      onChange={(e) => handleTextChange('hero', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.getStarted || ''}
                      onChange={(e) => handleTextChange('hero', 'getStarted', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary CTA Button Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.contactUs || ''}
                      onChange={(e) => handleTextChange('hero', 'contactUs', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Statistical Highlights</h4>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Divisions Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.divisions || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'divisions')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Divisions Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.divisions || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, divisions: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 8+"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Districts Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.districts || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'districts')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Districts Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.districts || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, districts: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 14"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Associates Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.associates || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'associates')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Associates Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.associates || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, associates: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 500+"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Sectors Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.sectors || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'sectors')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Sectors Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.sectors || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, sectors: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 10+"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: About Us */}
              {editingSection === 'about' && (
                <div className="section-form">
                  <h3>Edit About Us</h3>
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.label || ''}
                      onChange={(e) => handleTextChange('about', 'label', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].about.title || ''}
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
        value={sectionData[editLang].about.image || ''}
        onChange={(e) => handleTextChange('about', 'image', e.target.value)}
        placeholder="Paste image URL here"
        style={{ flex: 1 }}
      />
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about', 'image')} />
    </div>
                  </div>
                  <textarea
                      value={sectionData[editLang].about.subtitle || ''}
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
                      value={sectionData[editLang].about.history || ''}
                      onChange={(e) => handleTextChange('about', 'history', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>History Text</label>
                    <textarea
                      value={sectionData[editLang].about.historyText || ''}
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
                        value={sectionData[editLang].about.vision || ''}
                        onChange={(e) => handleTextChange('about', 'vision', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Vision Content</label>
                      <textarea
                        value={sectionData[editLang].about.visionText || ''}
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
                        value={sectionData[editLang].about.mission || ''}
                        onChange={(e) => handleTextChange('about', 'mission', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Mission Content</label>
                      <textarea
                        value={sectionData[editLang].about.missionText || ''}
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
                      value={sectionData[editLang].about.founderMsg || ''}
                      onChange={(e) => handleTextChange('about', 'founderMsg', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Management Person Name</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.founderName || ''}
                        onChange={(e) => handleTextChange('about', 'founderName', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Position Bio Title</label>
                      <input
                        type="text"
                        value={sectionData[editLang].about.founderNameTitle || 'Founder & Managing Partner'}
                        onChange={(e) => handleTextChange('about', 'founderNameTitle', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <h4>Timeline Milestones</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].about.timelineItems.map((item, idx) => (
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
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('about', 'timelineItems', idx, 'down')} disabled={idx === sectionData[editLang].about.timelineItems.length - 1}><ArrowDown size={12} /></button>
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
              )}

              {/* SECTION: Businesses */}
              {editingSection === 'businesses' && (
                <div className="section-form">
                  <h3>Edit Business Divisions</h3>
                  <div className="form-group">
                    <label>Section Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].businesses.title || ''}
                      onChange={(e) => handleTextChange('businesses', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].businesses.subtitle || ''}
                      onChange={(e) => handleTextChange('businesses', 'subtitle', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Divisions List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].businesses.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('businesses', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Division Name"
                          />
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'tag', e.target.value)}
                            className="form-control"
                            placeholder="Tag badge (e.g. Flagship)"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Short description (shown on card)"
                            rows={2}
                          />
                        </div>
                        <div className="form-group" style={{ marginTop: '10px' }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A2E5D' }}>📄 Learn More Details (Popup Content)</label>
                          <textarea
                            value={item.details || ''}
                            onChange={(e) => handleArrayItemChange('businesses', 'items', idx, 'details', e.target.value)}
                            className="form-control"
                            placeholder="Detailed description shown when user clicks 'Learn More'... Add paragraphs, features, etc."
                            rows={4}
                            style={{ marginTop: '6px' }}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'up')} disabled={idx === 0}><ArrowUp size={12} /></button>
                          <button className="nav-order-btn" onClick={() => handleMoveArrayItem('businesses', 'items', idx, 'down')} disabled={idx === sectionData[editLang].businesses.items.length - 1}><ArrowDown size={12} /></button>
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('businesses', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('businesses', 'items', {"name":"","tag":"","desc":"","details":""})}> + Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('businesses', 'items', { name: 'New Division', tag: 'New', desc: 'Description', details: '' })}>
                    <Plus size={14} /> Add Business Division
                  </button>
                </div>
              )}

              {/* SECTION: Why Choose Us */}
              {editingSection === 'whyChoose' && (
                <div className="section-form">
                  <h3>Edit Value Proposition</h3>
                  <div className="form-group">
                    <label>Main Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].whyChoose.title || ''}
                      onChange={(e) => handleTextChange('whyChoose', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Values List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].whyChoose.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('whyChoose', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Heading"
                          />
                          <input
                            type="text"
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('whyChoose', 'items', idx, 'desc', e.target.value)}
                            className="form-control"
                            placeholder="Summary description"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('whyChoose', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('whyChoose', 'items', {"title":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('whyChoose', 'items', { title: 'New Value', desc: 'Description' })}>
                    <Plus size={14} /> Add Proposition Value
                  </button>
                </div>
              )}

              {/* SECTION: Products & Services */}
              {editingSection === 'products' && (
                <div className="section-form">
                  <h3>Edit Products & Services Catalog</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={sectionData[editLang].products.title || ''}
                      onChange={(e) => handleTextChange('products', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Description</label>
                    <textarea
                      value={sectionData[editLang].products.subtitle || ''}
                      onChange={(e) => handleTextChange('products', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Category Divisions & Details</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].products.categories.map((cat, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Category Group Name"
                          />
                          <input
                            type="text"
                            value={cat.icon}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon Name (e.g. Sun, Zap)"
                          />
                        </div>
                        <div className="form-group">
                          <label>Comma-separated products</label>
                          <textarea
                            value={cat.items ? cat.items.join(', ') : ''}
                            onChange={(e) => handleArrayItemChange('products', 'categories', idx, 'items', e.target.value.split(',').map(s => s.trim()))}
                            className="form-control"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('products', 'categories', idx)}><Trash2 size={12} /> Remove Category</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('products', 'categories', { name: 'New Category', icon: 'Package', items: [] })}>
                    <Plus size={14} /> Add Product Category
                  </button>
                </div>
              )}

              {/* SECTION: Opportunities */}
              {editingSection === 'opportunities' && (
                <div className="section-form">
                  <h3>Edit Opportunities & Partnership Programs</h3>
                  <div className="form-group">
                    <label>Main Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].opportunities.title || ''}
                      onChange={(e) => handleTextChange('opportunities', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].opportunities.subtitle || ''}
                      onChange={(e) => handleTextChange('opportunities', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Partnership Models</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].opportunities.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('opportunities', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Partnership Name"
                          />
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon (e.g. Users)"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('opportunities', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Partnership terms details"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('opportunities', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('opportunities', 'items', {"name":"","icon":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('opportunities', 'items', { name: 'New Model', icon: 'Briefcase', desc: 'Opportunity terms details' })}>
                    <Plus size={14} /> Add Model Option
                  </button>
                </div>
              )}

              {/* SECTION: Software */}
              {editingSection === 'software' && (
                <div className="section-form">
                  <h3>Edit Software Products</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].software.title || ''}
                      onChange={(e) => handleTextChange('software', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].software.subtitle || ''}
                      onChange={(e) => handleTextChange('software', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Software Modules</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].software.items.map((item, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('software', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Module name"
                          />
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'icon', e.target.value)}
                            className="form-control"
                            placeholder="Lucide Icon Name"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('software', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-2"
                            placeholder="Module specs details"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('software', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('software', 'items', {"name":"","icon":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('software', 'items', { name: 'New Module', icon: 'Code', desc: 'Software details specs' })}>
                    <Plus size={14} /> Add Module Option
                  </button>
                </div>
              )}

              {/* SECTION: Network */}
              {editingSection === 'network' && (
                <div className="section-form">
                  <h3>Edit Kerala Network Stats</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].network.title || ''}
                      onChange={(e) => handleTextChange('network', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].network.subtitle || ''}
                      onChange={(e) => handleTextChange('network', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Stat Labels</h4>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Hubs Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.hubs || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'hubs')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Hubs Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.hubs || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), hubs: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Outlets Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.outlets || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'outlets')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Outlets Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.outlets || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), outlets: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Associates Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.associates || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'associates')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Associates Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.associates || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), associates: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Districts Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.districts || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'districts')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Districts Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.districts || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), districts: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                  </div>

                  <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Districts</h4>
                    <button 
                      className="admin-btn-outline" 
                      onClick={() => {
                        const defaultDistricts = [
                          { name: 'Thiruvananthapuram', hubs: 5, outlets: 18, associates: 42, coverage: 85 },
                          { name: 'Kollam', hubs: 3, outlets: 12, associates: 28, coverage: 70 },
                          { name: 'Pathanamthitta', hubs: 2, outlets: 8, associates: 15, coverage: 60 },
                          { name: 'Alappuzha', hubs: 3, outlets: 14, associates: 30, coverage: 65 },
                          { name: 'Kottayam', hubs: 4, outlets: 16, associates: 35, coverage: 75 },
                          { name: 'Idukki', hubs: 1, outlets: 5, associates: 12, coverage: 40 },
                          { name: 'Ernakulam', hubs: 8, outlets: 32, associates: 75, coverage: 95 },
                          { name: 'Thrissur', hubs: 6, outlets: 24, associates: 55, coverage: 85 },
                          { name: 'Palakkad', hubs: 4, outlets: 15, associates: 38, coverage: 70 },
                          { name: 'Malappuram', hubs: 5, outlets: 20, associates: 48, coverage: 75 },
                          { name: 'Kozhikode', hubs: 6, outlets: 22, associates: 50, coverage: 80 },
                          { name: 'Wayanad', hubs: 1, outlets: 4, associates: 10, coverage: 35 },
                          { name: 'Kannur', hubs: 4, outlets: 18, associates: 40, coverage: 70 },
                          { name: 'Kasaragod', hubs: 2, outlets: 10, associates: 22, coverage: 55 }
                        ];
                        setSectionData(prev => ({
                          ...prev,
                          [editLang]: {
                            ...prev[editLang],
                            network: {
                              ...prev[editLang].network,
                              districts: defaultDistricts
                            }
                          }
                        }));
                      }}
                    >
                      <RefreshCw size={14} style={{ marginRight: '5px' }} /> Restore 14 Districts
                    </button>
                  </div>
                  
                  <div className="array-items-list">
                    {(sectionData[editLang].network.districts || []).map((item, idx) => (
                      <div key={idx} className="array-item-row">
                        <div className="array-fields-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                          <select
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                          >
                            <option value="">Select District...</option>
                            {[
                              'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 
                              'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 
                              'Wayanad', 'Kannur', 'Kasaragod'
                            ].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={item.hubs}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'hubs', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Hubs"
                          />
                          <input
                            type="number"
                            value={item.outlets}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'outlets', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Outlets"
                          />
                          <input
                            type="number"
                            value={item.associates}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'associates', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Associates"
                          />
                          <input
                            type="number"
                            value={item.coverage}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'coverage', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Coverage %"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('network', 'districts', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="secondary-action-btn" onClick={() => handleAddArrayItem('network', 'districts', { name: 'New District', hubs: 1, outlets: 1, associates: 1, coverage: 10 })}>
                      <Plus size={14} /> Add District
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION: Investors */}
              {editingSection === 'investors' && (
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
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('investors', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Heading Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('investors', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-3"
                            placeholder="Guideline details description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('investors', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('investors', 'items', {"name":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('investors', 'items', { name: 'New Guideline', desc: 'Guideline terms details' })}>
                    <Plus size={14} /> Add Investor Item
                  </button>
                </div>
              )}

              {/* SECTION: Careers */}
              {editingSection === 'careers' && (
                <div className="section-form">
                  <h3>Edit Careers & Training</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].careers.title || ''}
                      onChange={(e) => handleTextChange('careers', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].careers.subtitle || ''}
                      onChange={(e) => handleTextChange('careers', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Active Open Job Openings</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].careers.jobs.map((job, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'jobs', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={job.dept}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'dept', e.target.value)}
                            className="form-control"
                            placeholder="Department"
                          />
                          <input
                            type="text"
                            value={job.location}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'location', e.target.value)}
                            className="form-control"
                            placeholder="Location"
                          />
                          <input
                            type="text"
                            value={job.type}
                            onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'type', e.target.value)}
                            className="form-control"
                            placeholder="e.g. Full-time / Open"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('careers', 'jobs', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'jobs', {"title":"","dept":"","location":"","type":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'jobs', { title: 'Sales Executive', dept: 'Sales', location: 'Kerala', type: 'Full-time' })}>
                    <Plus size={14} /> Add Job Opening
                  </button>

                  <h4 style={{ marginTop: '30px' }}>Internships</h4>
                  <div className="array-items-list">
                    {(sectionData[editLang].careers.internships || []).map((internship, idx) => (
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'internships', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={internship.title}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Internship Title"
                          />
                          <input
                            type="text"
                            value={internship.dept}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'dept', e.target.value)}
                            className="form-control"
                            placeholder="Department"
                          />
                          <input
                            type="text"
                            value={internship.duration}
                            onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'duration', e.target.value)}
                            className="form-control"
                            placeholder="Duration (e.g. 3 Months)"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('careers', 'internships', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'internships', {"title":"","dept":"","duration":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'internships', { title: 'Marketing Intern', dept: 'Marketing', duration: '3 Months' })}>
                    <Plus size={14} /> Add Internship
                  </button>

                  <h4 style={{ marginTop: '30px' }}>Training Programs</h4>
                  <div className="array-items-list">
                    {(sectionData[editLang].careers.training || []).map((training, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('careers', 'training', idx)}>Remove Item</button>
                        <div className="form-group">
                          <input
                            type="text"
                            value={training.title}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'title', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Training Title"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            value={training.desc}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'desc', e.target.value)}
                            className="form-control"
                            placeholder="Description"
                            rows={2}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="checkbox"
                            checked={!!training.certification}
                            onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'certification', e.target.checked)}
                          />
                          <label style={{ margin: 0 }}>Offers Certification</label>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('careers', 'training', {"title":"","desc":"","certification":false})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('careers', 'training', { title: 'New Training', desc: 'Training details', certification: true })}>
                    <Plus size={14} /> Add Training Program
                  </button>
                </div>
              )}

              {/* SECTION: News & Events */}
              {editingSection === 'news' && (
                <div className="section-form">
                  <h3>Edit News & Events Articles</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].news.title || ''}
                      onChange={(e) => handleTextChange('news', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].news.subtitle || ''}
                      onChange={(e) => handleTextChange('news', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>News Articles</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].news.items.map((item, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('news', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'title', e.target.value)}
                            className="form-control font-bold col-span-2"
                            placeholder="Article Title"
                          />
                          <input
                            type="text"
                            value={item.cat}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'cat', e.target.value)}
                            className="form-control"
                            placeholder="Category"
                          />
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'date', e.target.value)}
                            className="form-control"
                            placeholder="Date stamp"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            value={item.excerpt}
                            onChange={(e) => handleArrayItemChange('news', 'items', idx, 'excerpt', e.target.value)}
                            className="form-control"
                            placeholder="Excerpt summary details text"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('news', 'items', idx)}><Trash2 size={12} /> Remove Article</button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('news', 'items', {"title":"","cat":"","date":"","excerpt":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('news', 'items', { title: 'New Article', cat: 'News', date: 'August 2026', excerpt: 'Details summary' })}>
                    <Plus size={14} /> Add News Article
                  </button>
                </div>
              )}

              {/* SECTION: Gallery */}
              {editingSection === 'gallery' && (
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
              )}

              {/* SECTION: Downloads */}
              {editingSection === 'downloads' && (
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
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('downloads', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Document label"
                          />
                          <input
                            type="text"
                            value={item.type}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'type', e.target.value)}
                            className="form-control"
                            placeholder="File format (e.g. PDF)"
                          />
                          <input
                            type="text"
                            value={item.size}
                            onChange={(e) => handleArrayItemChange('downloads', 'items', idx, 'size', e.target.value)}
                            className="form-control"
                            placeholder="Size size (e.g. 1.2 MB)"
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
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
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('downloads', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('downloads', 'items', {"name":"","type":"","size":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('downloads', 'items', { name: 'New Doc Catalog', type: 'PDF', size: '1.0 MB' })}>
                    <Plus size={14} /> Add Download Item
                  </button>
                </div>
              )}

              {/* SECTION: Testimonials */}
              {editingSection === 'testimonials' && (
                <div className="section-form">
                  <h3>Edit Client & Partner Testimonials</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].testimonials.title || ''}
                      onChange={(e) => handleTextChange('testimonials', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Testimonials Feedback List</h4>
                  <div className="array-items-list">
                    {sectionData[editLang].testimonials.items.map((item, idx) => (
                      <div key={idx} className="array-item-row no-flex-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('testimonials', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid mb-10">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Person Name"
                          />
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'role', e.target.value)}
                            className="form-control"
                            placeholder="Role description"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'category', e.target.value)}
                            className="form-control"
                          >
                            <option value="Customers">Customers</option>
                            <option value="Associates">Associates</option>
                            <option value="Dealers">Dealers</option>
                            <option value="Investors">Investors</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <textarea
                            value={item.text}
                            onChange={(e) => handleArrayItemChange('testimonials', 'items', idx, 'text', e.target.value)}
                            className="form-control"
                            placeholder="Feedback message text content"
                            rows={2}
                          />
                        </div>
                        <div className="array-actions justify-end">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('testimonials', 'items', idx)}><Trash2 size={12} /> Remove Testimonial</button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('testimonials', 'items', {"name":"","role":"","category":"All","text":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('testimonials', 'items', { name: 'Customer Name', role: 'Partner', text: 'Feedback reviews details', category: 'Customers' })}>
                    <Plus size={14} /> Add Testimonial Item
                  </button>
                </div>
              )}

              {/* SECTION: CSR */}
              {editingSection === 'csr' && (
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
                      <div key={idx} className="array-item-row">
                          <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red', marginBottom: '10px'}} onClick={() => handleDeleteArrayItem('csr', 'items', idx)}>Remove Item</button>
                        <div className="array-fields-grid">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                            placeholder="Program Title"
                          />
                          <textarea
                            value={item.desc}
                            onChange={(e) => handleArrayItemChange('csr', 'items', idx, 'desc', e.target.value)}
                            className="form-control col-span-3"
                            placeholder="Campaign program details description"
                            rows={1}
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('csr', 'items', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn" style={{marginTop: '10px'}} onClick={() => handleAddArrayItem('csr', 'items', {"name":"","desc":""})}>+ Add New</button>
                  </div>
                  <button className="secondary-action-btn" onClick={() => handleAddArrayItem('csr', 'items', { name: 'New Initiative', desc: 'Campaign description details' })}>
                    <Plus size={14} /> Add Campaign Initiative
                  </button>
                </div>
              )}

              {/* SECTION: Contact Info */}
              {editingSection === 'contact' && (
                <div className="section-form">
                  <h3>Edit Office Contact Details</h3>
                  <div className="form-group">
                    <label>Subheading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].contact.title || ''}
                      onChange={(e) => handleTextChange('contact', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Office Address text block</label>
                    <textarea
                      value={sectionData[editLang].contact.address || ''}
                      onChange={(e) => handleTextChange('contact', 'address', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Telephone Number</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.phone || ''}
                        onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={sectionData[editLang].contact.email || ''}
                        onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>WhatsApp Number</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.whatsapp || ''}
                        onChange={(e) => handleTextChange('contact', 'whatsapp', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Google Maps Embed URL (src)</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.mapUrl || ''}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.includes('<iframe') && val.includes('src="')) {
                            const match = val.match(/src="([^"]+)"/);
                            if (match && match[1]) {
                              val = match[1];
                            }
                          }
                          handleTextChange('contact', 'mapUrl', val);
                        }}
                        className="form-control"
                        placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                      />
                      <small style={{display: 'block', marginTop: '5px', color: '#666', fontSize: '11px', lineHeight: '1.4'}}>
                        <strong>Note:</strong> Standard share links (maps.app.goo.gl) will NOT work. To get the correct link:<br/>
                        1. Open the location in Google Maps on your computer.<br/>
                        2. Click <strong>"Share"</strong> &gt; <strong>"Embed a map"</strong>.<br/>
                        3. Click <strong>"Copy HTML"</strong> and paste it here (we will automatically extract the link for you).
                      </small>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: Footer */}
              {editingSection === 'footer' && (
                <div className="section-form">
                  <h3>Edit Footer Social Links</h3>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Facebook URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.facebook || ''}
                        onChange={(e) => handleTextChange('footer', 'facebook', e.target.value)}
                        className="form-control"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Instagram URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.instagram || ''}
                        onChange={(e) => handleTextChange('footer', 'instagram', e.target.value)}
                        className="form-control"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Twitter / X URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.twitter || ''}
                        onChange={(e) => handleTextChange('footer', 'twitter', e.target.value)}
                        className="form-control"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>LinkedIn URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.linkedin || ''}
                        onChange={(e) => handleTextChange('footer', 'linkedin', e.target.value)}
                        className="form-control"
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>YouTube URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.youtube || ''}
                        onChange={(e) => handleTextChange('footer', 'youtube', e.target.value)}
                        className="form-control"
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>
                  
                  <h4>Footer Labels</h4>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Quick Links Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.quickLinks || ''}
                        onChange={(e) => handleTextChange('footer', 'quickLinks', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Legal Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.legal || ''}
                        onChange={(e) => handleTextChange('footer', 'legal', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Contact Us Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.connect || ''}
                        onChange={(e) => handleTextChange('footer', 'connect', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Privacy Policy Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.privacy || ''}
                        onChange={(e) => handleTextChange('footer', 'privacy', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Terms Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.terms || ''}
                        onChange={(e) => handleTextChange('footer', 'terms', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Refund Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.refund || ''}
                        onChange={(e) => handleTextChange('footer', 'refund', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Disclaimer Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.disclaimer || ''}
                        onChange={(e) => handleTextChange('footer', 'disclaimer', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Copyright Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].footer.copyright || ''}
                      onChange={(e) => handleTextChange('footer', 'copyright', e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
  );
}
