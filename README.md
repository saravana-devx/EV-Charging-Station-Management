# ⚡ EV Charging Station Management Application

This is a full-stack web application for managing Electric Vehicle (EV) charging stations. The system allows users to add, edit, view, and delete charging stations with details such as location, status, power output, and connector type. The application includes a RESTful backend API and a dynamic frontend interface with map integration.

---

## 🚀 Features

### 🔧 Backend
- CRUD operations for EV charging stations
- MongoDB schema with Mongoose ODM
- User-linked station entries
- Automatic timestamps (createdAt, updatedAt)

### 🖥️ Frontend
- Interactive UI to view stations on a **map or list**
- Add/edit/delete stations (permission-based)
- Real-time status display
- Filter/search by status, power output, or connector type
- Fully responsive for mobile and desktop

---

## 🛠️ Technology Stack

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

### Frontend:
- Vue.js
- Axios (API communication)
- Leaflet (OpenStreetMap integration)
- Tailwind CSS (UI styling)

---

## 📦 Charging Station Data Model

| Field          | Type     | Description                                   |
|----------------|----------|-----------------------------------------------|
| `name`         | String   | Station name *(required)*                     |
| `location`     | Object   | Latitude & Longitude *(required)*             |
| `status`       | String   | Operational / Out of Service / Maintenance    |
| `powerOutput`  | String   | e.g., 3.7 kW AC, 350 kW Ultra-fast            |
| `connectorType`| String   | Type 1, Type 2, CCS, Tesla Supercharger       |
| `createdBy`    | ObjectId | Reference to the user who created the station |
| `createdAt` / `updatedAt` | Date | Auto-generated timestamps |

---

## 🧪 Getting Started

### Backend Setup

```bash
git clone https://github.com/saravana-devx/EV-Charging-Station-Management.git
cd EV-Charging-Station-Management/backend
npm install

Create a .env file with the following variables:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the backend server:

npm run dev



Frontend Setup

cd ../frontend
npm install
npm run dev
Open your browser and visit:
👉 http://localhost:5173

🗺️ Map Integration
The frontend uses Leaflet.js with OpenStreetMap for visualizing charging station locations.

📂 Folder Structure

EV-Charging-Station-Management/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── components/
    └── App.vue
📬 Contact
For questions or feedback:
📧 saravana8261@gmail.com
