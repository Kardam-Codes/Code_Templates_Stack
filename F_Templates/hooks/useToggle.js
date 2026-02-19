/**
 * FILE: useToggle.js
 * OWNER: Misha
 *
 * PURPOSE:
 * Simplify boolean state toggling.
 *
 * USE CASES:
 * - Modal open/close
 * - Dropdown toggle
 * - Theme switch
 */

import { useState } from "react"

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  function toggle() {
    setValue((prev) => !prev)
  }

  function setTrue() {
    setValue(true)
  }

  function setFalse() {
    setValue(false)
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  }
}
