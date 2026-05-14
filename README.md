# 📍 PhotoLocations Russia

A full-stack photo location discovery platform for Russian cities — featuring Moscow, Saint Petersburg, and Kazan. Built with Django REST Framework + React + Docker.

---

## ✨ Features

- **5 pages**: Home, Moscow, Saint Petersburg, Kazan, User Profile
- **30 landmark photographs** (10 per city) with detailed descriptions
- **JWT authentication** — register, login, and stay logged in
- **Comments system** — leave and delete comments on any landmark
- **User profile** — edit bio, avatar URL, view stats
- **Responsive design** — mobile-first, elegant editorial aesthetic
- **Docker Compose** — one command to run everything

---

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Run the project

```bash
# Clone / navigate to the project folder
cd photo-locations

# Build and start all services
docker compose up --build

# The app will be available at:
#   Frontend: http://localhost:3000
#   Backend API: http://localhost:8000/api/
#   Django Admin: http://localhost:8000/admin/
```

The backend **automatically runs migrations and seeds the database** on first launch.

---

## 🏗 Architecture

```
photo-locations/
├── backend/                  # Django REST API
│   ├── api/
│   │   ├── models.py         # City, Landmark, Comment, UserProfile
│   │   ├── views.py          # API endpoints
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py   # Populates 3 cities × 10 landmarks
│   └── config/
│       ├── settings.py
│       └── urls.py
├── frontend/                 # React + Vite
│   └── src/
│       ├── App.jsx           # Router setup
│       ├── context/
│       │   └── AuthContext.jsx   # JWT auth + axios instance
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── LandmarkCard.jsx  # Photo + comments UI
│       └── pages/
│           ├── HomePage.jsx
│           ├── CityPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           └── ProfilePage.jsx
└── docker-compose.yml
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login, receive JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| GET/PATCH | `/api/auth/me/` | Get or update current user profile |
| GET | `/api/cities/` | List all cities |
| GET | `/api/cities/<slug>/` | City detail with landmarks & comments |
| POST | `/api/landmarks/<id>/comments/` | Post a comment (auth required) |
| DELETE | `/api/comments/<id>/` | Delete own comment (auth required) |

---

## 🎨 Design

The UI uses an **editorial / luxury travel magazine** aesthetic:

- **Typography**: Cormorant Garamond (display) + Montserrat (body)
- **Color palette**: Deep ink, warm cream, and antique gold accents
- **Animations**: Staggered fade-up reveals, parallax hero, smooth hover transitions
- **Images**: Sourced from Unsplash, loaded lazily with skeleton placeholders

---

## 🛠 Development

```bash
# Backend only (with existing DB)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver

# Frontend only
cd frontend
npm install
npm run dev
```

### Create a Django superuser (admin access)

```bash
docker compose exec backend python manage.py createsuperuser
```

Then visit http://localhost:8000/admin/ to manage data.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Django 4.2, Django REST Framework, SimpleJWT |
| Database | PostgreSQL 16 |
| Frontend | React 18, React Router 6, Axios, Vite |
| Containerization | Docker, Docker Compose |
| Fonts | Google Fonts (Cormorant Garamond, Montserrat) |
| Images | Unsplash |
