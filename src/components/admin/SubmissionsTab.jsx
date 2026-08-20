import React from 'react';
import { Inbox, Trash2 } from 'lucide-react';

export default function SubmissionsTab({ submissions, deleteSubmission, themeSettings, updateThemeSettings }) {
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="email" 
            placeholder="e.g. admin@dorek.in"
            defaultValue={themeSettings?.adminEmail || 'info@dorek.in'}
            onChange={(e) => updateThemeSettings({...themeSettings, adminEmail: e.target.value})}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', width: '300px' }}
          />
        </div>
      </div>
    </div>
  );
}
