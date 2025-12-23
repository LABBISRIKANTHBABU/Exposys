# 🍔 Brrrgrrr - Frontend-Only Indian Burger App

> A professional React application for custom burger ordering, refactored to a clean **Frontend-Only** architecture using modern **Vanilla CSS**. It features a culturally adapted Indian menu and a robust "Mock Backend" service for full functionality without a server.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Test Credentials](#test-credentials)
- [License](#license)

## 🔍 Overview

**Brrrgrrr** attempts to simulate a premium food ordering experience. Users can browse an exclusive **Indian Fusion Menu**, build custom burgers using a visual stack builder, placed orders, and manage their cart—all within a blazing fast React application.

This project has been completely refactored to:
1.  **Remove Backend Dependencies**: No Node/Express server or MongoDB required.
2.  **Use Vanilla CSS**: All styling is custom-written semantic CSS (no Tailwind/Bootstrap).
3.  **Localize Content**: Menu features items like *Maharaja Mac*, *Aloo Tikki*, and *Paneer Wraps* with INR (₹) pricing.

## 🚀 Features

### Core Functionality
- **🛒 Dynamic Cart**: Real-time state management for items and totals.
- **🍔 Interactive Burger Builder**: Visually stack ingredients (Buns, Patties, Veggies) to create custom burgers.
- **🇮🇳 Indian Context**: Specialized menu with no beef; includes Chicken, Mutton, and Veg options.
- **🔐 Mock Authentication**: Fully functional Login/Registration flow simulation.

### Technical Highlights
- **🎨 Vanilla CSS Architecture**: Organized, modular CSS with CSS Variables for theming (`colors`, `fonts`, `shadows`).
- **📦 Mock Data Service**: A specialized `api.js` service that intercepts calls and returns data from `mockData.js`, simulating async backend delays and logic.
- **📱 Responsive Design**: Custom media queries ensure the app looks great on standard mobile and desktop screens.

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
- **Icons**: Lucide React
- **State Management**: React Context API (`AuthContext`, `CartContext`)
- **Navigation**: React Router DOM

## ⚙️ Installation

1. **Clone the repository** (or unzip project).
2. **Navigate to the root directory**:
   ```bash
   cd Exposys
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```

## ▶️ Running the Application

To start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

To build for production:
```bash
npm run build
```

## 📁 Project Structure

```bash
Exposys/
├── src/
│   ├── components/      # Reusable UI (Header, Footer, Hero, Cards)
│   ├── contexts/        # Global State (Auth, Cart)
│   ├── pages/           # Page Layouts (Home, Menu, Login, Builder)
│   ├── services/        # Mock API Service (api.js)
│   ├── constants/       # Data files (mockData.js, burgerData.js)
│   ├── App.jsx          # Main Router Setup
│   └── index.css        # Global CSS Variables & Resets
├── public/              # Static assets
├── index.html           # Entry HTML
├── package.json         # Dependencies & Scripts
└── vite.config.js       # Vite Configuration
```

## 🔐 Test Credentials

Since the backend is mocked, you can use these pre-configured accounts to test specific roles:

### 👤 User Account
*Access to Ordering, Cart, and Builder.*
- **Email**: `john@example.com`
- **Password**: `password123`

### 🛡️ Admin Account
*Access to Dashboard and Reports.*
- **Email**: `admin@brrr.com`
- **Password**: `adminpassword`

*(Note: The Login page has "Quick Fill" buttons for these credentials for your convenience.)*

## 📄 License

This project is open-source and available for educational purposes.