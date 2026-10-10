import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function HeroEditor({
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
  const hero = sectionData[editLang]?.hero || {};

  return (
    <div className="section-form">
      <h3>Edit Hero Banner (Left Content)</h3>
      <div className="form-group">
        <label>Top Badge Text</label>
        <input
          type="text"
          value={hero.badge || ''}
          onChange={(e) => handleTextChange('hero', 'badge', e.target.value)}
          className="form-control"
          placeholder="e.g. DOREK INTERNATIONAL ENTERPRISES LLP"
        />
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Main Heading — Line 1 (White)</label>
          <input
            type="text"
            value={hero.titleLine1 || ''}
            onChange={(e) => handleTextChange('hero', 'titleLine1', e.target.value)}
            className="form-control"
            placeholder="e.g. Engineering Excellence."
          />
        </div>
        <div className="form-group col-6">
          <label>Main Heading — Line 2 (Gold Highlight)</label>
          <input
            type="text"
            value={hero.titleLine2 || ''}
            onChange={(e) => handleTextChange('hero', 'titleLine2', e.target.value)}
            className="form-control"
            placeholder="e.g. Powering Future Brands."
          />
        </div>
      </div>
      <div className="form-group">
        <label>Subtitle / Description Text</label>
        <textarea
          value={hero.subtitle || ''}
          onChange={(e) => handleTextChange('hero', 'subtitle', e.target.value)}
          className="form-control"
          rows={3}
        />
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Primary CTA Button Text</label>
          <input
            type="text"
            value={hero.getStarted || ''}
            onChange={(e) => handleTextChange('hero', 'getStarted', e.target.value)}
            className="form-control"
            placeholder="e.g. Explore Our Businesses"
          />
        </div>
        <div className="form-group col-6">
          <label>Secondary CTA Button Text</label>
          <input
            type="text"
            value={hero.contactUs || ''}
            onChange={(e) => handleTextChange('hero', 'contactUs', e.target.value)}
            className="form-control"
            placeholder="e.g. Connect With Team"
          />
        </div>
      </div>

      <h4>Statistical Highlights</h4>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Stat 1 Label (Divisions)</label>
          <input
            type="text"
            value={hero.stats?.divisions || ''}
            onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'divisions')}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>Stat 1 Value</label>
          <input
            type="text"
            value={hero.stats?.counts?.divisions || ''}
            onChange={(e) => handleTextChange('hero', 'stats', { ...hero.stats, counts: { ...hero.stats?.counts, divisions: e.target.value } })}
            className="form-control"
            placeholder="e.g. 8+"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Stat 2 Label (Districts)</label>
          <input
            type="text"
            value={hero.stats?.districts || ''}
            onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'districts')}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>Stat 2 Value</label>
          <input
            type="text"
            value={hero.stats?.counts?.districts || ''}
            onChange={(e) => handleTextChange('hero', 'stats', { ...hero.stats, counts: { ...hero.stats?.counts, districts: e.target.value } })}
            className="form-control"
            placeholder="e.g. 14"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Stat 3 Label (Partners/Associates)</label>
          <input
            type="text"
            value={hero.stats?.associates || ''}
            onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'associates')}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>Stat 3 Value</label>
          <input
            type="text"
            value={hero.stats?.counts?.associates || ''}
            onChange={(e) => handleTextChange('hero', 'stats', { ...hero.stats, counts: { ...hero.stats?.counts, associates: e.target.value } })}
            className="form-control"
            placeholder="e.g. 500+"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Stat 4 Label (Standard/Sectors)</label>
          <input
            type="text"
            value={hero.stats?.sectors || ''}
            onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'sectors')}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>Stat 4 Value</label>
          <input
            type="text"
            value={hero.stats?.counts?.sectors || ''}
            onChange={(e) => handleTextChange('hero', 'stats', { ...hero.stats, counts: { ...hero.stats?.counts, sectors: e.target.value } })}
            className="form-control"
            placeholder="e.g. Global"
          />
        </div>
      </div>

      <hr style={{ margin: '30px 0', borderColor: 'rgba(10,46,93,0.1)' }} />

      <h3>Edit Hero Enquiry Form (Right Side Card)</h3>
      <div className="form-group">
        <label>Form Top Badge (e.g., Dorek Flagship Brand • Doorcarts)</label>
        <input
          type="text"
          value={hero.formBadge || ''}
          onChange={(e) => handleTextChange('hero', 'formBadge', e.target.value)}
          className="form-control"
          placeholder="e.g. Dorek Flagship Brand • Doorcarts"
        />
      </div>
      <div className="form-group">
        <label>Form Main Title (e.g., Partner With Doorcarts)</label>
        <input
          type="text"
          value={hero.formTitle || ''}
          onChange={(e) => handleTextChange('hero', 'formTitle', e.target.value)}
          className="form-control"
          placeholder="e.g. Partner With Doorcarts"
        />
      </div>
      <div className="form-group">
        <label>Form Description / Subtitle</label>
        <textarea
          value={hero.formSubtitle || ''}
          onChange={(e) => handleTextChange('hero', 'formSubtitle', e.target.value)}
          className="form-control"
          rows={2}
          placeholder="e.g. Connect with Dorek International to explore Doorcarts franchise stores..."
        />
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Enquiry Question Label</label>
          <input
            type="text"
            value={hero.formQuestion || ''}
            onChange={(e) => handleTextChange('hero', 'formQuestion', e.target.value)}
            className="form-control"
            placeholder="e.g. Why are you interested in Doorcarts?"
          />
        </div>
        <div className="form-group col-6">
          <label>Enquiry Question Placeholder</label>
          <input
            type="text"
            value={hero.formPlaceholder || ''}
            onChange={(e) => handleTextChange('hero', 'formPlaceholder', e.target.value)}
            className="form-control"
            placeholder="e.g. Franchise ownership, retail partner, smart QR..."
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Submit Button Text</label>
          <input
            type="text"
            value={hero.formSubmitBtn || ''}
            onChange={(e) => handleTextChange('hero', 'formSubmitBtn', e.target.value)}
            className="form-control"
            placeholder="e.g. Submit Doorcarts Enquiry"
          />
        </div>
        <div className="form-group col-6">
          <label>Bottom Trust Note</label>
          <input
            type="text"
            value={hero.formTrustText || ''}
            onChange={(e) => handleTextChange('hero', 'formTrustText', e.target.value)}
            className="form-control"
            placeholder="e.g. Direct response within 24 hours • Confidential"
          />
        </div>
      </div>
    </div>
  );
}
