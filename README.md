# Brrrgrrr - Frontend Project

## 🍔 Project Overview
**Brrrgrrr** is a dynamic online burger ordering platform designed to give users complete control over their meal. It suggests users to not only customize their burgers by adding or removing ingredients but also create their own burger entirely from scratch using ingredients in stock.

This project is a **Pure Frontend Application** built with **React**, emphasizing modern JavaScript concepts, efficient state management, and interactive UI design.

## 🎯 Lab/Project Objectives
This project strictly implements the following mandatory technical requirements:
1.  **Arrays**: Extensive use of arrays for data structures (menus, ingredients, cart items).
2.  **DOM Manipulation**: Dynamic rendering and updates using React's Virtual DOM.
3.  **ES6 Compatible**: Full utilization of modern JavaScript features (Modules, Arrow Functions, Destructuring).
4.  **Higher Order Functions**: Implementation of `map`, `filter`, `reduce` for data processing.

## ✨ Key Features

### 1. 🛠️ Build Your Own Burger
- **Interactive Builder**: Users can select individual ingredients (patties, sauces, veggies) to construct a custom burger.
- **Dynamic Pricing**: Real-time price calculation based on selected ingredients.
- **Visual Feedback**: Immediate visual updates as ingredients are added or removed.

### 2. 📋 Interactive Menu
- **Categorized View**: Burgers are organized by categories (Chicken, Veggie, Mutton, etc.).
- **Filtering System**: Users can filter the menu to find exactly what they crave.
- **Search**: Instant search functionality to construct results dynamically.

### 3. 🛒 Smart Cart & Checkout
- **Cart Management**: Add, remove, and adjust quantities of items.
- **Order Summary**: Detailed breakdown of costs including custom burger configurations.
- **Seamless Checkout**: A smooth flow from cart to order confirmation.

### 4. 📊 Admin Dashboard
- **Visual Analytics**: Charts and graphs to visualize mock sales data.
- **Order Management**: Interface to view and manage customer orders.

## 💻 Technical Implementation Details

### Higher Order Functions (HOFs)
The application leverages the power of ES6 HOFs for clean and efficient data transformation:
- **`map()`**: Used extensively to render lists of components, such as `Menu` items, `Cart` entries, and `Notification` toasts.
- **`filter()`**: Utilized for the **Menu Filtering** system (filtering by category/preference) and removing items from the `Cart` or `Notifications`.
- **`reduce()`**: Implemented in the `CartContext` to dynamically calculate the **Total Price** of the shopping cart from an array of item objects.

### Arrays & Data Structures
- **Mock Data Layer**: Complex array structures (`MOCK_PRODUCTS`, `MOCK_INGREDIENTS`, `MOCK_POSTS`) simulate a database.
- **State Management**: React `useState` hooks manage arrays of cart items and active notifications, allowing for real-time updates without page reloads.

### DOM Manipulation & React
- **Virtual DOM**: React's reconciliation algorithm ensures only changed parts of the DOM are updated, providing high performance.
- **Conditional Rendering**: Elements like the "Customization Popup" or "Loading States" appear/disappear dynamically based on state, effectively manipulating the visible DOM.

### ES6+ Features
- **Modules**: Component-based architecture with `import`/`export`.
- **Arrow Functions**: Concise syntax for components and callbacks.
- **Destructuring**: Extracting props and state values cleanly.
- **Spread Operator**: Used for immutable state updates (e.g., adding an item to the cart array: `[...prevItems, newItem]`).

## 📂 Project Structure

```
e:\Exposys\src
├── components/          # Reusable UI components (Header, Footer, Card, etc.)
├── constants/           # Mock data and configuration constants
├── contexts/            # React Contexts for global state (CartContext)
├── pages/               # Main page views (Home, Menu, BuildBurger, Cart)
├── App.jsx              # Main Application Entry Component
└── main.jsx             # React DOM Root Rendering
```

## 🚀 Setup & Installation

To run this project locally:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to `https://exposys-seven.vercel.app/` (or the URL provided by Vite).

    

---
*Developed as a Frontend Lab Project demonstrating proficiency in React and Modern JavaScript.*
