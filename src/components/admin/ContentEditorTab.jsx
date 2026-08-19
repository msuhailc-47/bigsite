import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw } from 'lucide-react';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import BusinessesEditor from './sections/BusinessesEditor';
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
  return (
        
          <div className="admin-pages-layout animate-fadeIn">
            {/* Left page sub-navigator */}
            <aside className="admin-pages-sidebar">
              <h4>Select Section</h4>
              {[
                { key: 'nav', label: 'Navbar Translations', noToggle: true },
                { key: 'hero', label: 'Hero Banner' },
                { key: 'about', label: 'About Us' },
                { key: 'businesses', label: 'Businesses' },
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
                { key: 'footer', label: 'Footer Links', noToggle: true }
              ].map(sec => (
                <div key={sec.key} className={`page-side-row ${editingSection === sec.key ? 'active' : ''} ${sectionVisibility[sec.key] === false ? 'hidden-section' : ''}`}>
                  <button className="page-side-btn" onClick={() => setEditingSection(sec.key)}>
                    {sec.label}
                  </button>
                  {!sec.noToggle && (
                    <button
                      className={`visibility-toggle ${sectionVisibility[sec.key] === false ? 'off' : 'on'}`}
                      onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(sec.key); }}
                      title={sectionVisibility[sec.key] === false ? 'Section Hidden — Click to Show' : 'Section Visible — Click to Hide'}
                    >
                      {sectionVisibility[sec.key] === false ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
              ))}
            </aside>

            {/* Right page content form */}
            <div className="admin-page-content-fields">

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
