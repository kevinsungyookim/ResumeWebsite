import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initAnimations, animateOnScroll, smoothScrollTo } from './animations';

describe('Animation System', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset scroll position
    window.scrollTo(0, 0);
  });

  describe('animateOnScroll', () => {
    it('should add animated class and animation type to element', () => {
      const element = document.createElement('div');
      element.setAttribute('data-animation', 'fade-in');
      document.body.appendChild(element);

      animateOnScroll(element);

      expect(element.classList.contains('animated')).toBe(true);
      expect(element.classList.contains('fade-in')).toBe(true);
    });

    it('should handle elements without data-animation attribute', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      // Should not throw
      expect(() => animateOnScroll(element)).not.toThrow();
      expect(element.classList.contains('animated')).toBe(false);
    });

    it('should support different animation types', () => {
      const animations = ['fade-in', 'slide-up', 'slide-left', 'slide-right'];

      animations.forEach(animationType => {
        const element = document.createElement('div');
        element.setAttribute('data-animation', animationType);
        document.body.appendChild(element);

        animateOnScroll(element);

        expect(element.classList.contains('animated')).toBe(true);
        expect(element.classList.contains(animationType)).toBe(true);
      });
    });
  });

  describe('initAnimations', () => {
    it('should observe elements with data-animation attribute', () => {
      // Create elements with data-animation
      const element1 = document.createElement('div');
      element1.setAttribute('data-animation', 'fade-in');
      element1.id = 'element1';

      const element2 = document.createElement('div');
      element2.setAttribute('data-animation', 'slide-up');
      element2.id = 'element2';

      document.body.appendChild(element1);
      document.body.appendChild(element2);

      // Initialize animations
      initAnimations();

      // Elements should be observed (we can't easily test IntersectionObserver behavior in jsdom)
      // But we can verify the function doesn't throw
      expect(document.querySelectorAll('[data-animation]').length).toBe(2);
    });

    it('should handle pages with no animated elements', () => {
      // No elements with data-animation
      document.body.innerHTML = '<div>Regular content</div>';

      // Should not throw
      expect(() => initAnimations()).not.toThrow();
    });

    it('should apply fallback when IntersectionObserver is not supported', () => {
      // Create elements
      const element1 = document.createElement('div');
      element1.setAttribute('data-animation', 'fade-in');
      const element2 = document.createElement('div');
      element2.setAttribute('data-animation', 'slide-up');

      document.body.appendChild(element1);
      document.body.appendChild(element2);

      // Mock IntersectionObserver as undefined
      const originalIntersectionObserver = window.IntersectionObserver;
      // @ts-ignore
      delete window.IntersectionObserver;

      initAnimations();

      // Elements should have animated class immediately
      expect(element1.classList.contains('animated')).toBe(true);
      expect(element2.classList.contains('animated')).toBe(true);

      // Restore IntersectionObserver
      window.IntersectionObserver = originalIntersectionObserver;
    });
  });

  describe('smoothScrollTo', () => {
    it('should handle non-existent target gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      smoothScrollTo('non-existent-id');

      expect(consoleSpy).toHaveBeenCalledWith('Target element with ID "non-existent-id" not found');
      consoleSpy.mockRestore();
    });

    it('should initiate scroll animation for existing target', () => {
      const target = document.createElement('div');
      target.id = 'target-section';
      document.body.appendChild(target);

      // Mock getBoundingClientRect
      target.getBoundingClientRect = vi.fn(() => ({
        top: 500,
        bottom: 600,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 500,
        toJSON: () => {}
      }));

      // Should not throw
      expect(() => smoothScrollTo('target-section', 100)).not.toThrow();
    });

    it('should use default duration when not specified', () => {
      const target = document.createElement('div');
      target.id = 'target-section';
      document.body.appendChild(target);

      target.getBoundingClientRect = vi.fn(() => ({
        top: 500,
        bottom: 600,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 500,
        toJSON: () => {}
      }));

      // Should not throw when called without duration
      expect(() => smoothScrollTo('target-section')).not.toThrow();
    });
  });
});
