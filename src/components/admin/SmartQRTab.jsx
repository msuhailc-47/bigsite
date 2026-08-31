import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  QrCode, Star, Bell, CheckCircle2, Clock, Trash2, Download, 
  Search, Filter, ExternalLink, RefreshCw, AlertTriangle, MapPin, Users,
  Mail, Settings, Save, Check, Send, ShieldAlert, Phone
} from 'lucide-react';

export default function SmartQRTab() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Notification Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [emailsInput, setEmailsInput] = useState('info@dorek.in');
  const [notifyOnServiceCall, setNotifyOnServiceCall] = useState(true);
  const [notifyOnLowRating, setNotifyOnLowRating] = useState(true);
  const [notifyOnAllReviews, setNotifyOnAllReviews] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState('');
  const [testSending, setTestSending] = useState(false);

  useEffect(() => {
    if (!db) return;
    
    // 1. Fetch tickets
    const q = query(collection(db, 'dorek_pulse_tickets'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTickets(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching Smart QR tickets:', err);
      setLoading(false);
    });

    // 2. Fetch Notification Settings
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'dorek_cms', 'notification_settings'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.emails && Array.isArray(data.emails)) {
            setEmailsInput(data.emails.join(', '));
          } else if (data.emails) {
            setEmailsInput(data.emails);
          }
          if (data.notifyOnServiceCall !== undefined) setNotifyOnServiceCall(data.notifyOnServiceCall);
          if (data.notifyOnLowRating !== undefined) setNotifyOnLowRating(data.notifyOnLowRating);
          if (data.notifyOnAllReviews !== undefined) setNotifyOnAllReviews(data.notifyOnAllReviews);
        }
      } catch (err) {
        console.error('Error loading notification settings:', err);
      }
    };
    loadSettings();

    return () => unsubscribe();
  }, []);

  const handleSaveNotificationSettings = async () => {
    if (!db) return;
    setSavingSettings(true);
    setSettingsStatus('');
    try {
      const emailList = emailsInput
        .split(',')
        .map(e => e.trim())
        .filter(e => e && e.includes('@'));

      const settingsData = {
        emails: emailList,
        notifyOnServiceCall,
        notifyOnLowRating,
        notifyOnAllReviews,
        updatedAt: Date.now()
      };

      await setDoc(doc(db, 'dorek_cms', 'notification_settings'), settingsData, { merge: true });
      setSettingsStatus('അറിയിപ്പ് ക്രമീകരണങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!');
      setTimeout(() => setSettingsStatus(''), 4000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setSettingsStatus('സേവ് ചെയ്യാൻ സാധിച്ചില്ല: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSendTestAlert = async () => {
    setTestSending(true);
    setSettingsStatus('');
    try {
      const emailList = emailsInput
        .split(',')
        .map(e => e.trim())
        .filter(e => e && e.includes('@'));

      // We send test notification directly to the dorek-pulse or configured mailer
      const testPayload = {
        type: 'service_call',
        outlet: 'Dorek Retail Outlet (Test)',
        counter: 'Counter 1 (Test Alert)',
        requestType: 'Test Notification',
        message: 'This is a test notification from Dorek Admin Smart QR Hub to verify email delivery.',
        customerName: 'System Admin',
        customerPhone: '+91 9876543210',
        notificationEmails: emailList
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Dorek Pulse Test Notification',
          email: emailList[0] || 'info@dorek.in',
          phone: '+91 9876543210',
          subject: '🛎️ Test Notification from Dorek Smart QR Hub',
          message: 'Dorek Smart QR Alert System is working! Target notification emails: ' + emailList.join(', ')
        })
      });

      setSettingsStatus('ടെസ്റ്റ് അറിയിപ്പ് വിജയകരമായി അയച്ചു!');
      setTimeout(() => setSettingsStatus(''), 4000);
    } catch (err) {
      console.error('Failed to send test:', err);
      setSettingsStatus('ടെസ്റ്റ് അയക്കാൻ സാധിച്ചില്ല.');
    } finally {
      setTestSending(false);
    }
  };

  const handleResolve = async (ticketId) => {
    try {
      const ticketRef = doc(db, 'dorek_pulse_tickets', ticketId);
      const ticket = tickets.find(t => t.id === ticketId);
      const updates = { 
        status: 'resolved',
        resolvedAt: Date.now()
      };
      if (ticket && ticket.createdAt) {
        updates.resolutionTimeSeconds = Math.round((Date.now() - ticket.createdAt) / 1000);
      }
      await updateDoc(ticketRef, updates);
    } catch (err) {
      console.error('Failed to resolve ticket:', err);
    }
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm('Delete this feedback/ticket permanently?')) {
      try {
        await deleteDoc(doc(db, 'dorek_pulse_tickets', ticketId));
      } catch (err) {
        console.error('Failed to delete ticket:', err);
      }
    }
  };

  const handleExportCSV = () => {
    if (tickets.length === 0) return alert('No ticket data to export.');
    
    const headers = ['ID', 'Date', 'Type', 'Outlet', 'Counter', 'Rating', 'Tags', 'Customer Name', 'Phone', 'Message', 'Status', 'Resolution Time (Sec)'];
    const rows = tickets.map(t => [
      t.id,
      `"${new Date(t.createdAt).toLocaleString()}"`,
      t.type || 'N/A',
      `"${t.outlet || ''}"`,
      `"${t.counter || ''}"`,
      t.rating || 'N/A',
      `"${(t.tags || []).join('; ')}"`,
      `"${t.customerName || ''}"`,
      `"${t.customerPhone || ''}"`,
      `"${(t.message || '').replace(/"/g, '""')}"`,
      t.status || 'new',
      t.resolutionTimeSeconds || 'N/A'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dorek_SmartQR_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reviews = tickets.filter(t => t.type === 'review');
  const serviceCalls = tickets.filter(t => t.type === 'service_call');
  const activeTasks = tickets.filter(t => t.status === 'new' || t.status === 'attending');
  
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviews.length).toFixed(1)
    : '5.0';

  const resolvedWithTime = tickets.filter(t => t.resolutionTimeSeconds);
  const avgResolutionSec = resolvedWithTime.length > 0
    ? Math.round(resolvedWithTime.reduce((acc, curr) => acc + curr.resolutionTimeSeconds, 0) / resolvedWithTime.length)
    : 45;

  const filteredTickets = tickets.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (t.customerName || '').toLowerCase().includes(q);
      const matchCounter = (t.counter || '').toLowerCase().includes(q);
      const matchOutlet = (t.outlet || '').toLowerCase().includes(q);
      const matchMsg = (t.message || '').toLowerCase().includes(q);
      return matchName || matchCounter || matchOutlet || matchMsg;
    }
    return true;
  });

  return (
    <div className="admin-panel-card animate-fadeIn">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#D4AF37', color: '#0A2E5D', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <QrCode size={20} />
            </div>
            <h3 style={{ margin: 0 }}>Smart QR & Outlet Live Service Hub</h3>
          </div>
          <p className="section-description" style={{ marginTop: '4px' }}>
            Manage in-store customer ratings, live counter service requests, and staff response speeds across all Dorek outlets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: '1px solid #D4AF37', 
              backgroundColor: showSettings ? '#D4AF37' : '#0A2E5D', 
              color: showSettings ? '#0A2E5D' : '#ffffff', 
              cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Settings size={15} /> {showSettings ? 'Close Settings' : 'Notification Settings (അറിയിപ്പ് സെറ്റിംഗ്സ്)'}
          </button>

          <button 
            onClick={handleExportCSV}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: 'none', 
              backgroundColor: '#10b981', color: '#fff', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px'
            }}
          >
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Notification Settings Panel */}
      {showSettings && (
        <div style={{
          background: 'linear-gradient(135deg, #0A2E5D 0%, #0F3B77 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Mail size={20} color="#D4AF37" />
            <h4 style={{ margin: 0, color: '#D4AF37', fontSize: '16px' }}>
              അറിയിപ്പുകൾ ആർക്കൊക്കെ പോകണം? (Alert Recipients & Triggers)
            </h4>
          </div>

          <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.5' }}>
            കസ്റ്റമർ QR സ്കാൻ ചെയ്ത് സർവീസ് കോൾ ചെയ്യുമ്പോഴോ ഫീഡ്‌ബാക്ക് തരുമ്പോഴോ തത്സമയം ഇമെയിൽ അലേർട്ടുകൾ ലഭിക്കേണ്ട വിലാസങ്ങൾ താഴെ നൽകുക (കോമയിട്ട് ഒന്നിലധികം നൽകാം).
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>
              Notification Email Addresses (ഇമെയിൽ വിലാസങ്ങൾ)
            </label>
            <input 
              type="text" 
              placeholder="info@dorek.in, manager@dorek.in, store@dorek.in"
              value={emailsInput}
              onChange={(e) => setEmailsInput(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                background: '#ffffff',
                color: '#0A2E5D',
                fontSize: '14px',
                fontWeight: '600',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', background: 'rgba(255,255,255,0.08)', padding: '10px 12px', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={notifyOnServiceCall} 
                onChange={(e) => setNotifyOnServiceCall(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#D4AF37' }}
              />
              <span>🛎️ Staff Calls (അടിയന്തിര സഹായം)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', background: 'rgba(255,255,255,0.08)', padding: '10px 12px', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={notifyOnLowRating} 
                onChange={(e) => setNotifyOnLowRating(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#D4AF37' }}
              />
              <span>⚠️ Low Ratings (1-2 Stars)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', background: 'rgba(255,255,255,0.08)', padding: '10px 12px', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={notifyOnAllReviews} 
                onChange={(e) => setNotifyOnAllReviews(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#D4AF37' }}
              />
              <span>⭐ All Customer Reviews</span>
            </label>
          </div>

          {settingsStatus && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: settingsStatus.includes('വിജയകരമായി') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: settingsStatus.includes('വിജയകരമായി') ? '1px solid #10b981' : '1px solid #ef4444',
              color: '#ffffff',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} color={settingsStatus.includes('വിജയകരമായി') ? '#10b981' : '#ef4444'} />
              {settingsStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSaveNotificationSettings}
              disabled={savingSettings}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: '#D4AF37',
                color: '#0A2E5D',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={15} /> {savingSettings ? 'Saving...' : 'Save Notification Settings (സേവ് ചെയ്യുക)'}
            </button>

            <button
              onClick={handleSendTestAlert}
              disabled={testSending}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'transparent',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={15} /> {testSending ? 'Sending Test...' : 'Send Test Alert (ടെസ്റ്റ് ചെയ്യുക)'}
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-section)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(10,46,93,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            <span>Active Service Calls</span>
            <Bell size={16} color={activeTasks.length > 0 ? '#e11d48' : '#10b981'} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: activeTasks.length > 0 ? '#e11d48' : 'var(--primary)', marginTop: '6px' }}>
            {activeTasks.length}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {activeTasks.length > 0 ? 'Counters need attendance' : 'All requests attended'}
          </span>
        </div>

        <div style={{ background: 'var(--bg-section)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(10,46,93,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            <span>Overall Rating (CSAT)</span>
            <Star size={16} color="#D4AF37" fill="#D4AF37" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#D4AF37', marginTop: '6px' }}>
            {avgRating} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/ 5.0</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Based on {reviews.length} customer ratings
          </span>
        </div>

        <div style={{ background: 'var(--bg-section)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(10,46,93,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            <span>Total Feedbacks</span>
            <Users size={16} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '6px' }}>
            {tickets.length}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {reviews.length} Reviews • {serviceCalls.length} Service Calls
          </span>
        </div>

        <div style={{ background: 'var(--bg-section)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(10,46,93,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
            <span>Avg Response Speed</span>
            <Clock size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '6px' }}>
            {avgResolutionSec}s
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Average staff resolution time
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', background: '#fff' }}
          >
            <option value="all">All Statuses</option>
            <option value="new">🚨 New / Urgent</option>
            <option value="attending">🟡 In Progress</option>
            <option value="resolved">🟢 Resolved</option>
          </select>

          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', background: '#fff' }}
          >
            <option value="all">All Types</option>
            <option value="review">⭐ Customer Reviews</option>
            <option value="service_call">🛎️ Service Calls</option>
          </select>
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#999' }} />
          <input 
            type="text" 
            placeholder="Search customer, counter, text..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Stream Table */}
      {filteredTickets.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-section)', borderRadius: '12px' }}>
          <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 10px' }} />
          <p>No tickets or feedbacks found matching your filters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTickets.map((ticket) => {
            const isNew = ticket.status === 'new';
            const isAttending = ticket.status === 'attending';
            const isReview = ticket.type === 'review';

            return (
              <div 
                key={ticket.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderLeft: isNew ? '4px solid #e11d48' : (isAttending ? '4px solid #f59e0b' : '4px solid #10b981'),
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{
                      background: isNew ? '#fee2e2' : (isAttending ? '#fef3c7' : '#d1fae5'),
                      color: isNew ? '#991b1b' : (isAttending ? '#92400e' : '#065f46'),
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      {isNew ? 'NEW' : (isAttending ? 'IN PROGRESS' : 'RESOLVED')}
                    </span>

                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>

                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} /> {ticket.counter} ({ticket.outlet})
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1e293b' }}>
                    {ticket.requestType || (isReview ? `${ticket.rating} Star Review` : 'Service Call')}
                  </h4>

                  {ticket.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={14} fill={ticket.rating >= s ? '#D4AF37' : 'none'} color={ticket.rating >= s ? '#D4AF37' : '#cbd5e1'} />
                      ))}
                      <span style={{ fontSize: '12px', fontWeight: '700', marginLeft: '6px', color: '#D4AF37' }}>{ticket.rating} / 5</span>
                    </div>
                  )}

                  {ticket.tags && ticket.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {ticket.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '8px', fontSize: '11px', color: '#475569' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {ticket.message && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', lineHeight: '1.4' }}>
                      "{ticket.message}"
                    </p>
                  )}

                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
                    Customer: <strong>{ticket.customerName || 'Anonymous'}</strong> {ticket.customerPhone && `| 📞 ${ticket.customerPhone}`}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {ticket.status !== 'resolved' && (
                    <button
                      onClick={() => handleResolve(ticket.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#10b981',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle2 size={14} /> Resolve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      background: '#fff',
                      color: '#ef4444',
                      cursor: 'pointer'
                    }}
                    title="Delete Record"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
