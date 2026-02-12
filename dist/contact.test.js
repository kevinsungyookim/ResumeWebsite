import { describe, it, expect } from 'vitest';
import { renderContactLinks } from './contact';
describe('Contact Page', () => {
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
});
//# sourceMappingURL=contact.test.js.map