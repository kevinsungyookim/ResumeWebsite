/**
 * Helper function for type-safe DOM element selection
 * @param id - The ID of the element to find
 * @returns The element with proper typing
 */
function getCounterElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element as T;
}

/**
 * Sets up the counter functionality
 */
function setupCounter(): void {
    let count = 0;
    const counterButton = getCounterElement<HTMLButtonElement>('counterButton');
    
    counterButton.addEventListener('click', () => {
        count++;
        counterButton.textContent = `Click Count: ${count}`;
    });
}

/**
 * Initialize the counter page
 */
function initCounter(): void {
    setupCounter();
    console.log('Counter page initialized!');
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounter);
} else {
    initCounter();
}
