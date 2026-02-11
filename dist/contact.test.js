import { describe, it, expect, beforeEach } from 'vitest';
import { renderContactLinks, isValidEmail, validateForm, saveFormSubmission, loadFormSubmissions } from './contact';
describe('Contact Page', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    describe('renderContactLinks', () => {
        it('should render multiple contact links', () => {
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
            const html = renderContactLinks(links);
            expect(html).toContain('GitHub');
            expect(html).toContain('LinkedIn');
            expect(html).toContain('https://github.com/test');
            expect(html).toContain('https://linkedin.com/in/test');
            expect(html).toContain('🔗');
            expect(html).toContain('💼');
        });
        it('should render single contact link', () => {
            const links = [
                {
                    platform: 'Email',
                    url: 'mailto:test@example.com',
                    icon: '📧',
                    label: 'Send Email'
                }
            ];
            const html = renderContactLinks(links);
            expect(html).toContain('Email');
            expect(html).toContain('mailto:test@example.com');
            expect(html).toContain('📧');
        });
        it('should handle empty links array', () => {
            const links = [];
            const html = renderContactLinks(links);
            expect(html).toBe('');
        });
    });
    describe('isValidEmail', () => {
        it('should validate correct email formats', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('user+tag@example.com')).toBe(true);
        });
        it('should reject invalid email formats', () => {
            expect(isValidEmail('invalid')).toBe(false);
            expect(isValidEmail('invalid@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('invalid@domain')).toBe(false);
            expect(isValidEmail('invalid @domain.com')).toBe(false);
        });
        it('should reject empty email', () => {
            expect(isValidEmail('')).toBe(false);
        });
    });
    describe('validateForm', () => {
        it('should return null for valid form data', () => {
            const error = validateForm('John Doe', 'john@example.com', 'Hello world');
            expect(error).toBeNull();
        });
        it('should return error for empty name', () => {
            const error = validateForm('', 'john@example.com', 'Hello');
            expect(error).toBe('Name is required');
        });
        it('should return error for whitespace-only name', () => {
            const error = validateForm('   ', 'john@example.com', 'Hello');
            expect(error).toBe('Name is required');
        });
        it('should return error for empty email', () => {
            const error = validateForm('John Doe', '', 'Hello');
            expect(error).toBe('Email is required');
        });
        it('should return error for invalid email format', () => {
            const error = validateForm('John Doe', 'invalid-email', 'Hello');
            expect(error).toBe('Please enter a valid email address');
        });
        it('should return error for empty message', () => {
            const error = validateForm('John Doe', 'john@example.com', '');
            expect(error).toBe('Message is required');
        });
        it('should return error for whitespace-only message', () => {
            const error = validateForm('John Doe', 'john@example.com', '   ');
            expect(error).toBe('Message is required');
        });
    });
    describe('saveFormSubmission and loadFormSubmissions', () => {
        it('should save and load form submission', () => {
            const formData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Test message',
                timestamp: '2024-01-01T00:00:00.000Z'
            };
            const saved = saveFormSubmission(formData);
            expect(saved).toBe(true);
            const submissions = loadFormSubmissions();
            expect(submissions).toHaveLength(1);
            expect(submissions[0]).toEqual(formData);
        });
        it('should save multiple form submissions', () => {
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
            saveFormSubmission(formData1);
            saveFormSubmission(formData2);
            const submissions = loadFormSubmissions();
            expect(submissions).toHaveLength(2);
            expect(submissions[0]).toEqual(formData1);
            expect(submissions[1]).toEqual(formData2);
        });
        it('should return empty array when no submissions exist', () => {
            const submissions = loadFormSubmissions();
            expect(submissions).toEqual([]);
        });
        it('should handle corrupted localStorage data', () => {
            localStorage.setItem('contact-submissions', 'invalid-json');
            const submissions = loadFormSubmissions();
            expect(submissions).toEqual([]);
        });
    });
});
//# sourceMappingURL=contact.test.js.map