import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Smartphone,
  Crown,
  Star,
  Wallet,
  Search,
  Upload,
  Image as ImageIcon,
  X,
  ExternalLink,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { convertDriveUrl } from '../../../utils/getOptimizedUrl';

export const DEFAULT_ADMIN_BRANDS = [
  // --- TIER 1: LUXURY & ARCHITECTURAL (High-End Enterprise / Villa Segment) ---
  {
    name: 'Legrand',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Luxury Modular Switches, Home Automation & MCBs',
    itemsMl: 'പ്രീമിയം മോഡുലാർ സ്വിച്ചുകൾ, ഹോം ഓട്ടോമേഷൻ',
    origin: 'Global Luxury',
    logo: ''
  },
  {
    name: 'Schneider Electric',
    tier: 'premium',
    sector: 'Electrical',
    itemsEn: 'Smart Switchgear, Industrial Panels & Building Automation',
    itemsMl: 'സ്മാർട്ട് സ്വിച്ച്ഗിയർ, ഇൻഡസ്ട്രിയൽ പാനലുകൾ',
    origin: 'Global Premium',
    logo: ''
  },
  {
    name: 'Kohler',
    tier: 'premium',
    sector: 'Plumbing',
    itemsEn: 'Designer Sanitaryware, Luxury Faucets & Bath Suites',
    itemsMl: 'ലക്ഷ്വറി സാനിറ്ററിവെയർ, ഡിസൈനർ ടാപ്പുകൾ',
    origin: 'International Luxury',
    logo: ''
  },
  {
    name: 'Jaquar Artize',
    tier: 'premium',
    sector: 'Plumbing',
    itemsEn: 'Wellness Bath Fittings, Shower Enclosures & Thermostats',
    itemsMl: 'പ്രീമിയം ബാത്ത് ഫിറ്റിംഗ്സ്, ഷവർ സിസ്റ്റംസ്',
    origin: 'Luxury Line',
    logo: ''
  },
  {
    name: 'Grundfos',
    tier: 'premium',
    sector: 'Pumps',
    itemsEn: 'High-Efficiency Pressure Boosters & Smart Water Pumps',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി പ്രഷർ ബൂസ്റ്റർ പമ്പുകൾ',
    origin: 'International',
    logo: ''
  },
  {
    name: 'Philips Smart Lighting',
    tier: 'premium',
    sector: 'Lighting',
    itemsEn: 'Architectural LED, Smart WiFi & Chandelier Lighting',
    itemsMl: 'ആർക്കിടെക്ചറൽ & സ്മാർട്ട് LED ലൈറ്റിംഗ്',
    origin: 'Global Leader',
    logo: ''
  },
  {
    name: 'Loom Solar / Enphase',
    tier: 'premium',
    sector: 'Solar',
    itemsEn: 'High-Efficiency Mono PERC Bifacial Panels & Microinverters',
    itemsMl: 'ഹൈ-എഫിഷ്യൻസി സോളാർ പാനലുകൾ & ഇൻവെർട്ടറുകൾ',
    origin: 'Tier-1 Solar',
    logo: ''
  },
  {
    name: 'Yale / Godrej Smart Locks',
    tier: 'premium',
    sector: 'Hardware',
    itemsEn: 'Biometric Digital Door Locks, Video Door Phones & Safes',
    itemsMl: 'ബയോമെട്രിക് ഡിജിറ്റൽ ഡോർ ലോക്കുകൾ, സുരക്ഷാ സിസ്റ്റം',
    origin: 'Smart Security',
    logo: ''
  },

  // --- TIER 2: COMMERCIAL & RESIDENTIAL STANDARD (High-Volume National Brands) ---
  {
    name: 'Havells',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Flame-Retardant Cables, Modular Switches, Fans & Switchgear',
    itemsMl: 'വയറുകൾ, സ്വിച്ചുകൾ, ഫാനുകൾ, ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ',
    origin: 'Trusted National',
    logo: ''
  },
  {
    name: 'Finolex Cables & Pipes',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'House Wiring Cables, Conduit Pipes & UV-Protected Fittings',
    itemsMl: 'ഹൗസ് വയറിംഗ് കേബിളുകൾ, പൈപ്പുകൾ',
    origin: 'India Top Brand',
    logo: ''
  },
  {
    name: 'V-Guard',
    tier: 'standard',
    sector: 'Solar',
    itemsEn: 'Inverters, Stabilizers, Solar Water Heaters & Industrial Pumps',
    itemsMl: 'ഇൻവെർട്ടറുകൾ, സ്റ്റെബിലൈസറുകൾ, സോളാർ വാട്ടർ ഹീറ്റർ',
    origin: 'Kerala Favorite',
    logo: ''
  },
  {
    name: 'Polycab',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'FR/FRLS Wires, Industrial Power Cables & Distribution Switchgear',
    itemsMl: 'വയറുകൾ, ഇൻഡസ്ട്രിയൽ കേബിളുകൾ, സ്വിച്ച്ഗിയർ',
    origin: 'National Leader',
    logo: ''
  },
  {
    name: 'Astral Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'CPVC Pro, UPVC, Silencio Low-Noise Drainage Pipes',
    itemsMl: 'CPVC, UPVC പ്ലമ്പിംഗ് പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'IS Certified',
    logo: ''
  },
  {
    name: 'Cera Sanitaryware',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Wall-Hung Closets, Wash Basins, CP Taps & Vitrified Tiles',
    itemsMl: 'ക്ലോസറ്റുകൾ, വാഷ് ബേസിനുകൾ, CP ടാപ്പുകൾ',
    origin: 'Popular Choice',
    logo: ''
  },
  {
    name: 'Supreme Pipes',
    tier: 'standard',
    sector: 'Plumbing',
    itemsEn: 'Plumbing Systems, Underground Drainage & Commercial Water Tanks',
    itemsMl: 'പ്ലമ്പിംഗ് പൈപ്പുകൾ, വാട്ടർ ടാങ്കുകൾ',
    origin: 'National Standard',
    logo: ''
  },
  {
    name: 'Crompton / Kirloskar',
    tier: 'standard',
    sector: 'Pumps',
    itemsEn: 'Domestic Monoblock, Borewell Submersible Pumps & Industrial Motors',
    itemsMl: 'ഗാർഹിക മോട്ടോറുകൾ, സബ്മേഴ്സിബിൾ പമ്പുകൾ',
    origin: 'Proven Durability',
    logo: ''
  },
  {
    name: 'Luker / Wipro Lighting',
    tier: 'standard',
    sector: 'Lighting',
    itemsEn: 'Commercial LED Downlights, Panel Lights & Industrial Floodlights',
    itemsMl: 'LED ലൈറ്റുകൾ, പാനൽ ലൈറ്റുകൾ, സ്ട്രീറ്റ് ലൈറ്റുകൾ',
    origin: 'Energy Star',
    logo: ''
  },
  {
    name: 'Anchor by Panasonic',
    tier: 'standard',
    sector: 'Electrical',
    itemsEn: 'Roma Modular Switches, Distribution Boards & Accessories',
    itemsMl: 'റോമ സ്വിച്ചുകൾ, ഡിസ്ട്രിബ്യൂഷൻ ബോർഡുകൾ',
    origin: 'Most Popular',
    logo: ''
  },

  // --- TIER 3: SMART ECONOMY & UTILITY (ISI-Certified Value Range) ---
  {
    name: 'GM / GreatWhite Economy',
    tier: 'budget',
    sector: 'Electrical',
    itemsEn: 'Cost-Effective Switches, Sockets, Distribution Enclosures & Holders',
    itemsMl: 'കുറഞ്ഞ നിരക്കിലുള്ള മികച്ച സ്വിച്ചുകളും സോക്കറ്റുകളും',
    origin: 'Value Range',
    logo: ''
  },
  {
    name: 'Kelachandra / Star Pipes',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'ISI PVC Pipes, Agricultural Fittings & Economy Drainage Systems',
    itemsMl: 'ബജറ്റ് ഫ്രണ്ട്‌ലി ISI PVC പൈപ്പുകളും ഫിറ്റിംഗ്സും',
    origin: 'Kerala Economy',
    logo: ''
  },
  {
    name: 'Parryware / Hindware Essential',
    tier: 'budget',
    sector: 'Plumbing',
    itemsEn: 'Budget-Friendly Sanitaryware, EWC Sets & PVC Cisterns',
    itemsMl: 'മിതമായ നിരക്കിലുള്ള സാനിറ്ററിവെയർ സെറ്റുകൾ',
    origin: 'Smart Budget',
    logo: ''
  },
  {
    name: 'Surya / Halonix LED',
    tier: 'budget',
    sector: 'Lighting',
    itemsEn: 'Affordable LED Bulbs, Batten Tubes & Heavy-Duty Utility Lighting',
    itemsMl: 'കുറഞ്ഞ വിലയിലുള്ള ഈടുനിൽക്കുന്ന LED ബൾബുകൾ',
    origin: 'Economy Saver',
    logo: ''
  },
  {
    name: 'Texmo / Sharp Economy Pumps',
    tier: 'budget',
    sector: 'Pumps',
    itemsEn: 'Compact Domestic Water Pumps & Agricultural Motors',
    itemsMl: 'സാധാരണ വീടുകൾക്കുള്ള ബജറ്റ് വാട്ടർ പമ്പുകൾ',
    origin: 'Value Motor',
    logo: ''
  },
  {
    name: 'Microtek / Livguard Value',
    tier: 'budget',
    sector: 'Solar',
    itemsEn: 'Home UPS Inverters, Tubular Batteries & Basic Solar Kits',
    itemsMl: 'ബജറ്റ് ഹോം ഇൻവെർട്ടറുകളും ബാറ്ററികളും',
    origin: 'Budget Backup',
    logo: ''
  },
  {
    name: 'Doorcarts Assured Selection',
    tier: 'budget',
    sector: 'Hardware',
    itemsEn: 'Factory-Direct Hardware, Fasteners, Tools & Sanitary Essentials',
    itemsMl: 'ഡോർകാർട്ട്സ് നേരിട്ട് നൽകുന്ന ഹാർഡ്‌വെയർ & ടൂൾസ്',
    origin: 'Direct Sourcing',
    logo: ''
  }
];

