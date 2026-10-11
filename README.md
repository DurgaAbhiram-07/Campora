# Campora — Campus Marketplace for Engineering Students

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" alt="Campora Banner" width="100%" style="border-radius: 12px;" />
</p>

<p align="center">
  <strong>The dedicated peer-to-peer academic exchange and classifieds platform for engineering campuses in Visakhapatnam, Andhra Pradesh.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#supported-campuses">Campuses</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#license">License</a>
</p>

---

## 📌 Overview

**Campora** is an academic marketplace built specifically for college students and faculty to buy, sell, and exchange pre-owned engineering supplies—such as higher mathematics textbooks, scientific calculators, mini drafters, electronics, cycles, and hostel essentials.

Transactions are 100% peer-to-peer with zero brokerage or commission fees, with physical handovers taking place safely at campus gates, central libraries, and departmental quadrangles.

---

## ✨ Key Features

- 🏛️ **Multi-Campus Hub Selection:** Filter products, people, and wanted requests across Vizag engineering colleges or view network-wide listings.
- 🔍 **Live Search & Multi-Category Filtering:** Search by textbook author, course code (e.g., *B.S. Grewal, Casio FX-991EX, Drafter*), condition, price range, and department.
- 💬 **Integrated Real-Time Chat:** Direct student-to-student messaging for negotiating prices and coordinating campus handover spots.
- 📋 **Campus ISO (In Search Of) Board:** Urgent item board where students can post what they need (e.g., before exams or lab tests) and peers can fulfill requests directly.
- 🎨 **Adaptive Dual-Theme Interface:**
  - **Light Mode:** Rich, warm sand & linen palette (`#E8E1D5` / `#F5EFE6`) that eliminates harsh white screen glare.
  - **Dark Mode:** High-contrast pitch-black (`#000000` / `#121212`) with ambient crimson & amber glows.
- 🛡️ **Campus Safety & Roll Verification:** Identity validation with student ID numbers and college email credentials.
- 📱 **Mobile & Desktop Responsive:** Fully responsive layout with fluid grid breakpoints and micro-interactions.

---

## 🏫 Supported Campuses (Visakhapatnam Network)

- **Chaitanya Engineering College (CEC Kommadi)** *(Primary Host Hub)*
- **Andhra University College of Engineering (AUCE)**
- **Gayatri Vidya Parishad College of Engineering (GVPCE)**
- **Anil Neerukonda Institute of Technology & Sciences (ANITS)**
- **Vignan's Institute of Information Technology (VIIT)**
- **Raghu Engineering College (REC)**
- **GITAM School of Technology, Visakhapatnam**
- **MVGR College of Engineering**
- **Sanketika Vidya Parishad Engineering College**
- **Baba Institute of Technology and Sciences (BITS Vizag)**
- **Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)**
- **Visakha Institute of Engineering & Technology (VIET)**
- **Wellfare Institute of Science, Technology and Management (WISTM)**

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS + Vanilla CSS Custom Design Tokens
- **Icons:** Lucide React
- **Routing:** React Router DOM v6
- **Notifications:** React Hot Toast

### Backend & Services
- **Database / Auth / Realtime:** Supabase (PostgreSQL) + LocalStorage hybrid persistence
- **Realtime Server:** Node.js Express + Socket.IO
- **Microservice:** Spring Boot (Java 17 / Maven)
- **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/DurgaAbhiram-07/Campora.git
cd Campora
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder (or copy from `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8080/api/v1
```

Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 🐳 Docker Deployment

To launch the full stack using Docker:

```bash
docker-compose up --build
```

---

## 📂 Project Structure

```
Campora/
├── .gitignore               # Root git ignore rules
├── .env.example             # Environment template
├── docker-compose.yml       # Multi-container orchestration
├── Dockerfile.frontend      # Frontend container configuration
├── Dockerfile.backend       # Backend container configuration
│
├── frontend/                # React 18 + Vite TypeScript App
│   ├── src/
│   │   ├── components/      # UI components (Hero, Navbar, ProductCard, CampusRequests, etc.)
│   │   ├── context/         # AuthContext, CampusContext, ChatContext, ThemeContext
│   │   ├── pages/           # LandingPage, MarketplacePage, MessagesPage, SellPage, etc.)
│   │   ├── services/        # Supabase and API client integrations
│   │   ├── types/           # TypeScript interfaces for products, chats, users
│   │   ├── index.css        # Design tokens, gradients, and custom themes
│   │   └── App.tsx          # Router configuration
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                 # Spring Boot Backend Service
│   ├── pom.xml
│   └── src/
│
├── server/                  # Node.js Realtime Socket Service
│   ├── index.js
│   └── package.json
│
├── database/                # Database Schemas & Migrations
│   ├── supabase_schema.sql
│   └── seed_data.json
│
└── docs/                    # Architecture guides, API specifications & diagrams
```

---

## 🤝 Safety & Guidelines for Campus Exchange

1. **Meet on Campus:** Always schedule physical meetups in daylight at crowded locations (e.g. Central Library, Main Gate, Canteen).
2. **Inspect Before Paying:** Check calculators, test electronic items, and flip through textbook pages before completing transactions.
3. **Direct Payments:** Pay directly via UPI (PhonePe, GPay, Paytm) or cash. Campora never takes commissions or fees.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Developed for <strong>Chaitanya Engineering College</strong> & Engineering Campuses in Visakhapatnam.
</p>
