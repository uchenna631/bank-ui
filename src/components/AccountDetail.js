import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';
import '../styles/AccountDetail.css';

function AccountDetail({ account, onBack, onUpdate, onDelete }) {
  const [balance, setBalance] = useState(account.balance || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [newOwnerName, setNewOwnerName] = useState(account.owner);

  // Fetch current balance
  const fetchBalance = async () => {
    try {
      const response = await accountAPI.getBalance(account.id);
      setBalance(response.data.balance || response.data);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account.id]);

  const handleDeposit = async () => {
    if (!transactionAmount || parseFloat(transactionAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await accountAPI.deposit(account.id, parseFloat(transactionAmount));
      setTransactionAmount('');
      await fetchBalance();
      setActiveTab('overview');
    } catch (err) {
      setError('Deposit failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!transactionAmount || parseFloat(transactionAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(transactionAmount) > balance) {
      setError('Insufficient funds');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await accountAPI.withdraw(account.id, parseFloat(transactionAmount));
      setTransactionAmount('');
      await fetchBalance();
      setActiveTab('overview');
    } catch (err) {
      setError('Withdrawal failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!newOwnerName.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await accountAPI.renameAccount(account.id, newOwnerName);
      onUpdate();
    } catch (err) {
      setError('Failed to rename account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-detail-container">
      <div className="account-detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Account Details</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="account-detail-content">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-card-content">
            <p className="balance-label">Current Balance</p>
            <h2 className="balance-amount">
              ${parseFloat(balance).toFixed(2)}
            </h2>
            <p className="account-info">
              Account: {account.owner} • ID: {account.id}
            </p>
          </div>
          <div className="balance-icon">💳</div>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === 'deposit' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('deposit');
                setError(null);
              }}
            >
              Deposit
            </button>
            <button
              className={`tab ${activeTab === 'withdraw' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('withdraw');
                setError(null);
              }}
            >
              Withdraw
            </button>
            <button
              className={`tab ${activeTab === 'rename' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('rename');
                setError(null);
              }}
            >
              Rename
            </button>
            <button
              className={`tab ${activeTab === 'delete' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('delete');
                setError(null);
              }}
            >
              Delete
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-pane">
                <div className="overview-section">
                  <div className="info-row">
                    <span className="info-label">Account Owner:</span>
                    <span className="info-value">{account.owner}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Account ID:</span>
                    <span className="info-value">{account.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Current Balance:</span>
                    <span className="info-value balance">
                      ${parseFloat(balance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Deposit Tab */}
            {activeTab === 'deposit' && (
              <div className="tab-pane">
                <div className="transaction-form">
                  <h3>Deposit Funds</h3>
                  <div className="form-group">
                    <label htmlFor="deposit-amount">Amount to Deposit</label>
                    <div className="input-group">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        id="deposit-amount"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={handleDeposit}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : '✓ Deposit'}
                  </button>
                </div>
              </div>
            )}

            {/* Withdraw Tab */}
            {activeTab === 'withdraw' && (
              <div className="tab-pane">
                <div className="transaction-form">
                  <h3>Withdraw Funds</h3>
                  <div className="form-group">
                    <label htmlFor="withdraw-amount">Amount to Withdraw</label>
                    <div className="input-group">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        id="withdraw-amount"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max={balance}
                        disabled={loading}
                      />
                    </div>
                    <p className="available-text">
                      Available: ${parseFloat(balance).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={handleWithdraw}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : '↓ Withdraw'}
                  </button>
                </div>
              </div>
            )}

            {/* Rename Tab */}
            {activeTab === 'rename' && (
              <div className="tab-pane">
                <div className="transaction-form">
                  <h3>Rename Account Owner</h3>
                  <div className="form-group">
                    <label htmlFor="new-owner">New Owner Name</label>
                    <input
                      type="text"
                      id="new-owner"
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      placeholder="Enter new owner name"
                      disabled={loading}
                    />
                  </div>
                  <button
                    className="btn-primary"
                    onClick={handleRename}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : '✎ Rename'}
                  </button>
                </div>
              </div>
            )}

            {/* Delete Tab */}
            {activeTab === 'delete' && (
              <div className="tab-pane">
                <div className="delete-section">
                  <div className="warning-box">
                    <span className="warning-icon">⚠️</span>
                    <div className="warning-content">
                      <h4>Delete Account</h4>
                      <p>
                        This action cannot be undone. Your account and all associated data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-danger"
                    onClick={() => onDelete(account.id)}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : '🗑️ Delete Account'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
