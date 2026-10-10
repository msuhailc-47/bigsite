import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw } from 'lucide-react';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import BusinessesEditor from './sections/BusinessesEditor';
import AppBrandsEditor from './sections/AppBrandsEditor';
import WhyChooseEditor from './sections/WhyChooseEditor';
import ProductsEditor from './sections/ProductsEditor';
import OpportunitiesEditor from './sections/OpportunitiesEditor';
import SoftwareEditor from './sections/SoftwareEditor';
import NetworkEditor from './sections/NetworkEditor';
import InvestorsEditor from './sections/InvestorsEditor';
import CareersEditor from './sections/CareersEditor';
import NewsEditor from './sections/NewsEditor';
import GalleryEditor from './sections/GalleryEditor';
import DownloadsEditor from './sections/DownloadsEditor';
import TestimonialsEditor from './sections/TestimonialsEditor';
import CsrEditor from './sections/CsrEditor';
import ContactEditor from './sections/ContactEditor';
import FooterEditor from './sections/FooterEditor';
import NavbarEditor from './sections/NavbarEditor';
import LegalEditor from './sections/LegalEditor';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ContentEditorTab({
  editingSection, setEditingSection,
  sectionVisibility, toggleSectionVisibility,
  sectionData, setSectionData,
  editLang, handleTextChange, handleFileUpload,
  handleArrayItemChange, handleAddArrayItem, handleDeleteArrayItem, handleMoveArrayItem,
  triggerNotification, navItems
}) {
  const SECTIONS_LIST = [
    { key: 'nav', label: 'Navbar Translations', noToggle: true },
    { key: 'hero', label: 'Hero Banner' },
    { key: 'about', label: 'About Us' },
    { key: 'businesses', label: 'Businesses' },
    { key: 'appBrands', label: 'App & Partner Brands' },
    { key: 'whyChoose', label: 'Why Choose Us' },
    { key: 'products', label: 'Products & Services' },
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'software', label: 'Software Solutions' },
    { key: 'network', label: 'Network Stats' },
    { key: 'investors', label: 'Investors' },
    { key: 'careers', label: 'Careers' },
    { key: 'news', label: 'News & Events' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'downloads', label: 'Downloads' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'csr', label: 'CSR Section' },
    { key: 'contact', label: 'Contact Info' },
    { key: 'legal', label: 'Legal Pages', noToggle: true },
    { key: 'footer', label: 'Footer Links', noToggle: true }
  ];

  const currentSecObj = SECTIONS_LIST.find(s => s.key === editingSection) || SECTIONS_LIST[0];

  return (
    <div className="admin-pages-layout animate-fadeIn">
      {/* Top Horizontal Section Navigator */}
      <div className="admin-sections-topbar">
        <div className="admin-sections-topbar-header">
          <div className="admin-sections-title-group">
            <span className="admin-sections-badge">SELECT SECTION</span>
            <div className="admin-sections-active-info">
              <h3>{currentSecObj.label}</h3>
              {!currentSecObj.noToggle && (
                <button
                  type="button"
                  className={`active-section-toggle ${sectionVisibility[editingSection] === false ? 'off' : 'on'}`}
                  onClick={() => toggleSectionVisibility(editingSection)}
                  title={sectionVisibility[editingSection] === false ? 'Section is hidden on website — Click to show' : 'Section is visible on website — Click to hide'}
                >
                  {sectionVisibility[editingSection] === false ? (
                    <>
                      <EyeOff size={14} />
                      <span>Hidden on Live Website</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} />
                      <span>Visible on Live Website</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Quick Dropdown Jump */}
          <div className="admin-sections-dropdown-wrapper">
            <label>Quick Jump:</label>
            <select
              value={editingSection}
              onChange={(e) => {
                setEditingSection(e.target.value);
                const contentEl = document.querySelector('.admin-content');
                if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="admin-sections-select"
            >
              {SECTIONS_LIST.map(sec => (
                <option key={sec.key} value={sec.key}>
                  {sec.label} {sectionVisibility[sec.key] === false ? '(Hidden)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal Scrollable Pills of All 20 Sections */}
        <div className="admin-sections-scroll-track">
          {SECTIONS_LIST.map(sec => (
            <div
              key={sec.key}
              className={`sec-pill ${editingSection === sec.key ? 'active' : ''} ${sectionVisibility[sec.key] === false ? 'hidden-sec' : ''}`}
            >
              <button
                type="button"
                className="sec-pill-btn"
                onClick={() => {
                  setEditingSection(sec.key);
                  const contentEl = document.querySelector('.admin-content');
                  if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {sec.label}
              </button>
              {!sec.noToggle && (
                <button
                  type="button"
                  className={`sec-pill-eye ${sectionVisibility[sec.key] === false ? 'off' : 'on'}`}
                  onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(sec.key); }}
                  title={sectionVisibility[sec.key] === false ? 'Section Hidden — Click to Show' : 'Section Visible — Click to Hide'}
                >
                  {sectionVisibility[sec.key] === false ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full-Width Page Content Form */}
      <div className="admin-page-content-fields full-width">

              {/* SECTION: Navbar */}
              {editingSection === 'nav' && (
                <NavbarEditor
                  sectionData={sectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  navItems={navItems}
                />
              )}
              
              {/* SECTION: Hero Banner */}
              {editingSection === 'hero' && (
                <HeroEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: About Us */}
              {editingSection === 'about' && (
                <AboutEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Businesses */}
              {editingSection === 'businesses' && (
                <BusinessesEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: App & Partner Brands */}
              {editingSection === 'appBrands' && (
                <AppBrandsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Why Choose Us */}
              {editingSection === 'whyChoose' && (
                <WhyChooseEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Products & Services */}
              {editingSection === 'products' && (
                <ProductsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Opportunities */}
              {editingSection === 'opportunities' && (
                <OpportunitiesEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Software */}
              {editingSection === 'software' && (
                <SoftwareEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Network */}
              {editingSection === 'network' && (
                <NetworkEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Investors */}
              {editingSection === 'investors' && (
                <InvestorsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Careers */}
              {editingSection === 'careers' && (
                <CareersEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: News & Events */}
              {editingSection === 'news' && (
                <NewsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Gallery */}
              {editingSection === 'gallery' && (
                <GalleryEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Downloads */}
              {editingSection === 'downloads' && (
                <DownloadsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Testimonials */}
              {editingSection === 'testimonials' && (
                <TestimonialsEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: CSR */}
              {editingSection === 'csr' && (
                <CsrEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Contact Info */}
              {editingSection === 'contact' && (
                <ContactEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {/* SECTION: Legal */}
              {editingSection === 'legal' && (
                <LegalEditor
                  sectionData={sectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                />
              )}

              {/* SECTION: Footer */}
              {editingSection === 'footer' && (
                <FooterEditor
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  editLang={editLang}
                  handleTextChange={handleTextChange}
                  handleArrayItemChange={handleArrayItemChange}
                  handleAddArrayItem={handleAddArrayItem}
                  handleDeleteArrayItem={handleDeleteArrayItem}
                  handleMoveArrayItem={handleMoveArrayItem}
                  handleFileUpload={handleFileUpload}
                />
              )}

            </div>
          </div>
  );
}
