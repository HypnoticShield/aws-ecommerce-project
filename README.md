# Full-Stack E-Commerce Web Application

This repository contains a full-stack e-commerce web application featuring a modern React frontend and a robust Node.js/Express backend integrated with a MySQL database.

---

## 🏗️ Architecture & Features

The project is structured into two main components:
*   **Backend (`/backend`)**:
    *   Powered by **Node.js** and **Express**.
    *   Connected to a **MySQL** database using the `mysql2` client library (configured with connection pooling and promise-based syntax).
    *   Exposes a REST API endpoint `GET /api/products` to retrieve list of products.
    *   Serves compiled production-ready frontend assets statically.
*   **Frontend (`/frontend`)**:
    *   Built with **React**, bootstrapped using **Vite** for blazing fast Hot Module Replacement (HMR).
    *   Implements an interactive **Product Grid** with dynamic placeholder images.
    *   Includes a fully responsive **Shopping Cart** panel allowing users to add items, modify quantities (with live total calculation), and remove items.
    *   Uses a curated pastel-themed CSS design layout with sleek visual states and smooth interactions.

---

## 🛠️ Tech Stack

*   **Frontend**: React (v19), CSS (custom pastel theme), Vite
*   **Backend**: Node.js, Express (v5)
*   **Database**: MySQL
*   **Libraries & Tooling**: `nodemon` (auto-reloading dev server), `dotenv` (environment configuration), `cors` (Cross-Origin Resource Sharing)

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed on your machine:
*   **Node.js** (v16+ recommended)
*   **npm**
*   **MySQL Server**

---

### 🗄️ 1. Database Setup

1. Log into your MySQL server:
   ```sql
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE ecommerce_db;
   USE ecommerce_db;
   ```

3. Create the `products` table:
   ```sql
   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL
   );
   ```

4. Insert dummy sample products:
   ```sql
   INSERT INTO products (name, description, price) VALUES
   ('Minimalist Mechanical Keyboard', 'A compact tenkeyless mechanical keyboard with RGB backlighting and tactile switches.', 89.99),
   ('Ergonomic Wireless Mouse', 'High-precision wireless mouse designed for comfort and extended productivity.', 49.99),
   ('Active Noise Cancelling Headphones', 'Over-ear wireless headphones with premium sound quality and active ambient noise cancellation.', 199.99),
   ('Smart Fitness Watch', 'Waterproof fitness tracker with heart rate monitor, sleep tracking, and 10-day battery life.', 129.50),
   ('Ultra-Wide Curved Monitor', '34-inch curved gaming and productivity monitor with 144Hz refresh rate.', 349.99);
   ```

---

### ⚙️ 2. Backend Configuration

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8080
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=ecommerce_db
   ```

4. Start the backend server in development mode (using Nodemon for auto-reload):
   ```bash
   npm run dev
   ```
   The backend API will run on **`http://localhost:8080`**.

---

### 💻 3. Frontend Configuration

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173`** (or the URL provided by Vite) in your browser.

---

## 📦 Production Deployment & Build Pipeline

The application features a single-deployment build pipeline where the frontend compiles assets directly into the backend folder to be served by the Express server:

1. Build the frontend assets:
   ```bash
   cd frontend
   ```
   ```bash
   npm run build
   ```
   *Note: This script compiles and outputs the production bundle to `../backend/dist` (managed via Vite's `build.outDir` configuration).*

2. The Express server (`backend/index.js`) automatically serves static files from the `dist` folder:
   ```javascript
   app.use(express.static(path.join(__dirname, 'dist')));
   ```

3. Any fallback routes will be redirected to the SPA index page:
   ```javascript
   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'dist', 'index.html'));
   });
   ```

4. To start the production application, simply run the backend server:
   ```bash
   cd ../backend
   npm start
   ```
   The entire application (frontend + API) will be accessible at **`http://localhost:8080`**.
