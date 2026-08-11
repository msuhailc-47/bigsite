const fs = require('fs');

const path = "c:/Users/ITG/Desktop/MSC/for update/Dorek/src/pages/AdminDashboard.jsx";
let content = fs.readFileSync(path, 'utf8');

// 1. Import themeSettings and updateTheme from useCMS
content = content.replace(
  /exportCMSData,\n    importCMSData\n  } = useCMS\(\);/,
  `exportCMSData,
    importCMSData,
    themeSettings,
    updateTheme
  } = useCMS();`
);

// 2. Add local state for themeSettings
content = content.replace(
  /const \[notification, setNotification\] = useState\(''\);/,
  `const [notification, setNotification] = useState('');
  
  // Theme settings local state
  const [themeData, setThemeData] = useState(() => JSON.parse(JSON.stringify(themeSettings)));`
);

// 3. Add save function for theme
content = content.replace(
  /const handleSaveNavigation = \(\) => {/,
  `const handleSaveTheme = () => {
    updateTheme(themeData);
    triggerNotification('Theme and animations saved!');
  };

  const handleSaveNavigation = () => {`
);

// 4. Add 'theme' tab to nav
content = content.replace(
  /<button\n              className=\{`admin-tab-btn \$\{activeTab === 'code' \? 'active' : ''\}`\}\n              onClick=\{.*?\}\n            >\n              Code Settings\n            <\/button>/s,
  `<button
              className={\`admin-tab-btn \${activeTab === 'code' ? 'active' : ''}\`}
              onClick={() => setActiveTab('code')}
            >
              Code Settings
            </button>
            <button
              className={\`admin-tab-btn \${activeTab === 'theme' ? 'active' : ''}\`}
              onClick={() => setActiveTab('theme')}
            >
              Theme & Animation
            </button>`
);

// 5. Add Theme Tab Content
const themeTabContent = `
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
`;

content = content.replace(
  /\{activeTab === 'code' && \(/,
  themeTabContent + "\n          {activeTab === 'code' && ("
);

fs.writeFileSync(path, content, 'utf8');
console.log("AdminDashboard updated with Theme Settings");
