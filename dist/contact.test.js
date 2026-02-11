"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const contact_1 = require("./contact");
(0, vitest_1.describe)('Contact Page', () => {
    (0, vitest_1.beforeEach)(() => {
        localStorage.clear();
    });
    (0, vitest_1.describe)('renderContactLinks', () => {
        (0, vitest_1.it)('should render multiple contact links', () => {
            const links = [
                {
                    platform: 'GitHub',
                    url: 'https://github.com/test',
                    icon: '🔗',
                    label: 'View GitHub'
                },
                {
                    platform: 'LinkedIn',
                    url: 'https://linkedin.com/in/test',
                    icon: '💼',
                    label: 'Connect on LinkedIn'
                }
            ];
            const html = (0, contact_1.renderContactLinks)(links);
            (0, vitest_1.expect)(html).toContain('GitHub');
            (0, vitest_1.expect)(html).toContain('LinkedIn');
            (0, vitest_1.expect)(html).toContain('https://github.com/test');
            (0, vitest_1.expect)(html).toContain('https://linkedin.com/in/test');
            (0, vitest_1.expect)(html).toContain('🔗');
            (0, vitest_1.expect)(html).toContain('💼');
        });
        (0, vitest_1.it)('should render single contact link', () => {
            const links = [
                {
                    platform: 'Email',
                    url: 'mailto:test@example.com',
                    icon: '📧',
                    label: 'Send Email'
                }
            ];
            const html = (0, contact_1.renderContactLinks)(links);
            (0, vitest_1.expect)(html).toContain('Email');
            (0, vitest_1.expect)(html).toContain('mailto:test@example.com');
            (0, vitest_1.expect)(html).toContain('📧');
        });
        (0, vitest_1.it)('should handle empty links array', () => {
            const links = [];
            const html = (0, contact_1.renderContactLinks)(links);
            (0, vitest_1.expect)(html).toBe('');
        });
    });
    (0, vitest_1.describe)('isValidEmail', () => {
        (0, vitest_1.it)('should validate correct email formats', () => {
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('test@example.com')).toBe(true);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('user.name@domain.co.uk')).toBe(true);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('user+tag@example.com')).toBe(true);
        });
        (0, vitest_1.it)('should reject invalid email formats', () => {
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('invalid')).toBe(false);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('invalid@')).toBe(false);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('@example.com')).toBe(false);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('invalid@domain')).toBe(false);
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('invalid @domain.com')).toBe(false);
        });
        (0, vitest_1.it)('should reject empty email', () => {
            (0, vitest_1.expect)((0, contact_1.isValidEmail)('')).toBe(false);
        });
    });
    (0, vitest_1.describe)('validateForm', () => {
        (0, vitest_1.it)('should return null for valid form data', () => {
            const error = (0, contact_1.validateForm)('John Doe', 'john@example.com', 'Hello world');
            (0, vitest_1.expect)(error).toBeNull();
        });
        (0, vitest_1.it)('should return error for empty name', () => {
            const error = (0, contact_1.validateForm)('', 'john@example.com', 'Hello');
            (0, vitest_1.expect)(error).toBe('Name is required');
        });
        (0, vitest_1.it)('should return error for whitespace-only name', () => {
            const error = (0, contact_1.validateForm)('   ', 'john@example.com', 'Hello');
            (0, vitest_1.expect)(error).toBe('Name is required');
        });
        (0, vitest_1.it)('should return error for empty email', () => {
            const error = (0, contact_1.validateForm)('John Doe', '', 'Hello');
            (0, vitest_1.expect)(error).toBe('Email is required');
        });
        (0, vitest_1.it)('should return error for invalid email format', () => {
            const error = (0, contact_1.validateForm)('John Doe', 'invalid-email', 'Hello');
            (0, vitest_1.expect)(error).toBe('Please enter a valid email address');
        });
        (0, vitest_1.it)('should return error for empty message', () => {
            const error = (0, contact_1.validateForm)('John Doe', 'john@example.com', '');
            (0, vitest_1.expect)(error).toBe('Message is required');
        });
        (0, vitest_1.it)('should return error for whitespace-only message', () => {
            const error = (0, contact_1.validateForm)('John Doe', 'john@example.com', '   ');
            (0, vitest_1.expect)(error).toBe('Message is required');
        });
    });
    (0, vitest_1.describe)('saveFormSubmission and loadFormSubmissions', () => {
        (0, vitest_1.it)('should save and load form submission', () => {
            const formData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Test message',
                timestamp: '2024-01-01T00:00:00.000Z'
            };
            const saved = (0, contact_1.saveFormSubmission)(formData);
            (0, vitest_1.expect)(saved).toBe(true);
            const submissions = (0, contact_1.loadFormSubmissions)();
            (0, vitest_1.expect)(submissions).toHaveLength(1);
            (0, vitest_1.expect)(submissions[0]).toEqual(formData);
        });
        (0, vitest_1.it)('should save multiple form submissions', () => {
            const formData1 = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'First message',
                timestamp: '2024-01-01T00:00:00.000Z'
            };
            const formData2 = {
                name: 'Jane Smith',
                email: 'jane@example.com',
                message: 'Second message',
                timestamp: '2024-01-02T00:00:00.000Z'
            };
            (0, contact_1.saveFormSubmission)(formData1);
            (0, contact_1.saveFormSubmission)(formData2);
            const submissions = (0, contact_1.loadFormSubmissions)();
            (0, vitest_1.expect)(submissions).toHaveLength(2);
            (0, vitest_1.expect)(submissions[0]).toEqual(formData1);
            (0, vitest_1.expect)(submissions[1]).toEqual(formData2);
        });
        (0, vitest_1.it)('should return empty array when no submissions exist', () => {
            const submissions = (0, contact_1.loadFormSubmissions)();
            (0, vitest_1.expect)(submissions).toEqual([]);
        });
        (0, vitest_1.it)('should handle corrupted localStorage data', () => {
            localStorage.setItem('contact-submissions', 'invalid-json');
            const submissions = (0, contact_1.loadFormSubmissions)();
            (0, vitest_1.expect)(submissions).toEqual([]);
        });
    });
});
//# sourceMappingURL=contact.test.js.map