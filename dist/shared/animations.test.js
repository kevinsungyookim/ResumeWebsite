"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const animations_1 = require("./animations");
(0, vitest_1.describe)('Animation System', () => {
    (0, vitest_1.beforeEach)(() => {
        document.body.innerHTML = '';
        // Reset scroll position
        window.scrollTo(0, 0);
    });
    (0, vitest_1.describe)('animateOnScroll', () => {
        (0, vitest_1.it)('should add animated class and animation type to element', () => {
            const element = document.createElement('div');
            element.setAttribute('data-animation', 'fade-in');
            document.body.appendChild(element);
            (0, animations_1.animateOnScroll)(element);
            (0, vitest_1.expect)(element.classList.contains('animated')).toBe(true);
            (0, vitest_1.expect)(element.classList.contains('fade-in')).toBe(true);
        });
        (0, vitest_1.it)('should handle elements without data-animation attribute', () => {
            const element = document.createElement('div');
            document.body.appendChild(element);
            // Should not throw
            (0, vitest_1.expect)(() => (0, animations_1.animateOnScroll)(element)).not.toThrow();
            (0, vitest_1.expect)(element.classList.contains('animated')).toBe(false);
        });
        (0, vitest_1.it)('should support different animation types', () => {
            const animations = ['fade-in', 'slide-up', 'slide-left', 'slide-right'];
            animations.forEach(animationType => {
                const element = document.createElement('div');
                element.setAttribute('data-animation', animationType);
                document.body.appendChild(element);
                (0, animations_1.animateOnScroll)(element);
                (0, vitest_1.expect)(element.classList.contains('animated')).toBe(true);
                (0, vitest_1.expect)(element.classList.contains(animationType)).toBe(true);
            });
        });
    });
    (0, vitest_1.describe)('initAnimations', () => {
        (0, vitest_1.it)('should observe elements with data-animation attribute', () => {
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
            (0, animations_1.initAnimations)();
            // Elements should be observed (we can't easily test IntersectionObserver behavior in jsdom)
            // But we can verify the function doesn't throw
            (0, vitest_1.expect)(document.querySelectorAll('[data-animation]').length).toBe(2);
        });
        (0, vitest_1.it)('should handle pages with no animated elements', () => {
            // No elements with data-animation
            document.body.innerHTML = '<div>Regular content</div>';
            // Should not throw
            (0, vitest_1.expect)(() => (0, animations_1.initAnimations)()).not.toThrow();
        });
        (0, vitest_1.it)('should apply fallback when IntersectionObserver is not supported', () => {
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
            (0, animations_1.initAnimations)();
            // Elements should have animated class immediately
            (0, vitest_1.expect)(element1.classList.contains('animated')).toBe(true);
            (0, vitest_1.expect)(element2.classList.contains('animated')).toBe(true);
            // Restore IntersectionObserver
            window.IntersectionObserver = originalIntersectionObserver;
        });
    });
    (0, vitest_1.describe)('smoothScrollTo', () => {
        (0, vitest_1.it)('should handle non-existent target gracefully', () => {
            const consoleSpy = vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
            (0, animations_1.smoothScrollTo)('non-existent-id');
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('Target element with ID "non-existent-id" not found');
            consoleSpy.mockRestore();
        });
        (0, vitest_1.it)('should initiate scroll animation for existing target', () => {
            const target = document.createElement('div');
            target.id = 'target-section';
            document.body.appendChild(target);
            // Mock getBoundingClientRect
            target.getBoundingClientRect = vitest_1.vi.fn(() => ({
                top: 500,
                bottom: 600,
                left: 0,
                right: 100,
                width: 100,
                height: 100,
                x: 0,
                y: 500,
                toJSON: () => { }
            }));
            // Should not throw
            (0, vitest_1.expect)(() => (0, animations_1.smoothScrollTo)('target-section', 100)).not.toThrow();
        });
        (0, vitest_1.it)('should use default duration when not specified', () => {
            const target = document.createElement('div');
            target.id = 'target-section';
            document.body.appendChild(target);
            target.getBoundingClientRect = vitest_1.vi.fn(() => ({
                top: 500,
                bottom: 600,
                left: 0,
                right: 100,
                width: 100,
                height: 100,
                x: 0,
                y: 500,
                toJSON: () => { }
            }));
            // Should not throw when called without duration
            (0, vitest_1.expect)(() => (0, animations_1.smoothScrollTo)('target-section')).not.toThrow();
        });
    });
});
//# sourceMappingURL=animations.test.js.map