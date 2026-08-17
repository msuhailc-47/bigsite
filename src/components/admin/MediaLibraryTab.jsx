import React from 'react';
import { Upload, Image, Trash2 } from 'lucide-react';

export default function MediaLibraryTab({
  mediaLibrary,
  handleMediaUpload,
  deleteMedia,
  isReadOnly,
  triggerNotification
}) {
  return (
    <div className="admin-panel-card animate-fadeIn">
      <h3>CMS Media Assets</h3>
      <p className="section-description">Central library to upload and reference image assets. Supported formats: JPG, PNG, WEBP, SVG.</p>

      <div className="media-uploader-box">
        <label className="uploader-picker-btn">
          <Upload size={18} /> Choose File to Upload
          <input type="file" accept="image/*,application/pdf" onChange={handleMediaUpload} style={{ display: 'none' }} />
        </label>
        <span>Base64 parser converts file to local persistent URLs</span>
      </div>

      <div className="media-library-grid">
        {mediaLibrary.length === 0 ? (
          <div className="media-empty-state">
            <Image size={40} className="empty-state-icon" />
            <p>No media files uploaded yet. Add images above.</p>
          </div>
        ) : (
          mediaLibrary.map((file, idx) => (
            <div key={idx} className="media-item-card">
              <div className="media-preview-container">
                {file.type.startsWith('image/') ? (
                  <img src={file.url} alt={file.name} className="media-preview-img" />
                ) : (
                  <div className="media-doc-preview">dY", PDF</div>
                )}
              </div>
              <div className="media-item-info">
                <span className="media-name">{file.name}</span>
                <span className="media-size">{file.size}</span>
                <div className="media-actions-row">
                  <button className="media-copy-btn" onClick={() => {
                    navigator.clipboard.writeText(file.url);
                    triggerNotification("URL copied to clipboard!");
                  }}>Copy Base64 URL</button>
                  <button className="media-trash-btn" onClick={() => deleteMedia(file.name)} disabled={isReadOnly}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
