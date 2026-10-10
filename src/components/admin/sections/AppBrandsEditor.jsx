import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Smartphone, Crown, Star, Wallet, Search } from 'lucide-react';

export const DEFAULT_ADMIN_BRANDS = [
  { name: 'Legrand', tier: 'premium', sector: 'Electrical', itemsEn: 'Luxury Modular Switches, Home Automation & MCBs', itemsMl: 'പ്രീമിയം മോഡുലാർ സ്വിച്ചുകൾ, ഹോം ഓട്ടോമേഷൻ', color: '#D4AF37', logo: '' },
  { name: 'Schneider Electric', tier: 'premium', sector: 'Electrical', itemsEn: 'Smart Switchgear, Industrial Panels & Automation', itemsMl: 'സ്മാർട്ട് സ്വിച്ച്ഗിയർ, ഇൻഡസ്ട്രിയൽ പാനലുകൾ', color: '#10b981', logo: '' },
  { name: 'Kohler', tier: 'premium', sector: 'Plumbing', itemsEn: 'Designer Sanitaryware, Luxury Faucets & Bath Suites', itemsMl: 'ലക്ഷ്വറി സാനിറ്ററിവെയർ, ഡിസൈനർ ടാപ്പുകൾ', color: '#0A2E5D', logo: '' },
  { name: 'Jaquar Artize', tier: 'premium', sector: 'Plumbing', itemsEn: 'Wellness Bath Fittings, Shower Enclosures & Thermostats', itemsMl: 'പ്രീമിയം ബാത്ത് ഫിറ്റിംഗ്സ്, ഷവർ സിസ്റ്റംസ്', color: '#b45309', logo: '' },
  { name: 'Grundfos', tier: 'premium', sector: 'Pumps', itemsEn: 'High-Efficiency Pressure Boosters & Smart Water Pumps', itemsMl: 'ഹൈ-എഫിഷ്യൻസി പ്രഷർ ബൂസ്റ്റർ പമ്പുകൾ', color: '#0284c7', logo: '' },
  { name: 'Philips Smart Lighting', tier: 'premium', sector: 'Lighting', itemsEn: 'Architectural LED, Smart WiFi & Chandelier Lighting', itemsMl: 'ആർക്കിടെക്ചറൽ & സ്മാർട്ട് LED ലൈറ്റിംഗ്', color: '#4f46e5', logo: '' },
  { name: 'Loom Solar / Enphase', tier: 'premium', sector: 'Solar', itemsEn: 'High-Efficiency Mono PERC Bifacial Panels & Microinverters', itemsMl: 'ഹൈ-എഫിഷ്യൻസി സോളാർ പാനലുകൾ & ഇൻവെർട്ടറുകൾ', color: '#d97706', logo: '' },
  { name: 'Yale / Godrej Smart Locks', tier: 'premium', sector: 'Hardware', itemsEn: 'Biometric Digital Door Locks, Video Door Phones & Safes', itemsMl: 'ബയോമെട്രിക് ഡിജിറ്റൽ ഡോർ ലോക്കുകൾ, സുരക്ഷാ സിസ്റ്റം', color: '#7c3aed', logo: '' },

  { name: 'Havells', tier: 'standard', sector: 'Electrical', itemsEn: 'Flame-Retardant Cables, Modular Switches, Fans & Appliances', itemsMl: 'വയറുകൾ, സ്വിച്ചുകൾ, ഫാനുകൾ, ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ', color: '#dc2626', logo: '' },
  { name: 'Finolex Cables & Pipes', tier: 'standard', sector: 'Electrical', itemsEn: 'House Wiring Cables, Conduit Pipes & UV-Protected Fittings', itemsMl: 'ഹൗസ് വയറിംഗ് കേബിളുകൾ, പൈപ്പുകൾ', color: '#2563eb', logo: '' },
  { name: 'V-Guard', tier: 'standard', sector: 'Solar', itemsEn: 'Inverters, Stabilizers, Solar Water Heaters & Pumps', itemsMl: 'ഇൻവെർട്ടറുകൾ, സ്റ്റെബിലൈസറുകൾ, സോളാർ വാട്ടർ ഹീറ്റർ', color: '#ea580c', logo: '' },
  { name: 'Polycab', tier: 'standard', sector: 'Electrical', itemsEn: 'FR/FRLS Wires, Industrial Power Cables & Switchgear', itemsMl: 'വയറുകൾ, ഇൻഡസ്ട്രിയൽ കേബിളുകൾ, സ്വിച്ച്ഗിയർ', color: '#e11d48', logo: '' },
  { name: 'Astral Pipes', tier: 'standard', sector: 'Plumbing', itemsEn: 'CPVC Pro, UPVC, Silencio Low-Noise Drainage Pipes', itemsMl: 'CPVC, UPVC പ്ലമ്പിംഗ് പൈപ്പുകളും ഫിറ്റിംഗ്സും', color: '#0369a1', logo: '' },
  { name: 'Cera Sanitaryware', tier: 'standard', sector: 'Plumbing', itemsEn: 'Wall-Hung Closets, Wash Basins, CP Taps & Tiles', itemsMl: 'ക്ലോസറ്റുകൾ, വാഷ് ബേസിനുകൾ, CP ടാപ്പുകൾ', color: '#0d9488', logo: '' },
  { name: 'Supreme Pipes', tier: 'standard', sector: 'Plumbing', itemsEn: 'Plumbing Systems, Underground Drainage & Water Tanks', itemsMl: 'പ്ലമ്പിംഗ് പൈപ്പുകൾ, വാട്ടർ ടാങ്കുകൾ', color: '#1d4ed8', logo: '' },
  { name: 'Crompton / Kirloskar', tier: 'standard', sector: 'Pumps', itemsEn: 'Domestic Monoblock, Borewell Submersible Pumps & Motors', itemsMl: 'ഗാർഹിക മോട്ടോറുകൾ, സബ്മേഴ്സിബിൾ പമ്പുകൾ', color: '#059669', logo: '' },
  { name: 'Luker / Wipro Lighting', tier: 'standard', sector: 'Lighting', itemsEn: 'LED Downlights, Panel Lights, Tube Lights & Floodlights', itemsMl: 'LED ലൈറ്റുകൾ, പാനൽ ലൈറ്റുകൾ, സ്ട്രീറ്റ് ലൈറ്റുകൾ', color: '#7c3aed', logo: '' },
  { name: 'Anchor by Panasonic', tier: 'standard', sector: 'Electrical', itemsEn: 'Roma Modular Switches, Distribution Boards & Accessories', itemsMl: 'റോമ സ്വിച്ചുകൾ, ഡിസ്ട്രിബ്യൂഷൻ ബോർഡുകൾ', color: '#0284c7', logo: '' },

  { name: 'GM / GreatWhite Economy', tier: 'budget', sector: 'Electrical', itemsEn: 'Cost-Effective Switches, Sockets, Extension Boards & Holders', itemsMl: 'കുറഞ്ഞ നിരക്കിലുള്ള മികച്ച സ്വിച്ചുകളും സോക്കറ്റുകളും', color: '#0891b2', logo: '' },
  { name: 'Kelachandra / Star Pipes', tier: 'budget', sector: 'Plumbing', itemsEn: 'ISI PVC Pipes, Agricultural Fittings & Economy Drainage', itemsMl: 'ബജറ്റ് ഫ്രണ്ട്‌ലി ISI PVC പൈപ്പുകളും ഫിറ്റിംഗ്സും', color: '#16a34a', logo: '' },
  { name: 'Parryware / Hindware Essential', tier: 'budget', sector: 'Plumbing', itemsEn: 'Budget-Friendly Sanitaryware, EWC Sets & PVC Cisterns', itemsMl: 'മിതമായ നിരക്കിലുള്ള സാനിറ്ററിവെയർ സെറ്റുകൾ', color: '#0284c7', logo: '' },
  { name: 'Surya / Halonix LED', tier: 'budget', sector: 'Lighting', itemsEn: 'Affordable LED Bulbs, Batten Tubes & Utility Lighting', itemsMl: 'കുറഞ്ഞ വിലയിലുള്ള ഈടുനിൽക്കുന്ന LED ബൾബുകൾ', color: '#ca8a04', logo: '' },
  { name: 'Texmo / Sharp Economy Pumps', tier: 'budget', sector: 'Pumps', itemsEn: 'Compact Domestic Water Pumps & Agriculture Motors', itemsMl: 'സാധാരണ വീടുകൾക്കുള്ള ബജറ്റ് വാട്ടർ പമ്പുകൾ', color: '#0d9488', logo: '' },
  { name: 'Microtek / Livguard Value', tier: 'budget', sector: 'Solar', itemsEn: 'Home UPS Inverters, Tubular Batteries & Basic Solar Kits', itemsMl: 'ബജറ്റ് ഹോം ഇൻവെർട്ടറുകളും ബാറ്ററികളും', color: '#dc2626', logo: '' },
  { name: 'Doorcarts Assured Selection', tier: 'budget', sector: 'Hardware', itemsEn: 'Direct-from-Factory Hardware, Fasteners, Tools & PVC Taps', itemsMl: 'ഡോർകാർട്ട്സ് നേരിട്ട് നൽകുന്ന ഹാർഡ്‌വെയർ & ടൂൾസ്', color: '#0A2E5D', logo: '' }
];

