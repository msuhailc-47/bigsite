import React from 'react';
import { FileDown, Upload, RefreshCw } from 'lucide-react';

export default function OverviewTab({
  userRole,
  submissions,
  mediaLibrary,
  navItems,
  exportCMSData,
  handleJSONImport,
  resetAll,
  isReadOnly
}) {
  return (
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
  );
}
