import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  QrCode, Star, Bell, CheckCircle2, Clock, Trash2, Download, 
  Search, Filter, ExternalLink, RefreshCw, AlertTriangle, MapPin, Users,
  Mail, Settings, Save, Check, Send, ShieldAlert, Phone, ChevronDown, ChevronUp,
  FileText, Globe, MessageCircle, Sparkles, Layers, RotateCcw, Eye, EyeOff, CheckCheck,
  Smartphone, MessageSquare, ShoppingBag
} from 'lucide-react';

const DEFAULT_PAGE_CONTENT = {
  // 1. Landing Page
  landingBadge: 'DOREK PULSE PLATFORM',
  landingMainTitle: 'Smart QR Customer Experience & Live Service Dispatch',
  landingSubtitle: 'Real-time customer feedback, instant staff service calls, table/counter dispatching, and analytics for Dorek physical outlets.',
  landingCard1Title: 'Customer Mobile View',
  landingCard1Desc: 'What customers see when scanning table/counter QR codes: 5-star ratings, sentiment tags, and instant staff assistance calls.',
  landingCard1Btn: 'Test Customer View',
  landingCard2Title: 'Staff Operations Board',
  landingCard2Desc: 'Real-time dispatch board for outlet staff with audible chimes, active response SLA timer, and task completion buttons.',
  landingCard2Btn: 'Open Staff Board',
  landingCard3Title: 'Printable QR Stand Studio',
  landingCard3Desc: 'Generate and print high-resolution Table Tent cards and counter display stickers customized for any store department.',
  landingCard3Btn: 'Launch QR Studio',
  landingFooterBannerTitle: 'Connected with Dorek Central Admin',
  landingFooterBannerDesc: 'All incoming customer feedback, service response speeds, and analytics sync live to the Dorek Admin Dashboard.',

  // 2. Scan & Review Form
  brandTitle: 'DOREK INTERNATIONAL',
  reviewHeaderTitle: 'Rate Your Shopping Experience',
  star5Text: '🌟 Outstanding Experience!',
  star4Text: '😊 Very Good Experience',
  star3Text: '😐 Average Experience',
  star2Text: '😕 Needs Improvement',
  star1Text: '⚠️ Poor Experience',
  tagsLabel: 'What stood out to you?',
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

  // Top Horizontal Tab Navigation: 'hub' | 'content' | 'notifications'
  const [activeMainTab, setActiveMainTab] = useState('hub');

  // Sub-filter for Hub Submissions: 'all' | 'new' | 'attending' | 'resolved' | 'review' | 'service_call'
  const [hubFilter, setHubFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Content Sub-tab: 'landing' | 'review' | 'service' | 'thankyou'
  const [activeContentTab, setActiveContentTab] = useState('thankyou');

  // Notification Settings State
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

  return (
    <div className="admin-panel-card animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ========================================================
          TOP HORIZONTAL NAVIGATION BAR (Model Redesign)
          ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0A2E5D',
        padding: '12px 18px',
        borderRadius: '14px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: Brand / Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#D4AF37', color: '#0A2E5D', padding: '6px 8px', borderRadius: '8px', display: 'flex' }}>
            <QrCode size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#D4AF37' }}>
              Dorek Pulse Smart Outlet Engine
            </h3>
            <span style={{ fontSize: '11px', color: '#cbd5e1' }}>
              Live Customer Ratings, Service Dispatch & Content CMS
            </span>
          </div>
        </div>

        {/* Right: Horizontal Pill Navigation Buttons */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '4px', borderRadius: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveMainTab('hub')}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              border: 'none',
              background: activeMainTab === 'hub' ? '#D4AF37' : 'transparent',
              color: activeMainTab === 'hub' ? '#0A2E5D' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={15} />
            <span>Live Service Hub ({tickets.length})</span>
            {unreadTickets.length > 0 && (
              <span style={{ background: '#ef4444', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontSize: '10px', fontWeight: '800' }}>
                {unreadTickets.length} NEW
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('content')}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              border: 'none',
              background: activeMainTab === 'content' ? '#D4AF37' : 'transparent',
              color: activeMainTab === 'content' ? '#0A2E5D' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={15} />
            <span>Page Content & Links Editor (All Texts)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('notifications')}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              border: 'none',
              background: activeMainTab === 'notifications' ? '#D4AF37' : 'transparent',
              color: activeMainTab === 'notifications' ? '#0A2E5D' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Mail size={15} />
            <span>Email Alert Settings</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: LIVE SERVICE HUB & SUBMISSIONS
          ======================================================== */}
      {activeMainTab === 'hub' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fadeIn">
          
          {/* Horizontal KPI Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>Unread & Active Calls</span>
                <Bell size={16} color={unreadTickets.length > 0 ? '#e11d48' : '#10b981'} />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: unreadTickets.length > 0 ? '#e11d48' : '#0A2E5D', marginTop: '6px' }}>
                {unreadTickets.length} <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>/ {activeTasks.length} Active</span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {unreadTickets.length > 0 ? 'Requires attention / unread' : 'All tickets reviewed'}
              </span>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '4px solid #D4AF37' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>Overall CSAT Rating</span>
                <Star size={16} color="#D4AF37" fill="#D4AF37" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#D4AF37', marginTop: '6px' }}>
                {avgRating} <span style={{ fontSize: '13px', color: '#64748b' }}>/ 5.0</span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Based on {reviews.length} customer ratings
              </span>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '4px solid #0A2E5D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>Total Submissions</span>
                <Users size={16} color="#0A2E5D" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0A2E5D', marginTop: '6px' }}>
                {tickets.length}
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {reviews.length} Reviews • {serviceCalls.length} Service Calls
              </span>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>
                <span>Staff Response Speed</span>
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

          {/* Horizontal Filters & Action Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            padding: '14px 18px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {/* Horizontal Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setHubFilter('all')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'all' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                  background: hubFilter === 'all' ? '#0A2E5D' : '#f8fafc',
                  color: hubFilter === 'all' ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                All ({tickets.length})
              </button>

              <button
                onClick={() => setHubFilter('new')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'new' ? '1px solid #ef4444' : '1px solid #fee2e2',
                  background: hubFilter === 'new' ? '#ef4444' : '#fff5f5',
                  color: hubFilter === 'new' ? '#ffffff' : '#991b1b',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>🔴 New / Unread ({unreadTickets.length})</span>
              </button>

              <button
                onClick={() => setHubFilter('attending')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'attending' ? '1px solid #f59e0b' : '1px solid #fef3c7',
                  background: hubFilter === 'attending' ? '#f59e0b' : '#fffbeb',
                  color: hubFilter === 'attending' ? '#ffffff' : '#92400e',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🟡 In Progress ({tickets.filter(t => t.status === 'attending').length})
              </button>

              <button
                onClick={() => setHubFilter('resolved')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'resolved' ? '1px solid #10b981' : '1px solid #d1fae5',
                  background: hubFilter === 'resolved' ? '#10b981' : '#f0fdf4',
                  color: hubFilter === 'resolved' ? '#ffffff' : '#065f46',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🟢 Resolved ({tickets.filter(t => t.status === 'resolved').length})
              </button>

              <button
                onClick={() => setHubFilter('review')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'review' ? '1px solid #D4AF37' : '1px solid #e2e8f0',
                  background: hubFilter === 'review' ? '#D4AF37' : '#f8fafc',
                  color: hubFilter === 'review' ? '#0A2E5D' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                ⭐ Reviews ({reviews.length})
              </button>

              <button
                onClick={() => setHubFilter('service_call')}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: hubFilter === 'service_call' ? '1px solid #38bdf8' : '1px solid #e2e8f0',
                  background: hubFilter === 'service_call' ? '#38bdf8' : '#f8fafc',
                  color: hubFilter === 'service_call' ? '#0A2E5D' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🛎️ Staff Calls ({serviceCalls.length})
              </button>
            </div>

            {/* Actions: Search, Mark All Read, Export */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search customer, phone, counter..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px 7px 30px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              {unreadTickets.length > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#0A2E5D',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Mark All as Read"
                >
                  <CheckCheck size={14} color="#10b981" /> Mark All Read
                </button>
              )}

              <button 
                onClick={handleExportCSV}
                style={{ 
                  padding: '7px 14px', borderRadius: '8px', border: 'none', 
                  backgroundColor: '#10b981', color: '#fff', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '12px'
                }}
              >
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>

          {/* Submissions Stream List */}
          {filteredTickets.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 10px' }} />
              <p>No tickets or feedbacks found matching your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredTickets.map((ticket) => {
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
                      borderLeft: isNew ? '5px solid #ef4444' : (isAttending ? '5px solid #f59e0b' : '5px solid #10b981'),
                      borderRadius: '10px',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '14px',
                      flexWrap: 'wrap',
                      boxShadow: isNew ? '0 2px 8px rgba(239, 68, 68, 0.08)' : 'none'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        {isNew && (
                          <span style={{
                            background: '#ef4444',
                            color: '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '800',
                            letterSpacing: '0.5px'
                          }}>
                            NEW UNREAD
                          </span>
                        )}

                        <span style={{
                          background: isResolved ? '#d1fae5' : (isAttending ? '#fef3c7' : '#fee2e2'),
                          color: isResolved ? '#065f46' : (isAttending ? '#92400e' : '#991b1b'),
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {isResolved ? 'RESOLVED' : (isAttending ? 'IN PROGRESS' : 'NEW')}
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
                        <p style={{ margin: '4px 0', fontSize: '13px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', lineHeight: '1.4' }}>
                          "{ticket.message}"
                        </p>
                      )}

                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                        Customer: <strong>{ticket.customerName || 'Anonymous'}</strong> {ticket.customerPhone && (
                          <span style={{ marginLeft: '6px' }}>
                            | 📞 <a href={`tel:${ticket.customerPhone}`} style={{ color: '#0A2E5D', fontWeight: '700', textDecoration: 'none' }}>{ticket.customerPhone}</a>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ticket Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {isNew && (
                        <button
                          onClick={() => handleMarkAsRead(ticket.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#0A2E5D',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Mark this ticket as Read"
                        >
                          <Eye size={14} color="#0A2E5D" /> Mark Read
                        </button>
                      )}

                      {!isResolved && (
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: '#10b981',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: '700',
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

      {/* ========================================================
          TAB 2: PAGE CONTENT & LINKS EDITOR (All Texts)
          ======================================================== */}
      {activeMainTab === 'content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fadeIn">
          
          {/* Horizontal Sub-Category Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            padding: '12px 18px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveContentTab('thankyou')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: activeContentTab === 'thankyou' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                  background: activeContentTab === 'thankyou' ? '#0A2E5D' : '#f8fafc',
                  color: activeContentTab === 'thankyou' ? '#D4AF37' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MessageCircle size={14} color="#25D366" /> 🎉 Thank You Screen & WhatsApp Links
              </button>

              <button
                onClick={() => setActiveContentTab('review')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: activeContentTab === 'review' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                  background: activeContentTab === 'review' ? '#0A2E5D' : '#f8fafc',
                  color: activeContentTab === 'review' ? '#D4AF37' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Star size={14} color="#D4AF37" /> ⭐ Customer Review Form Texts
              </button>

              <button
                onClick={() => setActiveContentTab('service')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: activeContentTab === 'service' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                  background: activeContentTab === 'service' ? '#0A2E5D' : '#f8fafc',
                  color: activeContentTab === 'service' ? '#D4AF37' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Bell size={14} color="#ef4444" /> 🛎️ Staff Call Service Options
              </button>

              <button
                onClick={() => setActiveContentTab('landing')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: activeContentTab === 'landing' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                  background: activeContentTab === 'landing' ? '#0A2E5D' : '#f8fafc',
                  color: activeContentTab === 'landing' ? '#D4AF37' : '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Smartphone size={14} color="#38bdf8" /> 🏠 Landing Page Texts
              </button>
            </div>

            {/* Save Status & Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleResetContent}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                Reset
              </button>

              <button
                onClick={handleSavePageContent}
                disabled={savingContent}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
                  color: '#D4AF37',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={15} />
                {savingContent ? 'Saving...' : 'Save All Content & Links'}
              </button>
            </div>
          </div>

          {contentStatus && (
            <div style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: contentStatus.includes('വിജയകരമായി') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: contentStatus.includes('വിജയകരമായി') ? '1px solid #10b981' : '1px solid #ef4444',
              color: contentStatus.includes('വിജയകരമായി') ? '#065f46' : '#991b1b',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              {contentStatus}
            </div>
          )}

          {/* Sub-tab 1: Thank You Screen & WhatsApp */}
          {activeContentTab === 'thankyou' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }} className="animate-fadeIn">
              
              {/* Box A: WhatsApp Direct Settings */}
              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', borderTop: '4px solid #25D366' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={17} color="#25D366" /> WhatsApp Connect & Pre-text Message
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    WhatsApp Button Label (ബട്ടൺ ടെക്സ്റ്റ്)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    WhatsApp Phone Number (ഫോൺ നമ്പർ with Country code)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappPhone || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappPhone: e.target.value })}
                    placeholder="+919747522000"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#065f46', marginBottom: '4px', textTransform: 'uppercase' }}>
                    💬 WhatsApp Pre-filled Message (കസ്റ്റമർ ക്ലിക്ക് ചെയ്യുമ്പോൾ വരുന്നത്)
                  </label>
                  <textarea 
                    rows={3}
                    value={pageContent.whatsappPretext || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappPretext: e.target.value })}
                    placeholder="Hi Dorek International, I visited your outlet and would like to connect with your team."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #25D366', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    ഉദാ: "Hi Dorek, I visited your outlet and would like to inquire about..."
                  </span>
                </div>
              </div>

              {/* Box B: Website Redirect & Post-Review Titles */}
              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', borderTop: '4px solid #D4AF37' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={17} color="#D4AF37" /> Website Redirect Button & Thank You Texts
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Website Redirect Button Label
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Website URL (Link)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteUrl || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteUrl: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Review Thank You Title
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.thankYouReviewTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, thankYouReviewTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Review Thank You Subtitle Message
                  </label>
                  <textarea 
                    rows={2}
                    value={pageContent.thankYouReviewMessage || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, thankYouReviewMessage: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

            </div>
          )}

          {/* Sub-tab 2: Customer Review Form Texts */}
          {activeContentTab === 'review' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }} className="animate-fadeIn">
              
              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  ⭐ Form Headings & Labels
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Review Form Title</label>
                  <input type="text" value={pageContent.reviewHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, reviewHeaderTitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Sentiment Tags Section Label</label>
                  <input type="text" value={pageContent.tagsLabel || ''} onChange={(e) => setPageContent({ ...pageContent, tagsLabel: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Submit Button Label</label>
                  <input type="text" value={pageContent.submitReviewBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, submitReviewBtnText: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Comments Placeholder</label>
                  <input type="text" value={pageContent.commentPlaceholder || ''} onChange={(e) => setPageContent({ ...pageContent, commentPlaceholder: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  🌟 Star Rating Response Taglines
                </h4>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>5-Star Tagline</label>
                  <input type="text" value={pageContent.star5Text || ''} onChange={(e) => setPageContent({ ...pageContent, star5Text: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>4-Star Tagline</label>
                  <input type="text" value={pageContent.star4Text || ''} onChange={(e) => setPageContent({ ...pageContent, star4Text: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>3-Star Tagline</label>
                  <input type="text" value={pageContent.star3Text || ''} onChange={(e) => setPageContent({ ...pageContent, star3Text: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>2-Star Tagline</label>
                  <input type="text" value={pageContent.star2Text || ''} onChange={(e) => setPageContent({ ...pageContent, star2Text: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '2px' }}>1-Star Tagline</label>
                  <input type="text" value={pageContent.star1Text || ''} onChange={(e) => setPageContent({ ...pageContent, star1Text: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
              </div>

            </div>
          )}

          {/* Sub-tab 3: Staff Call Service Options */}
          {activeContentTab === 'service' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }} className="animate-fadeIn">
              
              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  🛎️ General Staff Call Headings
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Call Staff Header Title</label>
                  <input type="text" value={pageContent.callStaffHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffHeaderTitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Call Staff Button Label</label>
                  <input type="text" value={pageContent.callStaffBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffBtnText: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Customer Note Placeholder</label>
                  <input type="text" value={pageContent.callStaffNotePlaceholder || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffNotePlaceholder: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  🏷️ 5 Service Dispatch Options
                </h4>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Option 1 (Product Assistance)</label>
                  <input type="text" value={pageContent.serviceOpt1Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Label: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', marginBottom: '4px' }} />
                  <input type="text" value={pageContent.serviceOpt1Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Option 2 (Price / Offer Check)</label>
                  <input type="text" value={pageContent.serviceOpt2Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt2Label: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', marginBottom: '4px' }} />
                  <input type="text" value={pageContent.serviceOpt2Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt2Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Option 3 (Billing / Payment Help)</label>
                  <input type="text" value={pageContent.serviceOpt3Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt3Label: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', marginBottom: '4px' }} />
                  <input type="text" value={pageContent.serviceOpt3Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt3Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Option 5 (Store Manager Escalation)</label>
                  <input type="text" value={pageContent.serviceOpt5Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt5Label: e.target.value })} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', marginBottom: '4px' }} />
                  <input type="text" value={pageContent.serviceOpt5Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt5Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', boxSizing: 'border-box' }} />
                </div>
              </div>

            </div>
          )}

          {/* Sub-tab 4: Landing Page Texts */}
          {activeContentTab === 'landing' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }} className="animate-fadeIn">
              
              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  🏠 Landing Hero Texts
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Top Badge Text</label>
                  <input type="text" value={pageContent.landingBadge || ''} onChange={(e) => setPageContent({ ...pageContent, landingBadge: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Main Title Heading</label>
                  <input type="text" value={pageContent.landingMainTitle || ''} onChange={(e) => setPageContent({ ...pageContent, landingMainTitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Subtitle Description</label>
                  <textarea rows={3} value={pageContent.landingSubtitle || ''} onChange={(e) => setPageContent({ ...pageContent, landingSubtitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                  🏷️ Landing Feature Cards
                </h4>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Card 1: Customer View Button Text</label>
                  <input type="text" value={pageContent.landingCard1Btn || ''} onChange={(e) => setPageContent({ ...pageContent, landingCard1Btn: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Card 2: Staff Operations Board Button Text</label>
                  <input type="text" value={pageContent.landingCard2Btn || ''} onChange={(e) => setPageContent({ ...pageContent, landingCard2Btn: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '2px' }}>Card 3: QR Stand Studio Button Text</label>
                  <input type="text" value={pageContent.landingCard3Btn || ''} onChange={(e) => setPageContent({ ...pageContent, landingCard3Btn: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================
          TAB 3: NOTIFICATION & SMTP SETTINGS
          ======================================================== */}
      {activeMainTab === 'notifications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }} className="animate-fadeIn">
          
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '22px'
          }}>
            <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: '800', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} color="#D4AF37" /> Email Alert Recipients & Triggers
            </h4>

            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.5' }}>
              കസ്റ്റമർ QR സ്കാൻ ചെയ്ത് സർവീസ് കോൾ ചെയ്യുമ്പോഴോ റിവ്യൂ അയക്കുമ്പോഴോ തത്സമയം ഇമെയിൽ ലഭിക്കേണ്ട വിലാസങ്ങൾ താഴെ നൽകുക (കോമയിട്ട് നൽകാം):
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#0A2E5D', marginBottom: '6px', textTransform: 'uppercase' }}>
                Notification Email Addresses (ഇമെയിൽ വിലാസങ്ങൾ)
              </label>
              <input 
                type="text" 
                placeholder="info@dorek.in, manager@dorek.in, store@dorek.in"
                value={emailsInput}
                onChange={(e) => setEmailsInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: '600',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <input 
                  type="checkbox" 
                  checked={notifyOnServiceCall} 
                  onChange={(e) => setNotifyOnServiceCall(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#0A2E5D' }}
                />
                <span>🛎️ <strong>Staff Calls:</strong> സ്റ്റാഫ് കോൾ വരുമ്പോൾ അടിയന്തിര ഇമെയിൽ</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <input 
                  type="checkbox" 
                  checked={notifyOnLowRating} 
                  onChange={(e) => setNotifyOnLowRating(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#0A2E5D' }}
                />
                <span>⚠️ <strong>Low Ratings:</strong> 1-2 സ്റ്റാർ മോശം റേറ്റിംഗുകൾക്ക് അലേർട്ട്</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <input 
                  type="checkbox" 
                  checked={notifyOnAllReviews} 
                  onChange={(e) => setNotifyOnAllReviews(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#0A2E5D' }}
                />
                <span>⭐ <strong>All Reviews:</strong> എല്ലാ കസ്റ്റമർ റിവ്യൂകൾക്കും ഇമെയിൽ</span>
              </label>
            </div>

            <button
              onClick={handleSaveNotificationSettings}
              disabled={savingSettings}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: 'none',
                background: '#0A2E5D',
                color: '#D4AF37',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box'
              }}
            >
              <Save size={16} /> {savingSettings ? 'Saving Settings...' : 'Save Notification Settings (സേവ് ചെയ്യുക)'}
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            padding: '22px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '800', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={18} /> Instant Email Verification
              </h4>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
                നൽകിയിരിക്കുന്ന ഇമെയിൽ വിലാസത്തിലേക്ക് അലേർട്ടുകൾ കൃത്യമായി എത്തുന്നുണ്ടോ എന്ന് പരിശോധിക്കാൻ താഴെയുള്ള ബട്ടൺ അമർത്തുക.
              </p>

              {settingsStatus && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: settingsStatus.includes('വിജയകരമായി') ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                  border: settingsStatus.includes('വിജയകരമായി') ? '1px solid #10b981' : '1px solid #ef4444',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={16} />
                  {settingsStatus}
                </div>
              )}
            </div>

            <button
              onClick={handleSendTestAlert}
              disabled={testSending}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#D4AF37',
                color: '#0A2E5D',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
              }}
            >
              <Send size={16} /> {testSending ? 'Sending Test Email...' : 'Send Live Test Email (ടെസ്റ്റ് ചെയ്യുക)'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
