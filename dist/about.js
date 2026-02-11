"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// About/Home page module
const types_1 = require("./shared/types");
const navigation_1 = require("./shared/navigation");
const animations_1 = require("./shared/animations");
const storage_1 = require("./shared/storage");
/**
 * Tracks page views using localStorage
 */
function trackPageView() {
    const viewCount = (0, storage_1.loadFromStorage)('about-page-views') || 0;
    const newCount = viewCount + 1;
    (0, storage_1.saveToStorage)('about-page-views', newCount);
    console.log(`About page viewed ${newCount} time(s)`);
}
/**
 * Initializes the About page
 */
function initAboutPage() {
    // Initialize navigation
    (0, navigation_1.initNavigation)(types_1.PageId.About);
    // Initialize animations
    (0, animations_1.initAnimations)();
    // Track page view
    trackPageView();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutPage);
}
else {
    initAboutPage();
}
//# sourceMappingURL=about.js.map