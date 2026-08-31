import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Shield, Lock, User, AlertCircle, Globe, ShieldAlert, Clock } from 'lucide-react';
import './AdminLogin.css';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Check existing lockout state on mount and update timer
  useEffect(() => {
    const checkLockout = () => {
      const lockUntil = parseInt(localStorage.getItem('dorek_admin_lockout') || '0', 10);
      const now = Date.now();
      if (lockUntil > now) {
        setLockoutRemaining(Math.ceil((lockUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (lockoutRemaining > 0) {
      setError(`Security Lockout: Too many failed attempts. Please wait ${lockoutRemaining} seconds.`);
      return;
    }

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (!auth) {
        setError("Firebase is not configured. Please check your setup.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      
      // Clear failed attempts on successful login
      localStorage.removeItem('dorek_failed_attempts');
      localStorage.removeItem('dorek_admin_lockout');
      localStorage.setItem('dorek_admin_session', 'true');
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      
      // Increment failed attempts
      const currentAttempts = parseInt(localStorage.getItem('dorek_failed_attempts') || '0', 10) + 1;
      localStorage.setItem('dorek_failed_attempts', currentAttempts.toString());

      if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem('dorek_admin_lockout', lockUntil.toString());
        setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setError("🚨 Security Alert: Maximum failed attempts reached. Login locked for 5 minutes.");
      } else {
        const remaining = MAX_FAILED_ATTEMPTS - currentAttempts;
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
          setError(`Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`);
        } else if (err.code === 'auth/too-many-requests') {
          setError("Too many failed attempts from this device. Please wait.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutRemaining > 0;

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <Globe className="login-logo-icon" size={32} />
          <h2>Dorek Secure Login</h2>
          <p>Official Content Management System</p>
        </div>

        {isLocked && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '12px',
            color: '#ef4444',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Clock size={18} />
            <span>Locked for security: {lockoutRemaining}s remaining</span>
          </div>
        )}

        {error && !isLocked && (
          <div className="login-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>Admin Email</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="email"
                placeholder="admin@dorek.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={isLocked || loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isLocked || loading}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading || isLocked}>
            {loading ? 'Authenticating...' : (
              <>
                <Shield size={18} />
                {isLocked ? `Locked (${lockoutRemaining}s)` : 'Access CMS'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
