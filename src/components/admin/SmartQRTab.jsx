import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  QrCode, Star, Bell, CheckCircle2, Clock, Trash2, Download, 
  Search, Filter, ExternalLink, RefreshCw, AlertTriangle, MapPin, Users,
  Mail, Settings, Save, Check, Send, ShieldAlert, Phone, ChevronDown, ChevronUp,
  FileText, Globe, MessageCircle, Sparkles, Layers, RotateCcw, Eye, EyeOff, CheckCheck,
  Smartphone, Columns, Maximize2, Plus, X, Tag, Key, KeyRound, ShieldCheck, Printer, UserCheck,
  HelpCircle, AlignLeft, Award, Sliders
} from 'lucide-react';

const DEFAULT_STAFF_PASS_LIST = [
  { id: '1', name: 'Outlet Store Manager', role: 'Manager', pin: '2026' },
  { id: '2', name: 'Floor Supervisor', role: 'Supervisor', pin: '4747' },
  { id: '3', name: 'Billing Desk Staff', role: 'Cashier / Staff', pin: '1234' }
];

const DEFAULT_PAGE_CONTENT = {
  // 1. Brand & Header Info
  brandTitle: 'DOREK INTERNATIONAL',
  tagline: 'Official Outlet Customer System',
  rateTabLabel: 'Rate & Review',
  serviceTabLabel: 'Call Staff / Help',
  footerNotice: 'Powered by Dorek Pulse • Official Outlet Customer System',

  // 2. Scan & Review Form
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
  namePlaceholder: 'Your Name (Optional)',
  phonePlaceholder: 'Phone Number (Optional)',
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
  thankYouServiceMessage: 'Our counter supervisor is on their way to assist you at your counter.',
  promoBadge: 'Explore Our Engineering & Products',
  promoTitle: 'Discover Dorek International Online',
  websiteBtnText: 'Visit Dorek International (dorek.in) →',
  websiteUrl: 'https://dorek.in',
  whatsappBtnText: '💬 Chat with Outlet on WhatsApp',
  whatsappPhone: '+919747522000',
  whatsappPretext: 'Hi Dorek International, I visited your outlet and would like to connect with your team.',
  resetBtnText: 'Submit Another Response',

  // 5. Staff Pass List & Master PIN
  staffPin: '2026',
  staffPassList: DEFAULT_STAFF_PASS_LIST
};

