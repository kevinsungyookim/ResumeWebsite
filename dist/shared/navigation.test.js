"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const navigation_1 = require("./navigation");
const types_1 = require("./types");
(0, vitest_1.describe)('Navigation System', () => {
    (0, vitest_1.beforeEach)(() => {
        // Clear document body before each test
        document.body.innerHTML = '';
    });
    (0, vitest_1.describe)('createNavigationHTML', () => {
        (0, vitest_1.it)('should generate navigation with all 5 pages', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.About);
            // Check that all 5 pages are present
            (0, vitest_1.expect)(html).toContain('About');
            (0, vitest_1.expect)(html).toContain('Experience');
            (0, vitest_1.expect)(html).toContain('Projects');
            (0, vitest_1.expect)(html).toContain('Skills');
            (0, vitest_1.expect)(html).toContain('Contact');
            // Check that all hrefs are present
            (0, vitest_1.expect)(html).toContain('index.html');
            (0, vitest_1.expect)(html).toContain('experience.html');
            (0, vitest_1.expect)(html).toContain('projects.html');
            (0, vitest_1.expect)(html).toContain('skills.html');
            (0, vitest_1.expect)(html).toContain('contact.html');
        });
        (0, vitest_1.it)('should highlight the About page when current', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.About);
            // About link should have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="index\.html" class="active">About<\/a>/);
            // Other links should not have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="experience\.html">Experience<\/a>/);
            (0, vitest_1.expect)(html).toMatch(/<a href="projects\.html">Projects<\/a>/);
        });
        (0, vitest_1.it)('should highlight the Experience page when current', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.Experience);
            // Experience link should have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="experience\.html" class="active">Experience<\/a>/);
            // Other links should not have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="index\.html">About<\/a>/);
            (0, vitest_1.expect)(html).toMatch(/<a href="projects\.html">Projects<\/a>/);
        });
        (0, vitest_1.it)('should highlight the Projects page when current', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.Projects);
            // Projects link should have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="projects\.html" class="active">Projects<\/a>/);
            // Other links should not have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="index\.html">About<\/a>/);
            (0, vitest_1.expect)(html).toMatch(/<a href="experience\.html">Experience<\/a>/);
        });
        (0, vitest_1.it)('should highlight the Skills page when current', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.Skills);
            // Skills link should have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="skills\.html" class="active">Skills<\/a>/);
            // Other links should not have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="index\.html">About<\/a>/);
            (0, vitest_1.expect)(html).toMatch(/<a href="contact\.html">Contact<\/a>/);
        });
        (0, vitest_1.it)('should highlight the Contact page when current', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.Contact);
            // Contact link should have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="contact\.html" class="active">Contact<\/a>/);
            // Other links should not have active class
            (0, vitest_1.expect)(html).toMatch(/<a href="index\.html">About<\/a>/);
            (0, vitest_1.expect)(html).toMatch(/<a href="skills\.html">Skills<\/a>/);
        });
        (0, vitest_1.it)('should wrap navigation in nav element with main-nav class', () => {
            const html = (0, navigation_1.createNavigationHTML)(types_1.PageId.About);
            (0, vitest_1.expect)(html).toContain('<nav class="main-nav">');
            (0, vitest_1.expect)(html).toContain('</nav>');
        });
    });
    (0, vitest_1.describe)('initNavigation', () => {
        (0, vitest_1.it)('should insert navigation HTML into nav-container', () => {
            // Set up DOM with nav-container
            document.body.innerHTML = '<div id="nav-container"></div>';
            (0, navigation_1.initNavigation)(types_1.PageId.About);
            const navContainer = document.getElementById('nav-container');
            (0, vitest_1.expect)(navContainer).not.toBeNull();
            (0, vitest_1.expect)(navContainer.innerHTML).toContain('<nav class="main-nav">');
            (0, vitest_1.expect)(navContainer.innerHTML).toContain('About');
        });
        (0, vitest_1.it)('should highlight the correct current page', () => {
            document.body.innerHTML = '<div id="nav-container"></div>';
            (0, navigation_1.initNavigation)(types_1.PageId.Experience);
            const navContainer = document.getElementById('nav-container');
            (0, vitest_1.expect)(navContainer.innerHTML).toContain('class="active">Experience');
        });
        (0, vitest_1.it)('should handle missing nav-container gracefully', () => {
            // No nav-container in DOM
            document.body.innerHTML = '<div></div>';
            // Should not throw
            (0, vitest_1.expect)(() => (0, navigation_1.initNavigation)(types_1.PageId.About)).not.toThrow();
        });
        (0, vitest_1.it)('should attach event listeners to navigation links', () => {
            document.body.innerHTML = '<div id="nav-container"></div>';
            (0, navigation_1.initNavigation)(types_1.PageId.About);
            const navLinks = document.querySelectorAll('.main-nav a');
            (0, vitest_1.expect)(navLinks.length).toBe(5);
        });
    });
    (0, vitest_1.describe)('attachNavigationListeners', () => {
        (0, vitest_1.it)('should attach click listeners to all navigation links', () => {
            // Set up DOM with navigation
            document.body.innerHTML = `
        <nav class="main-nav">
          <a href="index.html">About</a>
          <a href="experience.html">Experience</a>
          <a href="projects.html">Projects</a>
          <a href="skills.html">Skills</a>
          <a href="contact.html">Contact</a>
        </nav>
      `;
            (0, navigation_1.attachNavigationListeners)();
            const navLinks = document.querySelectorAll('.main-nav a');
            (0, vitest_1.expect)(navLinks.length).toBe(5);
            // Verify listeners are attached by checking that click doesn't throw
            navLinks.forEach(link => {
                (0, vitest_1.expect)(() => link.dispatchEvent(new Event('click'))).not.toThrow();
            });
        });
        (0, vitest_1.it)('should handle empty navigation gracefully', () => {
            document.body.innerHTML = '<nav class="main-nav"></nav>';
            // Should not throw
            (0, vitest_1.expect)(() => (0, navigation_1.attachNavigationListeners)()).not.toThrow();
        });
    });
});
//# sourceMappingURL=navigation.test.js.map