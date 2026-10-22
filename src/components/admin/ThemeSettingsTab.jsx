import React from 'react';
import { Save } from 'lucide-react';

export default function ThemeSettingsTab({
  themeData,
  setThemeData,
  handleSaveTheme
}) {
  return (
    <div className="admin-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Theme & Animation Settings</h2>
        <button className="admin-btn-primary" onClick={handleSaveTheme} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Save size={16} /> Save Theme Settings
        </button>
      </div>

      {/* GLOBAL COLORS & SECTION ANIMATIONS */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3>Global Colors</h3>
          <div className="admin-form-group">
            <label>Primary Color</label>
            <input 
              type="color" 
              value={themeData.colors?.primary || '#0A2E5D'} 
              onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, primary: e.target.value } })} 
            />
          </div>
          <div className="admin-form-group">
            <label>Secondary Color (Gold Accent)</label>
            <input 
              type="color" 
              value={themeData.colors?.secondary || '#D4AF37'} 
              onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, secondary: e.target.value } })} 
            />
          </div>
          <div className="admin-form-group">
            <label>Main Background (e.g. #f8f9fa)</label>
            <input 
              type="color" 
              value={themeData.colors?.bgMain || '#f8f9fa'} 
              onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, bgMain: e.target.value } })} 
            />
          </div>
          <div className="admin-form-group">
            <label>Section Background (e.g. #ffffff)</label>
            <input 
              type="color" 
              value={themeData.colors?.bgSection || '#ffffff'} 
              onChange={(e) => setThemeData({ ...themeData, colors: { ...themeData.colors, bgSection: e.target.value } })} 
            />
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3>Section Animations</h3>
          {Object.keys(themeData.animations || {}).map(section => (
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
        <button className="admin-btn-primary" onClick={handleSaveTheme} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Save size={16} /> Save Theme Settings
        </button>
      </div>
    </div>
  );
}
