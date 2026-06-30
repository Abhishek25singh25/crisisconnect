# 🚨 CrisisConnect

A real-time disaster response platform that connects victims, volunteers, and NGOs instantly — built to make sure help arrives faster when every second counts.

**🔗 Live App:** [crisisconnect-three.vercel.app](https://crisisconnect-three.vercel.app)
**🔗 Backend API:** [crisisconnect-y2i9.onrender.com](https://crisisconnect-y2i9.onrender.com)

---

## 📖 About

CrisisConnect solves a real coordination problem during emergencies — victims need help, volunteers want to help, and NGOs manage resources, but there's no single platform connecting all three in real time. This app bridges that gap with live SOS alerts, instant volunteer response, geolocation-based mapping, and resource inventory management.

## ✨ Features

- **Multi-role authentication** — JWT-based auth with 3 distinct roles: Victim, Volunteer, and NGO
- **Real-time SOS alerts** — Victims send emergency alerts with live location; volunteers receive them instantly via Socket.io, with zero page refresh
- **Geolocation matching** — SOS alerts are tagged with GPS coordinates using the browser's Geolocation API
- **Live interactive map** — Built with Leaflet.js and OpenStreetMap, showing real-time SOS markers with severity-based color coding
- **Volunteer response system** — Volunteers can view nearby alerts, see victim details, and accept/resolve cases
- **NGO resource management** — Track inventory (food, water, medical supplies, shelter) with low-stock alerts
- **Protected routes** — Role-based route guards ensure users only access their designated dashboard
- **Responsive, modern UI** — Built with Tailwind CSS, fully responsive across devices

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Socket.io Client
- Leaflet.js / React-Leaflet
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- bcrypt.js

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 🏗️ Architecture

```
crisisconnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── auth/       # Login, Register
│   │   │   ├── victim/     # Victim Dashboard
│   │   │   ├── volunteer/  # Volunteer Dashboard
│   │   │   ├── ngo/        # NGO Dashboard
│   │   │   └── map/        # Live Map View
│   │   ├── context/        # Auth Context
│   │   ├── hooks/          # useSocket hook
│   │   ├── services/       # Axios API config
│   │   └── components/     # ProtectedRoute, etc.
│
└── server/                 # Node/Express backend
    ├── models/              # User, SOSAlert, Resource
    ├── controllers/         # Auth, SOS, Resource logic
    ├── routes/              # API route definitions
    ├── middleware/          # JWT auth, Role guard
    └── config/              # Socket.io, DB connection
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Abhishek25singh25/crisisconnect.git
cd crisisconnect
```

2. **Backend setup**
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

3. **Frontend setup**
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

4. **Open the app**
```
http://localhost:5173
```

## 🔑 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/sos/create` | Create new SOS alert | Victim |
| GET | `/api/sos/all` | Get all pending alerts | Volunteer |
| GET | `/api/sos/my-alerts` | Get own SOS history | Victim |
| PUT | `/api/sos/accept/:id` | Accept an SOS alert | Volunteer |
| PUT | `/api/sos/resolve/:id` | Mark alert as resolved | Volunteer |
| POST | `/api/resource/create` | Add inventory resource | NGO |
| GET | `/api/resource/all` | Get all resources | NGO |
| PUT | `/api/resource/update/:id` | Update resource quantity | NGO |
| GET | `/api/resource/lowstock` | Get low-stock resources | NGO |

## 🔮 Roadmap

- [ ] Photo/video attachment for SOS alerts
- [ ] SMS notifications via Twilio for critical alerts
- [ ] Admin dashboard with analytics
- [ ] PWA support for offline access in low-connectivity zones
- [ ] AI-based urgency classification for incoming alerts
- [ ] Multi-language support for regional accessibility

## 👤 Author

**Abhishek Singh**
GitHub: [@Abhishek25singh25](https://github.com/Abhishek25singh25)

## 📄 License

This project is open source and available for educational purposes.

---

*Built as a learning project to demonstrate full-stack MERN development, real-time communication, and geospatial features in a real-world, socially impactful use case.*