# 🔐 MERN Stack Authentication & Role Based Access Control(RBAC) System

A secure and robust authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring JWT authentication, role-based access control, and advanced security measures.

## ✨ Features

### 🔒 Security Features
- **JWT Authentication** with HTTPOnly cookies for enhanced security
- **Role-Based Access Control (RBAC)** with multiple user roles
- **Access & Refresh Token** system with token rotation
- **bcrypt** password encryption and hashing
- **Protected Routes** on both frontend and backend
- **Session handling** and token management
- **CORS protection** and security headers

### 🛠️ Technical Features
- **MERN Stack** (MongoDB, Express.js, React.js, Node.js)
- **JWT** for secure token-based authentication
- **HTTPOnly Cookies** for storing tokens securely
- **Token Rotation** for refresh tokens
- **Middleware-based** route protection
- **RESTful API** architecture

## 🏗️ System Architecture

### User Roles & Permissions
- **Admin**: Full system access
- **Editor**: Limited administrative privileges  
- **User**: Standard user permissions

### Token System
- **Access Token**: Short-lived token for API requests (15-30 minutes)
- **Refresh Token**: Long-lived token for obtaining new access tokens
- **Token Rotation**: Automatic refresh token renewal for enhanced security

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB Compass desktop app or MongoDB Atlas cluster
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
    git clone https://github.com/Krishan-Chandrasinghe/Authentication-and-RBAC-System.git
    cd Authentication-and-RBAC-System
```

### 2. Backend Setup

```bash
    cd server
    npm install
```

#### i. Edit CORS origin URL inside the server.js

```bash
baseURL: 'http://localhost:5173',  // Replace with your frontend URL
```

#### ii. Environment Configuration
- Create a .env file in the backend directory:
- **Note :-** You need to put the MONGO_URI as the connection string of **MongoDB atlas** server or **MongoDB Compass** desktop App.

```bash
    MONGO_URI=mongodb://localhost:27017/mern-auth
    JWT_SECRET=secret069d47bc574638bf2e384b50de160271
    REFRESH_SECRET=refreshsecretdb6af092366c4a1931f0b1d79bc90906
```

#### iii. Start Backend Server

```bash
    npm start
```

### 3. Frontend Setup

```bash
    cd ../client
    npm install
```

#### i. API Configuration
- Edit the api.js file (client/src/api.js)
- change the baseURL to your client URL

```bash
    baseURL: 'http://localhost:5000/api',  // Replace with your backend URL + '/api'
```

#### ii. Start Frontend Development Server

```bash
    npm run dev
```