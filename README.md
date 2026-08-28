# KSTDC — Karnataka Tourism Citizen Experience 🌿

[![Live Demo](https://img.shields.io/badge/Live_Demo-kstdc--apex--os.vercel.app-0064E0?style=for-the-badge&logo=vercel&logoColor=white)](https://kstdc-apex-os.vercel.app)
[![Astro](https://img.shields.io/badge/Astro-5.0+-BC52EE.svg?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **🚀 Live Application**: [https://kstdc-apex-os.vercel.app](https://kstdc-apex-os.vercel.app)  
> **Build What Moves India · Public Digital Service Reimagining**  
> An executive, citizen-first digital tourism and hospitality portal reimagining the **Karnataka State Tourism Development Corporation (KSTDC)** with modern web architecture, multi-passenger manifest booking, instant government tax invoices, and zero-compromise accessibility.

---

## 🌐 Live Prototype & Deployment

- 🔗 **Production Deployment**: [https://kstdc-apex-os.vercel.app](https://kstdc-apex-os.vercel.app)
- ⚡ **Framework**: Astro 5 (Static Site Generation + React 19 Islands)
- 🔒 **SSL & Edge CDN**: Verified Vercel Global Edge Network

---

## 🏛️ Project Overview

**KSTDC (Karnataka State Tourism Development Corporation)** manages Karnataka's flagship conducted tour packages, the government-owned **Hotel Mayura** heritage hospitality network, 24x7 prepaid airport taxi fleets at Kempegowda International Airport (BLR), and royal **Ambaari double-decker illumination tours**.

This project provides an ultra-fast, accessible, and delightful digital public portal replacing legacy multi-step booking friction with a unified, transparent, and responsive web application.

---

## 🌟 Key Features & Innovations

### 1. 4-in-1 Multi-Service Intent Widget
- 🚌 **Conducted Tour Packages**: UNESCO World Heritage (Hampi, Pattadakal), Western Ghats circuits (Coorg, Chikmagalur), coastal corridors (Gokarna, Murudeshwar), and royal heritage express (Mysuru).
- 🏨 **Hotel Mayura Network**: 20+ government-owned heritage properties, hilltop lodges, and coastal retreats with transparent direct-citizen pricing and zero surge fees.
- 🚖 **24x7 Airport Prepaid Taxi**: Fixed official government tariffs from BLR Terminal 1 & Terminal 2 arrivals with automated toll inclusion and counter pickup slips.
- 🏛️ **Ambaari & City Sightseeing**: Open-top double-decker bus illumination tours of Mysuru Palace and certified heritage walking tours of Vidhana Soudha.

### 2. Dynamic Multi-Passenger Manifest
- Automatically generates individualized input fields when booking for multiple travellers (`Adults`, `Seniors 60+`, and `Children 5–12`).
- Captures individual names, ages, genders, and automatically assigns seat numbers and hotel rooms.
- Seamlessly stores manifest data in the client-side wallet for inspection.

### 3. Government Tax Invoice & Boarding Pass Generator
- Generates official, itemized **Government of Karnataka Tax Invoices** (GSTIN: `29AAACK0123M1Z8`, State Code: `29`, SAC: `9964 / 9963`).
- Itemizes Base Fare, 5% Senior Concessions, CGST (2.5%), SGST (2.5%), and Total Paid amount.
- **One-Click Download**: Instantly downloads a standalone `.html` tax invoice and opens formatted print-to-PDF dialogs.

### 4. Interactive Hero Slider & Official Imagery
- Automated cross-fading background slider featuring official Karnataka tourism imagery:
  - *Hampi UNESCO World Heritage Stone Chariot*
  - *Hotel Mayura Yagachi Belur*
  - *Shivanasamudra Waterfalls & Western Ghats*
  - *Nandi Hills Paragliding & Adventure Tourism*
- Complete with manual slide indicators and previous/next navigation controls.

### 5. State Leadership & Governance Showcase
- Features the executive leadership of Karnataka Tourism with official portraits and portfolios:
  - **Sri D. K. Shivakumar** — *Hon'ble Deputy Chief Minister*, Government of Karnataka
  - **Dr. G. Parameshwara** — *Hon'ble Minister for Home Affairs*, Government of Karnataka
  - **Sri K. J. George** — *Hon'ble Minister for Energy*, Government of Karnataka
  - **Chairman & Board of Directors** — *Karnataka State Tourism Development Corporation*

### 6. Custom Professional Dropdown Engine
- Custom-built React popover menus replacing raw OS browser dropdowns and datalists.
- Instant search autocomplete for Departure Hubs, Destinations, Mayura Properties, and Pickup points.

### 7. Decision-Reduction AI Trip Planner
- Natural language route & stay discovery grounded exclusively on verified KSTDC itineraries with 0% hallucination.

### 8. Digital Citizen Wallet (`/my-bookings`)
- Instant ticket pass retrieval, calendar sync (`.ics`), WhatsApp itinerary sharing, and Kannada audio travel phrasebook.

---

## 👥 Project Team

| Name | GitHub Handle | Role |
| :--- | :--- | :--- |
| **Chethan Kumar** | [@Chethankumar443](https://github.com/Chethankumar443) | **Project Lead & Fullstack Engineer** |
| **Javali Ajaykumar** | [@AJAYMYTH](https://github.com/AJAYMYTH) | **Core Collaborator & Frontend Engineer** |
| **RaviTeja M** | [@ravitejam2007-code](https://github.com/ravitejam2007-code) | **Core Collaborator & UI/UX Specialist** |
| **Sanjay D** | [@sanjaydsanjay](https://github.com/sanjaydsanjay) | **Core Collaborator & Product Engineer** |

---

## 🛠️ Technology Stack

- **Framework**: [Astro 5+](https://astro.build/) — Fast, zero-JS by default static site generator.
- **Client Islands**: [React 19](https://react.dev/) — Interactive UI islands with selective hydration (`client:load`).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Modern CSS engine with fluid typography and dark mode support.
- **Icons**: [Lucide React](https://lucide.dev/) — Clean, consistent SVG icon set.
- **State Management**: Offline-first reactive store with `localStorage` persistence and cross-tab synchronization.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Chethankumar443/kstdc.co.git
cd kstdc.co

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Production Build

```bash
# Build 25 static pages with zero errors
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Repository Structure

```
kstdc.co/
├── public/
│   ├── hero/                     # Hero showcase photographs (Hampi, Belur, Shivanasamudra, Nandi Hills)
│   ├── leadership/               # Official state leadership portraits
│   ├── kstdc-logo.png            # Official KSTDC emblem
│   └── karnataka-tourism-logo.png # Department of Tourism emblem
├── src/
│   ├── components/
│   │   ├── booking/              # Checkout engine & Multi-passenger manifest
│   │   ├── common/               # HeaderNav, FooterSection, CustomSelect
│   │   ├── confirmation/         # ConfirmationCompanion & Tax Invoice generator
│   │   ├── home/                 # HeroBanner, GovernmentLeadership, TrendingTrips, MayuraStays
│   │   ├── stays/                # StaysDirectory with room reservation modal
│   │   ├── cabs/                 # CabsBookingEngine & 24x7 Airport Taxi
│   │   └── activities/           # Ambaari & City sightseeing booking
│   ├── data/                     # Typed datasets for trips, hotels, cabs, and activities
│   ├── layouts/                  # Layout.astro with SEO & accessibility meta
│   ├── pages/                    # 25 static page routes
│   └── types/                    # TypeScript interfaces & data models
├── astro.config.mjs              # Astro configuration
└── package.json
```

---

## 📜 Prototype & Ethical Notice

This project is a demonstration prototype developed for digital public service reimagining under competition guidelines. It is built entirely with client-side state and simulated offline workflows without accessing or interfering with live government databases, payment gateways, or private APIs.

---

## 🏛️ Official KSTDC Contact & Helpline

- **Toll-Free Helpline**: `1800 425 3333` | `080-4334 4334` (24x7)
- **Official Email**: `info@kstdc.co`
- **Head Office**: Khanija Bhavan, West Wing, 49, Race Course Road, Bengaluru, Karnataka - 560001
- **Official Portal**: [https://kstdc.co](https://kstdc.co)

---

<div align="center">
  <sub>Built with ❤️ for Karnataka Tourism by Team Chethan Kumar · Javali Ajaykumar · RaviTeja M · Sanjay D</sub>
</div>
