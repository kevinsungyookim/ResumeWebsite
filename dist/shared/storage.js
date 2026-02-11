"use strict";
// LocalStorage utilities with error handling
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStorageAvailable = isStorageAvailable;
exports.saveToStorage = saveToStorage;
exports.loadFromStorage = loadFromStorage;
exports.clearStorage = clearStorage;
/**
 * Checks if localStorage is available in the current browser
 * @returns true if localStorage is available, false otherwise
 */
function isStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * Saves data to localStorage with error handling
 * @param key - The storage key
 * @param data - The data to save (will be JSON stringified)
 * @returns true if save was successful, false otherwise
 */
function saveToStorage(key, data) {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        return true;
    }
    catch (e) {
        if (e instanceof Error && e.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded');
        }
        else {
            console.error('Error saving to localStorage:', e);
        }
        return false;
    }
}
/**
 * Loads data from localStorage with error handling
 * @param key - The storage key
 * @returns The parsed data or null if not found or error occurred
 */
function loadFromStorage(key) {
    if (!isStorageAvailable()) {
        return null;
    }
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData === null) {
            return null;
        }
        return JSON.parse(jsonData);
    }
    catch (e) {
        console.error('Error loading from localStorage:', e);
        // Clear corrupted data
        localStorage.removeItem(key);
        return null;
    }
}
/**
 * Clears a specific key from localStorage
 * @param key - The storage key to clear
 */
function clearStorage(key) {
    if (!isStorageAvailable()) {
        return;
    }
    try {
        localStorage.removeItem(key);
    }
    catch (e) {
        console.error('Error clearing localStorage:', e);
    }
}
//# sourceMappingURL=storage.js.map