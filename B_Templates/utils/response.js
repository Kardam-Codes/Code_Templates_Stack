/**
 * FILE: response.js
 * OWNER: Jay
 *
 * PURPOSE:
 * Standardize all API responses.
 *
 * WHY:
 * - Keep response format consistent
 * - Avoid repeating JSON structure
 */

export const Response = {
  success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  },

  error(res, message = "Something went wrong", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    })
  },

  paginated(res, data = [], page, limit, total) {
    return res.status(200).json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  },
}
