import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  QrCode, Star, Bell, CheckCircle2, Clock, Trash2, Download, 
  Search, Filter, ExternalLink, RefreshCw, AlertTriangle, MapPin, Users,
  Mail, Settings, Save, Check, Send, ShieldAlert, Phone, ChevronDown, ChevronUp,
  FileText, Globe, MessageCircle, Sparkles, Layers, RotateCcw
} from 'lucide-react';

const DEFAULT_PAGE_CONTENT = {
  brandTitle: 'DOREK INTERNATIONAL',
  reviewHeaderTitle: 'Rate Your Shopping Experience',
  star5Text: '🌟 Outstanding Experience!',
  star4Text: '😊 Very Good Experience',
  star3Text: '😐 Average Experience',
  star2Text: '😕 Needs Improvement',
  star1Text: '⚠️ Poor Experience',
  tagsLabel: 'What stood out to you?',
  commentPlaceholder: 'Share any additional comments or suggestions...',
  submitReviewBtnText: 'Submit Feedback',
  callStaffHeaderTitle: 'Call Staff to Your Counter',
  callStaffNotePlaceholder: 'Add a note (e.g. Inquiring about solar battery warranty)...',
  callStaffBtnText: 'Call Staff Now',
  thankYouReviewTitle: 'Thank You for Your Feedback!',
  thankYouReviewMessage: 'Your feedback helps us provide the best engineering and retail experience across all our outlets.',
  thankYouServiceTitle: 'Staff Alerted Successfully!',
  thankYouServiceMessage: 'Our counter supervisor is on their way to assist you.',
  websiteBtnText: 'Visit Dorek International (dorek.in) →',
  websiteUrl: 'https://dorek.in',
  whatsappBtnText: '💬 Chat with Outlet Support (+91 97475 22000)',
  whatsappUrl: 'https://wa.me/919747522000',
  footerNotice: 'Powered by Dorek Pulse • Official Outlet Customer System'
};

