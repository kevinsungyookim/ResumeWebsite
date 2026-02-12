// Contact page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
/**
 * Contact links data
 */
const contactLinks = [
    {
        platform: 'Email',
        url: 'mailto:kevinsykim.code@gmail.com',
        icon: '📧',
        label: 'kevinsykim.code@gmail.com'
    },
    {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/kevin-sung-yoo-kim',
        icon: '💼',
        label: 'Connect on LinkedIn'
    },
    {
        platform: 'GitHub',
        url: 'https://github.com/kevinsungyookim',
        icon: '🔗',
        label: 'View GitHub Profile'
    }
];
/**
 * Renders contact links as HTML
 */
export function renderContactLinks(links) {
    return links.map(link => `
        <a href="${link.url}" class="contact-link" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
            <span class="contact-icon">${link.icon}</span>
            <span class="contact-platform">${link.platform}</span>
        </a>
    `).join('\n');
}
/**
 * Initializes the Contact page
 */
function initContactPage() {
    // Initialize navigation
    initNavigation(PageId.Contact);
    // Render contact links
    const linksContainer = document.getElementById('contact-links-container');
    if (linksContainer) {
        linksContainer.innerHTML = renderContactLinks(contactLinks);
    }
    // Initialize animations
    initAnimations();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
}
else {
    initContactPage();
}
//# sourceMappingURL=contact.js.map