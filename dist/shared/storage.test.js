"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const storage_1 = require("./storage");
(0, vitest_1.describe)('Storage Utilities', () => {
    (0, vitest_1.beforeEach)(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });
    (0, vitest_1.describe)('isStorageAvailable', () => {
        (0, vitest_1.it)('should return true when localStorage is available', () => {
            (0, vitest_1.expect)((0, storage_1.isStorageAvailable)()).toBe(true);
        });
        (0, vitest_1.it)('should return false when localStorage is unavailable', () => {
            // Save original localStorage
            const originalLocalStorage = global.localStorage;
            // Replace with a mock that throws
            Object.defineProperty(global, 'localStorage', {
                value: {
                    setItem: () => {
                        throw new Error('localStorage not available');
                    },
                    getItem: () => null,
                    removeItem: () => { },
                    clear: () => { },
                },
                writable: true,
                configurable: true,
            });
            (0, vitest_1.expect)((0, storage_1.isStorageAvailable)()).toBe(false);
            // Restore original localStorage
            Object.defineProperty(global, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
        });
    });
    (0, vitest_1.describe)('saveToStorage', () => {
        (0, vitest_1.it)('should save data successfully', () => {
            const testData = { name: 'John', age: 30 };
            const result = (0, storage_1.saveToStorage)('test-key', testData);
            (0, vitest_1.expect)(result).toBe(true);
            (0, vitest_1.expect)(localStorage.getItem('test-key')).toBe(JSON.stringify(testData));
        });
        (0, vitest_1.it)('should handle quota exceeded error', () => {
            // Save original localStorage
            const originalLocalStorage = global.localStorage;
            // Replace with a mock that throws quota exceeded
            Object.defineProperty(global, 'localStorage', {
                value: {
                    setItem: () => {
                        const error = new Error('QuotaExceededError');
                        error.name = 'QuotaExceededError';
                        throw error;
                    },
                    getItem: () => null,
                    removeItem: () => { },
                    clear: () => { },
                },
                writable: true,
                configurable: true,
            });
            const result = (0, storage_1.saveToStorage)('test-key', { data: 'value' });
            (0, vitest_1.expect)(result).toBe(false);
            // Restore original localStorage
            Object.defineProperty(global, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
        });
        (0, vitest_1.it)('should return false when localStorage is unavailable', () => {
            // Save original localStorage
            const originalLocalStorage = global.localStorage;
            // Replace with a mock that throws
            Object.defineProperty(global, 'localStorage', {
                value: {
                    setItem: () => {
                        throw new Error('localStorage not available');
                    },
                    getItem: () => null,
                    removeItem: () => { },
                    clear: () => { },
                },
                writable: true,
                configurable: true,
            });
            const result = (0, storage_1.saveToStorage)('test-key', { data: 'value' });
            (0, vitest_1.expect)(result).toBe(false);
            // Restore original localStorage
            Object.defineProperty(global, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
        });
    });
    (0, vitest_1.describe)('loadFromStorage', () => {
        (0, vitest_1.it)('should load data successfully', () => {
            const testData = { name: 'Jane', age: 25 };
            localStorage.setItem('test-key', JSON.stringify(testData));
            const result = (0, storage_1.loadFromStorage)('test-key');
            (0, vitest_1.expect)(result).toEqual(testData);
        });
        (0, vitest_1.it)('should return null when key does not exist', () => {
            const result = (0, storage_1.loadFromStorage)('non-existent-key');
            (0, vitest_1.expect)(result).toBeNull();
        });
        (0, vitest_1.it)('should handle malformed JSON and clear corrupted data', () => {
            // Set malformed JSON
            localStorage.setItem('test-key', 'invalid-json{');
            const result = (0, storage_1.loadFromStorage)('test-key');
            (0, vitest_1.expect)(result).toBeNull();
            (0, vitest_1.expect)(localStorage.getItem('test-key')).toBeNull();
        });
        (0, vitest_1.it)('should return null when localStorage is unavailable', () => {
            // Save original localStorage
            const originalLocalStorage = global.localStorage;
            // Replace with a mock that throws
            Object.defineProperty(global, 'localStorage', {
                value: {
                    setItem: () => { },
                    getItem: () => {
                        throw new Error('localStorage not available');
                    },
                    removeItem: () => { },
                    clear: () => { },
                },
                writable: true,
                configurable: true,
            });
            const result = (0, storage_1.loadFromStorage)('test-key');
            (0, vitest_1.expect)(result).toBeNull();
            // Restore original localStorage
            Object.defineProperty(global, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
        });
    });
    (0, vitest_1.describe)('clearStorage', () => {
        (0, vitest_1.it)('should clear specific key from storage', () => {
            localStorage.setItem('test-key', 'test-value');
            (0, vitest_1.expect)(localStorage.getItem('test-key')).toBe('test-value');
            (0, storage_1.clearStorage)('test-key');
            (0, vitest_1.expect)(localStorage.getItem('test-key')).toBeNull();
        });
        (0, vitest_1.it)('should handle errors gracefully', () => {
            // Save original localStorage
            const originalLocalStorage = global.localStorage;
            // Replace with a mock that throws
            Object.defineProperty(global, 'localStorage', {
                value: {
                    setItem: () => { },
                    getItem: () => null,
                    removeItem: () => {
                        throw new Error('localStorage error');
                    },
                    clear: () => { },
                },
                writable: true,
                configurable: true,
            });
            // Should not throw
            (0, vitest_1.expect)(() => (0, storage_1.clearStorage)('test-key')).not.toThrow();
            // Restore original localStorage
            Object.defineProperty(global, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
        });
    });
});
//# sourceMappingURL=storage.test.js.map