const ORIGIN_SUGGESTIONS = [
  'Global Luxury',
  'Global Premium',
  'International Luxury',
  'Luxury Line',
  'India Top Brand',
  'National Leader',
  'Kerala Favorite',
  'IS Certified',
  'National Standard',
  'Trusted National',
  'Energy Star',
  'Smart Security',
  'Value Range',
  'Kerala Economy',
  'Smart Budget',
  'Economy Saver',
  'Value Motor',
  'Budget Backup',
  'Direct Sourcing'
];

export default function AppBrandsEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem,
  handleFileUpload
}) {
  const [filterTier, setFilterTier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const appBrandsData = sectionData?.[editLang]?.appBrands || {};
  const brands = Array.isArray(appBrandsData.brands) ? appBrandsData.brands : [];

  const filteredWithIndex = brands
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => {
      const matchesTier = filterTier === 'all' || item.tier === filterTier;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.sector || '').toLowerCase().includes(q) ||
        (item.origin || '').toLowerCase().includes(q) ||
        (item.itemsEn || '').toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });

  const onFileUploadWrapper = async (e, idx) => {
    if (handleFileUpload) {
      setUploadingIdx(idx);
      try {
        await handleFileUpload(e, 'appBrands', 'logo', 'brands', idx);
      } finally {
        setUploadingIdx(null);
      }
    }
  };

  return (
    <div className="section-form">
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(10, 46, 93, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Building2 size={22} color="#0A2E5D" />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0A2E5D', fontWeight: 800 }}>
            Authorised Brand Partners & Supply Ecosystem
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '3px 0 0 0' }}>
            Manage company logos, project specifications, and customer budget tiers (Luxury, Standard & Value) across Kerala.
          </p>
        </div>
      </div>

      {/* Section Headings Form */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid rgba(10, 46, 93, 0.08)',
        borderRadius: '14px',
        padding: '20px 24px',
        marginTop: '18px',
        marginBottom: '20px'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '14px', color: '#0A2E5D', fontSize: '0.95rem', fontWeight: 700 }}>
          ✨ Section Heading & Subtitle
        </h4>
        <div className="array-fields-grid">
          <div className="form-group">
            <label>Section Badge Label</label>
            <input
              type="text"
              value={appBrandsData.label || ''}
              onChange={(e) => handleTextChange('appBrands', 'label', e.target.value)}
              className="form-control"
              placeholder="e.g. OEM SOURCING & BRAND PARTNERS"
            />
          </div>
          <div className="form-group">
            <label>Section Main Title</label>
            <input
              type="text"
              value={appBrandsData.title || ''}
              onChange={(e) => handleTextChange('appBrands', 'title', e.target.value)}
              className="form-control"
              placeholder="Authorised Brand Partners & Multi-Tier Supply Ecosystem"
            />
          </div>
          <div className="form-group col-span-2">
            <label>Section Subtitle / Narrative</label>
            <textarea
              rows={2}
              value={appBrandsData.subtitle || ''}
              onChange={(e) => handleTextChange('appBrands', 'subtitle', e.target.value)}
              className="form-control"
              placeholder="Through Doorcarts enterprise network, Dorek International connects residential developments..."
            />
          </div>
        </div>
      </div>

      {/* Dorek Group Procurement & Mobile App Details */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid rgba(10, 46, 93, 0.08)',
        borderRadius: '14px',
        padding: '20px 24px',
        marginBottom: '24px'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '14px', color: '#0A2E5D', fontSize: '0.95rem', fontWeight: 700 }}>
          📱 Dorek Group Digital Procurement & Mobile App Banner
        </h4>
        <div className="array-fields-grid">
          <div className="form-group col-span-2">
            <label>Platform / App Title</label>
            <input
              type="text"
              value={appBrandsData.appName || ''}
              onChange={(e) => handleTextChange('appBrands', 'appName', e.target.value)}
              className="form-control font-bold"
              placeholder="Doorcarts Enterprise & Mobile App"
            />
          </div>
          <div className="form-group col-span-2">
            <label>Procurement & Logistics Description</label>
            <textarea
              rows={2}
              value={appBrandsData.appDesc || ''}
              onChange={(e) => handleTextChange('appBrands', 'appDesc', e.target.value)}
              className="form-control"
              placeholder="Explore 10,000+ electrical, plumbing, solar, lighting & sanitaryware products with factory rates and all-Kerala delivery."
            />
          </div>
          <div className="form-group">
            <label>Google Play Store Link (Android)</label>
            <input
              type="url"
              value={appBrandsData.playStoreUrl || ''}
              onChange={(e) => handleTextChange('appBrands', 'playStoreUrl', e.target.value)}
              className="form-control"
              placeholder="https://play.google.com/store/apps/details?id=..."
            />
          </div>
          <div className="form-group">
            <label>Apple App Store Link (iOS)</label>
            <input
              type="url"
              value={appBrandsData.appStoreUrl || ''}
              onChange={(e) => handleTextChange('appBrands', 'appStoreUrl', e.target.value)}
              className="form-control"
              placeholder="https://apps.apple.com/app/..."
            />
          </div>
        </div>
      </div>

      {/* Partner Brands Header & Add Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
        paddingTop: '6px',
        borderTop: '1px solid rgba(10, 46, 93, 0.08)'
      }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0A2E5D', fontWeight: 800 }}>
            🏢 Authorised Brand Partners List ({brands.length} Total)
          </h4>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Edit company logos, origin tags, budget tiers, and product specifications below.
          </span>
        </div>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() =>
            handleAddArrayItem('appBrands', 'brands', {
              name: 'New Partner Brand',
              tier: filterTier === 'all' ? 'standard' : filterTier,
              sector: 'Electrical',
              origin: 'India Top Brand',
              itemsEn: 'Electrical, Wiring & Accessories',
              itemsMl: 'ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ, വയറുകൾ',
              color: '#0A2E5D',
              logo: ''
            })
          }
        >
          <Plus size={16} /> Add New Brand
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '20px',
        alignItems: 'center',
        background: '#f8fafc',
        padding: '12px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(10, 46, 93, 0.06)'
      }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '180px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search brand, category, or origin..."
            className="form-control"
            style={{ padding: '8px 12px 8px 36px', background: '#ffffff', fontSize: '0.85rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${brands.length})` },
            { id: 'premium', label: `👑 Luxury (${brands.filter(b => b.tier === 'premium').length})` },
            { id: 'standard', label: `⭐ Standard (${brands.filter(b => b.tier === 'standard').length})` },
            { id: 'budget', label: `💰 Value (${brands.filter(b => b.tier === 'budget').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTier(tab.id)}
              style={{
                padding: '7px 13px',
                borderRadius: '8px',
                border: filterTier === tab.id ? '1.5px solid #0A2E5D' : '1px solid #cbd5e1',
                background: filterTier === tab.id ? '#0A2E5D' : '#ffffff',
                color: filterTier === tab.id ? '#ffffff' : '#334155',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Cards Array */}
      <div className="array-items-list">
        {filteredWithIndex.map(({ item, idx }) => {
          const tierColor = item.tier === 'premium' ? '#d97706' : item.tier === 'standard' ? '#0A2E5D' : '#0f766e';
          const tierBadgeBg = item.tier === 'premium' ? 'rgba(212, 175, 55, 0.14)' : item.tier === 'standard' ? 'rgba(10, 46, 93, 0.08)' : 'rgba(15, 118, 110, 0.09)';
          const tierBadgeText = item.tier === 'premium' ? '#92400e' : item.tier === 'standard' ? '#0A2E5D' : '#0f766e';
          const tierLabel = item.tier === 'premium' ? '👑 Luxury' : item.tier === 'standard' ? '⭐ Standard' : '💰 Value';

          return (
            <div
              key={idx}
              className="array-item-row no-flex-row"
              style={{
                border: '1px solid rgba(10, 46, 93, 0.1)',
                borderLeft: `4px solid ${tierColor}`,
                background: '#ffffff',
                boxShadow: '0 2px 10px rgba(10, 46, 93, 0.04)',
                borderRadius: '12px',
                padding: '20px 22px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Card Top Strip */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(10, 46, 93, 0.06)',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#0A2E5D',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0A2E5D' }}>
                    {item.name || 'Unnamed Brand'}
                  </span>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '14px',
                    background: tierBadgeBg,
                    color: tierBadgeText
                  }}>
                    {tierLabel}
                  </span>
                  {item.origin && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: 'rgba(10, 46, 93, 0.05)',
                      color: '#475569'
                    }}>
                      {item.origin}
                    </span>
                  )}
                  {item.sector && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: '#f1f5f9',
                      color: '#0A2E5D',
                      textTransform: 'uppercase'
                    }}>
                      {item.sector}
                    </span>
                  )}
                </div>

                {/* Move & Delete Actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="nav-order-btn"
                    title="Move Up"
                    onClick={() => handleMoveArrayItem('appBrands', 'brands', idx, 'up')}
                    disabled={idx === 0}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="nav-order-btn"
                    title="Move Down"
                    onClick={() => handleMoveArrayItem('appBrands', 'brands', idx, 'down')}
                    disabled={idx === brands.length - 1}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="nav-delete-btn"
                    title="Delete Brand"
                    onClick={() => handleDeleteArrayItem('appBrands', 'brands', idx)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* LOGO MANAGEMENT ROW (Auto-Fit Live Preview & Upload/URL Inputs) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid rgba(10, 46, 93, 0.08)',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                flexWrap: 'wrap'
              }}>
                {/* Visual Box-Fit Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Logo Preview (124×44px Box)
                  </span>
                  <div style={{
                    width: '124px',
                    height: '44px',
                    borderRadius: '9px',
                    background: '#ffffff',
                    border: '1px solid rgba(10, 46, 93, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                  }}>
                    {item.logo ? (
                      <img
                        src={convertDriveUrl(item.logo)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0A2E5D', textAlign: 'center' }}>
                        {(item.name || 'Brand').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.66rem', color: item.logo ? '#16a34a' : '#64748b', fontWeight: 600 }}>
                    {item.logo ? '✓ Custom Logo Active' : '⚡ Auto Vector Logo'}
                  </span>
                </div>

                {/* Logo Controls: URL + Upload */}
                <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input
                        type="url"
                        value={item.logo || ''}
                        onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'logo', e.target.value)}
                        className="form-control"
                        placeholder="Paste Google Image URL / Web link (or upload below)..."
                        style={{ fontSize: '0.82rem', padding: '7px 10px' }}
                      />
                    </div>
                    {item.logo && (
                      <button
                        type="button"
                        onClick={() => handleArrayItemChange('appBrands', 'brands', idx, 'logo', '')}
                        title="Remove custom logo (use auto vector logo)"
                        style={{
                          background: '#fee2e2',
                          border: '1px solid #fca5a5',
                          color: '#dc2626',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <X size={13} /> Reset
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <label style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '5px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#0A2E5D',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <Upload size={13} />
                      <span>{uploadingIdx === idx ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => onFileUploadWrapper(e, idx)}
                        disabled={uploadingIdx === idx}
                      />
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      PNG, SVG, or JPG (auto-fits inside box with 100% quality)
                    </span>
                  </div>
                </div>
              </div>

              {/* CORE CARD DETAILS FORM */}
              <div className="array-fields-grid">
                {/* 1. Brand Name */}
                <div className="form-group">
                  <label>Company / Brand Name *</label>
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'name', e.target.value)}
                    className="form-control font-bold"
                    placeholder="e.g. Legrand, Finolex, V-Guard, Siemens"
                  />
                </div>

                {/* 2. Customer Budget Tier */}
                <div className="form-group">
                  <label>Customer Budget Tier</label>
                  <select
                    value={item.tier || 'standard'}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'tier', e.target.value)}
                    className="form-control"
                  >
                    <option value="premium">👑 Luxury & Architectural (Tier-1 Premium)</option>
                    <option value="standard">⭐ Commercial & Residential (National Standard)</option>
                    <option value="budget">💰 Smart Economy & Value (Certified Utility)</option>
                  </select>
                </div>

                {/* 3. Product Sector / Category */}
                <div className="form-group">
                  <label>Product Sector / Category</label>
                  <select
                    value={item.sector || 'Electrical'}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'sector', e.target.value)}
                    className="form-control"
                  >
                    <option value="Electrical">Electrical & Switchgear</option>
                    <option value="Plumbing">Plumbing & Sanitary</option>
                    <option value="Solar">Solar & Energy EPC</option>
                    <option value="Lighting">Lighting & Fixtures</option>
                    <option value="Pumps">Pumps & Motors</option>
                    <option value="Hardware">Hardware & Security</option>
                  </select>
                </div>

                {/* 4. Origin / Credential Tag */}
                <div className="form-group">
                  <label>Origin / Credential Tag</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={item.origin || ''}
                      onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'origin', e.target.value)}
                      className="form-control"
                      placeholder="e.g. Global Luxury, India Top Brand, Kerala Favorite"
                    />
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleArrayItemChange('appBrands', 'brands', idx, 'origin', e.target.value);
                        }
                      }}
                      className="form-control"
                      style={{ width: '130px', flexShrink: 0 }}
                      defaultValue=""
                    >
                      <option value="" disabled>Presets...</option>
                      {ORIGIN_SUGGESTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* 5. Items in English */}
                <div className="form-group">
                  <label>Products / Items Scope (English)</label>
                  <input
                    type="text"
                    value={item.itemsEn || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'itemsEn', e.target.value)}
                    className="form-control"
                    placeholder="e.g. Luxury Modular Switches, Home Automation & MCBs"
                  />
                </div>

                {/* 6. Items in Malayalam */}
                <div className="form-group">
                  <label>Products / Items Scope (Malayalam)</label>
                  <input
                    type="text"
                    value={item.itemsMl || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'itemsMl', e.target.value)}
                    className="form-control"
                    placeholder="ഉദാ: പ്രീമിയം മോഡുലാർ സ്വിച്ചുകൾ, ഹോം ഓട്ടോമേഷൻ"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Add Brand Button */}
      <button
        type="button"
        className="secondary-action-btn"
        style={{ marginTop: '10px' }}
        onClick={() =>
          handleAddArrayItem('appBrands', 'brands', {
            name: 'New Partner Brand',
            tier: 'standard',
            sector: 'Electrical',
            origin: 'India Top Brand',
            itemsEn: 'Featured Products & Solutions',
            itemsMl: 'പ്രധാന ഉൽപ്പന്നങ്ങൾ',
            color: '#0A2E5D',
            logo: ''
          })
        }
      >
        <Plus size={15} /> Add Another Partner Brand
      </button>
    </div>
  );
}
