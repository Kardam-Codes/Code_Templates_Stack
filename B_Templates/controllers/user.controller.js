/**
 * FILE: user.service.js
 * OWNER: Jay
 *
 * PURPOSE:
 * Business logic for users.
 */

import { getCollection, generateId } from "../database/db.js"

const collection = () => getCollection("users")

export const UserService = {
  create(data) {
    const newUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      role: "user",
    }

    collection().push(newUser)
    return newUser
  },

  getAll(query) {
    let users = [...collection()]

    // Filtering
    if (query.search) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.search.toLowerCase()) ||
          u.email.toLowerCase().includes(query.search.toLowerCase())
      )
    }

    const total = users.length

    // Pagination
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 10
    const start = (page - 1) * limit
    const end = start + limit

    const paginated = users.slice(start, end)

    return { data: paginated, total, page, limit }
  },

  getById(id) {
    return collection().find((u) => u.id === Number(id))
  },

  update(id, data) {
    const users = collection()
    const index = users.findIndex((u) => u.id === Number(id))
    if (index === -1) return null

    users[index] = { ...users[index], ...data }
    return users[index]
  },

  delete(id) {
    const users = collection()
    const index = users.findIndex((u) => u.id === Number(id))
    if (index === -1) return false

    users.splice(index, 1)
    return true
  },
}
