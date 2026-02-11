/**
 * Helper function for type-safe DOM element selection
 * @param id - The ID of the element to find
 * @returns The element with proper typing
 */
function getHistoryElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element as T;
}

/**
 * Loads and displays the greeting history from localStorage
 */
function displayHistory(): void {
    const historyList = getHistoryElement<HTMLDivElement>('historyList');
    
    // Get history from localStorage
    const historyJson = localStorage.getItem('greetingHistory');
    const history: string[] = historyJson ? JSON.parse(historyJson) : [];
    
    // Display history
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No greetings yet! Visit the <a href="/">Greeting page</a> to add some.</p>';
    } else {
        const listHtml = history.map((entry, index) => 
            `<div class="history-item">
                <span class="history-number">${index + 1}.</span>
                <span class="history-name">${entry}</span>
            </div>`
        ).join('');
        
        historyList.innerHTML = `<div class="history-list">${listHtml}</div>`;
    }
}

/**
 * Clears all greeting history
 */
function clearHistory(): void {
    if (confirm('Are you sure you want to clear all greeting history?')) {
        localStorage.removeItem('greetingHistory');
        displayHistory(); // Refresh the display
    }
}

/**
 * Sets up the history page functionality
 */
function setupHistory(): void {
    displayHistory();
    
    const clearButton = getHistoryElement<HTMLButtonElement>('clearHistoryButton');
    clearButton.addEventListener('click', clearHistory);
}

/**
 * Initialize the history page
 */
function initHistory(): void {
    setupHistory();
    console.log('History page initialized!');
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistory);
} else {
    initHistory();
}
