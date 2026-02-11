import { describe, it, expect, beforeEach } from 'vitest';
import { isStorageAvailable, saveToStorage, loadFromStorage, clearStorage } from './storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true);
    });

    it('should return false when localStorage is unavailable', () => {
      // Save original localStorage
      const originalLocalStorage = global.localStorage;
      
      // Replace with a mock that throws
      Object.defineProperty(global, 'localStorage', {
        value: {
          setItem: () => {
            throw new Error('localStorage not available');
          },
          getItem: () => null,
          removeItem: () => {},
          clear: () => {},
        },
        writable: true,
        configurable: true,
      });

      expect(isStorageAvailable()).toBe(false);

      // Restore original localStorage
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('saveToStorage', () => {
    it('should save data successfully', () => {
      const testData = { name: 'John', age: 30 };
      const result = saveToStorage('test-key', testData);

      expect(result).toBe(true);
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify(testData));
    });

    it('should handle quota exceeded error', () => {
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
          removeItem: () => {},
          clear: () => {},
        },
        writable: true,
        configurable: true,
      });

      const result = saveToStorage('test-key', { data: 'value' });

      expect(result).toBe(false);

      // Restore original localStorage
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
    });

    it('should return false when localStorage is unavailable', () => {
      // Save original localStorage
      const originalLocalStorage = global.localStorage;
      
      // Replace with a mock that throws
      Object.defineProperty(global, 'localStorage', {
        value: {
          setItem: () => {
            throw new Error('localStorage not available');
          },
          getItem: () => null,
          removeItem: () => {},
          clear: () => {},
        },
        writable: true,
        configurable: true,
      });

      const result = saveToStorage('test-key', { data: 'value' });

      expect(result).toBe(false);

      // Restore original localStorage
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('loadFromStorage', () => {
    it('should load data successfully', () => {
      const testData = { name: 'Jane', age: 25 };
      localStorage.setItem('test-key', JSON.stringify(testData));

      const result = loadFromStorage<typeof testData>('test-key');

      expect(result).toEqual(testData);
    });

    it('should return null when key does not exist', () => {
      const result = loadFromStorage('non-existent-key');

      expect(result).toBeNull();
    });

    it('should handle malformed JSON and clear corrupted data', () => {
      // Set malformed JSON
      localStorage.setItem('test-key', 'invalid-json{');

      const result = loadFromStorage('test-key');

      expect(result).toBeNull();
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should return null when localStorage is unavailable', () => {
      // Save original localStorage
      const originalLocalStorage = global.localStorage;
      
      // Replace with a mock that throws
      Object.defineProperty(global, 'localStorage', {
        value: {
          setItem: () => {},
          getItem: () => {
            throw new Error('localStorage not available');
          },
          removeItem: () => {},
          clear: () => {},
        },
        writable: true,
        configurable: true,
      });

      const result = loadFromStorage('test-key');

      expect(result).toBeNull();

      // Restore original localStorage
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('clearStorage', () => {
    it('should clear specific key from storage', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');

      clearStorage('test-key');

      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should handle errors gracefully', () => {
      // Save original localStorage
      const originalLocalStorage = global.localStorage;
      
      // Replace with a mock that throws
      Object.defineProperty(global, 'localStorage', {
        value: {
          setItem: () => {},
          getItem: () => null,
          removeItem: () => {
            throw new Error('localStorage error');
          },
          clear: () => {},
        },
        writable: true,
        configurable: true,
      });

      // Should not throw
      expect(() => clearStorage('test-key')).not.toThrow();

      // Restore original localStorage
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true,
        configurable: true,
      });
    });
  });
});
