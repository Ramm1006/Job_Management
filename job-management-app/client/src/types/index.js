// This file previously contained TypeScript interfaces for types used in the app.
// In JavaScript, you do not need to declare types or interfaces.
// If you want to document the expected structure, you can use JSDoc comments or leave this file empty.

// Example JSDoc (optional):
/**
 * @typedef {Object} Job
 * @property {string} _id
 * @property {string} [id]
 * @property {string} title
 * @property {string} company
 * @property {string} location
 * @property {string} description
 * @property {string[]} requirements
 * @property {string} salary
 * @property {'full-time'|'part-time'|'contract'} type
 * @property {string} postedDate
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} [query]
 * @property {string} [type]
 * @property {string} [location]
 */

/**
 * @typedef {Object} AuthState
 * @property {string|null} token
 * @property {'admin'|'user'|null} role
 */

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} SignupData
 * @property {string} email
 * @property {string} password
 * @property {'admin'|'user'} [role]
 */