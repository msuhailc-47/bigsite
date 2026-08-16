import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  LayoutDashboard, Menu, Plus, Trash2, ArrowUp, ArrowDown, Save, FileText, Image,
  Inbox, Code, Shield, LogOut, Globe, Edit3, X, ChevronRight, Store, HardHat,
  Waves, Heart, Award, Leaf, Zap, Droplets, Wrench, Lightbulb,
  ShieldAlert, FileDown, CheckCircle, Upload, RefreshCw, Palette, Eye, EyeOff
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    translationsData,
    navigation,
    mediaLibrary,
    submissions,
    codeSettings,
    userRole,
    setNavigation,
    setUserRole,
    updateTranslations,
    updateTheme,
    addMedia,
    deleteMedia,
    saveCodeSettings,
    rollbackCodeSettings,
    resetAll,
    exportCMSData,
    importCMSData,
    themeSettings,
    sectionVisibility,
    toggleSectionVisibility
  } = useCMS();

  const [editLang, setEditLang] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSection, setEditingSection] = useState('hero');

  // Input states for form fields
  const [sectionData, setSectionData] = useState(() => {
    return JSON.parse(JSON.stringify(translationsData));
  });

  // Local navigation state for builder
  const [navItems, setNavItems] = useState([...navigation]);
  const [newNavItem, setNewNavItem] = useState({ label: '', path: '' });

  // Code settings local state
  const [customHtml, setCustomHtml] = useState(codeSettings.customHtml);
  const [customCss, setCustomCss] = useState(codeSettings.customCss);
  const [customJs, setCustomJs] = useState(codeSettings.customJs);
  const [headerScripts, setHeaderScripts] = useState(codeSettings.headerScripts);
  const [footerScripts, setFooterScripts] = useState(codeSettings.footerScripts);

  // Status notifications
  const [notification, setNotification] = useState('');
  
  // Theme settings local state
  const [themeData, setThemeData] = useState(() => JSON.parse(JSON.stringify(themeSettings)));

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Convert Google Drive view links to direct image links
  const convertDriveUrl = (url) => {
    if (!url) return url;
    try {
      const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    } catch (err) {
      console.error('Error converting Drive URL:', err);
    }
    return url;
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
    triggerNotification(`Role changed to ${e.target.value}`);
  };

  const isReadOnly = userRole === 'Viewer';
  const canManageCode = userRole === 'Super Admin';

  // Handle section text updates
  const handleTextChange = (section, key, value, nestedKey = null) => {
    if (typeof value === 'string' && value.includes('drive.google.com/file/d/')) value = convertDriveUrl(value);
    if (isReadOnly) return;
    setSectionData(prev => {
      const copy = { ...prev };
      if (nestedKey) {
        copy[editLang][section][key] = {
          ...copy[editLang][section][key],
          [nestedKey]: value
        };
      } else {
        copy[editLang][section][key] = value;
      }
      return copy;
    });
  };

  // Handle item array updates (cards, timeline, list items)
  const handleArrayItemChange = (section, arrayName, index, field, value) => {
    if (typeof value === 'string' && value.includes('drive.google.com/file/d/')) value = convertDriveUrl(value);
    if (isReadOnly) return;
    setSectionData(prev => {
      const copy = { ...prev };
      const arr = [...copy[editLang][section][arrayName]];
      if (typeof arr[index] === 'object') {
        arr[index] = { ...arr[index], [field]: value };
      } else if (field) {
        // Convert old plain-string item to an object, keeping the string as 'title'
        arr[index] = { title: arr[index] || '', [field]: value };
      } else {
        arr[index] = value;
      }
      copy[editLang][section][arrayName] = arr;
      return copy;
    });
  };

  // Add array item
  const handleAddArrayItem = (section, arrayName, newItemTemplate) => {
    if (isReadOnly) return;
    setSectionData(prev => {
      const copy = { ...prev };
      const arr = [...copy[editLang][section][arrayName]];
      arr.push(newItemTemplate);
      copy[editLang][section][arrayName] = arr;
      return copy;
    });
  };

  // Delete array item
  const handleDeleteArrayItem = (section, arrayName, index) => {
    if (isReadOnly) return;
    setSectionData(prev => {
      const copy = { ...prev };
      const arr = [...copy[editLang][section][arrayName]];
      arr.splice(index, 1);
      copy[editLang][section][arrayName] = arr;
      return copy;
    });
  };

  // Reorder array items
  const handleMoveArrayItem = (section, arrayName, index, direction) => {
    if (isReadOnly) return;
    setSectionData(prev => {
      const copy = { ...prev };
      const arr = [...copy[editLang][section][arrayName]];
      if (direction === 'up' && index > 0) {
        const temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
      } else if (direction === 'down' && index < arr.length - 1) {
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
      }
      copy[editLang][section][arrayName] = arr;
      return copy;
    });
  };

  // Save changes to CMS Context
  const handleSaveChanges = () => {
    if (isReadOnly) {
      alert("You have Viewer permissions and cannot modify content.");
      return;
    }
    updateTranslations(sectionData);
    setNavigation(navItems);
    triggerNotification("All content changes saved successfully!");
  };

  const handleSaveTheme = () => {
    if (isReadOnly) {
      alert("You have Viewer permissions and cannot modify theme.");
      return;
    }
    updateTheme(themeData);
    triggerNotification("Theme and Animation settings saved successfully!");
  };

  // Navigation management
  const addNavItem = () => {
    if (!newNavItem.label || !newNavItem.path || isReadOnly) return;
    const newItem = { id: newNavItem.label.toLowerCase().replace(/\s+/g, '-'), ...newNavItem };
    setNavItems(prev => [...prev, newItem]);
    setNewNavItem({ label: '', path: '' });
  };

  const deleteNavItem = (id) => {
    if (isReadOnly) return;
    setNavItems(prev => prev.filter(item => item.id !== id));
  };

  const moveNavItem = (index, direction) => {
    if (isReadOnly) return;
    const copy = [...navItems];
    if (direction === 'up' && index > 0) {
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
    } else if (direction === 'down' && index < copy.length - 1) {
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
    }
    setNavItems(copy);
  };

  
  // Master File Upload Handler (Firebase Storage)
  const handleFileUpload = async (e, section, key, arrayName = null, index = null, nestedKey = null) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      triggerNotification("Uploading image...");
      const fileRef = ref(storage, 'dorek/' + Date.now() + '_' + file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      if (arrayName !== null && index !== null) {
        handleArrayItemChange(section, arrayName, index, key, downloadURL);
      } else {
        handleTextChange(section, key, downloadURL, nestedKey);
      }
      triggerNotification("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      triggerNotification("Failed to upload image. Is Firebase Storage configured?");
    }
  };

  // Media upload handler (Firebase Storage)
  const handleMediaUpload = async (e) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      triggerNotification("Uploading media to library...");
      const fileRef = ref(storage, 'media/' + Date.now() + '_' + file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const newFile = {
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: downloadURL
      };
      addMedia(newFile);
      triggerNotification("Media file added to library!");
    } catch (error) {
      console.error("Error uploading media: ", error);
      triggerNotification("Failed to upload media.");
    }
  };


  // Save Advanced scripts
  const handleSaveCodeSettings = () => {
    if (!canManageCode) {
      alert("Super Admin permissions required to save custom scripts.");
      return;
    }
    saveCodeSettings({
      customHtml,
      customCss,
      customJs,
      headerScripts,
      footerScripts
    });
    triggerNotification("Custom scripts saved and applied!");
  };

  // Restore backup file
  const handleJSONImport = (e) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importCMSData(event.target.result);
      if (success) {
        setSectionData(JSON.parse(localStorage.getItem('dorek_cms_translations')));
        setNavItems(JSON.parse(localStorage.getItem('dorek_cms_navigation')));
        triggerNotification("Configuration imported successfully!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Globe className="admin-logo-icon" size={24} />
          <div>
            <h2>Dorek CMS</h2>
            <span>Official Admin Panel</span>
          </div>
        </div>

        <div className="admin-user-info">
          <Shield className="admin-user-icon" size={18} />
          <div>
            <span className="admin-role-label">Active Role:</span>
            <select value={userRole} onChange={handleRoleChange} className="admin-role-select">
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer (Read-Only)</option>
            </select>
          </div>
        </div>

        <nav className="admin-menu">
          <button className={`admin-menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> Dashboard Overview
          </button>
          <button className={`admin-menu-item ${activeTab === 'navigation' ? 'active' : ''}`} onClick={() => setActiveTab('navigation')}>
            <Menu size={18} /> Navigation Menus
          </button>
          <button className={`admin-menu-item ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>
            <FileText size={18} /> Page Content
          </button>
          <button className={`admin-menu-item ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <Image size={18} /> Media Library
          </button>
          <button className={`admin-menu-item ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>
            <Inbox size={18} /> Form Submissions ({submissions.length})
          </button>
          <button className={`admin-menu-item ${activeTab === 'customSections' ? 'active' : ''}`} onClick={() => setActiveTab('customSections')}>
            <FileText size={18} /> Custom Sections
          </button>
          <button className={`admin-menu-item ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
            <Code size={18} /> Code Settings
          </button>
          <button className={`admin-menu-item ${activeTab === 'theme' ? 'active' : ''}`} onClick={() => setActiveTab('theme')}>
            <Palette size={18} /> Theme & Animations
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-back-btn" onClick={() => navigate('/')}>
            <LogOut size={16} /> Exit Panel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager</h1>
            <p>Admin panel designed strictly in Dorek Premium Palette</p>
          </div>

          <div className="admin-header-right">
            <div className="lang-toggle-container">
              <button className={`lang-btn ${editLang === 'en' ? 'active' : ''}`} onClick={() => setEditLang('en')}>English</button>
              <button className={`lang-btn ${editLang === 'ml' ? 'active' : ''}`} onClick={() => setEditLang('ml')}>Malayalam</button>
            </div>

            <button className="save-btn" onClick={handleSaveChanges} disabled={isReadOnly}>
              <Save size={16} /> Save Edits
            </button>
          </div>
        </header>

        {notification && (
          <div className="cms-notification">
            <CheckCircle size={18} /> {notification}
          </div>
        )}

        {isReadOnly && (
          <div className="cms-warning-banner">
            <ShieldAlert size={18} />
            <span>Viewer Mode: You have read-only permissions. Changes cannot be saved.</span>
          </div>
        )}

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="admin-panel-card animate-fadeIn">
            <h3>Overview & Dashboard</h3>
            <div className="overview-stats-grid">
              <div className="stat-card">
                <h4>System Role</h4>
                <div className="stat-value text-gold">{userRole}</div>
                <p>Edit restrictions apply dynamically</p>
              </div>
              <div className="stat-card">
                <h4>Form Inquiries</h4>
                <div className="stat-value">{submissions.length}</div>
                <p>Messages from Contact Forms</p>
              </div>
              <div className="stat-card">
                <h4>Media Assets</h4>
                <div className="stat-value">{mediaLibrary.length}</div>
                <p>Images and documents uploaded</p>
              </div>
              <div className="stat-card">
                <h4>Navigation Items</h4>
                <div className="stat-value">{navItems.length}</div>
                <p>Active items in Header navbar</p>
              </div>
            </div>

            <div className="overview-actions-section">
              <h3>CMS Backup & Operations</h3>
              <p>You can back up all your configuration or import a saved backup JSON file directly.</p>
              <div className="overview-actions-btns">
                <button className="secondary-action-btn" onClick={exportCMSData}>
                  <FileDown size={16} /> Export Backup JSON
                </button>
                <label className="secondary-action-btn file-picker-label">
                  <Upload size={16} /> Import JSON Config
                  <input type="file" accept=".json" onChange={handleJSONImport} style={{ display: 'none' }} />
                </label>
                <button className="danger-action-btn" onClick={resetAll} disabled={isReadOnly}>
                  <RefreshCw size={16} /> Reset Default Code State
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Navigation Builder */}
        {activeTab === 'navigation' && (
          <div className="admin-panel-card animate-fadeIn">
            <h3>Navigation Menu Items</h3>
            <p className="section-description">Manage main header items. Drag-and-drop hierarchy mock with ordering controls.</p>

            <div className="nav-builder-grid">
              <div className="nav-items-list">
                {navItems.map((item, idx) => (
                  <div key={item.id} className="nav-item-row">
                    <div className="nav-item-details">
                      <span className="nav-item-label">{item.label}</span>
                      <span className="nav-item-path">{item.path}</span>
                    </div>
                    <div className="nav-item-actions">
                      <button className="nav-order-btn" onClick={() => moveNavItem(idx, 'up')} disabled={idx === 0}><ArrowUp size={14} /></button>
                      <button className="nav-order-btn" onClick={() => moveNavItem(idx, 'down')} disabled={idx === navItems.length - 1}><ArrowDown size={14} /></button>
                      <button className="nav-delete-btn" onClick={() => deleteNavItem(item.id)} disabled={isReadOnly}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="nav-add-form">
                <h4>Add New Menu Item</h4>
                <div className="form-group">
                  <label>Menu Label</label>
                  <input
                    type="text"
                    value={newNavItem.label}
                    onChange={(e) => setNewNavItem(prev => ({ ...prev, label: e.target.value }))}
                    className="form-control"
                    placeholder="e.g. Services"
                  />
                </div>
                <div className="form-group">
                  <label>Section Path / ID Anchor</label>
                  <input
                    type="text"
                    value={newNavItem.path}
                    onChange={(e) => setNewNavItem(prev => ({ ...prev, path: e.target.value }))}
                    className="form-control"
                    placeholder="e.g. #services"
                  />
                </div>
                <button className="primary-action-btn" onClick={addNavItem} disabled={isReadOnly}>
                  <Plus size={16} /> Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pages & Sections */}
        {activeTab === 'pages' && (
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
        )}

        {/* Tab 4: Media Library */}
        {activeTab === 'media' && (
          <div className="admin-panel-card animate-fadeIn">
            <h3>CMS Media Assets</h3>
            <p className="section-description">Central library to upload and reference image assets. Supported formats: JPG, PNG, WEBP, SVG.</p>

            <div className="media-uploader-box">
              <label className="uploader-picker-btn">
                <Upload size={18} /> Choose File to Upload
                <input type="file" accept="image/*,application/pdf" onChange={handleMediaUpload} style={{ display: 'none' }} />
              </label>
              <span>Base64 parser converts file to local persistent URLs</span>
            </div>

            <div className="media-library-grid">
              {mediaLibrary.length === 0 ? (
                <div className="media-empty-state">
                  <Image size={40} className="empty-state-icon" />
                  <p>No media files uploaded yet. Add images above.</p>
                </div>
              ) : (
                mediaLibrary.map((file, idx) => (
                  <div key={idx} className="media-item-card">
                    <div className="media-preview-container">
                      {file.type.startsWith('image/') ? (
                        <img src={file.url} alt={file.name} className="media-preview-img" />
                      ) : (
                        <div className="media-doc-preview">📄 PDF</div>
                      )}
                    </div>
                    <div className="media-item-info">
                      <span className="media-name">{file.name}</span>
                      <span className="media-size">{file.size}</span>
                      <div className="media-actions-row">
                        <button className="media-copy-btn" onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          triggerNotification("URL copied to clipboard!");
                        }}>Copy Base64 URL</button>
                        <button className="media-trash-btn" onClick={() => deleteMedia(file.name)} disabled={isReadOnly}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Form Submissions */}
        {activeTab === 'submissions' && (
          <div className="admin-panel-card animate-fadeIn">
            <h3>Contact Form Messages</h3>
            <p className="section-description">View active message submissions sent by website visitors.</p>

            <div className="submissions-list">
              {submissions.length === 0 ? (
                <div className="submissions-empty">
                  <Inbox size={40} className="empty-state-icon" />
                  <p>No submissions found. Feedbacks will appear here.</p>
                </div>
              ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className="submission-detail-card">
                    <div className="submission-card-header">
                      <div className="sender-meta">
                        <h4>{sub.name}</h4>
                        <span>{sub.email} | {sub.phone || 'No phone'}</span>
                      </div>
                      <span className="submission-date">{sub.date}</span>
                    </div>
                    <div className="submission-card-body">
                      <strong>Subject: {sub.subject}</strong>
                      <p>{sub.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        
        {/* Tab: Custom Sections */}
        {activeTab === 'customSections' && (
          <div className="admin-panel-card animate-fadeIn">
            <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2>Dynamic Custom Sections</h2>
                <p>Build and manage entirely new sections for the website.</p>
              </div>
              <button className="admin-btn" onClick={() => {
                const newSection = {
                  id: 'custom-section-' + Date.now(),
                  label: 'New Section',
                  title: 'Custom Content',
                  subtitle: '',
                  text: 'Add your content here...',
                  image: '',
                  backgroundColor: '#ffffff',
                  textColor: '#0A2E5D'
                };
                const currentSections = sectionData[editLang].customSections || [];
                setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: [...currentSections, newSection] } }));
              }}>
                + Create New Section
              </button>
            </div>

            <div className="array-items-list">
              {(sectionData[editLang].customSections || []).map((section, idx) => (
                <div key={section.id || idx} className="array-item-row" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
                  <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h3>Section {idx + 1}: {section.label} <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal', marginLeft: '10px' }}>(Use Path: <strong>#{section.id || `custom-section-${idx}`}</strong> in Navigation)</span></h3>
                    <button className="admin-btn-outline" style={{borderColor: 'red', color: 'red'}} onClick={() => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated.splice(idx, 1);
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                    }}>Delete Section</button>
                  </div>

                  <div className="form-group">
                    <label>Label / Badge text</label>
                    <input type="text" className="form-control" value={section.label || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].label = e.target.value;
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                    }} />
                  </div>
                  
                  <div className="form-group">
                    <label>Main Title</label>
                    <input type="text" className="form-control" value={section.title || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].title = e.target.value;
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Subtitle</label>
                    <input type="text" className="form-control" value={section.subtitle || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].subtitle = e.target.value;
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Content (Text / HTML)</label>
                    <textarea className="form-control" rows="5" value={section.text || ''} onChange={(e) => {
                      const updated = [...(sectionData[editLang].customSections || [])];
                      updated[idx].text = e.target.value;
                      setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                    }} />
                  </div>

                  <div className="form-group">
                    <label>Side Image</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" className="form-control" placeholder="Image URL" value={section.image || ''} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].image = e.target.value;
                        setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                      }} style={{ flex: 1 }} />
                      
                      {/* Simple file upload for custom section using the same handler if possible, but handleFileUpload expects field & idx.
                          Since customSections is an array of objects, we can write a custom inline handler for this file. */}
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        triggerNotification("Uploading image...");
                        const fileRef = ref(storage, 'custom/' + Date.now() + '_' + file.name);
                        uploadBytes(fileRef, file).then(() => {
                           return getDownloadURL(fileRef);
                        }).then((url) => {
                           const updated = [...(sectionData[editLang].customSections || [])];
                           updated[idx].image = url;
                           setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                           triggerNotification("Image uploaded!");
                        }).catch(err => {
                           console.error(err);
                           triggerNotification("Image upload failed");
                        });

                      }} />
                    </div>
                    {section.image && <img src={section.image} alt="preview" style={{width:'150px', marginTop:'10px', borderRadius:'8px'}} />}
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Background Color</label>
                      <input type="color" className="form-control" value={section.backgroundColor || '#ffffff'} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].backgroundColor = e.target.value;
                        setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                      }} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Text Color</label>
                      <input type="color" className="form-control" value={section.textColor || '#0A2E5D'} onChange={(e) => {
                        const updated = [...(sectionData[editLang].customSections || [])];
                        updated[idx].textColor = e.target.value;
                        setSectionData(prev => ({ ...prev, [editLang]: { ...prev[editLang], customSections: updated } }));
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Tab 6: Code Settings */}
        
          {activeTab === 'theme' && (
            <div className="admin-card">
              <h2>Theme & Animation Settings</h2>
              
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <h3>Global Colors</h3>
                  <div className="admin-form-group">
                    <label>Primary Color</label>
                    <input 
                      type="color" 
                      value={themeData.colors.primary} 
                      onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, primary: e.target.value } })} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Secondary Color (Gold Accent)</label>
                    <input 
                      type="color" 
                      value={themeData.colors.secondary} 
                      onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, secondary: e.target.value } })} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Background (e.g. #f8f9fa)</label>
                    <input 
                      type="color" 
                      value={themeData.colors.bgMain} 
                      onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, bgMain: e.target.value } })} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Section Background (e.g. #ffffff)</label>
                    <input 
                      type="color" 
                      value={themeData.colors.bgSection} 
                      onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, bgSection: e.target.value } })} 
                    />
                  </div>
                </div>

                <div style={{ flex: '1', minWidth: '300px' }}>
                  <h3>Section Animations</h3>
                  {Object.keys(themeData.animations).map(section => (
                    <div className="admin-form-group" key={section}>
                      <label style={{ textTransform: 'capitalize' }}>{section}</label>
                      <select 
                        value={themeData.animations[section]} 
                        onChange={(e) => setThemeData({ ...themeData, animations: { ...themeData.animations, [section]: e.target.value } })}
                      >
                        <option value="none">None</option>
                        <option value="fade-in">Fade In</option>
                        <option value="slide-up">Slide Up</option>
                        <option value="zoom-in">Zoom In</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-form-actions" style={{ marginTop: '2rem' }}>
                <button className="admin-btn-primary" onClick={handleSaveTheme}>Save Theme Settings</button>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
          <div className="admin-panel-card animate-fadeIn">
            <h3>Advanced Code Settings</h3>
            <p className="section-description">Inject custom tracking scripts, CSS overrides, or HTML modules to customize layout.</p>

            {!canManageCode && (
              <div className="cms-warning-banner mb-20">
                <ShieldAlert size={18} />
                <span>Super Admin Role required to override HTML/CSS/JS configurations.</span>
              </div>
            )}

            <div className="code-editor-group">
              <div className="form-group">
                <label>Custom Overriding CSS Styles</label>
                <textarea
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  className="form-control code-textarea"
                  placeholder="e.g. h1 { font-size: 3rem; }"
                  rows={4}
                  disabled={!canManageCode}
                />
              </div>

              <div className="form-group">
                <label>Custom JavaScript Script Execution</label>
                <textarea
                  value={customJs}
                  onChange={(e) => setCustomJs(e.target.value)}
                  className="form-control code-textarea"
                  placeholder="console.log('CMS Custom JS Running');"
                  rows={4}
                  disabled={!canManageCode}
                />
              </div>

              <div className="form-group">
                <label>Header Scripts (Injected in Head Tag)</label>
                <textarea
                  value={headerScripts}
                  onChange={(e) => setHeaderScripts(e.target.value)}
                  className="form-control code-textarea"
                  placeholder="<!-- Google Analytics tag script -->"
                  rows={3}
                  disabled={!canManageCode}
                />
              </div>

              <div className="form-group">
                <label>Footer Scripts (Injected in Body Tag)</label>
                <textarea
                  value={footerScripts}
                  onChange={(e) => setFooterScripts(e.target.value)}
                  className="form-control code-textarea"
                  placeholder="<!-- External chat widget scripts -->"
                  rows={3}
                  disabled={!canManageCode}
                />
              </div>

              <button className="primary-action-btn" onClick={handleSaveCodeSettings} disabled={!canManageCode}>
                <Save size={16} /> Save and Apply Scripts
              </button>
            </div>

            {/* Version rollback history */}
            <div className="code-history-section mt-30">
              <h3>Script Rollback Version History</h3>
              <p>Select a previously saved version to restore settings.</p>
              {codeSettings.history && codeSettings.history.length > 0 ? (
                <div className="history-logs-list">
                  {codeSettings.history.map((hist, idx) => (
                    <div key={idx} className="history-row">
                      <span>Saved timestamp: {hist.timestamp}</span>
                      <button className="rollback-btn" onClick={() => {
                        if (window.confirm("Roll back custom scripts to this saved state?")) {
                          rollbackCodeSettings(hist.settings);
                          setCustomHtml(hist.settings.customHtml);
                          setCustomCss(hist.settings.customCss);
                          setCustomJs(hist.settings.customJs);
                          setHeaderScripts(hist.settings.headerScripts);
                          setFooterScripts(hist.settings.footerScripts);
                          triggerNotification("Scripts rolled back to historical version!");
                        }
                      }} disabled={!canManageCode}>
                        <RefreshCw size={14} /> Rollback
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="history-empty">No script history saved yet.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
