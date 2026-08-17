import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import './NotFound404.css';

export default function NotFound404() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-icon-wrapper">
          <ShieldAlert size={80} className="notfound-icon" />
        </div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="notfound-actions">
          <button className="notfound-btn back-btn" onClick={() => window.history.back()}>
            <ArrowLeft size={18} /> Go Back
          </button>
          <Link to="/" className="notfound-btn home-btn">
            <Home size={18} /> Return Home
          </Link>
        </div>
      </div>
      
      <div className="notfound-background">
        <div className="notfound-blob blob-1"></div>
        <div className="notfound-blob blob-2"></div>
      </div>
    </div>
  );
}
