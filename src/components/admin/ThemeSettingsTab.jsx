import React from 'react';

export default function ThemeSettingsTab({
  themeData,
  setThemeData,
  handleSaveTheme
}) {
  return (
    <div className="admin-card animate-fadeIn">
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
  );
}
