# 🍔 Brrrgrrr - Full-Stack Burger Ordering Web App

> A comprehensive MERN stack application for custom burger ordering, featuring a dynamic frontend, robust backend, and a dedicated admin panel.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Customer Features](#customer-features)
  - [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Offline Mode](#offline-mode)
- [License](#license)

## 🔍 Overview

**Brrrgrrr** is a professional-grade web application designed to simulate a real-world food ordering experience. Users can browse products, build custom burgers with ingredient visualization, place orders, and track their history. The platform also includes an extensive Admin Dashboard for managing products, blog posts, and viewing sales data.

## 🚀 Features

### Customer Features
- **🛒 Dynamic Shopping Cart**: Real-time updates for adding/removing items.
- **🍔 Burger Builder**: Interactively customize burgers by adding ingredients (cheese, lettuce, bacon, etc.) and updating the price dynamically.
- **🔐 User Authentication**: Secure Login and Registration using JWT.
- **📦 Order Management**: View past orders and current order status.
- **🎨 Responsive Design**: Mobile-first UI built with React and Tailwind CSS.

### Admin Features
- **📊 Dashboard**: Visual overview of platform performance.
- **🛍️ Product Management**: View and manage available products (in development).
- **📝 Blog Management**: Create and edit blog posts to engage users.
- **📂 Data Export**: Export order data to Excel/CSV for analysis.

## 🛠 Tech Stack

### Frontend (Client)
- **Framework**: React 18
- **Build Tool**: Vite (Rolldown)
- **Styling**: Tailwind CSS v4, Framer Motion (for animations)
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Utilities**: Dotenv, Cors

## 📦 Prerequisites

Ensure you have the following installed:
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB**: (Optional for Offline Mode) Local instance or Atlas URI

## ⚙️ Installation

1. **Clone the repository** (if applicable) or navigate to the project root.

2. **Install Dependencies**:
   You can install all dependencies for both client and server using the convenience script:
   ```bash
   npm run install-all
   ```
   
   *Or install manually:*
   ```bash
   # Root
   npm install

   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

## 🔐 Environment Setup

Create `.env` files for configuration.

### 1. Root `.env`
```bash
cp .env.example .env
```

### 2. Server `.env`
Navigate to `server/` and create a `.env` file:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5175
```
> **Note**: If you don't have a MongoDB instance, the app will default to **Offline Mode** using mock data.

## ▶️ Running the Application

### Concurrent Mode (Recommended)
Run both client and server with a single command from the root:
```bash
npm run dev
```

### Separate Terminals
**Terminal 1 (Server):**
```bash
cd server
npm run dev
```
**Terminal 2 (Client):**
```bash
cd client
npm run dev
```

- **Frontend**: [http://localhost:5175](http://localhost:5175)
- **Backend**: [http://localhost:4000](http://localhost:4000)

## 📁 Project Structure

```bash
brrrgrrr/
├── client/              # React Frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages (Home, Login, Builder, etc.)
│   │   ├── contexts/    # Global State (Auth, Cart, etc.)
│   │   └── ...
│   └── ...
├── server/              # Express Backend application
│   ├── src/
│   │   ├── controllers/ # Logic for routes
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   └── ...
│   └── ...
├── .env.example         # Template for environment variables
├── package.json         # Root scripts and dependencies
└── README.md            # Project documentation
```

## 🧪 API Documentation

The backend exposes the following main endpoints:

| Method | Endpoint        | Description           |
|lang---|----------------|-----------------------|
| GET   | `/api/products`| Fetch all products    |
| POST  | `/api/orders`  | Create a new order    |
| POST  | `/api/auth/login` | User login         |
| POST  | `/api/auth/register` | User registration |
| GET   | `/api/posts`   | Fetch blog posts      |

## 🔌 Offline Mode

The application is built to be resilient. If a MongoDB connection cannot be established, the server automatically switches to **Offline Mode**.
- **Data**: Served from in-memory mock files (`mockData.js`).
- **Functionality**: Most features (browsing, simulated ordering) remain functional for demonstration purposes.

## 📄 License

This project is licensed under the MIT License.