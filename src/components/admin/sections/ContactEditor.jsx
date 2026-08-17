import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ContactEditor({
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
                  <h3>Edit Office Contact Details</h3>
                  <div className="form-group">
                    <label>Subheading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].contact.title || ''}
                      onChange={(e) => handleTextChange('contact', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Office Address text block</label>
                    <textarea
                      value={sectionData[editLang].contact.address || ''}
                      onChange={(e) => handleTextChange('contact', 'address', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Telephone Number</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.phone || ''}
                        onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={sectionData[editLang].contact.email || ''}
                        onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>WhatsApp Number</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.whatsapp || ''}
                        onChange={(e) => handleTextChange('contact', 'whatsapp', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Google Maps Embed URL (src)</label>
                      <input
                        type="text"
                        value={sectionData[editLang].contact.mapUrl || ''}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.includes('<iframe') && val.includes('src="')) {
                            const match = val.match(/src="([^"]+)"/);
                            if (match && match[1]) {
                              val = match[1];
                            }
                          }
                          handleTextChange('contact', 'mapUrl', val);
                        }}
                        className="form-control"
                        placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                      />
                      <small style={{display: 'block', marginTop: '5px', color: '#666', fontSize: '11px', lineHeight: '1.4'}}>
                        <strong>Note:</strong> Standard share links (maps.app.goo.gl) will NOT work. To get the correct link:<br/>
                        1. Open the location in Google Maps on your computer.<br/>
                        2. Click <strong>"Share"</strong> &gt; <strong>"Embed a map"</strong>.<br/>
                        3. Click <strong>"Copy HTML"</strong> and paste it here (we will automatically extract the link for you).
                      </small>
                    </div>
                  </div>
                </div>
  );
}
