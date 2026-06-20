# Eco — Carbon Footprint Tracker

<div align="center">
  <img src="https://img.shields.io/badge/Eco-Sustainability_System-10b981?style=for-the-badge" alt="Eco Logo"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Design-Glassmorphic-f8fafc?style=for-the-badge" alt="Design"/>
</div>

---

### *Experience a new aura of environmental awareness.*

Aura (formerly EcoAura) is an AI-enabled web application that provides a professional, high-fidelity platform to calculate, monitor, and reduce carbon emissions. By tracking daily activities across transport, energy, food, and waste, Aura empowers individuals to take measurable steps toward a sustainable future.

## ⚠️ The Problem
Many people are unaware of how their daily activities contribute to climate change. Existing solutions are often complex, lack personalization, and fail to provide the visual clarity needed for meaningful lifestyle adjustments.

## 🌟 The Solution
Aura solves this by providing a premium "Command Center" interface that translates lifestyle data into actionable environmental intelligence.

### ⚡ Predictive Tracking
Log your daily activities across **Transport, Energy, Food, and Waste**. Aura's real-time estimation engine provides instant feedback on your carbon impact.

### 🤖 Aura Intelligence (AI Coach)
Your personal sustainability assistant. Ask Aura for targeted reduction strategies or help interpreting your climate data. It's context-aware and mission-driven.

### 📊 Impact Analytics
Deep dive into your contribution with interactive **Doughnut, Line, and Radar charts**. Visualize your historical trends and compare them against global 2030 goals.

### 🌿 Commitment Shield
Small changes, massive results. Commit to high-impact actions through our sleek Actions interface and watch your Eco Score rise.

## 🛠️ Technology Ecosystem

- **Frontend**: React 18 with Vite for lightning-fast delivery.
- **Styling**: "Aura" Design System - Custom Vanilla CSS with Glassmorphism, Tailwind CSS for layout, and Framer Motion for cinematic animations.
- **Visualization**: Chart.js and react-chartjs-2 for data storytelling.
- **Intelligence**: Context-aware logic for personalized coaching.
- **Persistence**: Browser-based localStorage for private, local-first data.

## 📑 Project Methodology
1. **Data Entry**: Users log activities (e.g., mileage, energy bills, diet type) in the **Tracker**.
2. **Analysis**: The analytical engine (`src/utils/calculations.js`) applies standardized emission factors to calculate CO₂-equivalent (kg/month).
3. **Visualization**: Data is piped to the **Dashboard** and **Insights** views for trend analysis.
4. **Action**: The **AI Coach** and **Actions** module recommend lifestyle shifts based on the user's highest emission categories.

## ✅ Features Implemented

| Feature | Status |
|---------|--------|
| Carbon footprint wizard (4 categories) | ✅ Full tracker with onboarding |
| Emission analytics dashboard | ✅ Dashboard + Dynamic Charts |
| AI-powered recommendations | ✅ Category-prioritized Actions + Coach |
| Monthly and yearly reports | ✅ Reports view with print/PDF support |
| User profile and level system | ✅ Profile + XP tracking |
| Premium Marketing Hub | ✅ Cinematic landing page + Feature Portal |

## 🔧 Core Mechanics

### 1. The Root Connection (Main Entry)
The application uses a "Root Switch" logic to handle the transition between the **Landing Page** and the **Dashboard App**.
- **File**: `src/main.jsx` acts as the traffic controller.
- **How it works**: It checks the URL hash. If the hash contains `#/app/`, it renders the `App.jsx` (the dashboard); otherwise, it renders the `LandingPage.jsx`.
- **Navigation**: Switching is handled by `src/utils/navigation.js` using `window.location.hash`.

### 2. The Icon & Asset System
Adding new features or changing icons is designed to be simple and centralized:
- **Feature Icons**: Uses **FontAwesome 6** (free) and **System Emojis**.
- **Adding Icons**: To add a new icon, simply update the `NAV_ITEMS` array in `Sidebar.jsx` or the feature list in `Home.jsx`.
- **Visual Assets**: Background images like `forest.png` and `co2.png` are managed in `src/landing/landingAssets.js`. These are premium AI-generated assets integrated via standard CSS background-image properties.

## 🚀 Quick Setup

1. **Install**: `npm install`
2. **Run**: `npm run dev`
3. **Build**: `npm run build` (produces the `/dist` folder for deployment)

## 📂 Simplified Folder Map
- `/src/landing`: Everything you see on the front marketing page.
- `/src/views`: The different pages inside the app (Dashboard, Tracker, etc.).
- `/src/utils`: The "Brain" (Carbon math and navigation logic).
- `/src/assets`: Cinematic background images.

---
*Redefining tech and planet relations. | EST. 2026*
