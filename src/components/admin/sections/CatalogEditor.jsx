import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Download, 
  MessageCircle, 
  Layers, 
  Image as ImageIcon,
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { convertDriveUrl } from '../../../utils/getOptimizedUrl';
import translations from '../../../i18n/translations';

export default function CatalogEditor({
  sectionData,
  setSectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleMoveArrayItem,
  handleFileUpload
}) {
  const currentLang = editLang || 'en';
  const catalogData = sectionData?.[currentLang]?.catalog || translations[currentLang]?.catalog || translations.en.catalog;

  const [activeTab, setActiveTab] = useState('all');

  const categories = catalogData?.categories || [
    { id: 'switches', name: 'Modular Switches & Electricals' },
    { id: 'lighting', name: 'Luxury Chandeliers & Lighting' },
    { id: 'sanitary', name: 'Sanitaryware & Bathware' },
    { id: 'plumbing', name: 'Plumbing & Pipes Godown' }
  ];

  const products = catalogData?.products || [];

  const handleProductChange = (index, field, value) => {
    let finalVal = value;
    if (field === 'image' && typeof value === 'string' && value.includes('drive.google.com')) {
      finalVal = convertDriveUrl(value);
    }

    setSectionData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[currentLang]) copy[currentLang] = {};
      if (!copy[currentLang].catalog) copy[currentLang].catalog = { ...catalogData };
      if (!copy[currentLang].catalog.products) copy[currentLang].catalog.products = [...products];

      copy[currentLang].catalog.products[index] = {
        ...copy[currentLang].catalog.products[index],
        [field]: finalVal
      };
      return copy;
    });
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      category: activeTab === 'all' ? 'switches' : activeTab,
      name: currentLang === 'en' ? 'New Catalog Item' : 'പുതിയ ഉൽപ്പന്നം',
      code: `DC-PR-${Math.floor(100 + Math.random() * 900)}`,
      badge: 'New Arrival',
      image: '',
      description: currentLang === 'en' ? 'High quality product description and features...' : 'ഉൽപ്പന്നത്തിന്റെ വിവരണം...',
      specs: ['Premium Grade', 'Certified Safe', 'Trade Warranty'],
      whatsappMessage: ''
    };

    setSectionData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[currentLang]) copy[currentLang] = {};
      if (!copy[currentLang].catalog) copy[currentLang].catalog = { ...catalogData };
      if (!copy[currentLang].catalog.products) copy[currentLang].catalog.products = [...products];

      copy[currentLang].catalog.products.push(newProduct);
      return copy;
    });
  };

  const handleDeleteProduct = (index) => {
    if (!window.confirm("Are you sure you want to remove this product from catalog?")) return;
    setSectionData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[currentLang].catalog.products.splice(index, 1);
      return copy;
    });
  };

  const handleMoveProduct = (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= products.length) return;

    setSectionData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const list = copy[currentLang].catalog.products;
      const temp = list[index];
      list[index] = list[targetIdx];
      list[targetIdx] = temp;
      return copy;
    });
  };

  const handleRestoreDefaults = () => {
    if (!window.confirm("Reset catalog items to standard 16 default collections? Any custom products added will be replaced.")) return;
    setSectionData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[currentLang]) copy[currentLang] = {};
      copy[currentLang].catalog = JSON.parse(JSON.stringify(translations[currentLang]?.catalog || translations.en.catalog));
      return copy;
    });
  };

  return (
    <div className="section-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#0A2E5D', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="#D4AF37" />
            Doorcarts Product Catalog ({currentLang === 'en' ? 'English' : 'മലയാളം'})
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#64748b' }}>
            Manage the 4 core product categories, items, Google Drive photos, and instant WhatsApp inquiry messages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestoreDefaults}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}
          title="Restore standard 16 product cards"
        >
          <RotateCcw size={14} /> Restore 16 Default Products
        </button>
      </div>

      {/* Header & Meta Settings */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#1e293b' }}>
          Catalog Page Header & Action Settings
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
              BADGE TAGLINE
            </label>
            <input
              type="text"
              value={catalogData.badge || ''}
              onChange={(e) => handleTextChange('catalog', 'badge', e.target.value)}
              className="form-control"
              placeholder="e.g. DOORCARTS PRODUCT CATALOG • DIRECT WAREHOUSE SUPPLY"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
              MAIN HEADLINE
            </label>
            <input
              type="text"
              value={catalogData.title || ''}
              onChange={(e) => handleTextChange('catalog', 'title', e.target.value)}
              className="form-control"
              placeholder="e.g. Explore Our Building & Living Collections"
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
            SUBTITLE / INTRO TEXT
          </label>
          <textarea
            value={catalogData.subtitle || ''}
            onChange={(e) => handleTextChange('catalog', 'subtitle', e.target.value)}
            className="form-control"
            rows={2}
            placeholder="Introduction text for catalog visitors..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
              CATALOG BROCHURE PDF LINK (GOOGLE DRIVE / DIRECT URL)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={catalogData.brochureUrl || ''}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.includes('drive.google.com')) val = convertDriveUrl(val);
                  handleTextChange('catalog', 'brochureUrl', val);
                }}
                className="form-control"
                placeholder="Paste Drive PDF link or URL (leaves to WhatsApp if empty)"
              />
              {catalogData.brochureUrl && (
                <a 
                  href={catalogData.brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ padding: '8px 12px', background: '#e2e8f0', borderRadius: '6px', color: '#0f172a', display: 'flex', alignItems: 'center' }}
                  title="Test PDF Link"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>If left empty, clicking Download PDF opens WhatsApp to request the catalog directly.</span>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
              WHATSAPP ENQUIRY PHONE NUMBER
            </label>
            <input
              type="text"
              value={catalogData.whatsappNumber || '+918606999350'}
              onChange={(e) => handleTextChange('catalog', 'whatsappNumber', e.target.value)}
              className="form-control"
              placeholder="+918606999350"
            />
            <span style={{ fontSize: '11px', color: '#64748b' }}>WhatsApp number that receives all product enquiries.</span>
          </div>
        </div>
      </div>

      {/* Category Tabs for Fast Product Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn-filter ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: activeTab === 'all' ? '1px solid #0A2E5D' : '1px solid #cbd5e1',
              background: activeTab === 'all' ? '#0A2E5D' : '#ffffff',
              color: activeTab === 'all' ? '#ffffff' : '#334155',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            All Items ({products.length})
          </button>
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            const isAct = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isAct ? '1px solid #0A2E5D' : '1px solid #cbd5e1',
                  background: isAct ? '#0A2E5D' : '#ffffff',
                  color: isAct ? '#ffffff' : '#334155',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#0A2E5D',
            color: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Add Product Card
        </button>
      </div>

      {/* Products List */}
      <div className="array-items-list">
        {products.map((product, idx) => {
          if (activeTab !== 'all' && product.category !== activeTab) return null;

          const previewUrl = product.image ? convertDriveUrl(product.image) : '';

          return (
            <div 
              key={product.id || idx} 
              className="array-item-row no-flex-row" 
              style={{
                padding: '20px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                background: '#ffffff',
                marginBottom: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              {/* Product Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 700, color: '#0A2E5D', fontSize: '1rem' }}>
                    #{idx + 1} — {product.name || 'Untitled Product'}
                  </span>
                  {product.code && (
                    <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                      {product.code}
                    </span>
                  )}
                  {product.badge && (
                    <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleMoveProduct(idx, 'up')}
                    disabled={idx === 0}
                    className="nav-action-btn"
                    title="Move Up"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveProduct(idx, 'down')}
                    disabled={idx === products.length - 1}
                    className="nav-action-btn"
                    title="Move Down"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(idx)}
                    className="nav-delete-btn"
                    title="Delete Product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Main Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    PRODUCT NAME
                  </label>
                  <input
                    type="text"
                    value={product.name || ''}
                    onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                    className="form-control font-bold"
                    placeholder="e.g. Ultra-Slim Glass Touch Modular Switch Panel"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    CATEGORY
                  </label>
                  <select
                    value={product.category || 'switches'}
                    onChange={(e) => handleProductChange(idx, 'category', e.target.value)}
                    className="form-control"
                    style={{ background: '#ffffff', cursor: 'pointer' }}
                  >
                    <option value="switches">Modular Switches & Electricals</option>
                    <option value="lighting">Luxury Chandeliers & Lighting</option>
                    <option value="sanitary">Sanitaryware & Bathware</option>
                    <option value="plumbing">Plumbing & Pipes Godown</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    MODEL CODE
                  </label>
                  <input
                    type="text"
                    value={product.code || ''}
                    onChange={(e) => handleProductChange(idx, 'code', e.target.value)}
                    className="form-control"
                    placeholder="e.g. DC-SW-101"
                  />
                </div>
              </div>

              {/* Image & Badge Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    PRODUCT IMAGE URL (OR GOOGLE DRIVE SHARE LINK)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={product.image || ''}
                      onChange={(e) => handleProductChange(idx, 'image', e.target.value)}
                      className="form-control"
                      placeholder="Paste Google Drive share link or image URL..."
                    />
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1', flexShrink: 0 }}
                      />
                    ) : (
                      <div style={{ width: '44px', height: '44px', borderRadius: '6px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ImageIcon size={18} color="#94a3b8" />
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 500 }}>
                    ✓ Auto-converts Google Drive links to high-speed CDN preview with no-referrer
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    PROMO BADGE
                  </label>
                  <input
                    type="text"
                    value={product.badge || ''}
                    onChange={(e) => handleProductChange(idx, 'badge', e.target.value)}
                    className="form-control"
                    placeholder="e.g. Best Seller, Trending, Spa Edition..."
                  />
                </div>
              </div>

              {/* Description & Specs Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    value={product.description || ''}
                    onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                    className="form-control"
                    rows={2}
                    placeholder="Short appealing description..."
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    SPECIFICATIONS (COMMA SEPARATED)
                  </label>
                  <textarea
                    value={(product.specs || []).join(', ')}
                    onChange={(e) => {
                      const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      handleProductChange(idx, 'specs', arr);
                    }}
                    className="form-control"
                    rows={2}
                    placeholder="e.g. 10A / 16A, Glass Touch, 10-Yr Warranty"
                  />
                </div>
              </div>

              {/* Custom WhatsApp Message */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={14} color="#25D366" />
                  CUSTOM WHATSAPP ENQUIRY PRE-FILLED MESSAGE
                </label>
                <input
                  type="text"
                  value={product.whatsappMessage || ''}
                  onChange={(e) => handleProductChange(idx, 'whatsappMessage', e.target.value)}
                  className="form-control"
                  placeholder={`Hi Doorcarts, I am interested in '${product.name}' (Model: ${product.code || 'N/A'}). Please share pricing.`}
                />
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Leave empty to use automatic message with product name & model code.
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
