
# 🔐 Auth API – Node.js + Express + PostgreSQL + Prisma + JWT

This is a secure authentication backend built with:

- **Express.js** for API routing
- **PostgreSQL** for database
- **Prisma ORM** for database access
- **JWT** for access and refresh token auth
- **Redis** for blacklisting tokens
- **bcryptjs** for secure password hashing
- **CORS** + **cookie-parser** for frontend integration

---

## 🚀 Features

- User Registration with hashed password
- Login with access & refresh tokens
- Protected routes with JWT middleware
- Logout with token blacklisting in Redis
- Prisma ORM with PostgreSQL schema
- Environment-based configuration

---

## 🛠 Tech Stack

| Tech        | Purpose                  |
|-------------|--------------------------|
| Express.js  | API routing              |
| PostgreSQL  | Primary database         |
| Prisma      | ORM + migrations         |
| Redis       | Token blacklist          |
| bcryptjs    | Password hashing         |
| JWT         | Auth tokens              |
| cookie-parser | HttpOnly cookie support |
| dotenv      | .env config              |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd backend
npm install
```

---

## ⚙️ Environment Variables (.env)

```env
PORT=5000

DATABASE_URL="postgresql://postgres:<password>@localhost:5432/authdb?schema=public"
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
```

---

## 📋 Prisma Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

To view DB in UI:
```bash
npx prisma studio
```

---

## 🧪 API Endpoints

### ✅ Register
`POST /api/register`

```json
{
  "name": "Tanzeel",
  "email": "tanzeel@example.com",
  "password": "securepass123"
}
```

---

### ✅ Login
`POST /api/login`

Returns: `accessToken` + `refreshToken` (httpOnly cookie)

---

### ✅ Profile (Protected)
`GET /api/profile`  
**Header:** `Authorization: Bearer <accessToken>`

---

### ✅ Logout
`POST /api/logout`  
**Header:** `Authorization: Bearer <accessToken>`

---

## 📦 Scripts

```bash
# Start server
node server.js

# Dev with auto-restart
npx nodemon server.js
```

---

📄 License
MIT License. Free to use and modify.

💡 Created By
Tanzeel ✨