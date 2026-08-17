import React from 'react';
import { ShieldAlert, Save, RefreshCw } from 'lucide-react';

export default function CodeSettingsTab({
  canManageCode,
  customCss, setCustomCss,
  customJs, setCustomJs,
  headerScripts, setHeaderScripts,
  footerScripts, setFooterScripts,
  handleSaveCodeSettings,
  codeSettings,
  rollbackCodeSettings,
  setCustomHtml,
  triggerNotification
}) {
  return (
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
  );
}
