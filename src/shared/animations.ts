// Animation system for the resume website

/**
 * Initializes entrance animations using Intersection Observer
 * Applies animation classes when elements enter the viewport
 */
export function initAnimations(): void {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: immediately show all animated elements
        const animatedElements = document.querySelectorAll('[data-animation]');
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
        return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateOnScroll(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe all elements with data-animation attribute
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Applies entrance animation classes to an element
 * @param element - The HTML element to animate
 */
export function animateOnScroll(element: HTMLElement): void {
    const animationType = element.getAttribute('data-animation');
    
    if (animationType) {
        element.classList.add('animated', animationType);
    }
}

/**
 * Smoothly scrolls to a target element
 * @param targetId - The ID of the target element
 * @param duration - Duration of the scroll animation in milliseconds (default: 800)
 */
export function smoothScrollTo(targetId: string, duration: number = 800): void {
    const target = document.getElementById(targetId);
    
    if (!target) {
        console.warn(`Target element with ID "${targetId}" not found`);
        return;
    }

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
        if (startTime === null) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
