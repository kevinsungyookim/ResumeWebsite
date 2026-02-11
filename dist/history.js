"use strict";
/**
 * Helper function for type-safe DOM element selection
 * @param id - The ID of the element to find
 * @returns The element with proper typing
 */
function getHistoryElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}
/**
 * Loads and displays the greeting history from localStorage
 */
function displayHistory() {
    const historyList = getHistoryElement('historyList');
    // Get history from localStorage
    const historyJson = localStorage.getItem('greetingHistory');
    const history = historyJson ? JSON.parse(historyJson) : [];
    // Display history
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No greetings yet! Visit the <a href="/">Greeting page</a> to add some.</p>';
    }
    else {
        const listHtml = history.map((entry, index) => `<div class="history-item">
                <span class="history-number">${index + 1}.</span>
                <span class="history-name">${entry}</span>
            </div>`).join('');
        historyList.innerHTML = `<div class="history-list">${listHtml}</div>`;
    }
}
/**
 * Clears all greeting history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all greeting history?')) {
        localStorage.removeItem('greetingHistory');
        displayHistory(); // Refresh the display
    }
}
/**
 * Sets up the history page functionality
 */
function setupHistory() {
    displayHistory();
    const clearButton = getHistoryElement('clearHistoryButton');
    clearButton.addEventListener('click', clearHistory);
}
/**
 * Initialize the history page
 */
function initHistory() {
    setupHistory();
    console.log('History page initialized!');
}
/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistory);
}
else {
    initHistory();
}
//# sourceMappingURL=history.js.map