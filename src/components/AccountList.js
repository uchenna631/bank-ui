import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';
import AccountDetail from './AccountDetail';
import CreateAccount from './CreateAccount';
import '../styles/AccountList.css';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch all accounts
  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await accountAPI.getAllAccounts();
      setAccounts(response.data);
    } catch (err) {
      setError('Failed to load accounts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAccountCreated = () => {
    setShowCreateForm(false);
    fetchAccounts();
  };

  const handleAccountUpdated = () => {
    fetchAccounts();
    setSelectedAccount(null);
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountAPI.deleteAccount(id);
        fetchAccounts();
        setSelectedAccount(null);
      } catch (err) {
        setError('Failed to delete account. Please try again.');
        console.error(err);
      }
    }
  };

  if (selectedAccount) {
    return (
      <AccountDetail
        account={selectedAccount}
        onBack={() => setSelectedAccount(null)}
        onUpdate={handleAccountUpdated}
        onDelete={handleDeleteAccount}
      />
    );
  }

  if (showCreateForm) {
    return (
      <CreateAccount
        onAccountCreated={handleAccountCreated}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <div className="account-list-container">
      <div className="account-list-header">
        <h1>Your Accounts</h1>
        <button
          className="create-account-btn"
          onClick={() => setShowCreateForm(true)}
        >
          ➕ New Account
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading accounts...</p>
        </div>
      )}

      {!loading && accounts.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h2>No Accounts Yet</h2>
          <p>Create your first account to get started!</p>
          <button
            className="create-account-btn"
            onClick={() => setShowCreateForm(true)}
          >
            Create Account
          </button>
        </div>
      )}

      {!loading && accounts.length > 0 && (
        <div className="accounts-grid">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="account-card"
              onClick={() => setSelectedAccount(account)}
            >
              <div className="account-card-header">
                <h3 className="account-owner">{account.owner}</h3>
                <span className="account-id">#{account.id}</span>
              </div>
              <div className="account-card-body">
                <p className="balance-label">Current Balance</p>
                <p className="balance-amount">
                  ${parseFloat(account.balance || 0).toFixed(2)}
                </p>
              </div>
              <div className="account-card-footer">
                <button className="view-details-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountList;
