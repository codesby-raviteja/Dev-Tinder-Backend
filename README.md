# 🚀 DevTinder

**DevTinder** is a social matchmaking platform for developers — think Tinder, but for coding connections. Meet like-minded techies, collaborate on projects, or simply expand your dev network.

---

## 🔧 Features

### 👤 User Management
- Sign up / Login
- Profile creation and updates
- Secure password handling (bcrypt)
- JWT-based session authentication

### 💌 Connection System
- Send connection requests
- Show interest or ignore profiles
- Update or cancel requests
- Track mutual connections

---

## 🔐 Security
- Password hashing with **bcrypt**
- JWT for protected routes
- MongoDB ObjectId validation
- Request data validation
- Centralized error handling

---

## 🛠️ API Endpoints

### 🧾 Auth Routes
| Method | Route             | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/signup`    | Register new user   |
| POST   | `/auth/login`     | User login          |
| POST   | `/auth/logout`    | Logout user         |

### 🔗 Connection Routes
| Method | Route                                           | Description                         |
|--------|------------------------------------------------|-------------------------------------|
| POST   | `/request/send/:status/:toUserId`              | Send or update a connection request |

> **Status options:**
> - `interested`: Show interest in another user  
> - `ignored`: Ignore this profile

### 📰 Feed & Connections
| Method | Route                         | Description                                |
|--------|------------------------------|--------------------------------------------|
| GET    | `/feed`                      | Fetch discoverable user profiles           |
| GET    | `/user/requests/received`    | Get received connection requests           |
| GET    | `/user/connections`          | List of accepted connections               |

---

## 💡 Connection Logic

The connection system works on simple yet strict rules:

- Prevents duplicate requests with the same status
- Allows status updates (e.g., from interested → ignored)
- Tracks both users in a connection
- Enforces request validation and authentication

---

## 🔍 Feed Logic

The user feed only shows relevant profiles by applying filters:

- ❌ Excludes logged-in user  
- ❌ Excludes already connected users  
- ❌ Excludes users who were ignored or already requested  
- ✅ Returns paginated list of fresh, discoverable users  

### Pagination Parameters
| Query Param | Description                    | Default | Max  |
|-------------|--------------------------------|---------|------|
| `page`      | Page number                    | 1       | —    |
| `limit`     | Number of profiles per page    | 10      | 30   |

---

## 📦 Project Structure

