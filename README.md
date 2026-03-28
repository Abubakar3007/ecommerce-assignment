# 🛒 E-Commerce React Application (ShopEasy)

## 📌 Overview

This project is a basic e-commerce web application built using React JS and TypeScript.
It allows users to browse products, filter and sort them, view product details, and manage a shopping cart.

---

## 🚀 Features

### 🏠 Home Page

* Displays products in a responsive grid layout
* Shows product image, title, and price
* Supports **multi-category filtering**
* Supports **sorting (price/title)**
* Filters are synced with URL (shareable & persistent on refresh)

---

### 📄 Product Detail Page

* Dynamic routing using `/product/:id`
* Fetches product details based on ID
* Displays title, description, price, and image
* Add to Cart functionality

---

### 🛒 Cart Functionality

* Add items to cart
* Remove items from cart
* Displays total items and total price
* Cart state managed globally using Context API

---

### 🔗 Navigation

* Navigation between Home and Product Detail pages
* Header with Home link
* Back to Home functionality

---

## ⚙️ Tech Stack

* React JS (Class Components)
* TypeScript
* React Router
* Context API (State Management)
* Fake Store API
* Inline CSS (Responsive UI)
* Cypress (E2E Testing)

---

## 📦 Installation & Setup

```bash
git clone <your-repo-link>
cd ecommerce-app
npm install
npm start
```

App will run on:
👉 http://localhost:3000

---

## 🧪 Testing

```bash
npx cypress open
```

---

## 🔗 API Used

* https://fakestoreapi.com/products
* https://fakestoreapi.com/products/:id
* https://fakestoreapi.com/products/category/:category

---

## 🧠 Assumptions

* Multiple category filtering is handled using multiple API calls and merging results
* "All" category resets filters
* Sorting is applied on frontend after fetching data

---

## ⚠️ Limitations

* No authentication system
* No backend persistence
* Limited cart features (no quantity update)

---

## ⭐ Bonus Features

* Cart data persisted using localStorage
* Responsive UI with inline styling
* Multi-select category filtering

---

## 📁 Folder Structure

* components → reusable UI components
* pages → Home, Product Detail
* context → global cart state
* services → API calls
* routes → routing setup

---

## 🙌 Author

Developed by **Abubakar Azmi**