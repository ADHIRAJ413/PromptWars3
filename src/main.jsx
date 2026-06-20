import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './landing/LandingPage.jsx';
import App from './App.jsx';
import { isAppMode } from './utils/navigation';

function Root() {
  const [mode, setMode] = useState(() => (isAppMode() ? 'app' : 'landing'));

  useEffect(() => {
    const onHashChange = () => setMode(isAppMode() ? 'app' : 'landing');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return mode === 'app' ? <App /> : <LandingPage />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
