/**
 * FILE: admin.service.js
 * OWNER: Jay
 */

import { getCollection, generateId } from "../database/db.js"

const collection = () => getCollection("admins")

export const AdminService = {
  create(data) {
    const admin = {
      id: generateId(),
      role: "admin",
      ...data,
    }

    collection().push(admin)
    return admin
  },

  getAll() {
    return collection()
  },

  delete(id) {
    const admins = collection()
    const index = admins.findIndex((a) => a.id === Number(id))
    if (index === -1) return false
    admins.splice(index, 1)
    return true
  },
}
