"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fc = __importStar(require("fast-check"));
const storage_1 = require("./storage");
(0, vitest_1.describe)('Property-Based Tests: Storage Utilities', () => {
    (0, vitest_1.beforeEach)(() => {
        localStorage.clear();
    });
    (0, vitest_1.it)('LocalStorage round-trip consistency - primitives', () => {
        fc.assert(fc.property(fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.constant(null)), fc.string({ minLength: 1, maxLength: 50 }).filter(key => key !== '__proto__'), // storage key, avoid __proto__
        (data, key) => {
            // Save data
            const saveResult = (0, storage_1.saveToStorage)(key, data);
            (0, vitest_1.expect)(saveResult).toBe(true);
            // Load data
            const loadedData = (0, storage_1.loadFromStorage)(key);
            // Data should be equivalent
            (0, vitest_1.expect)(loadedData).toEqual(data);
        }), { numRuns: 100 });
    });
    (0, vitest_1.it)('LocalStorage round-trip consistency - objects', () => {
        fc.assert(fc.property(fc.record({
            name: fc.string(),
            age: fc.integer({ min: 0, max: 120 }),
            active: fc.boolean(),
            tags: fc.array(fc.string(), { maxLength: 5 }),
        }), fc.string({ minLength: 1, maxLength: 50 }), // storage key
        (data, key) => {
            // Save data
            const saveResult = (0, storage_1.saveToStorage)(key, data);
            (0, vitest_1.expect)(saveResult).toBe(true);
            // Load data
            const loadedData = (0, storage_1.loadFromStorage)(key);
            // Data should be equivalent
            (0, vitest_1.expect)(loadedData).toEqual(data);
        }), { numRuns: 100 });
    });
    (0, vitest_1.it)('LocalStorage round-trip consistency - arrays', () => {
        fc.assert(fc.property(fc.array(fc.record({
            id: fc.string(),
            value: fc.integer(),
        }), { maxLength: 10 }), fc.string({ minLength: 1, maxLength: 50 }), // storage key
        (data, key) => {
            // Save data
            const saveResult = (0, storage_1.saveToStorage)(key, data);
            (0, vitest_1.expect)(saveResult).toBe(true);
            // Load data
            const loadedData = (0, storage_1.loadFromStorage)(key);
            // Data should be equivalent
            (0, vitest_1.expect)(loadedData).toEqual(data);
        }), { numRuns: 100 });
    });
    (0, vitest_1.it)('LocalStorage round-trip consistency - nested objects', () => {
        fc.assert(fc.property(fc.record({
            user: fc.record({
                name: fc.string(),
                email: fc.emailAddress(),
            }),
            settings: fc.record({
                theme: fc.constantFrom('light', 'dark'),
                notifications: fc.boolean(),
            }),
            metadata: fc.record({
                created: fc.integer({ min: 0, max: Date.now() }).map(ms => new Date(ms).toISOString()),
                updated: fc.integer({ min: 0, max: Date.now() }).map(ms => new Date(ms).toISOString()),
            }),
        }), fc.string({ minLength: 1, maxLength: 50 }).filter(key => key !== '__proto__'), // storage key
        (data, key) => {
            // Save data
            const saveResult = (0, storage_1.saveToStorage)(key, data);
            (0, vitest_1.expect)(saveResult).toBe(true);
            // Load data
            const loadedData = (0, storage_1.loadFromStorage)(key);
            // Data should be equivalent
            (0, vitest_1.expect)(loadedData).toEqual(data);
        }), { numRuns: 100 });
    });
});
//# sourceMappingURL=storage.property.test.js.map