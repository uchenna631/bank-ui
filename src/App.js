import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import AccountList from './components/AccountList';

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="App">
      {!showApp ? (
        <LandingPage onGetStarted={() => setShowApp(true)} />
      ) : (
        <AccountList />
      )}
    </div>
  );
}

export default App;
