
---

# 🚀 Hackathon Full-Stack Starter Framework

**PostgreSQL • Express • React (JSX) • Clean Architecture**

---

## 🎯 What This Is

This repository is a **Starter Template**.

You do NOT build projects directly inside this repo.

Instead:

```
Clone → Rename → Build your project inside it.
```

It gives you:

* 🔥 Database-first backend structure
* 🔐 JWT Authentication system
* 🧠 Clean modular architecture
* 📊 Dashboard + Admin template
* 🎨 Theme system (light / dark / brand)
* 🧩 Reusable frontend components
* 🛡 Production-grade validation & middleware
* ⚙ Feature flags
* 🧱 Scalable folder structure

This is built for:

* Hackathons
* Engineering interviews
* Fast MVPs
* Scalable production foundations

---

# 🧠 Core Philosophy

We build like engineers.

Not:

* ❌ Copy-paste coders
* ❌ Firebase-only hacks
* ❌ Static JSON demos

We follow:

* ✅ Database-first design
* ✅ Clear separation of concerns
* ✅ Modular architecture
* ✅ Strong validation
* ✅ PostgreSQL relational modeling
* ✅ Clean UI consistency

---

# 🏗 Tech Stack (Locked)

### Backend

* Node.js
* Express
* PostgreSQL
* JWT Authentication
* Layered architecture
* No BaaS
* No ORM magic

### Frontend

* React (JSX)
* React Router
* Context API
* Inline styles (lightweight template)
* Feature flags
* Theme system

---

# 📂 Project Structure

---

# 🔵 Backend – `B_Templates`

## Structure Overview

```
B_Templates/
 ┣ config/
 ┣ controllers/
 ┣ database/
 ┣ middleware/
 ┣ models/
 ┣ routes/
 ┣ server/
 ┣ services/
 ┗ utils/
```

---

## 🗄 Database (PostgreSQL Only)

Configured in `.env` 

```
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
```

### Database Architecture

* Raw SQL
* Model files contain SQL definitions
* Migration runner handles schema creation
* Seed file populates initial data
* No ORM abstraction layer

---

## 🔐 Authentication System

Endpoints:

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |

Returns:

```
{
  success: true,
  data: {
    token,
    user
  }
}
```

JWT-based authentication.

Protected routes require:

```
Authorization: Bearer <token>
```

---

## 👥 User Management

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/users`     | List users (pagination) |
| GET    | `/api/users/:id` | Get single user         |
| PUT    | `/api/users/:id` | Update user             |
| DELETE | `/api/users/:id` | Delete user             |

Supports:

* Pagination
* Filtering
* Role-based access

---

## 🛡 Middleware System

* `auth.middleware.js` → Verifies JWT
* `role.middleware.js` → Restricts by role
* `error.middleware.js` → Global error handling
* `logger.middleware.js` → Request logging

PostgreSQL errors handled properly.

---

## 🧱 Architecture Pattern

```
Route → Controller → Service → Model → Database
```

Each layer has one responsibility.

* Routes define endpoints
* Controllers handle HTTP layer
* Services contain business logic
* Models contain SQL
* Database layer executes queries

No mixing logic across layers.

---

# 🟢 Frontend – `F_Templates`

## Structure Overview

```
F_Templates/
 ┣ components/
 ┣ config/
 ┣ hooks/
 ┣ layouts/
 ┣ pages/
 ┣ services/
 ┗ theme/
```

---

# 🎨 Theme System

Theme files:

* `tokens.js`
* `light.js`
* `dark.js`
* `brand.js`
* `ThemeProvider.jsx`

Supports:

* Light mode
* Dark mode
* Brand customization
* Theme switching
* Global color tokens

Everything reads from theme context.

---

# 🧩 Reusable Components

### UI Core

* Button
* Input
* Loader
* SmartModal
* SmartTable
* Toast
* PageHeader
* EmptyState

All components:

* Stateless
* Reusable
* Business-logic-free
* Lightweight

---

# 🔐 Auth Flow (Frontend)

`useAuth.js` handles:

* Login
* Register
* Logout
* Token storage
* User storage

Stored in localStorage.

Protected routes use AuthContext.

---

# 🧠 Data Layer

`useFetch.js` standardizes:

* Loading
* Error
* Refetch
* API response format

All pages use consistent API structure.

---

# 🗺 Routing System

Routes defined in:

```
config/routes.config.js
```

No hardcoded routes in components.

Supports:

* Public routes
* Private routes
* Admin routes
* Role metadata
* Fallback 404 route

---

# ⚙ Feature Flags

Frontend flags:

```
ENABLE_AUTH
ENABLE_ADMIN_PANEL
ENABLE_ANALYTICS
ENABLE_REALTIME
ENABLE_THEME_SWITCH
```

Backend flags separate.

Allows enabling/disabling features without deleting code.

---

# 🚀 How To Use This Template

## Step 1

Clone this repo.

```
git clone <repo-url> my-new-project
```

Rename folders if needed.

---

## Step 2

Configure PostgreSQL.

Update `.env` 

Create database manually.

---

## Step 3

Run backend:

```
npm install
npm run dev
```

---

## Step 4

Run frontend:

```
npm install
npm start
```

---

## Step 5

Start building your features inside:

* models
* services
* controllers
* pages
* components

Never break architecture.

---

# 📐 How To Extend Backend Properly

When adding a new entity:

1. Create model SQL
2. Create service logic
3. Create controller
4. Create route
5. Protect route if needed
6. Update migration if schema changes

Never:

* Add SQL in controller
* Add business logic in routes
* Skip validation

---

# 📐 How To Extend Frontend Properly

When adding new page:

1. Add route in `routes.config.js`
2. Create page in `pages/`
3. Use layout wrapper
4. Use `useFetch` for data
5. Use reusable components

Never:

* Hardcode endpoints
* Mix UI + API logic directly

---

# 🛡 Security Rules

* Validate all input
* Never trust frontend
* No secrets in frontend
* Use environment variables
* Sanitize data
* Prevent SQL injection

---

# 🧪 What This Template Guarantees

If used properly:

* Clean architecture
* Scalable backend
* Database-first logic
* JWT security
* UI consistency
* Hackathon-ready demo
* Interview-ready explanation

---

# 🧠 What If Someone Wants Different Stack?

This template is opinionated.

But you can swap parts:

### Want Tailwind instead of inline styles?

* Remove inline styles
* Wrap app with Tailwind
* Keep layout separation
* Keep theme tokens concept

### Want Redux instead of Context?

* Replace AuthProvider
* Keep service + API architecture intact

### Want MySQL instead of PostgreSQL?

* Adjust SQL syntax
* Update migration runner
* Update .env config

### Want ORM (Prisma / Sequelize)?

* Replace models layer
* Keep controller/service separation

### Want TypeScript?

* Convert files gradually
* Do not mix types randomly
* Keep same folder structure

Architecture matters more than syntax.

---

# 🏆 Designed For Hackathons

This template allows:

* 0 → Working Auth in 30 minutes
* CRUD in under 1 hour
* Clean architecture demo
* Database-first explanation
* Modular extension

---

# 👥 Team Discipline Rules

* Every member commits
* Use feature branches
* Clean commit messages
* No direct push to main
* Code review before merge

---

# 🎯 Final Goal

Build something that:

* Feels engineered
* Not hacked
* Not fragile
* Not messy

This is not a prototype template.

This is a **foundation template**.

---

# 🔥 Build Like Professionals.

Happy Hacking.
Ship clean.