export default function SmartQRTab() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collapsible Accordion States
  const [isHubExpanded, setIsHubExpanded] = useState(true);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  // Notification Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [emailsInput, setEmailsInput] = useState('info@dorek.in, msuhailc47@gmail.com');
  const [notifyOnServiceCall, setNotifyOnServiceCall] = useState(true);
  const [notifyOnLowRating, setNotifyOnLowRating] = useState(true);
  const [notifyOnAllReviews, setNotifyOnAllReviews] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState('');
  const [testSending, setTestSending] = useState(false);

  // Page Contents State
  const [pageContent, setPageContent] = useState(DEFAULT_PAGE_CONTENT);
  const [savingContent, setSavingContent] = useState(false);
  const [contentStatus, setContentStatus] = useState('');

  useEffect(() => {
    if (!db) return;
    
    // 1. Fetch live tickets
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

    // 3. Fetch Page Content Settings
    const loadPageContent = async () => {
      try {
        const snap = await getDoc(doc(db, 'dorek_cms', 'pulse_page_content'));
        if (snap.exists()) {
          setPageContent(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.error('Error loading pulse page content:', err);
      }
    };
    loadPageContent();

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

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Dorek Pulse Test Alert',
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

  const handleSavePageContent = async () => {
    if (!db) return;
    setSavingContent(true);
    setContentStatus('');
    try {
      await setDoc(doc(db, 'dorek_cms', 'pulse_page_content'), {
        ...pageContent,
        updatedAt: Date.now()
      }, { merge: true });
      setContentStatus('ക്യുആർ പേജ് ഉള്ളടക്കങ്ങളും ലിങ്കുകളും വിജയകരമായി സേവ് ചെയ്തു!');
      setTimeout(() => setContentStatus(''), 4000);
    } catch (err) {
      console.error('Failed to save page content:', err);
      setContentStatus('സേവ് ചെയ്യാൻ സാധിച്ചില്ല: ' + err.message);
    } finally {
      setSavingContent(false);
    }
  };

  const handleResetContent = () => {
    if (window.confirm('എല്ലാ ടെക്സ്റ്റുകളും ലിങ്കുകളും ഡിഫോൾട്ട് രീതിയിലേക്ക് റീസെറ്റ് ചെയ്യണോ?')) {
      setPageContent(DEFAULT_PAGE_CONTENT);
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
    <div className="admin-panel-card animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ========================================================
          BOX 1: Smart QR & Outlet Live Service Hub (Collapsible)
          ======================================================== */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        overflow: 'hidden'
      }}>
        {/* Clickable Header Bar */}
        <div 
          onClick={() => setIsHubExpanded(!isHubExpanded)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 22px',
            background: isHubExpanded ? 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)' : '#f8fafc',
            color: isHubExpanded ? '#ffffff' : '#0A2E5D',
            cursor: 'pointer',
            borderBottom: isHubExpanded ? '2px solid #D4AF37' : 'none',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: isHubExpanded ? '#D4AF37' : '#0A2E5D',
              color: isHubExpanded ? '#0A2E5D' : '#ffffff',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex'
            }}>
              <QrCode size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: isHubExpanded ? '#D4AF37' : '#0A2E5D' }}>
                Smart QR & Outlet Live Service Hub
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: isHubExpanded ? '#cbd5e1' : '#64748b' }}>
                Manage live counter requests, customer ratings & SLA response speed
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Live Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: activeTasks.length > 0 ? '#fee2e2' : '#d1fae5',
                color: activeTasks.length > 0 ? '#991b1b' : '#065f46',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Bell size={12} /> {activeTasks.length} Active Calls
              </span>
              <span style={{
                background: isHubExpanded ? 'rgba(212,175,55,0.2)' : '#fef3c7',
                color: isHubExpanded ? '#D4AF37' : '#92400e',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700'
              }}>
                ⭐ {avgRating} / 5
              </span>
            </div>

            <div style={{
              background: isHubExpanded ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              color: isHubExpanded ? '#ffffff' : '#0A2E5D'
            }}>
              {isHubExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {/* Collapsible Hub Content */}
        {isHubExpanded && (
          <div style={{ padding: '24px' }} className="animate-fadeIn">
            
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
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

            {/* Notification Settings Sub-panel */}
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
                    അറിയിപ്പുകൾ ആർക്കൊക്കെ പോകണം? (Notification Recipients & Triggers)
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
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                  <span>Active Service Calls</span>
                  <Bell size={16} color={activeTasks.length > 0 ? '#e11d48' : '#10b981'} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: activeTasks.length > 0 ? '#e11d48' : '#0A2E5D', marginTop: '6px' }}>
                  {activeTasks.length}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {activeTasks.length > 0 ? 'Counters need attendance' : 'All requests attended'}
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                  <span>Overall Rating (CSAT)</span>
                  <Star size={16} color="#D4AF37" fill="#D4AF37" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#D4AF37', marginTop: '6px' }}>
                  {avgRating} <span style={{ fontSize: '14px', color: '#64748b' }}>/ 5.0</span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Based on {reviews.length} customer ratings
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                  <span>Total Feedbacks</span>
                  <Users size={16} color="#0A2E5D" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#0A2E5D', marginTop: '6px' }}>
                  {tickets.length}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {reviews.length} Reviews • {serviceCalls.length} Service Calls
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                  <span>Avg Response Speed</span>
                  <Clock size={16} color="#10b981" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '6px' }}>
                  {avgResolutionSec}s
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
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
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
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

                          <span style={{ fontSize: '12px', color: '#0A2E5D', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
        )}
      </div>

      {/* ========================================================
          BOX 2: Page Contents: Dorek Pulse QR Content & Links (Collapsible)
          ======================================================== */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        overflow: 'hidden'
      }}>
        {/* Clickable Header Bar */}
        <div 
          onClick={() => setIsContentExpanded(!isContentExpanded)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 22px',
            background: isContentExpanded ? 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)' : '#f8fafc',
            color: isContentExpanded ? '#ffffff' : '#0A2E5D',
            cursor: 'pointer',
            borderBottom: isContentExpanded ? '2px solid #D4AF37' : 'none',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: isContentExpanded ? '#D4AF37' : '#0A2E5D',
              color: isContentExpanded ? '#0A2E5D' : '#ffffff',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex'
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: isContentExpanded ? '#D4AF37' : '#0A2E5D' }}>
                Page Contents: Dorek Pulse QR Content & Links Editor (ക്യുആർ പേജ് ഉള്ളടക്കങ്ങളും ലിങ്കുകളും)
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: isContentExpanded ? '#cbd5e1' : '#64748b' }}>
                Edit all texts, headings, rating tags, website redirect links & WhatsApp contact across your QR pages
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: isContentExpanded ? 'rgba(212,175,55,0.2)' : '#e0f2fe',
              color: isContentExpanded ? '#D4AF37' : '#0369a1',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700'
            }}>
              Live Content Sync
            </span>

            <div style={{
              background: isContentExpanded ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              color: isContentExpanded ? '#ffffff' : '#0A2E5D'
            }}>
              {isContentExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {/* Collapsible Content Editor */}
        {isContentExpanded && (
          <div style={{ padding: '24px' }} className="animate-fadeIn">
            
            {contentStatus && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: contentStatus.includes('വിജയകരമായി') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: contentStatus.includes('വിജയകരമായി') ? '1px solid #10b981' : '1px solid #ef4444',
                color: contentStatus.includes('വിജയകരമായി') ? '#065f46' : '#991b1b',
                fontSize: '13px',
                fontWeight: '700',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                {contentStatus}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Section 1: Brand & Top Header */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#D4AF37" /> Brand & Top Header
                </h4>
                
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Brand Name / Top Title
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.brandTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, brandTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Footer Notice Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.footerNotice || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, footerNotice: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Section 2: Review Screen Texts */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={16} color="#D4AF37" /> Customer Review Texts
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Review Form Title
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.reviewHeaderTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, reviewHeaderTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Submit Review Button Label
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.submitReviewBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, submitReviewBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Comments Box Placeholder
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.commentPlaceholder || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, commentPlaceholder: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Section 3: Call Staff Screen Texts */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={16} color="#ef4444" /> Staff Call / Service Request Texts
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Call Staff Header Title
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.callStaffHeaderTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, callStaffHeaderTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Call Staff Button Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.callStaffBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, callStaffBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Section 4: Post-Review Delight & Links */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={16} color="#10b981" /> Post-Review Screen & Redirect Links
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Thank You Title
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.thankYouReviewTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, thankYouReviewTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Thank You Message
                  </label>
                  <textarea 
                    rows={2}
                    value={pageContent.thankYouReviewMessage || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, thankYouReviewMessage: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '4px', textTransform: 'uppercase' }}>
                    🌐 Website Redirect Button Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D4AF37', fontSize: '13px', boxSizing: 'border-box', fontWeight: '600' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '4px', textTransform: 'uppercase' }}>
                    🔗 Website URL (Link)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteUrl || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteUrl: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D4AF37', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0369a1', marginBottom: '4px', textTransform: 'uppercase' }}>
                    💬 WhatsApp Button Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0369a1', marginBottom: '4px', textTransform: 'uppercase' }}>
                    📱 WhatsApp Link / Phone (wa.me)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappUrl || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappUrl: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

            </div>

            {/* Save Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
              <button
                onClick={handleResetContent}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#64748b',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={15} /> Reset to Defaults
              </button>

              <button
                onClick={handleSavePageContent}
                disabled={savingContent}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
                  color: '#D4AF37',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(10,46,93,0.3)'
                }}
              >
                <Save size={16} />
                {savingContent ? 'Saving Content...' : 'Save QR Page Content & Links (സേവ് ചെയ്യുക)'}
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