export default function SmartQRTab() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter for Hub Submissions: 'all' | 'new' | 'attending' | 'resolved' | 'review' | 'service_call'
  const [hubFilter, setHubFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Page Content Active Tab: 'staff' | 'review' | 'service' | 'thankyou' | 'branding'
  const [contentCategory, setContentCategory] = useState('staff');

  // Input states for adding new suggestion tags
  const [newHighTag, setNewHighTag] = useState('');
  const [newMedTag, setNewMedTag] = useState('');
  const [newLowTag, setNewLowTag] = useState('');

  // Input states for adding new Staff Pass
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Staff');
  const [newStaffPin, setNewStaffPin] = useState('');
  const [showPins, setShowPins] = useState(true);

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
            lowTags: (data.lowTags && data.lowTags.length > 0) ? data.lowTags : prev.lowTags,
            staffPassList: (data.staffPassList && data.staffPassList.length > 0) ? data.staffPassList : prev.staffPassList
          }));
        }
      } catch (err) {
        console.error('Error loading pulse page content:', err);
      }
    };
    loadPageContent();

    return () => unsubscribe();
  }, []);

  // Tag Handlers
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

  // Staff Pass Management Handlers
  const handleAddStaffPass = () => {
    if (!newStaffName.trim() || !newStaffPin.trim()) {
      alert('Please enter both Staff Name and 4-digit PIN.');
      return;
    }
    const currentList = pageContent.staffPassList || DEFAULT_PAGE_CONTENT.staffPassList;
    const newEntry = {
      id: Date.now().toString(),
      name: newStaffName.trim(),
      role: newStaffRole || 'Staff',
      pin: newStaffPin.trim()
    };
    setPageContent({ ...pageContent, staffPassList: [...currentList, newEntry] });
    setNewStaffName('');
    setNewStaffPin('');
  };

  const handleRemoveStaffPass = (idToRemove) => {
    const currentList = pageContent.staffPassList || DEFAULT_PAGE_CONTENT.staffPassList;
    if (currentList.length <= 1) {
      alert('At least one staff pass must remain active.');
      return;
    }
    setPageContent({ ...pageContent, staffPassList: currentList.filter(s => s.id !== idToRemove) });
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
      setContentStatus('എല്ലാ പേജ് ഉള്ളടക്കങ്ങളും സ്റ്റാഫ് വിവരങ്ങളും സേവ് ചെയ്തു!');
      setTimeout(() => setContentStatus(''), 4000);
    } catch (err) {
      console.error('Failed to save page content:', err);
      setContentStatus('Error: ' + err.message);
    } finally {
      setSavingContent(false);
    }
  };

  const handleResetContent = () => {
    if (window.confirm('എല്ലാ ടെക്സ്റ്റുകളും സ്റ്റാഫ് പാസ്സുകളും ഡിഫോൾട്ട് രീതിയിലേക്ക് റീസെറ്റ് ചെയ്യണോ?')) {
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
  const staffPassList = pageContent.staffPassList || DEFAULT_PAGE_CONTENT.staffPassList;

  // Master PIN for 1-click launch from admin
  const masterPin = staffPassList[0]?.pin || '2026';

  return (
    <div className="admin-panel-card animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ========================================================
          1. TOP BAR: TITLE & 1-CLICK OUTLET TOOLS
          ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
        padding: '20px 24px',
        borderRadius: '16px',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 8px 24px rgba(10,46,93,0.25)',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: '#D4AF37', color: '#0A2E5D', padding: '10px 12px', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 12px rgba(212,175,55,0.3)' }}>
            <QrCode size={26} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
              DOREK PULSE <span style={{ color: '#D4AF37' }}>• Smart QR & Outlet Operations</span>
            </h2>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>
              Real-time Customer Experience, Service Call Dispatch & Full CMS Text Manager
            </span>
          </div>
        </div>

        {/* 1-Click Launchers for Admin */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href={`https://dkscanreview.vercel.app/qr-studio?pin=${masterPin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '9px 16px', borderRadius: '10px', border: '1px solid #38BDF8', 
              backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', 
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '13px',
              transition: 'all 0.15s ease'
            }}
          >
            <Printer size={16} /> Open QR Studio (ക്യുആർ സ്റ്റുഡിയോ)
          </a>

          <a
            href={`https://dkscanreview.vercel.app/staff?pin=${masterPin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '9px 16px', borderRadius: '10px', border: '1px solid #D4AF37', 
              backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37', 
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '13px',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={16} /> Open Staff Board (സ്റ്റാഫ് ബോർഡ്)
          </a>

          <button 
            onClick={() => setShowNotifyPanel(!showNotifyPanel)}
            style={{ 
              padding: '9px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.25)', 
              backgroundColor: showNotifyPanel ? '#D4AF37' : 'rgba(255,255,255,0.1)', 
              color: showNotifyPanel ? '#0A2E5D' : '#ffffff', 
              cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '13px'
            }}
          >
            <Mail size={16} /> Email Alerts
          </button>
        </div>
      </div>

      {/* Optional Email Notification Settings Banner */}
      {showNotifyPanel && (
        <div style={{
          background: '#0A2E5D',
          borderRadius: '14px',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          padding: '22px',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }} className="animate-fadeIn">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Mail size={20} color="#D4AF37" />
            <h4 style={{ margin: 0, color: '#D4AF37', fontSize: '16px', fontWeight: '800' }}>
              ഇമെയിൽ അറിയിപ്പ് വിലാസങ്ങളും ക്രമീകരണങ്ങളും (Email Alert Settings)
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#D4AF37', marginBottom: '6px', textTransform: 'uppercase' }}>
                Alert Recipient Emails (അലേർട്ട് പോകേണ്ട ഇമെയിലുകൾ - കോമ നൽകി വേർതിരിക്കുക)
              </label>
              <input 
                type="text" 
                value={emailsInput}
                onChange={(e) => setEmailsInput(e.target.value)}
                placeholder="info@dorek.in, msuhailc47@gmail.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', color: '#0A2E5D', fontWeight: '700', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                <input type="checkbox" checked={notifyOnServiceCall} onChange={(e) => setNotifyOnServiceCall(e.target.checked)} style={{ accentColor: '#D4AF37', width: '16px', height: '16px' }} />
                <span>🛎️ Staff Calls</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                <input type="checkbox" checked={notifyOnLowRating} onChange={(e) => setNotifyOnLowRating(e.target.checked)} style={{ accentColor: '#D4AF37', width: '16px', height: '16px' }} />
                <span>⚠️ Low Ratings</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                <input type="checkbox" checked={notifyOnAllReviews} onChange={(e) => setNotifyOnAllReviews(e.target.checked)} style={{ accentColor: '#D4AF37', width: '16px', height: '16px' }} />
                <span>⭐ All Reviews</span>
              </label>
            </div>
          </div>

          {settingsStatus && (
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(16,185,129,0.25)', border: '1px solid #10b981', color: '#fff', fontSize: '13px', fontWeight: '700', marginBottom: '14px' }}>
              {settingsStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSaveNotificationSettings} disabled={savingSettings} style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#D4AF37', color: '#0A2E5D', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}>
              {savingSettings ? 'Saving...' : 'Save Notification Settings'}
            </button>
            <button onClick={handleSendTestAlert} disabled={testSending} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
              {testSending ? 'Sending...' : 'Send Live Test Alert'}
            </button>
          </div>
        </div>
      )}

      {/* 2. KPI Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '5px solid #ef4444', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unread Submissions</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: unreadTickets.length > 0 ? '#ef4444' : '#0A2E5D', marginTop: '4px' }}>
            {unreadTickets.length} <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>/ {activeTasks.length} Active</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '5px solid #D4AF37', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CSAT Rating</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#D4AF37', marginTop: '4px' }}>
            {avgRating} <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>/ 5.0</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '5px solid #0A2E5D', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Feedbacks</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#0A2E5D', marginTop: '4px' }}>
            {tickets.length}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '5px solid #10b981', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Resolution Speed</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#10b981', marginTop: '4px' }}>
            {avgResolutionSec}s
          </div>
        </div>
      </div>

      {/* ========================================================
          3. FULL-WIDTH HORIZONTAL MODULE 1: 
          LIVE CUSTOMER SUBMISSIONS & SERVICE CALLS
          ======================================================== */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '2px solid #f1f5f9', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={22} color="#ef4444" /> Live Customer Submissions & Service Calls
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              Real-time feed of customer ratings, feedback tags, staff service requests, and resolution statuses
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadTickets.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#0A2E5D',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCheck size={15} color="#10b981" /> Mark All as Read
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

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setHubFilter('all')}
              style={{
                padding: '7px 14px', borderRadius: '8px',
                border: hubFilter === 'all' ? '1px solid #0A2E5D' : '1px solid #e2e8f0',
                background: hubFilter === 'all' ? '#0A2E5D' : '#f8fafc',
                color: hubFilter === 'all' ? '#fff' : '#334155',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              All Submissions ({tickets.length})
            </button>

            <button
              onClick={() => setHubFilter('new')}
              style={{
                padding: '7px 14px', borderRadius: '8px',
                border: hubFilter === 'new' ? '1px solid #ef4444' : '1px solid #fee2e2',
                background: hubFilter === 'new' ? '#ef4444' : '#fff5f5',
                color: hubFilter === 'new' ? '#fff' : '#991b1b',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🔴 Unread ({unreadTickets.length})
            </button>

            <button
              onClick={() => setHubFilter('attending')}
              style={{
                padding: '7px 14px', borderRadius: '8px',
                border: hubFilter === 'attending' ? '1px solid #f59e0b' : '1px solid #fef3c7',
                background: hubFilter === 'attending' ? '#f59e0b' : '#fffbeb',
                color: hubFilter === 'attending' ? '#fff' : '#92400e',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🟡 In Progress
            </button>

            <button
              onClick={() => setHubFilter('resolved')}
              style={{
                padding: '7px 14px', borderRadius: '8px',
                border: hubFilter === 'resolved' ? '1px solid #10b981' : '1px solid #d1fae5',
                background: hubFilter === 'resolved' ? '#10b981' : '#f0fdf4',
                color: hubFilter === 'resolved' ? '#fff' : '#065f46',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🟢 Resolved ({tickets.filter(t => t.status === 'resolved').length})
            </button>

            <button
              onClick={() => setHubFilter('service_call')}
              style={{
                padding: '7px 14px', borderRadius: '8px',
                border: hubFilter === 'service_call' ? '1px solid #3b82f6' : '1px solid #dbeafe',
                background: hubFilter === 'service_call' ? '#3b82f6' : '#eff6ff',
                color: hubFilter === 'service_call' ? '#fff' : '#1e40af',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              🛎️ Staff Calls ({serviceCalls.length})
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search customer, phone, counter, note..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Submissions Stream List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '14px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredTickets.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
              <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>No submissions in this filter</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>Customer submissions from your outlet QR codes will appear here live.</p>
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
                    background: isNew ? '#fffdf7' : '#ffffff',
                    border: isNew ? '1px solid #fde68a' : '1px solid #e2e8f0',
                    borderLeft: isNew ? '5px solid #ef4444' : (isAttending ? '5px solid #f59e0b' : '5px solid #10b981'),
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isNew && (
                          <span style={{ background: '#ef4444', color: '#fff', padding: '2px 7px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>
                            NEW
                          </span>
                        )}
                        <span style={{
                          background: isResolved ? '#d1fae5' : (isAttending ? '#fef3c7' : '#fee2e2'),
                          color: isResolved ? '#065f46' : (isAttending ? '#92400e' : '#991b1b'),
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '800'
                        }}>
                          {isResolved ? '✓ RESOLVED' : (isAttending ? '● IN PROGRESS' : '● ACTION NEEDED')}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#0A2E5D', fontWeight: '800', marginBottom: '4px' }}>
                      📍 {ticket.counter} <span style={{ color: '#64748b', fontWeight: 'normal' }}>({ticket.outlet})</span>
                    </div>

                    <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>
                      {ticket.requestType || (isReview ? `⭐ ${ticket.rating} Star Rating` : 'Service Call')}
                    </h4>

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
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', lineHeight: '1.4', fontStyle: 'italic' }}>
                        "{ticket.message}"
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      👤 <strong>{ticket.customerName || 'Walk-in Customer'}</strong> 
                      {ticket.customerPhone && <span style={{ marginLeft: '6px', color: '#0A2E5D', fontWeight: '700' }}>📞 {ticket.customerPhone}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {isNew && (
                        <button
                          onClick={() => handleMarkAsRead(ticket.id)}
                          style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', color: '#0A2E5D', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Mark Read
                        </button>
                      )}
                      {!isResolved && (
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', background: '#10b981', color: '#fff', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', cursor: 'pointer' }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ========================================================
          4. FULL-WIDTH HORIZONTAL MODULE 2: 
          PAGE CONTENTS, SUGGESTIONS & STAFF PASSWORDS MANAGER
          ======================================================== */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '2px solid #f1f5f9', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={22} color="#D4AF37" /> QR Content, Suggestions & Staff Passwords (പേജ് കണ്ടന്റുകൾ & പാസ്‌വേഡുകൾ)
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              All texts across QR Scan, Review Form, Service Call, Thank You Screen, Suggestions, and Staff Access PINs
            </p>
          </div>

          <button
            onClick={handleSavePageContent}
            disabled={savingContent}
            style={{
              padding: '10px 22px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #0A2E5D 0%, #16427D 100%)',
              color: '#D4AF37',
              fontSize: '13px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(10,46,93,0.35)'
            }}
          >
            <Save size={16} />
            {savingContent ? 'Saving Settings...' : 'Save All Settings (സേവ് ചെയ്യുക)'}
          </button>
        </div>

        {contentStatus && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#065f46',
            fontSize: '14px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} />
            {contentStatus}
          </div>
        )}

        {/* Navigation Category Tabs (Full-Width Horizontal Bar) */}
        <div style={{ display: 'flex', gap: '8px', background: '#f8fafc', padding: '6px', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
          <button
            onClick={() => setContentCategory('staff')}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              background: contentCategory === 'staff' ? '#0A2E5D' : 'transparent',
              color: contentCategory === 'staff' ? '#D4AF37' : '#475569',
              fontWeight: '800', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Key size={16} /> 🔑 Staff Passwords & Access PINs
          </button>

          <button
            onClick={() => setContentCategory('review')}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              background: contentCategory === 'review' ? '#0A2E5D' : 'transparent',
              color: contentCategory === 'review' ? '#D4AF37' : '#475569',
              fontWeight: '800', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Star size={16} /> ⭐ Review Form & Suggestion Tags (1-5★)
          </button>

          <button
            onClick={() => setContentCategory('service')}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              background: contentCategory === 'service' ? '#0A2E5D' : 'transparent',
              color: contentCategory === 'service' ? '#D4AF37' : '#475569',
              fontWeight: '800', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Bell size={16} /> 🛎️ Staff Call Services (5 Options)
          </button>

          <button
            onClick={() => setContentCategory('thankyou')}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              background: contentCategory === 'thankyou' ? '#0A2E5D' : 'transparent',
              color: contentCategory === 'thankyou' ? '#D4AF37' : '#475569',
              fontWeight: '800', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <MessageCircle size={16} /> 💬 Thank You Screen, WhatsApp & Links
          </button>

          <button
            onClick={() => setContentCategory('branding')}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: 'none',
              background: contentCategory === 'branding' ? '#0A2E5D' : 'transparent',
              color: contentCategory === 'branding' ? '#D4AF37' : '#475569',
              fontWeight: '800', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Globe size={16} /> 🌐 Header, Tab Labels & Footer Notices
          </button>
        </div>

        {/* ========================================================
            TAB 1: STAFF PASSWORDS & ACCESS PINS
            ======================================================== */}
        {contentCategory === 'staff' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fadeIn">
            
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={22} color="#0A2E5D" />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: '#0A2E5D' }}>
                      Outlet Staff Pass & Access Passwords (സ്റ്റാഫ് പാസ്സ് ലിസ്റ്റ്)
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                      These 4-digit PINs grant store supervisors and staff access to the Staff Dispatch Board & QR Studio
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPins(!showPins)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#475569',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {showPins ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPins ? 'Hide PINs (പാസ്‌വേഡ് മറക്കുക)' : 'Show PINs (പാസ്‌വേഡ് കാണുക)'}</span>
                </button>
              </div>

              {/* Staff Pass Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '18px' }}>
                {staffPassList.map((staff) => (
                  <div 
                    key={staff.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(10,46,93,0.08)', color: '#0A2E5D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '15px' }}>
                        👤
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>
                          {staff.name}
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                          Role: <strong>{staff.role}</strong>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontFamily: 'monospace', fontWeight: '900', fontSize: '15px', color: '#0A2E5D', letterSpacing: showPins ? '2px' : '0px' }}>
                        {showPins ? staff.pin : '••••'}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveStaffPass(staff.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px' }}
                        title="Delete Staff Pass"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Staff Pass Box */}
              <div style={{ background: '#ffffff', border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '16px' }}>
                <span style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0A2E5D', marginBottom: '10px' }}>
                  + Add New Staff Pass (പുതിയ സ്റ്റാഫ് പാസ്സ് ചേർക്കുക)
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) auto', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Staff / Counter Name (e.g. Rahul - Desk 1)"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Staff">Staff</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="4-digit PIN (e.g. 2026)"
                    value={newStaffPin}
                    onChange={(e) => setNewStaffPin(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'monospace', fontWeight: '800', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddStaffPass}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#0A2E5D',
                      color: '#D4AF37',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} /> Add Pass
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: REVIEW FORM & SUGGESTION TAGS (1-5 STARS)
            ======================================================== */}
        {contentCategory === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fadeIn">
            
            {/* Form Headers & Placeholders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Form Main Title (ഫോം തലക്കെട്ട്)
                </label>
                <input type="text" value={pageContent.reviewHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, reviewHeaderTitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Submit Button Label (സബ്മിറ്റ് ബട്ടൺ ടെക്സ്റ്റ്)
                </label>
                <input type="text" value={pageContent.submitReviewBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, submitReviewBtnText: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Name Field Placeholder
                </label>
                <input type="text" value={pageContent.namePlaceholder || ''} onChange={(e) => setPageContent({ ...pageContent, namePlaceholder: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Phone Field Placeholder
                </label>
                <input type="text" value={pageContent.phonePlaceholder || ''} onChange={(e) => setPageContent({ ...pageContent, phonePlaceholder: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Star Rating Feedback Sentiments */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#0A2E5D' }}>
                Star Rating Live Response Texts (സ്റ്റാർ റേറ്റിംഗ് സെലക്ട് ചെയ്യുമ്പോൾ വരുന്ന ടെക്സ്റ്റുകൾ)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#15803d', marginBottom: '3px' }}>5-Star Tagline (⭐⭐⭐⭐⭐)</label>
                  <input type="text" value={pageContent.star5Text || ''} onChange={(e) => setPageContent({ ...pageContent, star5Text: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#16a34a', marginBottom: '3px' }}>4-Star Tagline (⭐⭐⭐⭐)</label>
                  <input type="text" value={pageContent.star4Text || ''} onChange={(e) => setPageContent({ ...pageContent, star4Text: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#b45309', marginBottom: '3px' }}>3-Star Tagline (⭐⭐⭐)</label>
                  <input type="text" value={pageContent.star3Text || ''} onChange={(e) => setPageContent({ ...pageContent, star3Text: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#dc2626', marginBottom: '3px' }}>2-Star Tagline (⭐⭐)</label>
                  <input type="text" value={pageContent.star2Text || ''} onChange={(e) => setPageContent({ ...pageContent, star2Text: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#b91c1c', marginBottom: '3px' }}>1-Star Tagline (⭐)</label>
                  <input type="text" value={pageContent.star1Text || ''} onChange={(e) => setPageContent({ ...pageContent, star1Text: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Suggestions Tag Manager (3 Tiers) */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={18} color="#D4AF37" />
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0A2E5D' }}>
                  Customer Suggestions / Sentiment Chips (സജഷൻ ടാഗുകൾ മാനേജർ)
                </h4>
              </div>

              {/* 1. High Rating Suggestions (4-5 Stars) */}
              <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#15803d' }}>
                    🌟 4-5 Star Suggestions (High Rating Chips)
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{highTagsList.length} tags</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {highTagsList.map((tag, idx) => (
                    <span key={idx} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag('high', tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', maxWidth: '480px' }}>
                  <input type="text" value={newHighTag} onChange={(e) => setNewHighTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('high'))} placeholder="Type new high suggestion (e.g. ⚡ Friendly Staff)..." style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #86efac', fontSize: '12px', boxSizing: 'border-box' }} />
                  <button type="button" onClick={() => handleAddTag('high')} style={{ padding: '7px 14px', borderRadius: '6px', border: 'none', background: '#15803d', color: '#ffffff', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={14} /> Add Tag
                  </button>
                </div>
              </div>

              {/* 2. Medium Rating Suggestions (3 Stars) */}
              <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #fef3c7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#b45309' }}>
                    👍 3-Star Suggestions (Average Rating Chips)
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{medTagsList.length} tags</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {medTagsList.map((tag, idx) => (
                    <span key={idx} style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag('medium', tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', maxWidth: '480px' }}>
                  <input type="text" value={newMedTag} onChange={(e) => setNewMedTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('medium'))} placeholder="Type new average suggestion (e.g. 💳 Fair Pricing)..." style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #fde68a', fontSize: '12px', boxSizing: 'border-box' }} />
                  <button type="button" onClick={() => handleAddTag('medium')} style={{ padding: '7px 14px', borderRadius: '6px', border: 'none', background: '#b45309', color: '#ffffff', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={14} /> Add Tag
                  </button>
                </div>
              </div>

              {/* 3. Low Rating Suggestions (1-2 Stars) */}
              <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #fee2e2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#b91c1c' }}>
                    ⚠️ 1-2 Star Suggestions (Needs Improvement Chips)
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{lowTagsList.length} tags</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {lowTagsList.map((tag, idx) => (
                    <span key={idx} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag('low', tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', maxWidth: '480px' }}>
                  <input type="text" value={newLowTag} onChange={(e) => setNewLowTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('low'))} placeholder="Type new improvement suggestion (e.g. ⏳ Billing Delay)..." style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #fecaca', fontSize: '12px', boxSizing: 'border-box' }} />
                  <button type="button" onClick={() => handleAddTag('low')} style={{ padding: '7px 14px', borderRadius: '6px', border: 'none', background: '#b91c1c', color: '#ffffff', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={14} /> Add Tag
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: STAFF CALL SERVICES (ALL 5 OPTIONS)
            ======================================================== */}
        {contentCategory === 'service' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fadeIn">
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Call Staff Header Title
                </label>
                <input type="text" value={pageContent.callStaffHeaderTitle || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffHeaderTitle: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Call Staff Button Text
                </label>
                <input type="text" value={pageContent.callStaffBtnText || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffBtnText: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Optional Note Placeholder
                </label>
                <input type="text" value={pageContent.callStaffNotePlaceholder || ''} onChange={(e) => setPageContent({ ...pageContent, callStaffNotePlaceholder: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* 5 Service Option Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #38BDF8' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>Option 1: Product Assistance</span>
                <input type="text" value={pageContent.serviceOpt1Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Label: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', marginTop: '6px', marginBottom: '6px' }} />
                <input type="text" value={pageContent.serviceOpt1Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt1Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #FBBF24' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#b45309', textTransform: 'uppercase' }}>Option 2: Price / Offer Check</span>
                <input type="text" value={pageContent.serviceOpt2Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt2Label: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', marginTop: '6px', marginBottom: '6px' }} />
                <input type="text" value={pageContent.serviceOpt2Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt2Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #34D399' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', textTransform: 'uppercase' }}>Option 3: Billing / Payment Help</span>
                <input type="text" value={pageContent.serviceOpt3Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt3Label: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', marginTop: '6px', marginBottom: '6px' }} />
                <input type="text" value={pageContent.serviceOpt3Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt3Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #A78BFA' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#7c3aed', textTransform: 'uppercase' }}>Option 4: Packaging / Delivery</span>
                <input type="text" value={pageContent.serviceOpt4Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt4Label: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', marginTop: '6px', marginBottom: '6px' }} />
                <input type="text" value={pageContent.serviceOpt4Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt4Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', borderLeft: '4px solid #F87171' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase' }}>Option 5: Store Manager Escalation</span>
                <input type="text" value={pageContent.serviceOpt5Label || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt5Label: e.target.value })} style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', boxSizing: 'border-box', marginTop: '6px', marginBottom: '6px' }} />
                <input type="text" value={pageContent.serviceOpt5Desc || ''} onChange={(e) => setPageContent({ ...pageContent, serviceOpt5Desc: e.target.value })} placeholder="Description" style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box' }} />
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: THANK YOU SCREEN, WHATSAPP & PROMO LINKS
            ======================================================== */}
        {contentCategory === 'thankyou' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fadeIn">
            
            {/* WhatsApp Box */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MessageCircle size={18} color="#166534" />
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#166534' }}>
                  WhatsApp Direct Outlet Connect
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                    WhatsApp Button Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #86efac', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                    WhatsApp Phone Number (with Country Code)
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.whatsappPhone || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, whatsappPhone: e.target.value })}
                    placeholder="+919747522000"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #86efac', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>
                  WhatsApp Pre-text Message (കസ്റ്റമർ ബട്ടൺ ഞെക്കുമ്പോൾ WhatsApp-ൽ സ്വയം ടൈപ്പ് ആയി വരുന്ന സന്ദേശം)
                </label>
                <textarea 
                  rows={2}
                  value={pageContent.whatsappPretext || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, whatsappPretext: e.target.value })}
                  placeholder="Hi Dorek International, I visited your outlet and would like to connect with your team."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #22c55e', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Website & Promo Card */}
            <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Promo Badge Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.promoBadge || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, promoBadge: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fde047', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Promo Title Text
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.promoTitle || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, promoTitle: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fde047', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Website Button Label
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteBtnText || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteBtnText: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fde047', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#854d0e', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Website Destination URL
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.websiteUrl || ''} 
                    onChange={(e) => setPageContent({ ...pageContent, websiteUrl: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fde047', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            {/* Thank you Titles & Messages */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Thank You Review Title
                </label>
                <input 
                  type="text" 
                  value={pageContent.thankYouReviewTitle || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouReviewTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', marginBottom: '8px' }}
                />
                <textarea 
                  rows={2}
                  value={pageContent.thankYouReviewMessage || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouReviewMessage: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Thank You Service Call Title
                </label>
                <input 
                  type="text" 
                  value={pageContent.thankYouServiceTitle || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouServiceTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', marginBottom: '8px' }}
                />
                <textarea 
                  rows={2}
                  value={pageContent.thankYouServiceMessage || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, thankYouServiceMessage: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 5: BRANDING, TAB LABELS & FOOTERS
            ======================================================== */}
        {contentCategory === 'branding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fadeIn">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Brand Title in Header (ഹെഡർ ബ്രാൻഡ് പേര്)
                </label>
                <input 
                  type="text" 
                  value={pageContent.brandTitle || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, brandTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Header Sub-Tagline
                </label>
                <input 
                  type="text" 
                  value={pageContent.tagline || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, tagline: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Rating Tab Button Label
                </label>
                <input 
                  type="text" 
                  value={pageContent.rateTabLabel || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, rateTabLabel: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Service Call Tab Button Label
                </label>
                <input 
                  type="text" 
                  value={pageContent.serviceTabLabel || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, serviceTabLabel: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Footer Notice Text (ഫൂട്ടർ കുറിപ്പ്)
                </label>
                <input 
                  type="text" 
                  value={pageContent.footerNotice || ''} 
                  onChange={(e) => setPageContent({ ...pageContent, footerNotice: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save & Reset Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '2px solid #f1f5f9', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            onClick={handleResetContent} 
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            Reset All to Defaults (റീസെറ്റ് ചെയ്യുക)
          </button>

          <button 
            onClick={handleSavePageContent} 
            disabled={savingContent} 
            style={{ 
              padding: '10px 24px', borderRadius: '8px', border: 'none', 
              background: '#0A2E5D', color: '#D4AF37', fontSize: '13px', fontWeight: '900', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(10,46,93,0.3)'
            }}
          >
            {savingContent ? 'Saving Settings...' : 'Save All Settings (സേവ് ചെയ്യുക)'}
          </button>
        </div>

      </div>

    </div>
  );
}
