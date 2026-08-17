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
  return (
    <div className="section-form">
                  <h3>Edit Hero Banner</h3>
                  <div className="form-group">
                    <label>Tagline Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.tagline || ''}
                      onChange={(e) => handleTextChange('hero', 'tagline', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Text</label>
                    <textarea
                      value={sectionData[editLang].hero.subtitle || ''}
                      onChange={(e) => handleTextChange('hero', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.getStarted || ''}
                      onChange={(e) => handleTextChange('hero', 'getStarted', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary CTA Button Text</label>
                    <input
                      type="text"
                      value={sectionData[editLang].hero.contactUs || ''}
                      onChange={(e) => handleTextChange('hero', 'contactUs', e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h4>Statistical Highlights</h4>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Divisions Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.divisions || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'divisions')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Divisions Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.divisions || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, divisions: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 8+"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Districts Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.districts || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'districts')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Districts Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.districts || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, districts: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 14"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Associates Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.associates || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'associates')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Associates Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.associates || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, associates: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 500+"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Sectors Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.sectors || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', e.target.value, 'sectors')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Sectors Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].hero.stats?.counts?.sectors || ''}
                        onChange={(e) => handleTextChange('hero', 'stats', { ...sectionData[editLang].hero.stats, counts: { ...sectionData[editLang].hero.stats?.counts, sectors: e.target.value } })}
                        className="form-control"
                        placeholder="e.g. 10+"
                      />
                    </div>
                  </div>
                </div>
  );
}
