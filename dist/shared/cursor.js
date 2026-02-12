// Cursor effects module
export function initCursorEffects() {
    // Create cursor spotlight element
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.appendChild(spotlight);
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        // Update spotlight position
        spotlight.style.left = `${mouseX}px`;
        spotlight.style.top = `${mouseY}px`;
    });
    // Hide spotlight when leaving window
    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
    });
}
//# sourceMappingURL=cursor.js.map