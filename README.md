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

## 🌐 Cloud Architecture

Below is the cloud deployment architecture diagram for the e-commerce application on AWS:

![AWS Architecture Diagram](architecture.png)

### AWS Services & Architecture Explanation

*   **User / Actor**: Customers access the application via their web browsers, initiating requests over the internet.
*   **Elastic Load Balancer (ELB)**: Serves as the single point of entry. It distributes incoming traffic across the running EC2 instances inside the Target Group, ensuring high availability and fault tolerance.
*   **Virtual Private Cloud (VPC)**: Houses all cloud resources, isolating the environment and providing network segmentation to secure compute and database instances.
*   **Auto Scaling Group (ASG)**: Manages and scales the application tier instances automatically depending on load, maintaining performance and minimizing cost.
*   **EC2 Instances**: Host the full-stack web application, running the Node.js/Express backend which serves the compiled React frontend assets.
*   **Amazon RDS (MySQL)**: A managed database instance situated in the database tier, storing dynamic product, user, and transaction data.
*   **Amazon S3**: Hosts static media assets (such as product images), offloading static asset delivery from the EC2 application servers.

---

### ⚙️ Detailed AWS Deployment & Services Configuration

This project was deployed on AWS using a highly secure, scalable, and resilient cloud architecture. Below are the specific configuration details:

#### 1. 🔒 Network & Security Groups Setup
A custom **Virtual Private Cloud (VPC)** was created to isolate all resources. To enforce strict security boundaries, three distinct security groups were configured:

| Security Group | Description | Allowed Inbound Traffic | Purpose |
| :--- | :--- | :--- | :--- |
| **`elb-sg`** | Load Balancer SG | HTTP (80) & HTTPS (443) from `0.0.0.0/0` (public internet) | Allows public web traffic to reach the Load Balancer. |
| **`app-sg`** | Application Server SG | Ports needed for Node/React backend **only** from the load balancer (`elb-sg`) | Protects application instances from direct public internet access. |
| **`db-sg`** | Database Server SG | MySQL Port (3306) **only** from the application servers (`app-sg`) | Limits database access strictly to the application tier. |

#### 2. 🗄️ Database & Storage Layer Configuration
*   **Amazon RDS (MySQL Instance)**: Created with **no public access** enabled. It is deployed within the VPC and secured by `db-sg`, ensuring it is only accessible from the EC2 instances running the backend application.
*   **Amazon S3 (Simple Storage Service)**: Created an S3 bucket with public access specifically for storing and serving static application assets (like product images).

#### 3. 🚀 Compute, IAM & Auto-Scaling Configuration
*   **IAM Security Role (`EC2-S3-Access-Role`)**: Created a custom Identity and Access Management (IAM) role that grants EC2 instances full read/write access to the S3 bucket.
*   **Launch Template**: Configured to automate the provisioning of identical, pre-configured application servers. It specifies:
    *   The `app-sg` security group for network isolation.
    *   The `EC2-S3-Access-Role` IAM profile for S3 authorization.
    *   **User Data Script**: A startup shell script that automatically executes on instance boot to:
        1. Install system dependencies (Node.js, npm, git, etc.).
        2. Clone the application repository from GitHub.
        3. Set up local configurations and environment variables (connecting backend to RDS endpoint/credentials and S3 bucket).
        4. Install packages and start the server application.
*   **Target Group & Elastic Load Balancer (ELB)**: Created a target group containing the dynamically provisioned EC2 instances, and configured the Classic/Application Load Balancer to route traffic to them.
*   **Auto Scaling Group (ASG)**:
    *   Attached to the existing Elastic Load Balancer and target group.
    *   **Capacity Settings**: Desired capacity = **2**, Minimum capacity = **1**, Maximum capacity = **4**.
    *   **Resiliency & High Availability Test**: Successfully verified the auto-scaling capability by manually terminating running EC2 instances. The Auto Scaling Group automatically detected the unhealthy state and launched new EC2 instances to restore the running count back to the desired capacity of **2**.

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
