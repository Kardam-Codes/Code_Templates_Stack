

/**
 * user.service.js
 * OWNER: YUG
 *
 * PURPOSE:
 * - Provide reusable user management functions
 * - Handle user CRUD operations
 * - Centralize user-related API calls
 * - Enable consistent user data handling across projects
 *
 * YOU SHOULD:
 * - Use these functions for all user operations
 * - Keep API endpoints configurable
 * - Return consistent response formats
 * - Handle errors gracefully
 * - Validate input parameters
 *
 * DO NOT:
 * - Add business-specific logic
 * - Mix authentication with user service
 * - Store sensitive data in memory
 * - Skip error handling
 *
 * NOTES:
 * - All methods return Promises
 * - API base URL should be set in config
 * - Extend with project-specific methods as needed
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class UserService {
    /**
     * Fetch all users
     * @returns {Promise<Array>} Array of user objects
     */
    async getAllUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    /**
     * Fetch single user by ID
     * @param {string} id - User ID
     * @returns {Promise<Object>} User object
     */
    async getUserById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`);
            if (!response.ok) throw new Error('User not found');
            return await response.json();
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create new user
     * @param {Object} userData - User data object
     * @returns {Promise<Object>} Created user object
     */
    async createUser(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Failed to create user');
            return await response.json();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    /**
     * Update existing user
     * @param {string} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>} Updated user object
     */
    async updateUser(id, userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Failed to update user');
            return await response.json();
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete user by ID
     * @param {string} id - User ID
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw error;
        }
    }
}

module.exports = new UserService();
