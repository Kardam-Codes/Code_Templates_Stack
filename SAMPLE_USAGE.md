
# 📚 “Task Manager App” (To-Do App for Teams)

Everyone understands:

* Users
* Tasks
* Status (Pending / In Progress / Done)
* Admin
* Dashboard

Clean. Simple. Relatable.

Below is your complete `SAMPLE_USAGE.md`.

---

# 📦 SAMPLE_USAGE.md

## 🚀 Example: Building a Task Manager App Using This Template

---

# 🎯 Goal

We will build:

> **Team Task Manager**
>
> * Users can register/login
> * Users can create tasks
> * Users can update task status
> * Admin can view all users
> * Dashboard shows task stats

We will NOT modify template architecture.
We will extend it properly.

---

# 🧠 Step 1 — Understand The Database First

Since this template follows **database-first design**, we start here.

We need:

## Tables

### 1️⃣ users (already exists)

Already provided in backend template.

---

### 2️⃣ roles (already exists)

Already provided.

---

### 3️⃣ tasks (NEW)

Create new model file:

```
models/task.model.js
```

Add SQL:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

That’s it.

We don’t modify existing user system.

---

# 🏗 Step 2 — Backend Implementation

We follow architecture strictly:

```
Route → Controller → Service → Model → DB
```

---

## 2.1 Create Model

📁 `models/task.model.js`

Contains:

* CREATE TABLE SQL
* SELECT queries
* INSERT queries
* UPDATE queries

No logic. Only SQL.

---

## 2.2 Create Service

📁 `services/task.service.js`

Responsibilities:

* Validate title
* Ensure user exists
* Create task
* Update task status
* Pagination support

Example method:

```js
createTask({ title, description, userId })
```

Service talks to DB layer only.

---

## 2.3 Create Controller

📁 `controllers/task.controller.js`

Responsibilities:

* Read req.body
* Call service
* Send formatted response

Never write SQL here.

---

## 2.4 Create Routes

📁 `routes/task.routes.js`

```js
router.post("/", authMiddleware, TaskController.create)
router.get("/", authMiddleware, TaskController.getAll)
router.put("/:id", authMiddleware, TaskController.update)
```

Mount in:

```js
app.use("/api/tasks", taskRoutes)
```

---

# 🔐 Authentication Integration

We DO NOT rebuild auth.

We reuse:

* `auth.middleware.js`
* `role.middleware.js`

Tasks belong to:

```js
req.user.id
```

We trust token.

---

# 🎨 Step 3 — Frontend Implementation

We reuse layout + theme + components.

---

## 3.1 Add Route

In:

```
config/routes.config.js
```

Add:

```js
{
  path: "/tasks",
  name: "Tasks",
  layout: "dashboard",
}
```

---

## 3.2 Create Tasks Page

📁 `pages/Tasks.jsx`

Use:

* `useFetch("/tasks")`
* `SmartTable`
* `Loader`
* `EmptyState`
* `SmartModal` (for create task)

---

## 3.3 Create Task Form Modal

Use:

```js
useToggle()
useToast()
```

No need to rebuild modal system.

---

## 3.4 Display Tasks

```js
<SmartTable
  columns={[
    { label: "Title", key: "title" },
    { label: "Status", key: "status" },
  ]}
  data={data?.data || []}
/>
```

Done.

---

# 📊 Step 4 — Dashboard Stats

We modify:

📁 `pages/Dashboard.jsx`

Call:

```
/tasks
```

Compute:

* Total tasks
* Pending
* Completed

Display in simple cards.

No architecture change required.

---

# 👑 Step 5 — Admin View

Admin page already exists.

We extend:

* Add filter for users
* Show total tasks per user (optional)

Protected via:

```js
roleMiddleware(["admin"])
```

---

# 🔥 What We Did NOT Change

* Folder structure
* Auth system
* Layout system
* Theme system
* API client
* Validation layer

We extended, not hacked.

---

# 📡 API Example Flow

### Create Task

Request:

```
POST /api/tasks
Authorization: Bearer token
```

Body:

```json
{
  "title": "Finish Hackathon Project",
  "description": "Complete backend + frontend integration"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Finish Hackathon Project",
    "status": "pending"
  }
}
```

---

# 🧠 How Template Helped Us

Without template:

* Build auth
* Build middleware
* Build layouts
* Build table
* Build modal
* Build validation
* Build DB structure

With template:

* Only add business logic
* Everything else already exists

---

# 🏎 Hackathon Speed Impact

Estimated time:

| Feature    | Time                      |
| ---------- | ------------------------- |
| Auth       | 0 minutes (already built) |
| CRUD       | 30–45 mins                |
| Dashboard  | 20 mins                   |
| Admin      | 20 mins                   |
| Styling    | 0–10 mins                 |
| Validation | Already integrated        |

Total: ~2 hours for full app foundation.

---

# 📐 Architecture Explanation (For Presentation)

If presenting:

> “We used a modular layered backend architecture.
> Our frontend uses reusable component abstraction.
> We follow database-first PostgreSQL design.
> We use JWT authentication with role-based authorization.”

That alone impresses evaluators.

---

# 🧩 How To Add More Features

Want:

* Comments on tasks?
* File uploads?
* Team assignments?
* Deadlines?

You:

1. Add new table
2. Add model
3. Add service
4. Add controller
5. Add route
6. Add page

Architecture remains stable.

---

# 🏁 Final Result

Using only this template:

We built a:

* Fully authenticated
* Role-based
* PostgreSQL-powered
* Scalable
* Clean UI
* Modular

Task Management App.

Without rewriting foundation.

---

# 🧠 Key Lesson

This template is not a project.

It is:

> A reusable engineering skeleton.

You plug business logic.
It handles the rest.

---

