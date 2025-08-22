# 🔐 JWT Authentication App

A full-stack web application demonstrating secure JWT authentication with modern technologies.

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![DRF](https://img.shields.io/badge/DRF-092E20?style=for-the-badge&logo=django&logoColor=red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)


## 📸 Screenshots

### Login Page
<img width="1864" height="930" alt="image" src="https://github.com/user-attachments/assets/2f470eec-47d5-4561-932c-9c826c25e37f" />


### Signup Page
<img width="1880" height="935" alt="image" src="https://github.com/user-attachments/assets/0dfaaaec-3224-4f43-ae13-3b7eb401980c" />


### Profile Management
<img width="1886" height="919" alt="image" src="https://github.com/user-attachments/assets/fb9d3c9f-5765-4bc7-9520-1675bb9e5af5" />


## ✨ Features

### Core Features
- ✅ User Registration
- ✅ User Login/Logout  
- ✅ JWT Token Authentication
- ✅ Token Refresh
- ✅ Protected Routes
- ✅ User Profile Management

### Extra Features
- ✅ Role-based Access Control
- ✅ Forgot Password via Email
- ✅ Password Reset
- ✅ Responsive Design
- ✅ API Documentation

## 🏗️ Architecture

```
Frontend (React) ←→ Backend (Django REST) ←→ Database (PostgreSQL)
     ↓                    ↓                        ↓
  • JWT Storage       • Token Validation      • User Data
  • Protected Routes  • API Endpoints         • Session Management
  • State Management  • Authentication Logic  • Data Persistence
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 13+

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/jwt-auth-app.git
cd jwt-auth-app
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 4. Access Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/api/docs/`


## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | User registration |
| POST | `/auth/login/` | User login |
| POST | `/auth/refresh/` | Refresh JWT token |
| GET | `/auth/profile/` | Get user profile |
| PUT | `/auth/profile/` | Update user profile |
| POST | `/auth/forgot-password/` | Request password reset |
| POST | `/auth/reset-password/` | Reset password |



## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Project Structure

```
jwt-auth/
│
├── backend/                        # Django REST Framework API
│   ├── manage.py
│   ├── config/                    # Django core settings
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── users/                      # Authentication app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   ├── models.py               # Custom User model (AbstractUser)
│   │   ├── serializers.py          # DRF serializers for User, Register, Login
│   │   ├── urls.py                  # API routes for /auth/
│   │   ├── views.py                 # API views for register/login/profile
│   │   └── permissions.py           # Role-based access logic
│   │
│   ├── requirements.txt
│   └── .env.example                # Example environment variables
│
├── frontend/                       # React + Vite + TailwindCSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.jsx
│   │   ├── api/
│   │   │   └── axiosClient.js       # Axios instance + interceptors
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── styles/
│   │   │   └── tailwind.css
│   │   └── context/
│   │       └── AuthContext.jsx      # Manage auth state globally
│   │
│   └── .env.example
│
├── .gitignore                       # Python, Node, env, cache
├── README.md                        # Badges, setup, screenshots
└── postman_collection.json          # Exported API tests
```

## 🚀 Deployment

### Production Environment Variables

**Backend (.env)**
```env
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@host:port/db
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-url.com
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

👤 **Author**: Jayesh Afre  

🔗 [![GitHub](https://img.shields.io/badge/GitHub-jayeshafre-181717?style=flat&logo=github)](https://github.com/jayeshafre)  
🔗 [![LinkedIn](https://img.shields.io/badge/LinkedIn-jayesh--afre-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/jayesh-afre)  

## 🌟 Show your support

Give a ⭐️ if this project helped you learn full-stack development!

---

**Built with ❤️ using React, Django REST Framework, and modern web technologies**
