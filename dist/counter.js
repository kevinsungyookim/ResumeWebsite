"use strict";
/**
 * Helper function for type-safe DOM element selection
 * @param id - The ID of the element to find
 * @returns The element with proper typing
 */
function getCounterElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}
/**
 * Sets up the counter functionality
 */
function setupCounter() {
    let count = 0;
    const counterButton = getCounterElement('counterButton');
    counterButton.addEventListener('click', () => {
        count++;
        counterButton.textContent = `Click Count: ${count}`;
    });
}
/**
 * Initialize the counter page
 */
function initCounter() {
    setupCounter();
    console.log('Counter page initialized!');
}
/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounter);
}
else {
    initCounter();
}
//# sourceMappingURL=counter.js.map