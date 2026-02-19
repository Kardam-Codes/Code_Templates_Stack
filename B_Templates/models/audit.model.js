/**
 * FILE: audit.model.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Store system activity logs.
 *
 * WHY:
 * - Track important actions
 * - Improve debugging
 * - Show professionalism in hackathon demos
 */

import { getCollection, generateId } from "../database/db.js"

const collection = () => getCollection("audits")

export const AuditModel = {
  log(action, metadata = {}) {
    const entry = {
      id: generateId(),
      action,
      metadata,
      timestamp: new Date().toISOString(),
    }

    collection().push(entry)
    return entry
  },

  getAll() {
    return collection()
  },

  clear() {
    const audits = collection()
    audits.length = 0
  },
}
