import React, { useEffect } from 'react';

const BackgroundAnimation = () => {
  useEffect(() => {
    // Check if particles.js is already loaded
    if (window.particlesJS) {
      window.particlesJS.load('particles-js-container', '/particles-config.json', function() {
        console.log('particles.js config loaded');
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;

    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS.load('particles-js-container', '/particles-config.json', function() {
          console.log('particles.js config loaded');
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Attempt to remove the script to clean up
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // Note: This cleanup is basic. A more robust solution might be needed
      // if the component is frequently mounted and unmounted.
    };
  }, []);

  return <div id="particles-js-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default BackgroundAnimation;
