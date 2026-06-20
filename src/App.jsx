import React, { useState, useEffect, lazy, Suspense } from 'react';
import './app.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { usePersistentState } from './hooks/usePersistentState';
import { getViewFromHash } from './utils/navigation';

// Lazy load views for efficiency
const Home = lazy(() => import('./views/Home'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Tracker = lazy(() => import('./views/Tracker'));
const Insights = lazy(() => import('./views/Insights'));
const Actions = lazy(() => import('./views/Actions'));
const Coach = lazy(() => import('./views/Coach'));
const History = lazy(() => import('./views/History'));
const Reports = lazy(() => import('./views/Reports'));
const Profile = lazy(() => import('./views/Profile'));

/**
 * Main App Container
 * Handles routing, theme, and persistent global state.
 */
function App() {
  const [currentView, setCurrentView] = useState(() => getViewFromHash());
  const [theme, setTheme] = useState(() => localStorage.getItem('ecobalance_theme') || 'dark');
  const [state, updateState] = usePersistentState();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecobalance_theme', theme);
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => setCurrentView(getViewFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToView = (viewId) => {
    setCurrentView(viewId);
    window.location.hash = `#/app/${viewId}`;
  };

  const showOnboarding = !state.onboardingComplete && state.history.length === 0;

  return (
    <div className="min-h-screen bg-[#030f07] text-white flex">
      <Sidebar
        currentView={currentView}
        navigateToView={navigateToView}
        xp={state.xp}
        profile={state.profile}
        score={state.footprint.total}
      />
      <main className="flex-1 flex flex-col min-h-screen lg:ml-64 pb-20 lg:pb-0">
        <Header currentView={currentView} theme={theme} setTheme={setTheme} />
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          }>
            {currentView === 'home' && (
              <Home state={state} navigateToView={navigateToView} />
            )}
            {currentView === 'dashboard' && <Dashboard state={state} />}
            {currentView === 'tracker' && (
              <Tracker
                state={state}
                updateState={updateState}
                navigateToView={navigateToView}
                showOnboarding={showOnboarding}
              />
            )}
            {currentView === 'insights' && <Insights state={state} navigateToView={navigateToView} />}
            {currentView === 'actions' && (
              <Actions state={state} updateState={updateState} />
            )}
            {currentView === 'coach' && (
              <Coach state={state} updateState={updateState} />
            )}
            {currentView === 'history' && (
              <History state={state} navigateToView={navigateToView} />
            )}
            {currentView === 'reports' && <Reports state={state} />}
            {currentView === 'profile' && (
              <Profile state={state} updateState={updateState} />
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
