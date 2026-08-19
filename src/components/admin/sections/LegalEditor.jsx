import React from 'react';

export default function LegalEditor({ sectionData, editLang, handleTextChange }) {
  return (
    <div className='admin-panel-card animate-fadeIn'>
      <h3>Legal & Policies</h3>
      <p className='section-description'>Edit your privacy policy, terms, refunds, and disclaimers. You can use standard HTML formatting (like &lt;h2&gt;, &lt;p&gt;, &lt;b&gt;, etc.)</p>
      
      <div className='form-group'>
        <label>Privacy Policy</label>
        <textarea 
          className='form-control' 
          rows='6'
          value={sectionData[editLang].legal?.privacyPolicy || ''} 
          onChange={(e) => handleTextChange('legal', 'privacyPolicy', e.target.value)}
          placeholder='Enter Privacy Policy...'
        />
      </div>

      <div className='form-group'>
        <label>Terms & Conditions</label>
        <textarea 
          className='form-control' 
          rows='6'
          value={sectionData[editLang].legal?.termsConditions || ''} 
          onChange={(e) => handleTextChange('legal', 'termsConditions', e.target.value)}
          placeholder='Enter Terms & Conditions...'
        />
      </div>

      <div className='form-group'>
        <label>Refund Policy</label>
        <textarea 
          className='form-control' 
          rows='4'
          value={sectionData[editLang].legal?.refundPolicy || ''} 
          onChange={(e) => handleTextChange('legal', 'refundPolicy', e.target.value)}
          placeholder='Enter Refund Policy...'
        />
      </div>

      <div className='form-group'>
        <label>Disclaimer</label>
        <textarea 
          className='form-control' 
          rows='4'
          value={sectionData[editLang].legal?.disclaimer || ''} 
          onChange={(e) => handleTextChange('legal', 'disclaimer', e.target.value)}
          placeholder='Enter Disclaimer...'
        />
      </div>
    </div>
  );
}