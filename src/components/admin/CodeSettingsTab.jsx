import React from 'react';
import { ShieldAlert, Save, RefreshCw } from 'lucide-react';

export default function CodeSettingsTab({
  canManageCode,
  customCss, setCustomCss,
  customJs, setCustomJs,
  headerScripts, setHeaderScripts,
  footerScripts, setFooterScripts,
  metaPixelId, setMetaPixelId,
  googleAnalyticsId, setGoogleAnalyticsId,
  handleSaveCodeSettings,
  codeSettings,
  rollbackCodeSettings,
  setCustomHtml,
  triggerNotification
}) {
  return (
    <div className="admin-panel-card animate-fadeIn">
      <h3>Advanced Code & Analytics Settings</h3>
      <p className="section-description">Configure Meta Pixel, Google Analytics, custom tracking scripts, and CSS/JS overrides.</p>

      {/* Dedicated Marketing & Analytics Section */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0A2E5D', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📈 Social Media Marketing & Conversion Tracking (Meta Pixel & GA4)
        </h4>
        <p style={{ margin: '0 0 18px 0', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
          Enter your Meta Pixel ID to automatically track Facebook/Instagram visitors and WhatsApp catalogue enquiries for ad retargeting.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              META PIXEL ID (FACEBOOK & INSTAGRAM)
            </label>
            <input
              type="text"
              value={metaPixelId || ''}
              onChange={(e) => setMetaPixelId(e.target.value.trim())}
              className="form-control"
              placeholder="e.g. 123456789012345"
              disabled={!canManageCode}
            />
            <span style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px', display: 'block' }}>
              Tracks page views, catalog visits, and fires 'WhatsApp_Enquiry' custom events.
            </span>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              GOOGLE ANALYTICS GA4 MEASUREMENT ID
            </label>
            <input
              type="text"
              value={googleAnalyticsId || ''}
              onChange={(e) => setGoogleAnalyticsId(e.target.value.trim())}
              className="form-control"
              placeholder="e.g. G-XXXXXXXXXX"
              disabled={!canManageCode}
            />
            <span style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px', display: 'block' }}>
              Directly loads Google Analytics GA4 tag across all pages.
            </span>
          </div>
        </div>
      </div>

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
  );
}
