# Pokémon Explorer

A Next.js-based Pokémon Explorer app that allows users to browse Pokémon, search for specific ones, and view detailed stats. This project uses **Next.js**, **Chakra UI**, and **PokeAPI**.

## 🚀 Features

### ✅ Homepage
- Displays a list of Pokémon fetched from the **PokeAPI**.
- Implements a **search bar** to filter Pokémon by name.
- Styled using **Chakra UI** or **TailwindCSS**.

### ✅ Pokémon Detail Page
- Clicking on a Pokémon navigates to a **detailed page** with:
  - Image
  - Abilities
  - Type
  - Stats
  - Moves

### ✅ Routing
- Uses **Next.js Dynamic Routes** (`pages/pokemon/[id].tsx`) for Pokémon details.

### ✅ Performance Optimization (Optional)
- Supports **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)** for improved performance.

---

## 🛠️ **Tech Stack**
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Chakra UI 
- **API:** PokeAPI (https://pokeapi.co/)
- **Routing:** Next.js Dynamic Routing

---

## 📥 **Installation & Setup**

### 1. **Clone the repository**
```sh
git clone https://github.com/sohit-mishra/Statfinity_Assigment.git
cd pokemon-explorer
```

### 2. **Install dependencies**
```sh
npm install  # or yarn install
```

### 3. **Run the development server**
```sh
npm run dev  # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 **How It Works**

### **Homepage (`index.tsx`)**
- Fetches Pokémon from PokeAPI.
- Displays them in a grid.
- Includes a search bar for filtering.

### **Detail Page (`pages/pokemon/[id].tsx`)**
- Fetches individual Pokémon details.
- Displays image, abilities, type, stats, and moves.

---

### 🏆 Enjoy exploring Pokémon! 🎉
