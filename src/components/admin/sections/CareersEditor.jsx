import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function CareersEditor({
  sectionData,
  editLang,
  handleTextChange,
  handleArrayItemChange,
  handleAddArrayItem,
  handleDeleteArrayItem
}) {
  const careersData = sectionData?.[editLang]?.careers || {};
  const jobs = Array.isArray(careersData.jobs) ? careersData.jobs : [];
  const internships = Array.isArray(careersData.internships) ? careersData.internships : [];
  const training = Array.isArray(careersData.training) ? careersData.training : [];

  return (
    <div className="section-form">
      <h3>Edit Careers, Internships & Training</h3>
      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={careersData.title || ''}
          onChange={(e) => handleTextChange('careers', 'title', e.target.value)}
          className="form-control"
          placeholder="Build Your Career With Dorek"
        />
      </div>
      <div className="form-group">
        <label>Subtitle Details</label>
        <textarea
          value={careersData.subtitle || ''}
          onChange={(e) => handleTextChange('careers', 'subtitle', e.target.value)}
          className="form-control"
          rows={2}
          placeholder="Join a dynamic team driving innovation across engineering, solar, and retail."
        />
      </div>

      {/* JOBS SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Active Job Openings ({jobs.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('careers', 'jobs', { title: 'Sales Executive', dept: 'Sales', location: 'Kerala', type: 'Full-time' })}
        >
          <Plus size={15} /> Add Job Opening
        </button>
      </div>

      <div className="array-items-list">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="array-item-row no-flex-row"
            style={{
              padding: '20px 22px',
              gap: '14px',
              background: '#ffffff',
              border: '1px solid rgba(10, 46, 93, 0.09)',
              borderRadius: '14px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(10, 46, 93, 0.06)'
            }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A2E5D' }}>
                #{idx + 1} — {job.title || 'Job Opening'} ({job.dept || 'General'})
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Job"
                onClick={() => handleDeleteArrayItem('careers', 'jobs', idx)}
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Job Title</label>
                <input
                  type="text"
                  value={job.title || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'title', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Solar Project Engineer"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Department</label>
                <input
                  type="text"
                  value={job.dept || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'dept', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Engineering, Sales, Retail"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Location</label>
                <input
                  type="text"
                  value={job.location || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'location', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Kozhikode, Ernakulam, Remote"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Job Type</label>
                <input
                  type="text"
                  value={job.type || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'jobs', idx, 'type', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Full-time / Open"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INTERNSHIPS SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Internships ({internships.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('careers', 'internships', { title: 'Marketing Intern', dept: 'Marketing', duration: '3 Months' })}
        >
          <Plus size={15} /> Add Internship
        </button>
      </div>

      <div className="array-items-list">
        {internships.map((internship, idx) => (
          <div
            key={idx}
            className="array-item-row no-flex-row"
            style={{
              padding: '20px 22px',
              gap: '14px',
              background: '#ffffff',
              border: '1px solid rgba(10, 46, 93, 0.09)',
              borderRadius: '14px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(10, 46, 93, 0.06)'
            }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A2E5D' }}>
                #{idx + 1} — {internship.title || 'Internship'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Internship"
                onClick={() => handleDeleteArrayItem('careers', 'internships', idx)}
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="array-fields-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Internship Title</label>
                <input
                  type="text"
                  value={internship.title || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'title', e.target.value)}
                  className="form-control font-bold"
                  placeholder="e.g. Full Stack Developer Intern"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Department</label>
                <input
                  type="text"
                  value={internship.dept || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'dept', e.target.value)}
                  className="form-control"
                  placeholder="e.g. Software, Operations"
                />
              </div>
              <div className="form-group col-span-2" style={{ marginBottom: 0 }}>
                <label>Duration</label>
                <input
                  type="text"
                  value={internship.duration || ''}
                  onChange={(e) => handleArrayItemChange('careers', 'internships', idx, 'duration', e.target.value)}
                  className="form-control"
                  placeholder="e.g. 3 Months / 6 Months"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TRAINING PROGRAMS SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', marginBottom: '14px' }}>
        <h4 style={{ margin: 0 }}>Training Programs ({training.length} Total)</h4>
        <button
          type="button"
          className="primary-action-btn"
          onClick={() => handleAddArrayItem('careers', 'training', { title: 'Solar Technician Certification', desc: 'Hands-on practical training with recognized certification.', certification: true })}
        >
          <Plus size={15} /> Add Training Program
        </button>
      </div>

      <div className="array-items-list">
        {training.map((prog, idx) => (
          <div
            key={idx}
            className="array-item-row no-flex-row"
            style={{
              padding: '20px 22px',
              gap: '14px',
              background: '#ffffff',
              border: '1px solid rgba(10, 46, 93, 0.09)',
              borderRadius: '14px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(10, 46, 93, 0.06)'
            }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A2E5D' }}>
                #{idx + 1} — {prog.title || 'Training Program'}
              </span>
              <button
                type="button"
                className="nav-delete-btn"
                title="Delete Training"
                onClick={() => handleDeleteArrayItem('careers', 'training', idx)}
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Training Program Title</label>
              <input
                type="text"
                value={prog.title || ''}
                onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'title', e.target.value)}
                className="form-control font-bold"
                placeholder="e.g. Solar Technician Training"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Program Description</label>
              <textarea
                value={prog.desc || ''}
                onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'desc', e.target.value)}
                className="form-control"
                placeholder="Comprehensive description of the syllabus and practical training..."
                rows={3}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <input
                type="checkbox"
                id={`cert-${idx}`}
                checked={!!prog.certification}
                onChange={(e) => handleArrayItemChange('careers', 'training', idx, 'certification', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor={`cert-${idx}`} style={{ margin: 0, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                Offers Recognized Certificate on Completion
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
