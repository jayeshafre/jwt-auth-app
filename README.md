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
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

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

## 📸 Screenshots

### Login Page
![Login Screenshot](./screenshots/login.png)

### Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### Profile Management
![Profile Screenshot](./screenshots/profile.png)

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

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

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
jwt-auth-app/
├── backend/           # Django REST Framework API
├── frontend/          # React + Vite + TailwindCSS
├── docker-compose.yml # Container orchestration
└── README.md         # Project documentation
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

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 🌟 Show your support

Give a ⭐️ if this project helped you learn full-stack development!

---

**Built with ❤️ using React, Django REST Framework, and modern web technologies**