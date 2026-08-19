import React from 'react';
import { Type } from 'lucide-react';

export default function NavbarEditor({ sectionData, editLang, handleTextChange, navItems }) {
  return (
    <div className='admin-panel-card animate-fadeIn'>
      <h3>Navbar Translations</h3>
      <p className='section-description'>Translate the navigation menu labels.</p>
      
      {navItems.map((item) => {
        const id = item.id;
        return (
          <div className='form-group' key={id}>
            <label>{item.path} ({id})</label>
            <div className='input-with-icon'>
              <Type size={16} className='input-icon' />
              <input 
                type='text' 
                className='form-control' 
                value={sectionData[editLang].nav?.[id] || ''} 
                onChange={(e) => handleTextChange('nav', id, e.target.value)}
                placeholder={'Translation for ' + item.label}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}