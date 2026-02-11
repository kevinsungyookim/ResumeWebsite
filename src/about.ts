// About/Home page module
import { PageId } from './shared/types';
import { initNavigation } from './shared/navigation';
import { initAnimations } from './shared/animations';
import { saveToStorage, loadFromStorage } from './shared/storage';

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
