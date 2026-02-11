import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { saveToStorage, loadFromStorage } from './storage';

describe('Property-Based Tests: Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('LocalStorage round-trip consistency - primitives', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null)
        ),
        fc.string({ minLength: 1, maxLength: 50 }).filter(key => key !== '__proto__'), // storage key, avoid __proto__
        (data, key) => {
          // Save data
          const saveResult = saveToStorage(key, data);
          expect(saveResult).toBe(true);

          // Load data
          const loadedData = loadFromStorage(key);

          // Data should be equivalent
          expect(loadedData).toEqual(data);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('LocalStorage round-trip consistency - objects', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          age: fc.integer({ min: 0, max: 120 }),
          active: fc.boolean(),
          tags: fc.array(fc.string(), { maxLength: 5 }),
        }),
        fc.string({ minLength: 1, maxLength: 50 }), // storage key
        (data, key) => {
          // Save data
          const saveResult = saveToStorage(key, data);
          expect(saveResult).toBe(true);

          // Load data
          const loadedData = loadFromStorage<typeof data>(key);

          // Data should be equivalent
          expect(loadedData).toEqual(data);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('LocalStorage round-trip consistency - arrays', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string(),
            value: fc.integer(),
          }),
          { maxLength: 10 }
        ),
        fc.string({ minLength: 1, maxLength: 50 }), // storage key
        (data, key) => {
          // Save data
          const saveResult = saveToStorage(key, data);
          expect(saveResult).toBe(true);

          // Load data
          const loadedData = loadFromStorage<typeof data>(key);

          // Data should be equivalent
          expect(loadedData).toEqual(data);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('LocalStorage round-trip consistency - nested objects', () => {
    fc.assert(
      fc.property(
        fc.record({
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
        }),
        fc.string({ minLength: 1, maxLength: 50 }).filter(key => key !== '__proto__'), // storage key
        (data, key) => {
          // Save data
          const saveResult = saveToStorage(key, data);
          expect(saveResult).toBe(true);

          // Load data
          const loadedData = loadFromStorage<typeof data>(key);

          // Data should be equivalent
          expect(loadedData).toEqual(data);
        }
      ),
      { numRuns: 100 }
    );
  });
});
