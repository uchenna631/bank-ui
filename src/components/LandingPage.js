import React from 'react';
import '../styles/LandingPage.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Navigation */}
        <nav className="landing-nav">
          <div className="nav-logo">
            <span className="logo-icon">🏦</span>
            <span className="logo-text">FinanceHub</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Manage Your Accounts Effortlessly</h1>
            <p className="hero-subtitle">
              A modern banking interface designed for simplicity and efficiency
            </p>
            <button className="cta-button" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-illustration">
            <div className="illustration-card">
              <span className="illus-icon">💰</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Account Overview</h3>
              <p>View all your accounts and balances in one place</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">➕</div>
              <h3>Easy Transactions</h3>
              <p>Deposit and withdraw funds with just a few clicks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>Your financial data is protected with modern security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3>Account Management</h3>
              <p>Create, rename, and manage your accounts easily</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-label">Active Users</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">$1B+</h3>
            <p className="stat-label">Total Funds Managed</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">99.9%</h3>
            <p className="stat-label">Uptime</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>&copy; 2026 FinanceHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
