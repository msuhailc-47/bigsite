import React, { useState } from 'react';
import { Inbox, Trash2, Save, CheckCircle, Mail, MailOpen } from 'lucide-react';

export default function SubmissionsTab({ submissions, deleteSubmission, markSubmissionRead, markAllSubmissionsRead, themeSettings, updateThemeSettings }) {
  const [notifEmail, setNotifEmail] = useState(themeSettings?.adminEmail || '');
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState('new'); // 'new' or 'all'

  const handleSaveEmail = () => {
    if (!notifEmail || !notifEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    updateThemeSettings({ ...themeSettings, adminEmail: notifEmail });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Sort submissions (newest first)
  const sortedSubmissions = [...submissions].sort((a, b) => b.id - a.id);
  
  // Filter submissions
  const newSubmissions = sortedSubmissions.filter(sub => !sub.isRead);
  const allSubmissions = sortedSubmissions;
  
  const displaySubmissions = viewMode === 'new' ? newSubmissions : allSubmissions;

  return (
    <div className="admin-panel-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3>Contact Form Messages</h3>
          <p className="section-description">View active message submissions sent by website visitors.</p>
        </div>
        
        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-section)', padding: '5px', borderRadius: '8px', border: '1px solid rgba(10,46,93,0.1)' }}>
          <button 
            onClick={() => setViewMode('new')}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: 'none', 
              backgroundColor: viewMode === 'new' ? 'var(--primary)' : 'transparent', 
              color: viewMode === 'new' ? '#fff' : 'var(--text-muted)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontWeight: '600'
            }}
          >
            <Mail size={16} /> New 
            {newSubmissions.length > 0 && (
              <span style={{ background: '#e11d48', color: 'white', padding: '2px 6px', borderRadius: '12px', fontSize: '11px', marginLeft: '4px' }}>
                {newSubmissions.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setViewMode('all')}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: 'none', 
              backgroundColor: viewMode === 'all' ? 'var(--primary)' : 'transparent', 
              color: viewMode === 'all' ? '#fff' : 'var(--text-muted)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontWeight: '600'
            }}
          >
            <MailOpen size={16} /> All
          </button>
        </div>
        
        {viewMode === 'new' && newSubmissions.length > 0 && (
          <button 
            onClick={() => markAllSubmissionsRead()}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: '1px solid #ddd', 
              backgroundColor: '#fff', 
              color: '#666', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontWeight: '600',
              marginLeft: 'auto'
            }}
          >
            <CheckCircle size={16} /> Mark All as Read
          </button>
        )}
      </div>

      <div className="submissions-list">
        {displaySubmissions.length === 0 ? (
          <div className="submissions-empty">
            <Inbox size={40} className="empty-state-icon" />
            <p>{viewMode === 'new' ? "No new messages right now." : "No submissions found. Feedbacks will appear here."}</p>
          </div>
        ) : (
          displaySubmissions.map((sub) => (
            <div key={sub.id} className="submission-detail-card" style={{ borderLeft: !sub.isRead ? '4px solid #e11d48' : 'none' }}>
              <div className="submission-card-header">
                <div className="sender-meta">
                  <h4>{sub.name} {!sub.isRead && <span style={{ fontSize: '11px', color: '#e11d48', marginLeft: '8px', fontWeight: 'bold' }}>• NEW</span>}</h4>
                  <span>{sub.email} | {sub.phone || 'No phone'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="submission-date">{sub.date}</span>
                  
                  {!sub.isRead && (
                    <button
                      title="Mark as Read"
                      onClick={() => markSubmissionRead(sub.id)}
                      style={{ background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#666' }}
                    >
                      Mark Read
                    </button>
                  )}

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
