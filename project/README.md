# Secure JWT Authentication System (Next.js + Express + MongoDB)

Developed by **Tanzeel**, this project implements a secure full-stack JWT-based authentication system using:

- Frontend: **Next.js**
- Backend: **Node.js + Express**
- Database: **MongoDB (Mongoose ORM)**

## 🔐 Features

- JWT Access Token (15 mins) & Refresh Token (7 days)
- Refresh token stored in **httpOnly cookie**
- Secure login, register, and logout flows
- Axios interceptors for auto token attachment
- Protected dashboard page
- Middleware for route protection

## ✅ Implemented Steps

1. **Access Token (short-lived)**
2. **Refresh Token (long-lived)** stored in cookie
3. **Protected Routes** using middleware
4. **/api/refresh-token** endpoint to issue new access token
5. **Axios instance** and **React Context** to store token in frontend memory

## 🔧 Technologies

- Node.js + Express
- MongoDB + Mongoose
- Next.js 13 (App Router)
- Axios (with interceptors)
- bcryptjs (for password hashing)
- jsonwebtoken
- cookie-parser

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/devtanzeel1/Authentication2.git
cd Authentication2.git
```

### 2. Setup backend

```bash
cd backend
npm install
touch .env
```

Add this to `.env`:

```env
ACCESS_TOKEN_SECRET=your_access_secret_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
MONGO_URI=your_mongodb_uri_here
```

Then run:

```bash
npm start
```

### 3. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Folder Structure

```
secure-auth-jwt-nextjs-express/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── utils/
```

## 📦 Deliverables

- ✅ JWT-based authentication (Access + Refresh tokens)
- ✅ Route protection via middleware
- ✅ Dashboard access only when authenticated
- ✅ Logout clears refresh cookie
- ✅ Frontend only stores access token in memory

## 🧠 Best Practices Followed

- No localStorage for token storage
- Tokens signed with secure secrets from `.env`
- httpOnly cookies used for refresh token
- Modular code with proper error handling

---

> Built with ❤️ by **Tanzeel**