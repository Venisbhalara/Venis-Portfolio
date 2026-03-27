# Portfolio — Full Stack Project

A professional portfolio web application built with React (Vite) + Node.js + Express + MySQL + Tailwind CSS.

---

## 📁 Folder Structure

```
d:/Portfolio/
├── client/                  ← React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css        ← Tailwind import
│   ├── .env                 ← VITE_API_URL
│   ├── vite.config.js       ← Tailwind plugin + API proxy
│   ├── index.html
│   └── package.json
│
└── server/                  ← Node.js + Express + MySQL
    ├── config/
    │   └── db.js            ← MySQL connection pool
    ├── routes/
    │   └── api.js           ← API routes
    ├── index.js             ← Express entry point
    ├── .env                 ← Database + server config
    └── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+
- MySQL 8.0+
- npm

---

## 🗄️ Database Setup

1. Open MySQL Workbench or terminal and run:

```sql
CREATE DATABASE portfolio_db;
```

2. Update `server/.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
```

---

## 🚀 Run the Project Locally

### 1. Start the Backend Server

```bash
cd d:/Portfolio/server
npm run dev
```

Server runs at → `http://localhost:5000`

### 2. Start the Frontend Client

Open a **new terminal**:

```bash
cd d:/Portfolio/client
npm run dev
```

Client runs at → `http://localhost:5173`

---

## 🧪 Test API Routes

Once the server is running, test these endpoints:

| Method | URL | Description |
|--------|-----|-------------|
| GET | `http://localhost:5000/api/health` | Server health check |
| GET | `http://localhost:5000/api/db-test` | MySQL connection test |

---

## 🔐 Environment Variables

### `server/.env`
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MySQL 8 + mysql2 |
| Dev Tool | Nodemon |
