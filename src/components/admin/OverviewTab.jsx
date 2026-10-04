import React, { useState, useEffect } from 'react';
import { FileDown, Upload, RefreshCw, Users, Lock, Unlock, ShieldAlert, Save, CheckCircle, KeyRound } from 'lucide-react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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
  const [maintenanceMode, setMaintenanceMode] = useState(true);
  const [maintenancePin, setMaintenancePin] = useState('2026');
  const [maintenanceTitle, setMaintenanceTitle] = useState('We Are Upgrading Our Website');
  const [maintenanceMessage, setMaintenanceMessage] = useState('We are currently making important updates and improvements to serve you better. Our website will be back online shortly.');
  const [savingMaint, setSavingMaint] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (!db) return;

    const unsubAnalytics = onSnapshot(doc(db, 'dorek_cms', 'analytics'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().totalVisitors) {
        setTotalVisitors(docSnap.data().totalVisitors);
      }
    });

    const unsubTheme = onSnapshot(doc(db, 'dorek_cms', 'themeSettings'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().themeSettings) {
        const ts = docSnap.data().themeSettings;
        setMaintenanceMode(ts.maintenanceMode !== undefined ? Boolean(ts.maintenanceMode) : true);
        if (ts.maintenancePin) setMaintenancePin(ts.maintenancePin);
        if (ts.maintenanceTitle) setMaintenanceTitle(ts.maintenanceTitle);
        if (ts.maintenanceMessage) setMaintenanceMessage(ts.maintenanceMessage);
      }
    });

    return () => {
      unsubAnalytics();
      unsubTheme();
    };
  }, []);

  const saveMaintenanceConfig = async (newModeState = maintenanceMode) => {
    if (isReadOnly || !db) return;
    setSavingMaint(true);
    try {
      const themeRef = doc(db, 'dorek_cms', 'themeSettings');
      const snap = await getDoc(themeRef);
      const existing = snap.exists() && snap.data().themeSettings ? snap.data().themeSettings : {};

      const updatedTheme = {
        ...existing,
        maintenanceMode: Boolean(newModeState),
        maintenancePin: (maintenancePin || '2026').trim(),
        maintenanceTitle: maintenanceTitle.trim(),
        maintenanceMessage: maintenanceMessage.trim()
      };

      await setDoc(themeRef, { themeSettings: updatedTheme }, { merge: true });
      setMaintenanceMode(Boolean(newModeState));
      setSavedMsg(newModeState ? '🔒 Website is now LOCKED in Maintenance Mode!' : '🟢 Website is now LIVE for everyone!');
      setTimeout(() => setSavedMsg(''), 4000);
    } catch (err) {
      console.error('Error updating maintenance mode:', err);
      alert('Failed to update maintenance settings.');
    } finally {
      setSavingMaint(false);
    }
  };

  return (
    <div className="admin-panel-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>Overview & Dashboard</h3>
        <span style={{ fontSize: '12px', padding: '4px 10px', background: 'var(--primary)', color: 'white', borderRadius: '20px' }}>
          Role: {userRole}
        </span>
      </div>

      {/* Website Maintenance / Public Lock Control Card */}
      <div style={{
        background: maintenanceMode ? 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)' : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        border: `2px solid ${maintenanceMode ? '#f43f5e' : '#22c55e'}`,
        borderRadius: '14px',
        padding: '22px',
        marginBottom: '28px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {maintenanceMode ? <Lock size={22} color="#e11d48" /> : <Unlock size={22} color="#16a34a" />}
              <h4 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
                Website Maintenance Mode (Public Lock)
              </h4>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                background: maintenanceMode ? '#e11d48' : '#16a34a',
                color: '#ffffff'
              }}>
                {maintenanceMode ? '🔴 SITE LOCKED FOR PUBLIC' : '🟢 SITE LIVE & PUBLIC'}
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#475569' }}>
              {maintenanceMode
                ? 'Visitors currently see the Maintenance Screen. You can still view the full website using the Admin Preview PIN below.'
                : 'Your website is publicly accessible to everyone. Turn on Maintenance Mode to temporarily block public access while making edits.'}
            </p>
          </div>

          <button
            onClick={() => saveMaintenanceConfig(!maintenanceMode)}
            disabled={savingMaint || isReadOnly}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              border: 'none',
              background: maintenanceMode ? '#16a34a' : '#e11d48',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
            }}
          >
            {maintenanceMode ? (
              <><Unlock size={16} /> Unlock Site (Make Public)</>
            ) : (
              <><Lock size={16} /> Lock Site (Enable Maintenance)</>
            )}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          background: 'rgba(255,255,255,0.75)',
          padding: '16px',
          borderRadius: '10px',
          border: '1px solid rgba(0,0,0,0.08)'
        }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              <KeyRound size={14} /> Admin Preview PIN (For You to Unlock):
            </label>
            <input
              type="text"
              value={maintenancePin}
              onChange={(e) => setMaintenancePin(e.target.value)}
              placeholder="e.g. 2026"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: '700', color: '#0A2E5D' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Maintenance Screen Headline:
            </label>
            <input
              type="text"
              value={maintenanceTitle}
              onChange={(e) => setMaintenanceTitle(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Maintenance Screen Message:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
              <button
                onClick={() => saveMaintenanceConfig(maintenanceMode)}
                disabled={savingMaint || isReadOnly}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#0A2E5D',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} /> Save Settings
              </button>
            </div>
          </div>
        </div>

        {savedMsg && (
          <div style={{ marginTop: '12px', color: '#0f172a', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={16} color="#16a34a" /> {savedMsg}
          </div>
        )}
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
