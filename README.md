# Financial Dashboard

A full-stack financial dashboard application built with React, TypeScript, Node.js, and Express. This application allows users to track transactions, view analytics, and manage their financial data with a modern, responsive interface.

## Features

- 🔐 **User Authentication** - Secure login and registration system
- 💰 **Transaction Management** - Add, edit, and delete financial transactions
- 📊 **Analytics Dashboard** - Visual charts and insights for financial data
- 🌙 **Dark/Light Theme** - Toggle between light and dark modes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 📈 **Data Export** - Export transaction data in various formats
- 🔍 **Search & Filter** - Advanced filtering and search capabilities

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Chart.js** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **SQLite** - Lightweight database
- **JWT** - Authentication tokens

## Project Structure

```
financial-dashboard/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── index.ts        # Server entry point
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd financial-dashboard
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend application**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Analytics
- `GET /api/analytics/summary` - Get financial summary
- `GET /api/analytics/charts` - Get chart data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Screenshots

[Add screenshots of your application here]

## Future Enhancements

- [ ] Real-time notifications
- [ ] Multi-currency support
- [ ] Budget planning features
- [ ] Mobile app version
- [ ] Advanced reporting
- [ ] Integration with banking APIs 