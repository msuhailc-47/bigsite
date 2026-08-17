import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '400px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '40px', 
          margin: '20px', 
          backgroundColor: '#ffffff', 
          border: '1px solid rgba(10, 46, 93, 0.1)', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          color: '#0A2E5D',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ 
            width: '80px', height: '80px', 
            backgroundColor: 'rgba(220, 169, 58, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#DCA93A', marginBottom: '20px'
          }}>
            <AlertTriangle size={40} />
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Something went wrong.</h2>
          <p style={{ color: '#64748b', margin: '0 0 24px 0', textAlign: 'center', maxWidth: '400px' }}>
            We encountered an unexpected error while loading this section.
          </p>
          
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', backgroundColor: '#0A2E5D', color: 'white', 
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f4185'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0A2E5D'}
          >
            <RefreshCw size={16} /> Try Again
          </button>

          <details style={{ 
            marginTop: '30px', width: '100%', maxWidth: '600px',
            padding: '16px', backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0', borderRadius: '8px',
            fontSize: '14px', color: '#475569'
          }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#0A2E5D' }}>Developer Error Details</summary>
            <pre style={{ marginTop: '12px', whiteSpace: 'pre-wrap', overflowX: 'auto', fontSize: '12px' }}>
              <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{this.state.error && this.state.error.toString()}</span>
              {'\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
