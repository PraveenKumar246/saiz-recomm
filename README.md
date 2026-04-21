# SAIZ Recomm Widget

A premium, mobile-first size recommendation widget built with **React**, **TypeScript**, and **Redux Toolkit**. Designed with **Clean Architecture** principles to provide a seamless, theme-aware integration for e-commerce platforms.

---

## 🏗 Architecture Overview

This project follows **Clean Architecture** to ensure maintainability, testability, and scalability.

### 1. Data Layer (`src/data`)
- **Services**: Handles asynchronous API communication with the SAIZ staging backend.
- **Mappers**: Employs the **Mapper Pattern** to decouple the UI from raw API responses, translating JSON into clean Domain models.

### 2. Domain Layer (`src/domain`)
- **Models**: Defines strict TypeScript interfaces for all enterprise business rules.
- **Factories**: Uses the **Factory Pattern** for dynamic screen rendering, allowing multiple brands to be onboarded with custom UI components without modifying core logic.

### 3. State Layer (`src/state`)
- **Redux Toolkit**: Manages global application state including user measurements, product data, and modal transitions.
- **Slices**: Modularized state logic for Products, Screen navigation, and Theming.

### 4. UI Layer (`src/ui`)
- **Theme Provider**: A context-based system that injects dynamic CSS variables into the DOM for 100% theme awareness.
- **Components**: Atomic and reusable UI units following a "Premium Monochrome" design system.

---

## 🚀 Key Features

- **Pixel-Perfect Monochrome Design**: Optimized for a high-end feel in both light and dark modes.
- **Mobile-App UX**: Responsive layout designed with thumb-friendly targets and vertical hierarchies.
- **Unit Conversions**: Real-time conversion between Metric (cm/kg) and Imperial (ft/lbs) systems with high precision.
- **Dynamic Avatar**: An SVG-based visualization that adapts to gender and garment types (e.g., shirts, trousers).
- **Factory-Driven Integration**: Supports multiple brands via a central Screen Factory registry.

---

## 🛠 Tech Stack

- **Framework**: React 18+ (Vite)
- **Language**: TypeScript (Strict Mode)
- **State Management**: Redux Toolkit (RTK)
- **Styling**: Vanilla CSS with dynamic CSS Variables (Design Tokens)
- **Icons/Graphics**: Custom SVG Illustrations

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Integration
To embed the widget on a product page, add the following container:
```html
<div 
  id="saiz-widget-container"
  data-brandcode="ohapril"
  data-productcode="zahara-lace-longsleeve-black"
></div>
```

---

1. **Decoupling**: "We used Mappers to protect the frontend from breaking changes in the API response."
2. **Extensibility**: "The Screen Factory pattern allows us to add brand-specific UI without touching the boilerplate logic."
3. **Performance**: "CSS Variable injection prevents expensive React re-renders when switching themes."
4. **Reliability**: "Strict TypeScript types ensure that 90% of potential production bugs are caught during development."

---
