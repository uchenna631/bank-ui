import axios from 'axios';

// Get API base URL from environment or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountAPI = {
  // Get all accounts
  getAllAccounts: () => api.get('/accounts'),

  // Create a new account
  createAccount: (owner) => api.post('/accounts', { owner }),

  // Get account balance
  getBalance: (id) => api.get(`/accounts/${id}/balance`),

  // Deposit funds
  deposit: (id, amount) => api.post(`/accounts/${id}/deposit`, { amount }),

  // Withdraw funds
  withdraw: (id, amount) => api.post(`/accounts/${id}/withdraw`, { amount }),

  // Rename account owner
  renameAccount: (id, newOwner) => api.post(`/accounts/${id}/rename`, { newOwner }),

  // Delete account
  deleteAccount: (id) => api.post(`/accounts/${id}/delete`),
};

export default api;
