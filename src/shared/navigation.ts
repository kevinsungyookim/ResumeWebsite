// Navigation system for the resume website
import { PageId } from './types.js';

/**
 * Navigation configuration for all pages
 */
const navigationPages = [
    { id: PageId.About, label: 'About', href: 'index.html' },
    { id: PageId.Experience, label: 'Experience', href: 'experience.html' },
    { id: PageId.Projects, label: 'Projects', href: 'projects.html' },
    { id: PageId.Skills, label: 'Skills', href: 'skills.html' },
    { id: PageId.Contact, label: 'Contact', href: 'contact.html' },
];

/**
 * Generates navigation HTML markup
 * @param currentPage - The current page ID to highlight
 * @returns HTML string for navigation
 */
export function createNavigationHTML(currentPage: PageId): string {
    const navItems = navigationPages.map(page => {
        const isActive = page.id === currentPage;
        const activeClass = isActive ? ' class="active"' : '';
        return `<a href="${page.href}"${activeClass}>${page.label}</a>`;
    }).join('\n        ');

    return `
    <nav class="main-nav">
        ${navItems}
    </nav>`;
}

/**
 * Initializes navigation on the current page
 * @param currentPage - The current page ID
 */
export function initNavigation(currentPage: PageId): void {
    const navContainer = document.getElementById('nav-container');
    
    if (!navContainer) {
        console.error('Navigation container not found');
        return;
    }

    // Insert navigation HTML
    navContainer.innerHTML = createNavigationHTML(currentPage);

    // Attach smooth transition listeners
    attachNavigationListeners();
}

/**
 * Attaches event listeners for smooth navigation transitions
 */
export function attachNavigationListeners(): void {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow default navigation behavior
            // Future enhancement: could add page transition animations here
        });
    });
}
