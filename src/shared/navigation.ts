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
    const isDark = localStorage.getItem('theme') === 'dark';
    const icon = isDark ? '☀️' : '🌙';

    const navItems = navigationPages.map(page => {
        const isActive = page.id === currentPage;
        const activeClass = isActive ? ' class="active"' : '';
        return `<a href="${page.href}"${activeClass}>${page.label}</a>`;
    }).join('\n        ');

    return `
    <nav class="main-nav">
        ${navItems}
        <button class="theme-toggle" aria-label="Toggle dark mode">${icon}</button>
    </nav>`;
}

/**
 * Creates footer HTML
 */
export function createFooterHTML(): string {
    const year = new Date().getFullYear();
    return `
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-info">
                <h3>Kevin Kim</h3>
                <p>Software Engineer II | Amazon Prime Video</p>
            </div>
            <div class="footer-links">
                <a href="index.html">About</a>
                <a href="experience.html">Experience</a>
                <a href="projects.html">Projects</a>
                <a href="skills.html">Skills</a>
                <a href="contact.html">Contact</a>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; ${year} Kevin Kim. All rights reserved.
        </div>
    </footer>`;
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

    // Apply saved theme
    applyTheme();

    // Attach listeners
    attachNavigationListeners();
    initThemeToggle();
    initBackToTop();
    injectFooter();
}

/**
 * Attaches event listeners for smooth navigation transitions
 */
export function attachNavigationListeners(): void {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (_e) => {
            // Allow default navigation behavior
        });
    });
}

/**
 * Applies the saved theme from localStorage
 */
function applyTheme(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

/**
 * Initializes the dark mode toggle button
 */
function initThemeToggle(): void {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggle.textContent = '☀️';
        }
    });
}

/**
 * Creates and manages the back-to-top button
 */
function initBackToTop(): void {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Injects the footer at the end of the body
 */
function injectFooter(): void {
    // Don't inject if footer already exists
    if (document.querySelector('.site-footer')) return;

    const footer = document.createElement('div');
    footer.innerHTML = createFooterHTML();
    const footerElement = footer.firstElementChild;
    if (footerElement) {
        document.body.appendChild(footerElement);
    }
}
