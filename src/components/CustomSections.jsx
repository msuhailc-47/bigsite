import React from 'react';
import './CustomSections.css';

const CustomSections = ({ lang, t }) => {
  const customSections = t.customSections || [];

  if (customSections.length === 0) return null;

  return (
    <>
      {customSections.map((section, index) => (
        <section 
          key={section.id || index} 
          id={section.id || `custom-section-${index}`}
          className={`custom-section`}
          style={{ 
            backgroundColor: section.backgroundColor || 'var(--bg-main)',
            color: section.textColor || 'var(--text-heading)'
          }}
        >
          <div className="container">
            <div className="section-header">
              {section.label && <span className="section-label">{section.label}</span>}
              {section.title && <h2 className="section-title">{section.title}</h2>}
              {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
            </div>

            <div className={`custom-content-grid ${section.image ? 'has-image' : 'no-image'}`}>
              <div className="custom-text-content">
                {section.text && (
                  <div 
                    className="custom-text" 
                    dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br/>') }}
                  />
                )}
              </div>
              
              {section.image && (
                <div className="custom-image-content">
                  <img src={section.image} alt={section.title || 'Custom Section Image'} className="custom-img" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CustomSections;
