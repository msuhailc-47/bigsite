import React, { useState } from 'react';
import { Inbox, Trash2, Save, CheckCircle, Mail, MailOpen, Download, Filter, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function SubmissionsTab({ 
  submissions, 
  deleteSubmission, 
  deleteMultipleSubmissions,
  clearSubmissions,
  markSubmissionRead, 
  markAllSubmissionsRead, 
  markMultipleSubmissionsRead,
  themeSettings, 
  updateThemeSettings 
}) {
  const [notifEmail, setNotifEmail] = useState(themeSettings?.adminEmail || '');
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState('new'); // 'new' or 'all'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'doorcarts', 'general'
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isDoorcartsLead = (sub) => {
    if (!sub) return false;
    const src = (sub.source || '').toLowerCase();
    const subj = (sub.subject || '').toLowerCase();
    const msg = (sub.message || '').toLowerCase();
    return src.includes('hero') || src.includes('doorcart') || subj.includes('doorcart') || msg.includes('doorcart');
  };

  const handleSaveEmail = () => {
    if (!notifEmail || !notifEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    updateThemeSettings({ ...themeSettings, adminEmail: notifEmail });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportExcel = () => {
    if (submissions.length === 0) return alert('No submissions to export.');
    
    // Create formatted data for Excel
    const data = submissions.map((sub, idx) => {
      const isDk = isDoorcartsLead(sub);
      return {
        'SL No': idx + 1,
        'Date & Time': sub.date || sub.createdAt || '',
        'Category / Lead Type': isDk ? 'Doorcarts Lead' : 'General Contact',
        'Source': sub.source || (isDk ? 'Hero First Section' : 'Contact Section'),
        'Full Name': sub.name || '',
        'Email Address': sub.email || '',
        'Phone Number': sub.phone || 'N/A',
        'Subject': sub.subject || 'N/A',
        'Message / Inquiry': sub.message || '',
        'Status': sub.isRead ? 'Read' : 'New / Unread',
        'Doc ID': sub.docId || sub.id || ''
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Auto-fit column widths for clear reading
    worksheet['!cols'] = [
      { wch: 8 },  // SL No
      { wch: 22 }, // Date & Time
      { wch: 22 }, // Category / Lead Type
      { wch: 20 }, // Source
      { wch: 24 }, // Full Name
      { wch: 28 }, // Email Address
      { wch: 18 }, // Phone Number
      { wch: 26 }, // Subject
      { wch: 50 }, // Message / Inquiry
      { wch: 16 }, // Status
      { wch: 24 }  // Doc ID
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries');

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Dorek_Inquiries_${dateStr}.xlsx`);
  };

  // Metric counts
  const totalCount = submissions.length;
  const doorcartsCount = submissions.filter(isDoorcartsLead).length;
  const generalCount = totalCount - doorcartsCount;

  const newTotalCount = submissions.filter(s => !s.isRead).length;
  const newDoorcartsCount = submissions.filter(s => !s.isRead && isDoorcartsLead(s)).length;
  const newGeneralCount = submissions.filter(s => !s.isRead && !isDoorcartsLead(s)).length;

  // Sort submissions (newest first)
  const sortedSubmissions = [...submissions].sort((a, b) => b.id - a.id);
  
  // Filter submissions by read status and category
  const displaySubmissions = sortedSubmissions.filter(sub => {
    if (viewMode === 'new' && sub.isRead) return false;
    const isDk = isDoorcartsLead(sub);
    if (categoryFilter === 'doorcarts' && !isDk) return false;
    if (categoryFilter === 'general' && isDk) return false;
    return true;
  });

  const allVisibleSelected = displaySubmissions.length > 0 && displaySubmissions.every(s => selectedIds.has(s.id));

  const toggleSelectAllVisible = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        displaySubmissions.forEach(s => next.delete(s.id));
      } else {
        displaySubmissions.forEach(s => next.add(s.id));
      }
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Are you sure you want to permanently delete ${selectedIds.size} selected submissions? This action cannot be undone.`)) {
      if (deleteMultipleSubmissions) {
        deleteMultipleSubmissions(Array.from(selectedIds));
      } else {
        selectedIds.forEach(id => deleteSubmission(id));
      }
      setSelectedIds(new Set());
    }
  };

  const handleMarkSelectedRead = () => {
    if (selectedIds.size === 0) return;
    if (markMultipleSubmissionsRead) {
      markMultipleSubmissionsRead(Array.from(selectedIds));
    } else {
      selectedIds.forEach(id => markSubmissionRead(id));
    }
    setSelectedIds(new Set());
  };

  const handleClearAll = () => {
    if (submissions.length === 0) return alert('No submissions to clear.');
    const confirmMsg = `⚠️ WARNING: Are you sure you want to permanently DELETE ALL ${submissions.length} submissions from Firebase?\n\n` +
      `Please ensure you have already downloaded the weekly Excel backup (.xlsx) before clearing.\n\n` +
      `Click OK to proceed with deletion.`;
    if (window.confirm(confirmMsg)) {
      if (clearSubmissions) {
        clearSubmissions();
      }
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="admin-panel-card animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3>Form Submissions & Inquiries</h3>
          <p className="section-description">View active message submissions sent by website visitors and Doorcarts enquiries.</p>
        </div>
        
        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-section)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(10,46,93,0.1)' }}>
            <button 
              onClick={() => setViewMode('new')}
              style={{ 
                padding: '7px 14px', 
                borderRadius: '6px', 
                border: 'none', 
                backgroundColor: viewMode === 'new' ? 'var(--primary)' : 'transparent', 
                color: viewMode === 'new' ? '#fff' : 'var(--text-muted)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              <Mail size={15} /> New 
              {newTotalCount > 0 && (
                <span style={{ background: '#e11d48', color: 'white', padding: '1px 6px', borderRadius: '12px', fontSize: '11px', marginLeft: '4px' }}>
                  {newTotalCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setViewMode('all')}
              style={{ 
                padding: '7px 14px', 
                borderRadius: '6px', 
                border: 'none', 
                backgroundColor: viewMode === 'all' ? 'var(--primary)' : 'transparent', 
                color: viewMode === 'all' ? '#fff' : 'var(--text-muted)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              <MailOpen size={15} /> All ({totalCount})
            </button>
          </div>
          
          {viewMode === 'new' && newTotalCount > 0 && (
            <button 
              onClick={() => markAllSubmissionsRead()}
              style={{ 
                padding: '8px 14px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                backgroundColor: '#fff', 
                color: '#475569', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              <CheckCircle size={15} /> Mark All as Read
            </button>
          )}

          <button 
            onClick={handleExportExcel}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: 'none', 
              backgroundColor: '#107c41', 
              color: '#fff', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontWeight: '600',
              fontSize: '13px',
              boxShadow: '0 2px 6px rgba(16, 124, 65, 0.25)'
            }}
            title="Download all inquiries as Microsoft Excel (.xlsx) spreadsheet"
          >
            <FileSpreadsheet size={16} /> Export Excel (.xlsx)
          </button>

          {submissions.length > 0 && (
            <button 
              onClick={handleClearAll}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '6px', 
                border: '1px solid #fecaca', 
                backgroundColor: '#fff1f2', 
                color: '#e11d48', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
              title="Permanently clear all inquiries (recommended after downloading weekly Excel)"
            >
              <Trash2 size={15} /> Clear All Inquiries ({totalCount})
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center', 
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(10,46,93,0.08)',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
          <Filter size={14} /> Category:
        </span>

        <button
          onClick={() => setCategoryFilter('all')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: categoryFilter === 'all' ? '1.5px solid var(--primary)' : '1px solid #cbd5e1',
            backgroundColor: categoryFilter === 'all' ? 'rgba(10, 46, 93, 0.08)' : '#ffffff',
            color: categoryFilter === 'all' ? 'var(--primary)' : '#64748b',
            cursor: 'pointer',
            fontWeight: categoryFilter === 'all' ? '700' : '500',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease'
          }}
        >
          All Inquiries ({totalCount})
        </button>

        <button
          onClick={() => setCategoryFilter('doorcarts')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: categoryFilter === 'doorcarts' ? '1.5px solid #D4AF37' : '1px solid #fde68a',
            backgroundColor: categoryFilter === 'doorcarts' ? 'rgba(212, 175, 55, 0.18)' : '#fffbeb',
            color: categoryFilter === 'doorcarts' ? '#92400e' : '#b45309',
            cursor: 'pointer',
            fontWeight: categoryFilter === 'doorcarts' ? '700' : '600',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: categoryFilter === 'doorcarts' ? '0 2px 8px rgba(212, 175, 55, 0.25)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          🚀 Doorcarts Leads ({doorcartsCount})
          {newDoorcartsCount > 0 && (
            <span style={{ background: '#e11d48', color: '#fff', fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
              {newDoorcartsCount} new
            </span>
          )}
        </button>

        <button
          onClick={() => setCategoryFilter('general')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: categoryFilter === 'general' ? '1.5px solid #0A2E5D' : '1px solid #cbd5e1',
            backgroundColor: categoryFilter === 'general' ? 'rgba(10, 46, 93, 0.08)' : '#ffffff',
            color: categoryFilter === 'general' ? '#0A2E5D' : '#64748b',
            cursor: 'pointer',
            fontWeight: categoryFilter === 'general' ? '700' : '500',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease'
          }}
        >
          📩 General Contact ({generalCount})
          {newGeneralCount > 0 && (
            <span style={{ background: '#e11d48', color: '#fff', fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
              {newGeneralCount} new
            </span>
          )}
        </button>

        {displaySubmissions.length > 0 && (
          <label style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginLeft: 'auto',
            fontSize: '13px', 
            fontWeight: '600', 
            color: '#475569', 
            cursor: 'pointer',
            padding: '5px 12px',
            borderRadius: '20px',
            background: allVisibleSelected ? 'rgba(10, 46, 93, 0.1)' : '#f1f5f9',
            border: '1px solid #cbd5e1',
            transition: 'all 0.15s ease'
          }}>
            <input 
              type="checkbox" 
              checked={allVisibleSelected} 
              onChange={toggleSelectAllVisible}
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#0A2E5D' }}
            />
            Select All Visible ({displaySubmissions.length})
          </label>
        )}
      </div>

      {/* Floating / Sticky Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0A2E5D 0%, #173b70 100%)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(10, 46, 93, 0.25)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '600' }}>
            <span>✓ {selectedIds.size} message{selectedIds.size > 1 ? 's' : ''} selected</span>
            <button 
              onClick={() => setSelectedIds(new Set())}
              style={{ background: 'transparent', border: 'none', color: '#93c5fd', textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }}
            >
              Deselect All
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handleMarkSelectedRead}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CheckCircle size={14} /> Mark Selected Read ({selectedIds.size})
            </button>
            <button
              onClick={handleDeleteSelected}
              style={{ background: '#ef4444', border: 'none', color: '#ffffff', padding: '7px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(239,68,68,0.4)' }}
            >
              <Trash2 size={14} /> Delete Selected ({selectedIds.size})
            </button>
          </div>
        </div>
      )}

      <div className="submissions-list">
        {displaySubmissions.length === 0 ? (
          <div className="submissions-empty">
            <Inbox size={40} className="empty-state-icon" />
            <p>
              {categoryFilter === 'doorcarts'
                ? "No Doorcarts leads found in this view."
                : categoryFilter === 'general'
                ? "No general contact messages found in this view."
                : viewMode === 'new'
                ? "No new unread messages right now."
                : "No submissions found. Feedbacks will appear here."}
            </p>
          </div>
        ) : (
          displaySubmissions.map((sub) => {
            const isDk = isDoorcartsLead(sub);
            return (
              <div 
                key={sub.id} 
                className="submission-detail-card" 
                style={{ 
                  borderLeft: !sub.isRead 
                    ? (isDk ? '4px solid #F59E0B' : '4px solid #e11d48') 
                    : (isDk ? '4px solid rgba(212, 175, 55, 0.45)' : '1px solid rgba(10, 46, 93, 0.06)'),
                  backgroundColor: selectedIds.has(sub.id)
                    ? 'rgba(10, 46, 93, 0.05)'
                    : (!sub.isRead && isDk ? 'rgba(254, 243, 199, 0.25)' : undefined)
                }}
              >
                <div className="submission-card-header">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <input 
                      type="checkbox"
                      checked={selectedIds.has(sub.id)}
                      onChange={() => toggleSelect(sub.id)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0A2E5D', marginTop: '3px' }}
                      title="Select message"
                    />
                    <div className="sender-meta">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0 }}>{sub.name}</h4>
                        {isDk ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 158, 11, 0.22) 100%)',
                            color: '#B45309',
                            border: '1px solid rgba(212, 175, 55, 0.45)',
                            padding: '2px 9px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>
                            🚀 Doorcarts Lead
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(10, 46, 93, 0.08)',
                            color: '#0A2E5D',
                            border: '1px solid rgba(10, 46, 93, 0.18)',
                            padding: '2px 9px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            📩 General Contact
                          </span>
                        )}
                        {!sub.isRead && (
                          <span style={{ fontSize: '10px', background: '#e11d48', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontWeight: 'bold' }}>
                            NEW
                          </span>
                        )}
                      </div>
                      <span>{sub.email} | {sub.phone || 'No phone'}</span>
                    </div>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <strong>Subject: {sub.subject}</strong>
                    {sub.source && (
                      <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                        Source: {sub.source}
                      </span>
                    )}
                  </div>
                  <p style={{ whiteSpace: 'pre-line' }}>{sub.message}</p>
                </div>
              </div>
            );
          })
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
