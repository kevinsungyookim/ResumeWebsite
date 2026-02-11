// Type definitions
interface GreetingConfig {
    name: string;
    prefix: string;
}

/**
 * Helper function for type-safe DOM element selection
 * @param id - The ID of the element to find
 * @returns The element with proper typing
 */
function getGreetingElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element as T;
}

/**
 * Creates a greeting message using the provided configuration
 * @param config - Configuration object with name and prefix
 * @returns A formatted greeting string
 */
function createGreeting(config: GreetingConfig): string {
    return config.name 
        ? `${config.prefix}, ${config.name}!` 
        : 'Please enter your name';
}

/**
 * Saves a name to the greeting history in localStorage
 * @param name - The name to save
 */
function saveToHistory(name: string): void {
    if (!name) return;
    
    // Get existing history from localStorage
    const historyJson = localStorage.getItem('greetingHistory');
    const history: string[] = historyJson ? JSON.parse(historyJson) : [];
    
    // Add new name with timestamp
    const entry = `${name} (${new Date().toLocaleString()})`;
    history.unshift(entry); // Add to beginning of array
    
    // Keep only last 50 entries
    if (history.length > 50) {
        history.pop();
    }
    
    // Save back to localStorage
    localStorage.setItem('greetingHistory', JSON.stringify(history));
}

/**
 * Handles the greeting action (called by both button click and Enter key)
 */
function handleGreeting(nameInput: HTMLInputElement, greetingDisplay: HTMLParagraphElement): void {
    const name = nameInput.value.trim();
    const greeting = createGreeting({ name, prefix: 'Hello' });
    greetingDisplay.textContent = greeting;
    
    // Save to history if name was provided
    if (name) {
        saveToHistory(name);
    }
}

/**
 * Sets up the greeting functionality with event listeners
 */
function setupGreeting(): void {
    const nameInput = getGreetingElement<HTMLInputElement>('nameInput');
    const greetButton = getGreetingElement<HTMLButtonElement>('greetButton');
    const greetingDisplay = getGreetingElement<HTMLParagraphElement>('greeting');
    
    // Handle button click
    greetButton.addEventListener('click', () => {
        handleGreeting(nameInput, greetingDisplay);
    });
    
    // Handle Enter key press
    nameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleGreeting(nameInput, greetingDisplay);
        }
    });
}

/**
 * Initialize the greeting page
 */
function initGreeting(): void {
    setupGreeting();
    console.log('Greeting page initialized!');
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGreeting);
} else {
    initGreeting();
}
