# ✈️ Flight Search App – Caxita Task

A responsive flight search application built using **React + Tailwind CSS** (frontend) and **Node.js + Express** (mock backend). Users can add flights, filter by price and airline, and sort results by price, duration, or airline name.

---

## 🚀 Features

- Add new flight details via a form with validations
- Auto-calculation of travel duration
- Combined filters: price range & airline
- Sorting: price, duration, and airline (A–Z / Z–A)
- Real-time updates without refresh
- Simple and neat UI using Tailwind CSS
- Backend powered by Express with mock `flights.json` data

---

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
