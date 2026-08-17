import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function FooterEditor({
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
  return (
    <div className="section-form">
                  <h3>Edit Footer Social Links</h3>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Facebook URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.facebook || ''}
                        onChange={(e) => handleTextChange('footer', 'facebook', e.target.value)}
                        className="form-control"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Instagram URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.instagram || ''}
                        onChange={(e) => handleTextChange('footer', 'instagram', e.target.value)}
                        className="form-control"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Twitter / X URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.twitter || ''}
                        onChange={(e) => handleTextChange('footer', 'twitter', e.target.value)}
                        className="form-control"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>LinkedIn URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.linkedin || ''}
                        onChange={(e) => handleTextChange('footer', 'linkedin', e.target.value)}
                        className="form-control"
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>YouTube URL</label>
                      <input
                        type="url"
                        value={sectionData[editLang].footer.youtube || ''}
                        onChange={(e) => handleTextChange('footer', 'youtube', e.target.value)}
                        className="form-control"
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>
                  
                  <h4>Footer Labels</h4>
                  <div className="form-row">
                    <div className="form-group col-4">
                      <label>Quick Links Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.quickLinks || ''}
                        onChange={(e) => handleTextChange('footer', 'quickLinks', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Legal Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.legal || ''}
                        onChange={(e) => handleTextChange('footer', 'legal', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label>Contact Us Heading</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.connect || ''}
                        onChange={(e) => handleTextChange('footer', 'connect', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Privacy Policy Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.privacy || ''}
                        onChange={(e) => handleTextChange('footer', 'privacy', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Terms Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.terms || ''}
                        onChange={(e) => handleTextChange('footer', 'terms', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Refund Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.refund || ''}
                        onChange={(e) => handleTextChange('footer', 'refund', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Disclaimer Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].footer.disclaimer || ''}
                        onChange={(e) => handleTextChange('footer', 'disclaimer', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Copyright Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].footer.copyright || ''}
                      onChange={(e) => handleTextChange('footer', 'copyright', e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
  );
}
