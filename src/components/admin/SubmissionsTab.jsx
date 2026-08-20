import React, { useState } from 'react';
import { Inbox, Trash2, Save, CheckCircle } from 'lucide-react';

export default function SubmissionsTab({ submissions, deleteSubmission, themeSettings, updateThemeSettings }) {
  const [notifEmail, setNotifEmail] = useState(themeSettings?.adminEmail || '');
  const [saved, setSaved] = useState(false);

  const handleSaveEmail = () => {
    if (!notifEmail || !notifEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    updateThemeSettings({ ...themeSettings, adminEmail: notifEmail });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-panel-card animate-fadeIn">
      <h3>Contact Form Messages</h3>
      <p className="section-description">View active message submissions sent by website visitors.</p>

      <div className="submissions-list">
        {submissions.length === 0 ? (
          <div className="submissions-empty">
            <Inbox size={40} className="empty-state-icon" />
            <p>No submissions found. Feedbacks will appear here.</p>
          </div>
        ) : (
          submissions.map((sub) => (
            <div key={sub.id} className="submission-detail-card">
              <div className="submission-card-header">
                <div className="sender-meta">
                  <h4>{sub.name}</h4>
                  <span>{sub.email} | {sub.phone || 'No phone'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="submission-date">{sub.date}</span>
                  <button
                    className="delete-btn"
                    title="Delete this submission"
                    onClick={() => {
                      if (window.confirm(`Delete message from "${sub.name}"?`)) {
                        deleteSubmission(sub.id);
                      }
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="submission-card-body">
                <strong>Subject: {sub.subject}</strong>
                <p>{sub.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'var(--bg-section)', borderRadius: '12px', border: '1px solid rgba(10,46,93,0.1)' }}>
        <h4 style={{ marginBottom: '10px', color: 'var(--primary)' }}>Notification Settings</h4>
        <p style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Enter the email address where new contact form submissions should be sent.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="email" 
            placeholder="e.g. admin@dorek.in"
            value={notifEmail}
            onChange={(e) => { setNotifEmail(e.target.value); setSaved(false); }}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', width: '300px' }}
          />
          <button 
            onClick={handleSaveEmail}
            style={{ 
              padding: '10px 20px', borderRadius: '8px', border: 'none', 
              backgroundColor: saved ? '#22c55e' : 'var(--primary)', 
              color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              fontWeight: '600', fontSize: '14px'
            }}
          >
            {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save</>}
          </button>
        </div>
        {themeSettings?.adminEmail && (
          <p style={{ marginTop: '10px', color: '#666', fontSize: '13px' }}>
            Current: <strong>{themeSettings.adminEmail}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
