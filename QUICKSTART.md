# Quick Start Guide - Bank UI

Get up and running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- npm or yarn
- Backend API running (or ready to run)

## 1. Install Dependencies

```bash
cd bank-ui
npm install
```

## 2. Configure Backend URL

Open `src/services/api.js` and update the API URL if your backend isn't on `localhost:8080`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api'; // Change this if needed
```

Or create a `.env` file:
```bash
echo "REACT_APP_API_URL=http://localhost:8080/api" > .env
```

## 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## 4. Start Using the App

1. **Landing Page** - You'll see a beautiful welcome screen
2. **Click "Get Started"** - Navigate to the main app
3. **Create Account** - Click the "New Account" button
4. **Enter Owner Name** - Type the account owner's name
5. **Manage Accounts** - Click an account to:
   - View balance
   - Deposit funds
   - Withdraw funds
   - Rename account
   - Delete account

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (not reversible)
npm run eject
```

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.js
│   ├── AccountList.js
│   ├── AccountDetail.js
│   └── CreateAccount.js
├── services/
│   └── api.js           # API communication
├── styles/              # Component styles
│   ├── LandingPage.css
│   ├── AccountList.css
│   ├── AccountDetail.css
│   └── CreateAccount.css
├── App.js
└── index.js
```

## API Features

- ✅ Create accounts
- ✅ View all accounts
- ✅ Check balances
- ✅ Deposit funds
- ✅ Withdraw funds
- ✅ Rename accounts
- ✅ Delete accounts

## Common Issues

### Backend Connection Failed?

1. Make sure backend is running on the correct port
2. Update `API_BASE_URL` in `src/services/api.js`
3. Check browser console (F12) for errors
4. Verify CORS is enabled on backend

### Blank Screen?

1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check browser console for errors

### Transactions Not Working?

1. Verify backend is running
2. Check that account ID is correct
3. For withdrawals, ensure sufficient balance
4. Check server logs for errors

## Next Steps

- Customize the styling (edit CSS files in `src/styles/`)
- Add new features (create components in `src/components/`)
- Deploy to production (see deployment guide)
- Connect to your own backend API

## Useful Links

- [Full Setup Guide](./SETUP_GUIDE.md)
- [Environment Configuration](./.env.example)
- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)

## Need Help?

1. Check the browser DevTools console (F12)
2. Look at the Network tab to see API requests
3. Verify your backend API responses
4. Read the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed help

---

**You're all set! 🎉**

Start the app with `npm start` and enjoy banking management!
