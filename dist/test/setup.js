"use strict";
// Test setup file for Vitest
// This file runs before all tests
// Mock localStorage for testing
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();
global.localStorage = localStorageMock;
// Mock window.scrollTo for testing
window.scrollTo = () => {
    // No-op in test environment
};
//# sourceMappingURL=setup.js.map