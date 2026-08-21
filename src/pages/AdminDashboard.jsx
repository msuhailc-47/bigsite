import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  LayoutDashboard, Menu, Plus, Trash2, ArrowUp, ArrowDown, Save, FileText, Image,
  Inbox, Code, Shield, LogOut, Globe, Edit3, X, ChevronRight, Store, HardHat,
  Waves, Heart, Award, Leaf, Zap, Droplets, Wrench, Lightbulb,
  ShieldAlert, FileDown, CheckCircle, Upload, RefreshCw, Palette, Eye, EyeOff, Loader
} from 'lucide-react';
import NavigationTab from '../components/admin/NavigationTab';
import ThemeSettingsTab from '../components/admin/ThemeSettingsTab';
import MediaLibraryTab from '../components/admin/MediaLibraryTab';
import SubmissionsTab from '../components/admin/SubmissionsTab';
import CustomSectionsTab from '../components/admin/CustomSectionsTab';
import CodeSettingsTab from '../components/admin/CodeSettingsTab';
import ContentEditorTab from '../components/admin/ContentEditorTab';
import OverviewTab from '../components/admin/OverviewTab';
import { optimizeImage } from '../utils/imageOptimizer';
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
    deleteSubmission,
    markSubmissionRead,
    markAllSubmissionsRead,
    saveCodeSettings,
    rollbackCodeSettings,
    resetAll,
    exportCMSData,
    importCMSData,
    themeSettings,
    sectionVisibility,
    toggleSectionVisibility,
    isSyncing
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

  // Status notifications and loading
  const [notification, setNotification] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
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
      if (!copy[editLang][section]) copy[editLang][section] = {};
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

  const validateSectionData = (section, data) => {
    switch (section) {
      case 'hero':
        if (!data.tagline?.trim()) {
          triggerNotification("Error: Hero Tagline is required.");
          return false;
        }
        if (!data.getStarted?.trim()) {
          triggerNotification("Error: Primary CTA Button Text is required.");
          return false;
        }
        break;
      case 'about':
        if (!data.title?.trim()) {
          triggerNotification("Error: About Us Title is required.");
          return false;
        }
        break;
      case 'businesses':
        if (!data.title?.trim()) {
          triggerNotification("Error: Businesses Section Title is required.");
          return false;
        }
        if (data.items && data.items.some(item => !item.title?.trim())) {
          triggerNotification("Error: All Business Items must have a title.");
          return false;
        }
        break;
      default:
        if (data.title !== undefined && !data.title?.trim()) {
          triggerNotification(`Error: ${section} Title is required.`);
          return false;
        }
    }
    return true;
  };

  // Save changes to CMS Context
  const handleSaveChanges = () => {
    if (isReadOnly) {
      alert("You have Viewer permissions and cannot modify content.");
      return;
    }
    
    if (activeTab === 'pages') {
      const isValid = validateSectionData(editingSection, sectionData[editLang][editingSection]);
      if (!isValid) return; 
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
      setIsUploading(true);
      triggerNotification("Optimizing and uploading image...");
      
      const optimizedFile = await optimizeImage(file, 1920, 0.8);
      
      const fileRef = ref(storage, 'dorek/' + Date.now() + '_' + optimizedFile.name);
      await uploadBytes(fileRef, optimizedFile);
      const downloadURL = await getDownloadURL(fileRef);

      if (arrayName !== null && index !== null) {
        handleArrayItemChange(section, arrayName, index, key, downloadURL);
      } else {
        handleTextChange(section, key, downloadURL, nestedKey);
      }
      triggerNotification("Image optimized and uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      triggerNotification("Failed to upload image. Is Firebase Storage configured?");
    } finally {
      setIsUploading(false);
    }
  };

  // Media upload handler (Firebase Storage)
  const handleMediaUpload = async (e) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      triggerNotification("Optimizing and uploading media...");
      
      const optimizedFile = await optimizeImage(file, 1920, 0.8);
      
      const fileRef = ref(storage, 'media/' + Date.now() + '_' + optimizedFile.name);
      await uploadBytes(fileRef, optimizedFile);
      const downloadURL = await getDownloadURL(fileRef);

      const newFile = {
        name: optimizedFile.name,
        type: optimizedFile.type,
        size: (optimizedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: downloadURL
      };
      addMedia(newFile);
      triggerNotification("Media file optimized and added to library!");
    } catch (error) {
      console.error("Error uploading media: ", error);
      triggerNotification("Failed to upload media.");
    } finally {
      setIsUploading(false);
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

            <button className="save-btn" onClick={handleSaveChanges} disabled={isReadOnly || isSyncing || isUploading}>
              {(isSyncing || isUploading) ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              {(isSyncing || isUploading) ? ' Saving...' : ' Save Edits'}
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
          <OverviewTab
            userRole={userRole}
            submissions={submissions}
            mediaLibrary={mediaLibrary}
            navItems={navItems}
            exportCMSData={exportCMSData}
            handleJSONImport={handleJSONImport}
            resetAll={resetAll}
            isReadOnly={isReadOnly}
          />
        )}

        {/* Tab 2: Navigation Builder */}
        {activeTab === 'navigation' && (
          <NavigationTab
            navItems={navItems}
            newNavItem={newNavItem}
            setNewNavItem={setNewNavItem}
            addNavItem={addNavItem}
            moveNavItem={moveNavItem}
            deleteNavItem={deleteNavItem}
            isReadOnly={isReadOnly}
          />
        )}

        {/* Tab 3: Pages & Sections */}
        {/* Tab 3: Pages & Sections */}
        {activeTab === 'pages' && (
          <ContentEditorTab
            editingSection={editingSection}
            setEditingSection={setEditingSection}
            sectionVisibility={sectionVisibility}
            toggleSectionVisibility={toggleSectionVisibility}
            sectionData={sectionData}
            setSectionData={setSectionData}
            editLang={editLang}
            handleTextChange={handleTextChange}
            handleFileUpload={handleFileUpload}
            handleArrayItemChange={handleArrayItemChange}
            handleAddArrayItem={handleAddArrayItem}
            handleDeleteArrayItem={handleDeleteArrayItem}
            handleMoveArrayItem={handleMoveArrayItem}
            triggerNotification={triggerNotification}
            navItems={navItems}
          />
        )}

        {/* Tab 4: Media Library */}
        {activeTab === 'media' && (
          <MediaLibraryTab
            mediaLibrary={mediaLibrary}
            handleMediaUpload={handleMediaUpload}
            deleteMedia={deleteMedia}
            isReadOnly={isReadOnly}
            triggerNotification={triggerNotification}
          />
        )}

        {/* Tab 5: Form Submissions */}
        {activeTab === 'submissions' && (
          <SubmissionsTab 
            submissions={submissions} 
            deleteSubmission={deleteSubmission}
            markSubmissionRead={markSubmissionRead} 
            markAllSubmissionsRead={markAllSubmissionsRead}
            themeSettings={themeSettings}
            updateThemeSettings={updateTheme}
          />
        )}

        
        {/* Tab: Custom Sections */}
        {activeTab === 'customSections' && (
          <CustomSectionsTab
            sectionData={sectionData}
            setSectionData={setSectionData}
            editLang={editLang}
            triggerNotification={triggerNotification}
          />
        )}


        {/* Tab 6: Code Settings */}
        
          {/* Tab 6: Theme Settings */}
          {activeTab === 'theme' && (
            <ThemeSettingsTab
              themeData={themeData}
              setThemeData={setThemeData}
              handleSaveTheme={handleSaveTheme}
            />
          )}

          {/* Tab: Code Settings */}
          {activeTab === 'code' && (
            <CodeSettingsTab
              canManageCode={canManageCode}
              customCss={customCss}
              setCustomCss={setCustomCss}
              customJs={customJs}
              setCustomJs={setCustomJs}
              headerScripts={headerScripts}
              setHeaderScripts={setHeaderScripts}
              footerScripts={footerScripts}
              setFooterScripts={setFooterScripts}
              handleSaveCodeSettings={handleSaveCodeSettings}
              codeSettings={codeSettings}
              rollbackCodeSettings={rollbackCodeSettings}
              setCustomHtml={setCustomHtml}
              triggerNotification={triggerNotification}
            />
          )}
      </main>
    </div>
  );
}
