// About/Home page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
import { saveToStorage, loadFromStorage } from './shared/storage.js';

/**
 * Tracks page views using localStorage
 */
function trackPageView(): void {
    const viewCount = loadFromStorage<number>('about-page-views') || 0;
    const newCount = viewCount + 1;
    
    saveToStorage('about-page-views', newCount);
    
    console.log(`About page viewed ${newCount} time(s)`);
}

/**
 * Initializes the About page
 */
function initAboutPage(): void {
    // Initialize navigation
    initNavigation(PageId.About);
    
    // Initialize animations
    initAnimations();
    
    // Track page view
    trackPageView();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
    initAboutPage();
}
