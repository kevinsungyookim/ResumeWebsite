"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNavigationHTML = createNavigationHTML;
exports.initNavigation = initNavigation;
exports.attachNavigationListeners = attachNavigationListeners;
// Navigation system for the resume website
const types_1 = require("./types");
/**
 * Navigation configuration for all pages
 */
const navigationPages = [
    { id: types_1.PageId.About, label: 'About', href: 'index.html' },
    { id: types_1.PageId.Experience, label: 'Experience', href: 'experience.html' },
    { id: types_1.PageId.Projects, label: 'Projects', href: 'projects.html' },
    { id: types_1.PageId.Skills, label: 'Skills', href: 'skills.html' },
    { id: types_1.PageId.Contact, label: 'Contact', href: 'contact.html' },
];
/**
 * Generates navigation HTML markup
 * @param currentPage - The current page ID to highlight
 * @returns HTML string for navigation
 */
function createNavigationHTML(currentPage) {
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
function initNavigation(currentPage) {
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
function attachNavigationListeners() {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow default navigation behavior
            // Future enhancement: could add page transition animations here
        });
    });
}
//# sourceMappingURL=navigation.js.map