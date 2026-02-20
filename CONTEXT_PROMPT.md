
---

# 📘 CONTEXT_PROMPT.md

## 🚀 AI Briefing Context for Hackathon Template

---

# 🎯 Purpose of This Document

Before generating ANY code with AI, paste this full context.

This ensures:

* AI does not rewrite architecture
* AI does not introduce bad patterns
* AI respects folder structure
* AI keeps PostgreSQL-first design
* AI stays modular
* AI does not break existing system

---

# 🧠 Project Context

We are using a **pre-built Full-Stack Hackathon Starter Template**.

This template is designed for:

* PostgreSQL database-first development
* Clean layered backend architecture
* Reusable React frontend
* JWT-based authentication
* Role-based authorization
* Feature flags
* Modular extensibility

This is NOT a quick prototype setup.
This is a structured engineering framework.

---

# 🏗 Locked Stack

### Backend

* Node.js
* Express
* PostgreSQL (only)
* Raw SQL (no ORM)
* JWT authentication
* Layered architecture

### Frontend

* React (JSX)
* React Router
* Context API
* Inline styles
* Theme system
* Reusable components

We are NOT changing the stack.

---

# 🧱 Backend Architecture (Do NOT Modify Structure)

Folder structure:

```
Route → Controller → Service → Model → Database
```

Rules:

* Routes define endpoints only
* Controllers handle HTTP logic only
* Services contain business logic
* Models contain only SQL queries
* Database layer executes queries

STRICT RULES:

* No SQL inside controller
* No business logic inside routes
* No validation skipped
* No ORM usage
* No Firebase / Supabase
* No BaaS
* No mixing layers

---

# 🗄 Database Philosophy

* Database-first design
* Proper relationships (1-M, M-M)
* Normalized schema
* Foreign keys
* Indexing where needed
* PostgreSQL only

All schema changes go through:

```
database/migrate.js
models/*.model.js
```

Never generate schema inside controller or service.

---

# 🔐 Authentication System Already Exists

Available:

* JWT authentication
* auth.middleware.js
* role.middleware.js
* user.model.js
* auth.service.js
* auth.controller.js
* auth.routes.js

Do NOT regenerate auth system.

Extend it if necessary.

---

# 🛡 Validation Rules

All user input must be validated before reaching database.

Use:

```
utils/validator.js
```

Never allow raw request body into SQL query.

---

# 🟢 Frontend Architecture (Do NOT Modify Structure)

Folder structure:

```
components/
hooks/
layouts/
pages/
services/
config/
theme/
```

Rules:

* No business logic in components
* No API calls inside layout
* No hardcoded routes
* No direct fetch calls (use api.js)
* Use useFetch for data fetching
* Use useAuth for authentication
* Use feature flags for toggling features

---

# 🎨 Theme System

Theme system already exists:

* tokens.js
* light.js
* dark.js
* brand.js
* ThemeProvider

Do NOT hardcode colors in new components.

Use theme context.

---

# 🧩 Feature Flags Exist

Use feature flags instead of deleting code.

Frontend:

```
config/featureFlags.js
```

Backend:

```
config/featureFlags.js
```

---

# 🚫 What AI Must NOT Do

When generating code:

* Do NOT refactor folder structure
* Do NOT rename files
* Do NOT introduce Redux
* Do NOT introduce ORM
* Do NOT introduce TypeScript
* Do NOT add unnecessary libraries
* Do NOT modify unrelated files
* Do NOT break authentication flow
* Do NOT convert inline styles to Tailwind unless explicitly asked

---

# ✅ What AI SHOULD Do

When generating code:

* Follow existing file naming patterns
* Follow modular structure
* Keep functions small and readable
* Add comments explaining logic
* Use async/await properly
* Use proper HTTP status codes
* Use consistent response format
* Use PostgreSQL parameterized queries
* Maintain clean separation of concerns

---

# 📦 Response Format Required From AI

When generating backend code:

1. Mention file path
2. Provide complete file
3. Do not say “modify this later”
4. Include validation
5. Use asyncHandler if required

When generating frontend code:

1. Mention file path
2. Provide complete component
3. Use existing hooks
4. Keep it reusable
5. Avoid business-specific naming unless requested

---

# 🧠 How To Ask AI Properly

Instead of saying:

> “Build tasks feature”

Say:

> “Using our existing layered PostgreSQL backend template and without modifying structure, create models/task.model.js, services/task.service.js, controllers/task.controller.js, routes/task.routes.js following our architecture rules.”

Be precise.

AI performs better with constraints.

---

# 🏁 Final Instruction to AI

You are working inside an existing structured template.

Respect it.

Extend it.

Do not redesign it.

---

This context must be pasted before any feature generation.

---


