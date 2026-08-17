import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, RefreshCw, Upload, Image, X } from 'lucide-react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NetworkEditor({
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
                  <h3>Edit Kerala Network Stats</h3>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={sectionData[editLang].network.title || ''}
                      onChange={(e) => handleTextChange('network', 'title', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subtitle Details</label>
                    <textarea
                      value={sectionData[editLang].network.subtitle || ''}
                      onChange={(e) => handleTextChange('network', 'subtitle', e.target.value)}
                      className="form-control"
                      rows={2}
                    />
                  </div>

                  <h4>Stat Labels</h4>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Hubs Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.hubs || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'hubs')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Hubs Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.hubs || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), hubs: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Outlets Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.outlets || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'outlets')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Outlets Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.outlets || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), outlets: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-3">
                      <label>Associates Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.associates || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'associates')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Associates Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.associates || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), associates: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Districts Label</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.districts || ''}
                        onChange={(e) => handleTextChange('network', 'stats', e.target.value, 'districts')}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label>Districts Count</label>
                      <input
                        type="text"
                        value={sectionData[editLang].network.stats?.counts?.districts || ''}
                        onChange={(e) => handleTextChange('network', 'stats', { ...sectionData[editLang].network.stats, counts: { ...(sectionData[editLang].network.stats?.counts || {}), districts: e.target.value } })}
                        className="form-control"
                        placeholder="Auto"
                      />
                    </div>
                  </div>

                  <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Districts</h4>
                    <button 
                      className="admin-btn-outline" 
                      onClick={() => {
                        const defaultDistricts = [
                          { name: 'Thiruvananthapuram', hubs: 5, outlets: 18, associates: 42, coverage: 85 },
                          { name: 'Kollam', hubs: 3, outlets: 12, associates: 28, coverage: 70 },
                          { name: 'Pathanamthitta', hubs: 2, outlets: 8, associates: 15, coverage: 60 },
                          { name: 'Alappuzha', hubs: 3, outlets: 14, associates: 30, coverage: 65 },
                          { name: 'Kottayam', hubs: 4, outlets: 16, associates: 35, coverage: 75 },
                          { name: 'Idukki', hubs: 1, outlets: 5, associates: 12, coverage: 40 },
                          { name: 'Ernakulam', hubs: 8, outlets: 32, associates: 75, coverage: 95 },
                          { name: 'Thrissur', hubs: 6, outlets: 24, associates: 55, coverage: 85 },
                          { name: 'Palakkad', hubs: 4, outlets: 15, associates: 38, coverage: 70 },
                          { name: 'Malappuram', hubs: 5, outlets: 20, associates: 48, coverage: 75 },
                          { name: 'Kozhikode', hubs: 6, outlets: 22, associates: 50, coverage: 80 },
                          { name: 'Wayanad', hubs: 1, outlets: 4, associates: 10, coverage: 35 },
                          { name: 'Kannur', hubs: 4, outlets: 18, associates: 40, coverage: 70 },
                          { name: 'Kasaragod', hubs: 2, outlets: 10, associates: 22, coverage: 55 }
                        ];
                        setSectionData(prev => ({
                          ...prev,
                          [editLang]: {
                            ...prev[editLang],
                            network: {
                              ...prev[editLang].network,
                              districts: defaultDistricts
                            }
                          }
                        }));
                      }}
                    >
                      <RefreshCw size={14} style={{ marginRight: '5px' }} /> Restore 14 Districts
                    </button>
                  </div>
                  
                  <div className="array-items-list">
                    {(sectionData[editLang].network.districts || []).map((item, idx) => (
                      <div key={idx} className="array-item-row">
                        <div className="array-fields-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                          <select
                            value={item.name}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'name', e.target.value)}
                            className="form-control font-bold"
                          >
                            <option value="">Select District...</option>
                            {[
                              'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 
                              'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 
                              'Wayanad', 'Kannur', 'Kasaragod'
                            ].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={item.hubs}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'hubs', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Hubs"
                          />
                          <input
                            type="number"
                            value={item.outlets}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'outlets', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Outlets"
                          />
                          <input
                            type="number"
                            value={item.associates}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'associates', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Associates"
                          />
                          <input
                            type="number"
                            value={item.coverage}
                            onChange={(e) => handleArrayItemChange('network', 'districts', idx, 'coverage', parseInt(e.target.value) || 0)}
                            className="form-control"
                            placeholder="Coverage %"
                          />
                        </div>
                        <div className="array-actions">
                          <button className="nav-delete-btn" onClick={() => handleDeleteArrayItem('network', 'districts', idx)}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="secondary-action-btn" onClick={() => handleAddArrayItem('network', 'districts', { name: 'New District', hubs: 1, outlets: 1, associates: 1, coverage: 10 })}>
                      <Plus size={14} /> Add District
                    </button>
                  </div>
                </div>
  );
}
