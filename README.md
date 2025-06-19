# ✈️ Flight Search App – Caxita Task

A responsive flight search application built using **React + Tailwind CSS** (frontend) and **Node.js + Express** (mock backend).  
Users can add flights, filter by price and airline, and sort results by price, duration, or airline name.

---

## 🚀 Features

- Add new flight details via a form with validations
- Auto-calculation of travel duration
- Combined filters: price range & airline
- Sorting: price, duration, and airline name (A–Z / Z–A)
- Real-time updates without refresh
- Clean and responsive UI using Tailwind CSS
- Backend built with Express and `flights.json` mock data

---

## 🛠️ Tech Stack

- React
- React Router DOM
- Tailwind CSS
- Node.js + Express (Backend)

---

## 📦 How to Run (Frontend)

1. Install dependencies

```bash
npm install

2.Start 
npm run dev

3.App will run at:

http://localhost:5173


## 📁 Folder Structure

```bash
flight-search/
├── src/
│   ├── components/       # FlightForm, Filters, etc.
│   ├── pages/            # Home page
│   └── App.jsx
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md             # ← This file
