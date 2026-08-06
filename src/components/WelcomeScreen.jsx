import { useEffect, useState } from 'react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Call onComplete after the fade out animation finishes (e.g., 500ms later)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`welcome-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="welcome-content">
        <div className="welcome-logo-container">
          <div className="welcome-glow" />
          <h1 className="welcome-title">
            <span className="welcome-title-main">Welcome to</span>
            <span className="welcome-title-sub">DOREK INTERNATIONAL</span>
          </h1>
        </div>
        <div className="welcome-loader">
          <div className="welcome-loader-bar"></div>
        </div>
      </div>
    </div>
  );
}
