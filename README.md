# 🚗 Location Voitures — Car Rental Application

A modern, full-stack car rental platform built with **React** on the frontend, **Laravel** on the backend, and **MySQL** for database management.

---

## 📖 About the Project

**Location Voitures** is an automotive rental application designed to provide users with a seamless, high-end vehicle booking experience. The platform features a luxury-themed authentication system, modular architecture, and direct database persistence.

---

## ✨ Features


- **Modular Architecture**:
  - **`frontend/react/`**: Clean React application structure with dedicated components (`Login.jsx`, `Register.jsx`), self-contained component styling (no external CSS dependencies), and an API bridge (`db.js`).
  - **`backend/laravel/`**: Structured REST API with custom `AuthController`, bcrypt password hashing, input validation, and dedicated database diagnostics (`db.php`).
- **Database Integration**:
  - Direct MySQL connection to the `location_voitures` database.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Modern Embedded CSS |
| **Backend** | Laravel 12, PHP 8.3, RESTful API |
| **Database** | MySQL (Port 3306), PDO MySQL |
| **Dev Tools** | Composer, NPM, Vite HMR |

---

## 📁 Project Structure

```text
location_voitures/
├── frontend/                     # Frontend container (dependencies & tools)
│   ├── node_modules/             # Node packages
│   ├── package.json              # Scripts & dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── index.html                # HTML entry point
│   └── react/                    # React application source code
│       ├── assets/               # Images and car graphics
│       ├── components/
│       │   ├── Login.jsx         # Dedicated Sign In component (code + CSS)
│       │   └── Register.jsx      # Dedicated Sign Up component (code + CSS)
│       ├── App.jsx               # Application coordinator & dashboard screen
│       ├── db.js                 # Frontend API & Database bridge
│       └── main.jsx              # React mounting root
│
└── backend/                      # Backend container (dependencies & tools)
    ├── vendor/                   # Composer packages
    ├── storage/                  # Logs & sessions
    ├── .env                      # Database & environment configuration
    ├── artisan                   # Artisan CLI
    ├── bootstrap/app.php         # Application routing & middleware
    └── laravel/                  # Laravel code & database bridge
        ├── Controllers/
        │   └── AuthController.php# Authentication logic & validation
        ├── Models/
        │   └── User.php          # User Eloquent model
        ├── routes/
        │   └── api.php           # API route definitions
        └── db.php                # Database bridge & connection diagnostics
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+) & **npm**
- **PHP** (v8.2+) with `pdo_mysql`, `curl`, and `mbstring` extensions
- **MySQL Server** (e.g. via XAMPP on port `3306`)

### 2. Database Setup
Create the MySQL database if not already created:
```sql
CREATE DATABASE location_voitures;
```

### 3. Backend Setup (Laravel)
```bash
cd backend
php artisan serve --port=8000
```
Backend API will be running at `http://127.0.0.1:8000`.

### 4. Frontend Setup (React)
```bash
cd frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user and insert into MySQL `users` table |
| `POST` | `/api/login` | Authenticate existing user credentials |
| `POST` | `/api/logout` | Terminate session / logout |
| `GET` | `/api/db-status` | Check MySQL connection health and table statistics |