import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  QrCode, Star, Bell, CheckCircle2, Clock, Trash2, Download, 
  Search, Filter, ExternalLink, RefreshCw, AlertTriangle, MapPin, Users,
  Mail, Settings, Save, Check, Send, ShieldAlert, Phone, ChevronDown, ChevronUp,
  FileText, Globe, MessageCircle, Sparkles, Layers, RotateCcw, Eye, CheckCheck,
  Smartphone, Columns, Maximize2, Plus, X, Tag
} from 'lucide-react';

const DEFAULT_PAGE_CONTENT = {
  // 1. Landing Page
  landingBadge: 'DOREK PULSE PLATFORM',
  landingMainTitle: 'Smart QR Customer Experience & Live Service Dispatch',
  landingSubtitle: 'Real-time customer feedback, instant staff service calls, table/counter dispatching, and analytics for Dorek physical outlets.',
  landingCard1Btn: 'Test Customer View',
  landingCard2Btn: 'Open Staff Board',
  landingCard3Btn: 'Launch QR Studio',

  // 2. Scan & Review Form
  brandTitle: 'DOREK INTERNATIONAL',
  reviewHeaderTitle: 'Rate Your Shopping Experience',
  star5Text: '🌟 Outstanding Experience!',
  star4Text: '😊 Very Good Experience',
  star3Text: '😐 Average Experience',
  star2Text: '😕 Needs Improvement',
  star1Text: '⚠️ Poor Experience',
  tagsLabel: 'What stood out to you?',
  highTags: ['🌟 Excellent Service', '🛍️ Great Product Quality', '⚡ Fast Checkout', '🤝 Helpful Staff', '✨ Clean & Organized', '💎 Best Value'],
  mediumTags: ['👍 Good Service', '📦 Good Variety', '💳 Fair Pricing', '⌛ Normal Wait Time'],
  lowTags: ['⏳ Slow Service', '📉 Out of Stock', '🧾 Billing Delay', '👤 Staff Assistance Needed', '🛠️ Quality Issue', '📢 Needs Management Attention'],
  namePlaceholder: 'Name (Optional)',
  phonePlaceholder: 'Phone (Optional)',
  commentPlaceholder: 'Share any additional comments or suggestions...',
  submitReviewBtnText: 'Submit Feedback',

  // 3. Staff Call Screen
  callStaffHeaderTitle: 'Call Staff to Your Counter',
  serviceOpt1Label: 'Product Assistance',
  serviceOpt1Desc: 'Need help finding an item or product specs',
  serviceOpt2Label: 'Price / Offer Check',
  serviceOpt2Desc: 'Verify price, stock, or promotional discounts',
  serviceOpt3Label: 'Billing / Payment Help',
  serviceOpt3Desc: 'Assistance with checkout, UPI, or billing speed',
  serviceOpt4Label: 'Packaging / Delivery',
  serviceOpt4Desc: 'Need gift wrapping, carry bag, or delivery info',
  serviceOpt5Label: 'Speak with Store Manager',
  serviceOpt5Desc: 'Direct escalation to outlet supervisor',
  callStaffNotePlaceholder: 'Add a note (e.g. Inquiring about solar battery warranty)...',
  callStaffBtnText: 'Call Staff Now',

  // 4. Thank You & WhatsApp Links
  thankYouReviewTitle: 'Thank You for Your Feedback!',
  thankYouReviewMessage: 'Your feedback helps us provide the best engineering and retail experience across all our outlets.',
  thankYouServiceTitle: 'Staff Alerted Successfully!',
  thankYouServiceMessage: 'Our counter supervisor is on their way to assist you.',
  promoBadge: 'Explore Our Engineering & Products',
  promoTitle: 'Discover Dorek International Online',
  websiteBtnText: 'Visit Dorek International (dorek.in) →',
  websiteUrl: 'https://dorek.in',
  whatsappBtnText: '💬 Chat with Outlet on WhatsApp',
  whatsappPhone: '+919747522000',
  whatsappPretext: 'Hi Dorek International, I visited your outlet and would like to connect with your team.',
  resetBtnText: 'Submit Another Response',
  footerNotice: 'Powered by Dorek Pulse • Official Outlet Customer System'
};