export default function AppBrandsEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem
}) {
  const [filterTier, setFilterTier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
        (item.itemsEn || '').toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });

  return (
    <div className="section-form">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'rgba(10, 46, 93, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Smartphone size={20} color="#0A2E5D" />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Doorcarts App & Partner Brands (3-Tier Budget Explorer)</h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '3px 0 0 0' }}>
            Manage Mobile App download links and categorize partner companies into <strong>Premium (20%)</strong>, <strong>Standard (60%)</strong>, and <strong>Budget Friendly (20%)</strong> tiers.
          </p>
        </div>
      </div>

      {/* Section Header Texts */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid rgba(10, 46, 93, 0.08)',
        borderRadius: '14px',
        padding: '22px 24px',
        marginTop: '20px',
        marginBottom: '22px'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '16px', color: '#0A2E5D', fontSize: '0.95rem' }}>
          ✨ Section Heading & Intro Text
        </h4>
        <div className="array-fields-grid">
          <div className="form-group">
            <label>Section Badge Label</label>
            <input
              type="text"
              value={appBrandsData.label || ''}
              onChange={(e) => handleTextChange('appBrands', 'label', e.target.value)}
              className="form-control"
              placeholder="e.g. DOORCARTS APP & PARTNER BRANDS"
            />
          </div>
          <div className="form-group">
            <label>Section Main Title</label>
            <input
              type="text"
              value={appBrandsData.title || ''}
              onChange={(e) => handleTextChange('appBrands', 'title', e.target.value)}
              className="form-control"
              placeholder="Every Brand for Every Budget — In One App"
            />
          </div>
          <div className="form-group col-span-2">
            <label>Section Subtitle</label>
            <input
              type="text"
              value={appBrandsData.subtitle || ''}
              onChange={(e) => handleTextChange('appBrands', 'subtitle', e.target.value)}
              className="form-control"
              placeholder="Check whether your preferred company and budget range are available right here..."
            />
          </div>
        </div>
      </div>

      {/* Mobile App Showcase & Store Links */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid rgba(10, 46, 93, 0.08)',
        borderRadius: '14px',
        padding: '22px 24px',
        marginBottom: '28px'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '16px', color: '#0A2E5D', fontSize: '0.95rem' }}>
          📱 Mobile App Details & Store Download Links
        </h4>
        <div className="array-fields-grid">
          <div className="form-group col-span-2">
            <label>App Title</label>
            <input
              type="text"
              value={appBrandsData.appName || ''}
              onChange={(e) => handleTextChange('appBrands', 'appName', e.target.value)}
              className="form-control font-bold"
              placeholder="Doorcarts by Dorek"
            />
          </div>
          <div className="form-group col-span-2">
            <label>App Description</label>
            <textarea
              rows={2}
              value={appBrandsData.appDesc || ''}
              onChange={(e) => handleTextChange('appBrands', 'appDesc', e.target.value)}
              className="form-control"
              placeholder="Explore 10,000+ electrical, plumbing, solar, lighting & sanitaryware products across all budget ranges."
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

      {/* Partner Brands Management Header & Filters */}
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
          <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0A2E5D' }}>
            🏢 Partner Brands List ({brands.length} Total)
          </h4>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Search, filter by customer tier, or add/edit companies below
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
              itemsEn: 'Switches, Wires & Accessories',
              itemsMl: 'സ്വിച്ചുകൾ, വയറുകൾ',
              color: '#0A2E5D',
              logo: ''
            })
          }
        >
          <Plus size={16} /> Add New Brand
        </button>
      </div>

      {/* Filter Bar inside Admin */}
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
            placeholder="Search brand or product..."
            className="form-control"
            style={{ padding: '9px 12px 9px 36px', background: '#ffffff', fontSize: '0.85rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${brands.length})` },
            { id: 'premium', label: `👑 Premium (${brands.filter(b => b.tier === 'premium').length})` },
            { id: 'standard', label: `⭐ Standard (${brands.filter(b => b.tier === 'standard').length})` },
            { id: 'budget', label: `💰 Budget (${brands.filter(b => b.tier === 'budget').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTier(tab.id)}
              style={{
                padding: '8px 13px',
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
          const tierColor = item.tier === 'premium' ? '#f59e0b' : item.tier === 'standard' ? '#2563eb' : '#10b981';
          const tierBadgeBg = item.tier === 'premium' ? 'rgba(245, 158, 11, 0.12)' : item.tier === 'standard' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(16, 185, 129, 0.12)';
          const tierBadgeText = item.tier === 'premium' ? '#b45309' : item.tier === 'standard' ? '#1d4ed8' : '#047857';
          const tierLabel = item.tier === 'premium' ? '👑 Premium (20%)' : item.tier === 'standard' ? '⭐ Standard (60%)' : '💰 Budget (20%)';

          return (
            <div
              key={idx}
              className="array-item-row no-flex-row"
              style={{
                borderLeft: `4px solid ${tierColor}`,
                background: '#ffffff',
                boxShadow: '0 2px 10px rgba(10, 46, 93, 0.04)',
                border: '1px solid rgba(10, 46, 93, 0.09)',
                borderLeftWidth: '4px',
                borderLeftColor: tierColor,
                padding: '20px 24px',
                gap: '16px'
              }}
            >
              {/* Top Header Row of Card */}
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
                    padding: '3px 9px',
                    borderRadius: '6px'
                  }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0A2E5D' }}>
                    {item.name || 'Unnamed Brand'}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: tierBadgeBg,
                    color: tierBadgeText
                  }}>
                    {tierLabel}
                  </span>
                  {item.sector && (
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: '#f1f5f9',
                      color: '#475569'
                    }}>
                      {item.sector}
                    </span>
                  )}
                </div>

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

              {/* Fields Grid */}
              <div className="array-fields-grid">
                <div className="form-group">
                  <label>Company / Brand Name</label>
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'name', e.target.value)}
                    className="form-control font-bold"
                    placeholder="e.g. Legrand, Finolex, V-Guard"
                  />
                </div>

                <div className="form-group">
                  <label>Customer Budget Tier</label>
                  <select
                    value={item.tier || 'standard'}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'tier', e.target.value)}
                    className="form-control"
                  >
                    <option value="premium">👑 Premium & Luxury (20% High-End)</option>
                    <option value="standard">⭐ Popular & Standard (60% Mid-Range)</option>
                    <option value="budget">💰 Budget Friendly (20% Economy)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Product Category / Sector</label>
                  <select
                    value={item.sector || 'Electrical'}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'sector', e.target.value)}
                    className="form-control"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing & Sanitary</option>
                    <option value="Solar">Solar & Inverter</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Pumps">Pumps & Motors</option>
                    <option value="Hardware">Hardware & Security</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Brand Logo URL (Optional)</label>
                  <input
                    type="text"
                    value={item.logo || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'logo', e.target.value)}
                    className="form-control"
                    placeholder="https://... (uses brand initials if blank)"
                  />
                </div>

                <div className="form-group">
                  <label>Items Available (English)</label>
                  <input
                    type="text"
                    value={item.itemsEn || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'itemsEn', e.target.value)}
                    className="form-control"
                    placeholder="e.g. Modular Switches, Cables & MCBs"
                  />
                </div>

                <div className="form-group">
                  <label>Items Available (Malayalam)</label>
                  <input
                    type="text"
                    value={item.itemsMl || ''}
                    onChange={(e) => handleArrayItemChange('appBrands', 'brands', idx, 'itemsMl', e.target.value)}
                    className="form-control"
                    placeholder="ഉദാ: മോഡുലാർ സ്വിച്ചുകൾ, വയറുകൾ"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="secondary-action-btn"
        style={{ marginTop: '8px' }}
        onClick={() =>
          handleAddArrayItem('appBrands', 'brands', {
            name: 'New Partner Brand',
            tier: 'standard',
            sector: 'Electrical',
            itemsEn: 'Featured Products',
            itemsMl: 'പ്രധാന ഉൽപ്പന്നങ്ങൾ',
            color: '#0A2E5D',
            logo: ''
          })
        }
      >
        <Plus size={15} /> Add Partner Company / Brand
      </button>
    </div>
  );
}
