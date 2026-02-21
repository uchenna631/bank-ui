# Bank UI - React Banking Interface

A beautiful, modern React application for managing bank accounts. This UI consumes RESTful banking APIs to provide a seamless account management experience.

## Features

✨ **Modern Landing Page** - Beautiful hero section with features showcase
💳 **Account Management** - Create, view, and manage multiple accounts
💰 **Transaction Support** - Deposit and withdraw funds easily
🔄 **Account Operations** - Rename account owners and delete accounts
📊 **Balance Tracking** - Real-time balance display for each account
🎨 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
⚡ **Smooth Animations** - Beautiful transitions and visual feedback

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js       # Beautiful landing page
│   ├── AccountList.js       # List all accounts with grid view
│   ├── AccountDetail.js     # Account details and operations
│   └── CreateAccount.js     # Create new account form
├── services/
│   └── api.js               # API service for backend communication
├── styles/
│   ├── LandingPage.css      # Landing page styles
│   ├── AccountList.css      # Account list styles
│   ├── AccountDetail.css    # Account detail styles
│   └── CreateAccount.css    # Create account form styles
├── App.js                   # Main app component
├── App.css                  # App styles
├── index.css                # Global styles
└── index.js                 # Entry point
```

## API Endpoints

The application expects the following API endpoints:

| Endpoint | Method | Purpose | Parameters |
|----------|--------|---------|-----------|
| `/accounts` | POST | Create a new account | `owner` (String) |
| `/accounts` | GET | List all accounts | None |
| `/accounts/{id}/balance` | GET | Check current balance | None |
| `/accounts/{id}/deposit` | POST | Deposit funds | `amount` (Double) |
| `/accounts/{id}/withdraw` | POST | Withdraw funds | `amount` (Double) |
| `/accounts/{id}/rename` | POST | Change owner name | `newOwner` (String) |
| `/accounts/{id}/delete` | POST | Delete an account | None |

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running (see Configuration below)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   
   Edit `src/services/api.js` and update the `API_BASE_URL`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api'; // Update with your backend URL
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a production-ready build in the `build/` directory.

## Usage

1. **Landing Page** - Start with the beautiful landing page and click "Get Started"
2. **Create Account** - Click "New Account" button to create your first account
3. **View Accounts** - All accounts are displayed in a responsive grid
4. **Manage Accounts**:
   - Click any account card to view details
   - Use tabs to perform operations:
     - **Overview**: View account details
     - **Deposit**: Add funds to account
     - **Withdraw**: Remove funds from account
     - **Rename**: Change account owner name
     - **Delete**: Permanently delete account

## UI Components

### LandingPage
- Hero section with call-to-action
- Feature showcase cards
- Statistics section
- Responsive navigation

### AccountList
- Grid view of all accounts
- Account cards with balance display
- Create new account button
- Empty state handling
- Loading and error states

### AccountDetail
- Detailed account information
- Tabbed interface for operations
- Balance display with currency formatting
- Transaction forms with validation
- Secure delete confirmation

### CreateAccount
- Modal form for account creation
- Input validation
- Loading state management
- Error handling

## Styling

The application uses a modern design system with:
- **Color Palette**: Purple gradient (#667eea to #764ba2)
- **Typography**: Clean, readable font stack
- **Spacing**: Consistent margin and padding system
- **Animations**: Smooth transitions and hover effects
- **Responsiveness**: Mobile-first approach with media queries

## Error Handling

- Network error messages displayed to users
- Validation for transaction amounts
- Confirmation dialogs for destructive actions
- Loading states for async operations
- Empty states for no data

## Performance Optimizations

- Efficient state management
- Minimal re-renders
- Lazy component updates
- Optimized CSS animations
- Responsive image handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### API Connection Issues

If you see "Failed to load accounts" errors:
1. Verify your backend API is running
2. Check the `API_BASE_URL` in `src/services/api.js`
3. Ensure CORS is enabled on your backend
4. Check browser console for detailed error messages

### Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear npm cache
npm cache clean --force

# Start fresh
npm start
```

## Development

### Running Tests

```bash
npm test
```

### Code Quality

The project uses ESLint configured in `package.json` with React app standards.

### Adding New Features

1. Create new component in `src/components/`
2. Create corresponding CSS file in `src/styles/`
3. Add API methods to `src/services/api.js` if needed
4. Import and use in main App.js or other components

## Environment Variables

Create a `.env` file in the root directory (optional):

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Then update `src/services/api.js` to use:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Banking! 🏦💰**
