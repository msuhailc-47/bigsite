import React from 'react';
import { Inbox } from 'lucide-react';

export default function SubmissionsTab({ submissions }) {
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
                <span className="submission-date">{sub.date}</span>
              </div>
              <div className="submission-card-body">
                <strong>Subject: {sub.subject}</strong>
                <p>{sub.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
