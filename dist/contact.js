// Contact page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
import { saveToStorage } from './shared/storage.js';
/**
 * Contact links data
 */
const contactLinks = [
    {
        platform: 'GitHub',
        url: 'https://github.com/username',
        icon: '🔗',
        label: 'View GitHub Profile'
    },
    {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/username',
        icon: '💼',
        label: 'Connect on LinkedIn'
    },
    {
        platform: 'Email',
        url: 'mailto:email@example.com',
        icon: '📧',
        label: 'Send Email'
    }
];
/**
 * Renders contact links as HTML
 */
export function renderContactLinks(links) {
    return links.map(link => `
        <a href="${link.url}" class="contact-link" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
            <span class="contact-icon">${link.icon}</span>
            <span class="contact-platform">${link.platform}</span>
        </a>
    `).join('\n');
}
/**
 * Validates email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Validates form data
 */
export function validateForm(name, email, message) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (!email.trim()) {
        return 'Email is required';
    }
    if (!isValidEmail(email)) {
        return 'Please enter a valid email address';
    }
    if (!message.trim()) {
        return 'Message is required';
    }
    return null;
}
/**
 * Saves form submission to localStorage
 */
export function saveFormSubmission(formData) {
    const submissions = loadFormSubmissions();
    submissions.push(formData);
    return saveToStorage('contact-submissions', submissions);
}
/**
 * Loads all form submissions from localStorage
 */
export function loadFormSubmissions() {
    const stored = localStorage.getItem('contact-submissions');
    if (!stored)
        return [];
    try {
        return JSON.parse(stored);
    }
    catch (_a) {
        return [];
    }
}
/**
 * Handles form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.elements.namedItem('name');
    const emailInput = form.elements.namedItem('email');
    const messageInput = form.elements.namedItem('message');
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    // Validate form
    const validationError = validateForm(name, email, message);
    if (validationError) {
        showMessage(validationError, 'error');
        return;
    }
    // Create form data
    const formData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
    };
    // Save to localStorage
    const saved = saveFormSubmission(formData);
    if (saved) {
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
    }
    else {
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    }
}
/**
 * Displays a message to the user
 */
function showMessage(text, type) {
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}
/**
 * Initializes the Contact page
 */
function initContactPage() {
    // Initialize navigation
    initNavigation(PageId.Contact);
    // Render contact links
    const linksContainer = document.getElementById('contact-links-container');
    if (linksContainer) {
        linksContainer.innerHTML = renderContactLinks(contactLinks);
    }
    // Set up form submission handler
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    // Initialize animations
    initAnimations();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
}
else {
    initContactPage();
}
//# sourceMappingURL=contact.js.map