export default function SmartQRTab() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sub-filter for Hub Submissions: 'all' | 'new' | 'attending' | 'resolved' | 'review' | 'service_call'
  const [hubFilter, setHubFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Page Content Sub-category: 'review' | 'thankyou' | 'service' | 'landing'
  const [contentCategory, setContentCategory] = useState('review');

  // Input states for adding new suggestion tags
  const [newHighTag, setNewHighTag] = useState('');
  const [newMedTag, setNewMedTag] = useState('');
  const [newLowTag, setNewLowTag] = useState('');

  // Notification Settings State
  const [showNotifyPanel, setShowNotifyPanel] = useState(false);
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
          const data = snap.data();
          setPageContent(prev => ({
            ...prev,
            ...data,
            highTags: (data.highTags && data.highTags.length > 0) ? data.highTags : prev.highTags,
            mediumTags: (data.mediumTags && data.mediumTags.length > 0) ? data.mediumTags : prev.mediumTags,
            lowTags: (data.lowTags && data.lowTags.length > 0) ? data.lowTags : prev.lowTags
          }));
        }
      } catch (err) {
        console.error('Error loading pulse page content:', err);
      }
    };
    loadPageContent();

    return () => unsubscribe();
  }, []);

  // Tag Management Handlers
  const handleAddTag = (group) => {
    if (group === 'high' && newHighTag.trim()) {
      const current = pageContent.highTags || DEFAULT_PAGE_CONTENT.highTags;
      if (!current.includes(newHighTag.trim())) {
        setPageContent({ ...pageContent, highTags: [...current, newHighTag.trim()] });
      }
      setNewHighTag('');
    } else if (group === 'medium' && newMedTag.trim()) {
      const current = pageContent.mediumTags || DEFAULT_PAGE_CONTENT.mediumTags;
      if (!current.includes(newMedTag.trim())) {
        setPageContent({ ...pageContent, mediumTags: [...current, newMedTag.trim()] });
      }
      setNewMedTag('');
    } else if (group === 'low' && newLowTag.trim()) {
      const current = pageContent.lowTags || DEFAULT_PAGE_CONTENT.lowTags;
      if (!current.includes(newLowTag.trim())) {
        setPageContent({ ...pageContent, lowTags: [...current, newLowTag.trim()] });
      }
      setNewLowTag('');
    }
  };

  const handleRemoveTag = (group, tagToRemove) => {
    if (group === 'high') {
      const current = pageContent.highTags || DEFAULT_PAGE_CONTENT.highTags;
      setPageContent({ ...pageContent, highTags: current.filter(t => t !== tagToRemove) });
    } else if (group === 'medium') {
      const current = pageContent.mediumTags || DEFAULT_PAGE_CONTENT.mediumTags;
      setPageContent({ ...pageContent, mediumTags: current.filter(t => t !== tagToRemove) });
    } else if (group === 'low') {
      const current = pageContent.lowTags || DEFAULT_PAGE_CONTENT.lowTags;
      setPageContent({ ...pageContent, lowTags: current.filter(t => t !== tagToRemove) });
    }
  };

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
      setSettingsStatus('അറിയിപ്പ് ക്രമീകരണങ്ങൾ സേവ് ചെയ്തു!');
      setTimeout(() => setSettingsStatus(''), 4000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setSettingsStatus('Error: ' + err.message);
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

      await fetch('/api/contact', {
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

      setSettingsStatus('ടെസ്റ്റ് ഇമെയിൽ വിജയകരമായി അയച്ചു!');
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
      setContentStatus('ക്യുആർ പേജ് ഉള്ളടക്കങ്ങളും സജഷൻ ടാഗുകളും വിജയകരമായി സേവ് ചെയ്തു!');
      setTimeout(() => setContentStatus(''), 4000);
    } catch (err) {
      console.error('Failed to save page content:', err);
      setContentStatus('Error: ' + err.message);
    } finally {
      setSavingContent(false);
    }
  };

  const handleResetContent = () => {
    if (window.confirm('എല്ലാ ടെക്സ്റ്റുകളും സജഷൻ ടാഗുകളും ഡിഫോൾട്ട് രീതിയിലേക്ക് റീസെറ്റ് ചെയ്യണോ?')) {
      setPageContent(DEFAULT_PAGE_CONTENT);
    }
  };

  const handleMarkAsRead = async (ticketId) => {
    try {
      const ticketRef = doc(db, 'dorek_pulse_tickets', ticketId);
      await updateDoc(ticketRef, { 
        isRead: true,
        readAt: Date.now()
      });
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadTickets = tickets.filter(t => !t.isRead || t.status === 'new');
    if (unreadTickets.length === 0) return alert('No unread tickets.');
    
    try {
      for (const t of unreadTickets) {
        const ticketRef = doc(db, 'dorek_pulse_tickets', t.id);
        await updateDoc(ticketRef, { isRead: true, readAt: Date.now() });
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleResolve = async (ticketId) => {
    try {
      const ticketRef = doc(db, 'dorek_pulse_tickets', ticketId);
      const ticket = tickets.find(t => t.id === ticketId);
      const updates = { 
        status: 'resolved',
        isRead: true,
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
    
    const headers = ['ID', 'Date', 'Type', 'Outlet', 'Counter', 'Rating', 'Tags', 'Customer Name', 'Phone', 'Message', 'Status', 'Read Status', 'Resolution Time (Sec)'];
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
      t.isRead ? 'Read' : 'Unread (New)',
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
  const unreadTickets = tickets.filter(t => !t.isRead && (t.status === 'new' || !t.status));
  
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviews.length).toFixed(1)
    : '5.0';

  const resolvedWithTime = tickets.filter(t => t.resolutionTimeSeconds);
  const avgResolutionSec = resolvedWithTime.length > 0
    ? Math.round(resolvedWithTime.reduce((acc, curr) => acc + curr.resolutionTimeSeconds, 0) / resolvedWithTime.length)
    : 45;

  const filteredTickets = tickets.filter(t => {
    if (hubFilter === 'new') {
      if (t.isRead && t.status !== 'new') return false;
    } else if (hubFilter === 'attending') {
      if (t.status !== 'attending') return false;
    } else if (hubFilter === 'resolved') {
      if (t.status !== 'resolved') return false;
    } else if (hubFilter === 'review') {
      if (t.type !== 'review') return false;
    } else if (hubFilter === 'service_call') {
      if (t.type !== 'service_call') return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (t.customerName || '').toLowerCase().includes(q);
      const matchCounter = (t.counter || '').toLowerCase().includes(q);
      const matchOutlet = (t.outlet || '').toLowerCase().includes(q);
      const matchMsg = (t.message || '').toLowerCase().includes(q);
      const matchPhone = (t.customerPhone || '').toLowerCase().includes(q);
      return matchName || matchCounter || matchOutlet || matchMsg || matchPhone;
    }
    return true;
  });

  const highTagsList = pageContent.highTags || DEFAULT_PAGE_CONTENT.highTags;
  const medTagsList = pageContent.mediumTags || DEFAULT_PAGE_CONTENT.mediumTags;
  const lowTagsList = pageContent.lowTags || DEFAULT_PAGE_CONTENT.lowTags;

  return (
    <div className="admin-panel-card animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* ========================================================
          TOP HEADER & KPI BAR
          ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0A2E5D',
        padding: '16px 20px',
        borderRadius: '14px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#D4AF37', color: '#0A2E5D', padding: '8px 10px', borderRadius: '10px', display: 'flex' }}>
            <QrCode size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#D4AF37' }}>
              Dorek Pulse — Smart QR & Outlet Hub
            </h2>
            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
              Live Customer Ratings, Service Dispatch & Dynamic Content Manager
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowNotifyPanel(!showNotifyPanel)}
            style={{ 
              padding: '8px 14px', borderRadius: '8px', border: '1px solid #D4AF37', 
              backgroundColor: showNotifyPanel ? '#D4AF37' : 'rgba(255,255,255,0.1)', 
              color: showNotifyPanel ? '#0A2E5D' : '#ffffff', 
              cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '12px'
            }}
          >
            <Mail size={14} /> {showNotifyPanel ? 'Hide Email Settings' : 'Email Alert Settings (അറിയിപ്പുകൾ)'}
          </button>

          <button 
            onClick={handleExportCSV}
            style={{ 
              padding: '8px 14px', borderRadius: '8px', border: 'none', 
              backgroundColor: '#10b981', color: '#fff', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '12px'
            }}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Optional Email Notification Settings Banner */}
      {showNotifyPanel && (
        <div style={{
          background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          padding: '20px',
          color: '#ffffff'
        }} className="animate-fadeIn">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Mail size={18} color="#D4AF37" />
            <h4 style={{ margin: 0, color: '#D4AF37', fontSize: '15px' }}>
              ഇമെയിൽ അറിയിപ്പ് വിലാസങ്ങളും ക്രമീകരണങ്ങളും (Email Alert Settings)
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#D4AF37', marginBottom: '4px', textTransform: 'uppercase' }}>
                Alert Recipient Emails (ഇമെയിൽ വിലാസങ്ങൾ)
              </label>
              <input 
                type="text" 
                value={emailsInput}
                onChange={(e) => setEmailsInput(e.target.value)}
                placeholder="info@dorek.in, manager@dorek.in"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff', color: '#0A2E5D', fontWeight: '600', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={notifyOnServiceCall} onChange={(e) => setNotifyOnServiceCall(e.target.checked)} style={{ accentColor: '#D4AF37' }} />
                <span>🛎️ Staff Calls</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={notifyOnLowRating} onChange={(e) => setNotifyOnLowRating(e.target.checked)} style={{ accentColor: '#D4AF37' }} />
                <span>⚠️ Low Ratings</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={notifyOnAllReviews} onChange={(e) => setNotifyOnAllReviews(e.target.checked)} style={{ accentColor: '#D4AF37' }} />
                <span>⭐ All Reviews</span>
              </label>
            </div>
          </div>

          {settingsStatus && (
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#fff', fontSize: '12px', marginBottom: '12px' }}>
              {settingsStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSaveNotificationSettings} disabled={savingSettings} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#D4AF37', color: '#0A2E5D', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
              {savingSettings ? 'Saving...' : 'Save Notification Settings'}
            </button>
            <button onClick={handleSendTestAlert} disabled={testSending} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>
              {testSending ? 'Sending...' : 'Send Live Test Alert'}
            </button>
          </div>
        </div>
      )}

      {/* KPI Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Unread Submissions</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: unreadTickets.length > 0 ? '#ef4444' : '#0A2E5D', marginTop: '4px' }}>
            {unreadTickets.length} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>/ {activeTasks.length} Active</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #D4AF37' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>CSAT Rating</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#D4AF37', marginTop: '4px' }}>
            {avgRating} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>/ 5.0</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #0A2E5D' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Feedbacks</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#0A2E5D', marginTop: '4px' }}>
            {tickets.length}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Avg Resolution</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
            {avgResolutionSec}s
          </div>
        </div>
      </div>

      {/* ========================================================
          HORIZONTAL 2-COLUMN SPLIT: 
          LEFT = Live Service Hub & Submissions
          RIGHT = Page Content & Links Editor (Directly Visible!)
          ======================================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>

        {/* ------------------------------------------------------
            COLUMN 1: Live Service Hub & Customer Submissions
            ------------------------------------------------------ */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '2px solid #f1f5f9' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} color="#ef4444" /> Live Customer Submissions & Service Calls
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                Incoming customer ratings, service requests and staff dispatch
              </p>
            </div>

            {unreadTickets.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#0A2E5D',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCheck size={13} color="#10b981" /> Mark All Read
              </button>
            )}
          </div>

          {/* Quick Filters Bar */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setHubFilter('all')}
              style={{
                padding: '5px 10px', borderRadius: '6px',
                border: hubFilter === 'all' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                background: hubFilter === 'all' ? '#0A2E5D' : '#f8fafc',
                color: hubFilter === 'all' ? '#fff' : '#334155',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              All ({tickets.length})
            </button>

            <button
              onClick={() => setHubFilter('new')}
              style={{
                padding: '5px 10px', borderRadius: '6px',
                border: hubFilter === 'new' ? '1px solid #ef4444' : '1px solid #fee2e2',
                background: hubFilter === 'new' ? '#ef4444' : '#fff5f5',
                color: hubFilter === 'new' ? '#fff' : '#991b1b',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🔴 New ({unreadTickets.length})
            </button>

            <button
              onClick={() => setHubFilter('attending')}
              style={{
                padding: '5px 10px', borderRadius: '6px',
                border: hubFilter === 'attending' ? '1px solid #f59e0b' : '1px solid #fef3c7',
                background: hubFilter === 'attending' ? '#f59e0b' : '#fffbeb',
                color: hubFilter === 'attending' ? '#fff' : '#92400e',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🟡 In Progress
            </button>

            <button
              onClick={() => setHubFilter('resolved')}
              style={{
                padding: '5px 10px', borderRadius: '6px',
                border: hubFilter === 'resolved' ? '1px solid #10b981' : '1px solid #d1fae5',
                background: hubFilter === 'resolved' ? '#10b981' : '#f0fdf4',
                color: hubFilter === 'resolved' ? '#fff' : '#065f46',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🟢 Resolved
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search customer, phone, counter..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '6px 10px 6px 30px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tickets Stream List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredTickets.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
                <CheckCircle2 size={30} color="#10b981" style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '13px' }}>No submissions found in this filter.</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => {
                const isNew = !ticket.isRead && (ticket.status === 'new' || !ticket.status);
                const isAttending = ticket.status === 'attending';
                const isResolved = ticket.status === 'resolved';
                const isReview = ticket.type === 'review';

                return (
                  <div
                    key={ticket.id}
                    style={{
                      background: isNew ? '#fffbf0' : '#ffffff',
                      border: isNew ? '1px solid #fde68a' : '1px solid #e2e8f0',
                      borderLeft: isNew ? '4px solid #ef4444' : (isAttending ? '4px solid #f59e0b' : '4px solid #10b981'),
                      borderRadius: '8px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isNew && (
                          <span style={{ background: '#ef4444', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontSize: '9px', fontWeight: '800' }}>
                            NEW
                          </span>
                        )}
                        <span style={{
                          background: isResolved ? '#d1fae5' : (isAttending ? '#fef3c7' : '#fee2e2'),
                          color: isResolved ? '#065f46' : (isAttending ? '#92400e' : '#991b1b'),
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: '700'
                        }}>
                          {isResolved ? 'RESOLVED' : (isAttending ? 'IN PROGRESS' : 'NEW')}
                        </span>
                        <span style={{ fontSize: '11px', color: '#0A2E5D', fontWeight: '700' }}>
                          📍 {ticket.counter} ({ticket.outlet})
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                        {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 style={{ margin: 0, fontSize: '13px', color: '#1e293b' }}>
                      {ticket.requestType || (isReview ? `⭐ ${ticket.rating} Star Rating` : 'Service Call')}
                    </h4>

                    {ticket.tags && ticket.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {ticket.tags.map((tag, idx) => (
                          <span key={idx} style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: '6px', fontSize: '10px', color: '#475569' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {ticket.message && (
                      <p style={{ margin: 0, fontSize: '12px', color: '#334155', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', lineHeight: '1.4' }}>
                        "{ticket.message}"
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        👤 <strong>{ticket.customerName || 'Anonymous'}</strong> {ticket.customerPhone && `| 📞 ${ticket.customerPhone}`}
                      </span>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        {isNew && (
                          <button
                            onClick={() => handleMarkAsRead(ticket.id)}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', color: '#0A2E5D', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            title="Mark as Read"
                          >
                            Mark Read
                          </button>
                        )}
                        {!isResolved && (
                          <button
                            onClick={() => handleResolve(ticket.id)}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: '#10b981', color: '#fff', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ------------------------------------------------------
            COLUMN 2: Page Contents & Links Editor (DIRECTLY VISIBLE!)
            ------------------------------------------------------ */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '2px solid #f1f5f9', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#D4AF37" /> QR Page Contents & Suggestions Editor
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                Manage all text fields, feedback suggestions & WhatsApp links
              </p>
            </div>

            <button
              onClick={handleSavePageContent}
              disabled={savingContent}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
                color: '#D4AF37',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(10,46,93,0.3)'
              }}
            >
              <Save size={14} />
              {savingContent ? 'Saving...' : 'Save All Content'}
            </button>
          </div>

          {contentStatus && (
            <div style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: '#065f46',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={14} />
              {contentStatus}
            </div>
          )}

          {/* Sub-category Pill Buttons */}
          <div style={{ display: 'flex', gap: '6px', background: '#f8fafc', padding: '4px', borderRadius: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setContentCategory('review')}
              style={{
                padding: '6px 12px', borderRadius: '6px', border: 'none',
                background: contentCategory === 'review' ? '#0A2E5D' : 'transparent',
                color: contentCategory === 'review' ? '#D4AF37' : '#64748b',
                fontWeight: '700', fontSize: '11px', cursor: 'pointer'
              }}
            >
              ⭐ Review Form & Suggestions (സജഷൻസ്)
            </button>
            <button
              onClick={() => setContentCategory('thankyou')}
              style={{
                padding: '6px 12px', borderRadius: '6px', border: 'none',
                background: contentCategory === 'thankyou' ? '#0A2E5D' : 'transparent',
                color: contentCategory === 'thankyou' ? '#D4AF37' : '#64748b',
                fontWeight: '700', fontSize: '11px', cursor: 'pointer'
              }}
            >
              💬 WhatsApp & Links
            </button>
            <button
              onClick={() => setContentCategory('service')}
              style={{
                padding: '6px 12px', borderRadius: '6px', border: 'none',
                background: contentCategory === 'service' ? '#0A2E5D' : 'transparent',
                color: contentCategory === 'service' ? '#D4AF37' : '#64748b',
                fontWeight: '700', fontSize: '11px', cursor: 'pointer'
              }}
            >
              🛎️ Staff Call Options
            </button>
            <button
              onClick={() => setContentCategory('landing')}
              style={{
                padding: '6px 12px', borderRadius: '6px', border: 'none',
                background: contentCategory === 'landing' ? '#0A2E5D' : 'transparent',
                color: contentCategory === 'landing' ? '#D4AF37' : '#64748b',
                fontWeight: '700', fontSize: '11px', cursor: 'pointer'
              }}
            >
              🏠 Landing Page
            </button>
          </div>

          {/* ========================================================
              CATEGORY 1: REVIEW FORM & SUGGESTIONS TAGS (USER REQUESTED!)
              ======================================================== */}
          {contentCategory === 'review' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fadeIn">
              
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Form Title</label>
                <input type="text" value={pageContent.reviewHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, reviewHeaderTitle: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Submit Button Label</label>
                <input type="text" value={pageContent.submitReviewBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, submitReviewBtnText: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              {/* Star Taglines */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>5-Star Tagline</label>
                  <input type="text" value={pageContent.star5Text || ''} onChange={(e) => setPageContent({ ...pageContent, star5Text: e.target.value })} style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>4-Star Tagline</label>
                  <input type="text" value={pageContent.star4Text || ''} onChange={(e) => setPageContent({ ...pageContent, star4Text: e.target.value })} style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>3-Star Tagline</label>
                  <input type="text" value={pageContent.star3Text || ''} onChange={(e) => setPageContent({ ...pageContent, star3Text: e.target.value })} style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>1-2 Star Tagline</label>
                  <input type="text" value={pageContent.star1Text || ''} onChange={(e) => setPageContent({ ...pageContent, star1Text: e.target.value })} style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* ----------------------------------------------------
                  SUGGESTIONS / SENTIMENT TAGS MANAGER WITH ADD BUTTONS
                  ---------------------------------------------------- */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={15} color="#D4AF37" />
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#0A2E5D' }}>
                    Customer Suggestions / Sentiment Tags (സജഷൻ ടാഗുകൾ)
                  </h4>
                </div>

                {/* 1. High Rating Suggestions (4-5 Stars) */}
                <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#15803d' }}>
                      🌟 4-5 Star Suggestions (High Rating)
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{highTagsList.length} tags</span>
                  </div>

                  {/* Badges with Delete button */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {highTagsList.map((tag, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          color: '#166534',
                          padding: '3px 8px',
                          borderRadius: '14px',
                          fontSize: '11px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('high', tag)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}
                          title="Remove Tag"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Input + Add Button */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={newHighTag}
                      onChange={(e) => setNewHighTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('high'))}
                      placeholder="Type suggestion (e.g. ⚡ Friendly Staff)..."
                      style={{ flex: 1, padding: '5px 8px', borderRadius: '6px', border: '1px solid #86efac', fontSize: '11px', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('high')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#15803d',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={13} /> Add Tag
                    </button>
                  </div>
                </div>

                {/* 2. Medium Rating Suggestions (3 Stars) */}
                <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #fef3c7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#b45309' }}>
                      👍 3-Star Suggestions (Average Rating)
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{medTagsList.length} tags</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {medTagsList.map((tag, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          background: '#fffbeb',
                          border: '1px solid #fde68a',
                          color: '#92400e',
                          padding: '3px 8px',
                          borderRadius: '14px',
                          fontSize: '11px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('medium', tag)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}
                          title="Remove Tag"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={newMedTag}
                      onChange={(e) => setNewMedTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('medium'))}
                      placeholder="Type suggestion (e.g. 💳 Fair Pricing)..."
                      style={{ flex: 1, padding: '5px 8px', borderRadius: '6px', border: '1px solid #fde68a', fontSize: '11px', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('medium')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#b45309',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={13} /> Add Tag
                    </button>
                  </div>
                </div>

                {/* 3. Low Rating Suggestions (1-2 Stars) */}
                <div style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#b91c1c' }}>
                      ⚠️ 1-2 Star Suggestions (Needs Improvement)
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{lowTagsList.length} tags</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {lowTagsList.map((tag, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          color: '#991b1b',
                          padding: '3px 8px',
                          borderRadius: '14px',
                          fontSize: '11px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('low', tag)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}
                          title="Remove Tag"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={newLowTag}
                      onChange={(e) => setNewLowTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('low'))}
                      placeholder="Type suggestion (e.g. ⏳ Billing Delay)..."
                      style={{ flex: 1, padding: '5px 8px', borderRadius: '6px', border: '1px solid #fecaca', fontSize: '11px', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('low')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#b91c1c',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={13} /> Add Tag
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Category 2: WhatsApp & Links */}
          {contentCategory === 'thankyou' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fadeIn">
              
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                  💬 WhatsApp Button Label
                </label>
                <input 
                  type="text" 
                  value={pageContent.whatsappBtnText || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, whatsappBtnText: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #86efac', fontSize: '12px', boxSizing: 'border-box', marginBottom: '8px' }}
                />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                  📱 WhatsApp Phone Number (with Country code)
                </label>
                <input 
                  type="text" 
                  value={pageContent.whatsappPhone || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, whatsappPhone: e.target.value })}
                  placeholder="+919747522000"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #86efac', fontSize: '12px', boxSizing: 'border-box', marginBottom: '8px' }}
                />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                  📝 WhatsApp Pre-text Message (കസ്റ്റമർ ക്ലിക്ക് ചെയ്യുമ്പോൾ വരുന്നത്)
                </label>
                <textarea 
                  rows={2}
                  value={pageContent.whatsappPretext || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, whatsappPretext: e.target.value })}
                  placeholder="Hi Dorek International, I visited your outlet and would like to connect with your team."
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #22c55e', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', padding: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                  🌐 Website Button Label
                </label>
                <input 
                  type="text" 
                  value={pageContent.websiteBtnText || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, websiteBtnText: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #fde047', fontSize: '12px', boxSizing: 'border-box', marginBottom: '8px' }}
                />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                  🔗 Website URL
                </label>
                <input 
                  type="text" 
                  value={pageContent.websiteUrl || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, websiteUrl: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #fde047', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Thank You Title & Message
                </label>
                <input 
                  type="text" 
                  value={pageContent.thankYouReviewTitle || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouReviewTitle: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', marginBottom: '6px' }}
                />
                <textarea 
                  rows={2}
                  value={pageContent.thankYouReviewMessage || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouReviewMessage: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

            </div>
          )}

          {/* Category 3: Staff Call Options */}
          {contentCategory === 'service' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="animate-fadeIn">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Call Staff Header</label>
                <input type="text" value={pageContent.callStaffHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffHeaderTitle: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Button Text</label>
                <input type="text" value={pageContent.callStaffBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffBtnText: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Option 1: Product Assistance</label>
                <input type="text" value={pageContent.serviceOpt1Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Label: e.target.value })} style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box', marginBottom: '4px' }} />
                <input type="text" value={pageContent.serviceOpt1Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '10px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>
            </div>
          )}

          {/* Category 4: Landing Page */}
          {contentCategory === 'landing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="animate-fadeIn">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Main Title Heading</label>
                <input type="text" value={pageContent.landingMainTitle || ''} onChange={(e) => setPageContent({ ...pageContent, landingMainTitle: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>Subtitle Description</label>
                <textarea rows={2} value={pageContent.landingSubtitle || ''} onChange={(e) => setPageContent({ ...pageContent, landingSubtitle: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
            <button onClick={handleResetContent} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', color: '#64748b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
              Reset Defaults
            </button>
            <button onClick={handleSavePageContent} disabled={savingContent} style={{ padding: '7px 18px', borderRadius: '6px', border: 'none', background: '#0A2E5D', color: '#D4AF37', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
              {savingContent ? 'Saving...' : 'Save QR Page Content & Tags'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
