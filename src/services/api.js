import axios from 'axios';

//const API_BASE_URL = 'http://bank-api.backend.svc.cluster.local:8080';// Update this with your backend URL

const api = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: '', // Use relative URL for development with proxy
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
