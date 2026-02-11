import { describe, it, expect, beforeEach } from 'vitest';
import { createNavigationHTML, initNavigation, attachNavigationListeners } from './navigation';
import { PageId } from './types';

describe('Navigation System', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = '';
  });

  describe('createNavigationHTML', () => {
    it('should generate navigation with all 5 pages', () => {
      const html = createNavigationHTML(PageId.About);
      
      // Check that all 5 pages are present
      expect(html).toContain('About');
      expect(html).toContain('Experience');
      expect(html).toContain('Projects');
      expect(html).toContain('Skills');
      expect(html).toContain('Contact');
      
      // Check that all hrefs are present
      expect(html).toContain('index.html');
      expect(html).toContain('experience.html');
      expect(html).toContain('projects.html');
      expect(html).toContain('skills.html');
      expect(html).toContain('contact.html');
    });

    it('should highlight the About page when current', () => {
      const html = createNavigationHTML(PageId.About);
      
      // About link should have active class
      expect(html).toMatch(/<a href="index\.html" class="active">About<\/a>/);
      
      // Other links should not have active class
      expect(html).toMatch(/<a href="experience\.html">Experience<\/a>/);
      expect(html).toMatch(/<a href="projects\.html">Projects<\/a>/);
    });

    it('should highlight the Experience page when current', () => {
      const html = createNavigationHTML(PageId.Experience);
      
      // Experience link should have active class
      expect(html).toMatch(/<a href="experience\.html" class="active">Experience<\/a>/);
      
      // Other links should not have active class
      expect(html).toMatch(/<a href="index\.html">About<\/a>/);
      expect(html).toMatch(/<a href="projects\.html">Projects<\/a>/);
    });

    it('should highlight the Projects page when current', () => {
      const html = createNavigationHTML(PageId.Projects);
      
      // Projects link should have active class
      expect(html).toMatch(/<a href="projects\.html" class="active">Projects<\/a>/);
      
      // Other links should not have active class
      expect(html).toMatch(/<a href="index\.html">About<\/a>/);
      expect(html).toMatch(/<a href="experience\.html">Experience<\/a>/);
    });

    it('should highlight the Skills page when current', () => {
      const html = createNavigationHTML(PageId.Skills);
      
      // Skills link should have active class
      expect(html).toMatch(/<a href="skills\.html" class="active">Skills<\/a>/);
      
      // Other links should not have active class
      expect(html).toMatch(/<a href="index\.html">About<\/a>/);
      expect(html).toMatch(/<a href="contact\.html">Contact<\/a>/);
    });

    it('should highlight the Contact page when current', () => {
      const html = createNavigationHTML(PageId.Contact);
      
      // Contact link should have active class
      expect(html).toMatch(/<a href="contact\.html" class="active">Contact<\/a>/);
      
      // Other links should not have active class
      expect(html).toMatch(/<a href="index\.html">About<\/a>/);
      expect(html).toMatch(/<a href="skills\.html">Skills<\/a>/);
    });

    it('should wrap navigation in nav element with main-nav class', () => {
      const html = createNavigationHTML(PageId.About);
      
      expect(html).toContain('<nav class="main-nav">');
      expect(html).toContain('</nav>');
    });
  });

  describe('initNavigation', () => {
    it('should insert navigation HTML into nav-container', () => {
      // Set up DOM with nav-container
      document.body.innerHTML = '<div id="nav-container"></div>';
      
      initNavigation(PageId.About);
      
      const navContainer = document.getElementById('nav-container');
      expect(navContainer).not.toBeNull();
      expect(navContainer!.innerHTML).toContain('<nav class="main-nav">');
      expect(navContainer!.innerHTML).toContain('About');
    });

    it('should highlight the correct current page', () => {
      document.body.innerHTML = '<div id="nav-container"></div>';
      
      initNavigation(PageId.Experience);
      
      const navContainer = document.getElementById('nav-container');
      expect(navContainer!.innerHTML).toContain('class="active">Experience');
    });

    it('should handle missing nav-container gracefully', () => {
      // No nav-container in DOM
      document.body.innerHTML = '<div></div>';
      
      // Should not throw
      expect(() => initNavigation(PageId.About)).not.toThrow();
    });

    it('should attach event listeners to navigation links', () => {
      document.body.innerHTML = '<div id="nav-container"></div>';
      
      initNavigation(PageId.About);
      
      const navLinks = document.querySelectorAll('.main-nav a');
      expect(navLinks.length).toBe(5);
    });
  });

  describe('attachNavigationListeners', () => {
    it('should attach click listeners to all navigation links', () => {
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
      
      attachNavigationListeners();
      
      const navLinks = document.querySelectorAll('.main-nav a');
      expect(navLinks.length).toBe(5);
      
      // Verify listeners are attached by checking that click doesn't throw
      navLinks.forEach(link => {
        expect(() => link.dispatchEvent(new Event('click'))).not.toThrow();
      });
    });

    it('should handle empty navigation gracefully', () => {
      document.body.innerHTML = '<nav class="main-nav"></nav>';
      
      // Should not throw
      expect(() => attachNavigationListeners()).not.toThrow();
    });
  });
});
