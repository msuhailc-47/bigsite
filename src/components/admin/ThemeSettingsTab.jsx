import React from 'react';
import { LayoutGrid, Smartphone, CheckCircle2, ExternalLink, Save } from 'lucide-react';

export default function ThemeSettingsTab({
  themeData,
  setThemeData,
  handleSaveTheme
}) {
  const currentAppLayout = themeData.appBrandLayout || 'op1';

  const handleSelectAppLayout = (optionKey) => {
    setThemeData({
      ...themeData,
      appBrandLayout: optionKey
    });
  };

  const previewUrl = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/businesses#app-brands'
    : 'https://dorekinternational.in/businesses#app-brands';

  return (
    <div className="admin-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Theme, Layout & Animation Settings</h2>
        <button className="admin-btn-primary" onClick={handleSaveTheme} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Save size={16} /> Save Theme Settings
        </button>
      </div>

      {/* SECTION 1: DOORCARTS APP & PARTNER BRANDS LAYOUT SELECTOR */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '22px 24px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(10, 46, 93, 0.08)',
              color: '#0A2E5D',
              padding: '4px 10px',
              borderRadius: '6px',
              marginBottom: '6px'
            }}>
              Businesses Page Layout (/businesses)
            </span>
            <h3 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '1.15rem' }}>
              🎨 Doorcarts App & Partner Brands — Design Style
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Choose how the "Every Brand for Every Budget" section appears on the <strong>Businesses</strong> page. Select an option and click <strong>Save Theme Settings</strong>.
            </p>
          </div>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#0A2E5D',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              padding: '8px 14px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            Preview on Businesses Page <ExternalLink size={14} />
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px'
        }}>
          {/* OPTION 1 CARD */}
          <div
            onClick={() => handleSelectAppLayout('op1')}
            style={{
              cursor: 'pointer',
              background: '#ffffff',
              border: currentAppLayout === 'op1' ? '2.5px solid #0A2E5D' : '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: currentAppLayout === 'op1' ? '0 10px 25px rgba(10, 46, 93, 0.1)' : 'none',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: currentAppLayout === 'op1' ? '#0A2E5D' : '#f1f5f9',
                  color: currentAppLayout === 'op1' ? '#D4AF37' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a' }}>
                    Option 1: Full-Width + Sleek App Banner
                  </strong>
                  <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                    4-Column Spacious Grid + Horizontal Banner
                  </span>
                </div>
              </div>
              {currentAppLayout === 'op1' && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px'
                }}>
                  <CheckCircle2 size={14} /> Selected
                </span>
              )}
            </div>

            {/* Visual Wireframe Diagram for Option 1 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '8px' }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} style={{ height: '32px', background: '#e2e8f0', borderRadius: '4px' }} />
                ))}
              </div>
              <div style={{
                height: '22px',
                background: 'linear-gradient(90deg, #0A2E5D, #1e3a8a)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px'
              }}>
                <span style={{ fontSize: '9px', color: '#ffffff', fontWeight: 700 }}>Doorcarts App Banner</span>
                <span style={{ width: '28px', height: '10px', background: '#D4AF37', borderRadius: '2px' }} />
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
              Gives 100% full width to the brand explorer (4 cards per row) and places a clean horizontal Doorcarts App download banner right below.
            </p>
          </div>

          {/* OPTION 2 CARD */}
          <div
            onClick={() => handleSelectAppLayout('op2')}
            style={{
              cursor: 'pointer',
              background: '#ffffff',
              border: currentAppLayout === 'op2' ? '2.5px solid #0A2E5D' : '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: currentAppLayout === 'op2' ? '0 10px 25px rgba(10, 46, 93, 0.1)' : 'none',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: currentAppLayout === 'op2' ? '#0A2E5D' : '#f1f5f9',
                  color: currentAppLayout === 'op2' ? '#D4AF37' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Smartphone size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.98rem', color: '#0f172a' }}>
                    Option 2: Interactive Phone App Mockup
                  </strong>
                  <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                    Live Phone Screen Preview + 3-Column Grid
                  </span>
                </div>
              </div>
              {currentAppLayout === 'op2' && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px'
                }}>
                  <CheckCircle2 size={14} /> Selected
                </span>
              )}
            </div>

            {/* Visual Wireframe Diagram for Option 2 */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '12px',
              display: 'grid',
              gridTemplateColumns: '70px 1fr',
              gap: '8px'
            }}>
              <div style={{
                height: '62px',
                background: '#0A2E5D',
                borderRadius: '6px',
                border: '2px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}>
                <span style={{ width: '16px', height: '3px', background: '#94a3b8', borderRadius: '2px', marginBottom: '4px' }} />
                <span style={{ fontSize: '8px', color: '#D4AF37', fontWeight: 700 }}>App Live</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} style={{ height: '28px', background: '#e2e8f0', borderRadius: '4px' }} />
                ))}
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
              Shows a realistic interactive Doorcarts smartphone frame on the left that updates live as customers filter budget tiers and brands on the right.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: COLORS & ANIMATIONS */}
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
