/**
 * FILE: server.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Start the backend server.
 *
 * WHY THIS EXISTS:
 * - Separate startup logic
 * - Keep app.js clean
 */

import app from "./app.js"
import { APP_CONFIG } from "../config/app.config.js"

const PORT = APP_CONFIG.port

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
