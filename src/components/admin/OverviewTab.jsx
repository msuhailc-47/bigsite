import React, { useState, useEffect } from 'react';
import { FileDown, Upload, RefreshCw, Users } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

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
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    // Listen to real-time analytics
    const unsub = onSnapshot(doc(db, 'dorek_cms', 'analytics'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().totalVisitors) {
        setTotalVisitors(docSnap.data().totalVisitors);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="admin-panel-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>Overview & Dashboard</h3>
        <span style={{ fontSize: '12px', padding: '4px 10px', background: 'var(--primary)', color: 'white', borderRadius: '20px' }}>
          Role: {userRole}
        </span>
      </div>
      <div className="overview-stats-grid">
        <div className="stat-card" style={{ borderBottom: '4px solid #22c55e' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} /> Total Visitors
          </h4>
          <div className="stat-value text-gold">{totalVisitors.toLocaleString()}</div>
          <p>Unique sessions since launch</p>
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
