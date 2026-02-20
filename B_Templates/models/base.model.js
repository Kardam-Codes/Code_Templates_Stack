/**
 * FILE.model.js
 * OWNER: YUG
 *
 * PURPOSE:
 * - Reusable BASE MODEL template for hackathons & fast builds
 * - Provides standard structure for data models
 * - Enables consistency across projects
 *
 * YOU SHOULD:
 * - Implement the simplest working version
 * - Keep defaults predictable
 * - Make it reusable across projects
 * - Follow this structure for all models
 * - Add validation in the validate() method
 * - Extend this class for specific models
 *
 * DO NOT:
 * - Add business-specific logic
 * - Over-engineer
 * - Optimize prematurely
 * - Modify the core structure without discussion
 * - Add dependencies beyond what's necessary
 *
 * NOTES:
 * - This file can be extended or deleted later
 * - Clarity > Cleverness
 * - All models should inherit from this base
 * - Required fields must be defined in constructor
 */

class BaseModel {
    /**
     * Initialize base model with common properties
     * @param {Object} data - Initial data object
     */
    constructor(data = {}) {
        this.id = data.id || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.isValid = false;
    }

    /**
     * Validate model data
     * @returns {boolean} - Validation result
     */
    validate() {
        this.isValid = this.id !== null && this.createdAt !== null;
        return this.isValid;
    }

    /**
     * Convert model to JSON
     * @returns {Object} - JSON representation
     */
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    /**
     * Update model timestamp
     */
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}

module.exports = BaseModel;
