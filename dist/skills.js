// Skills page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
/**
 * Sample skills data organized by category
 */
const skillsData = [
    {
        id: 'frontend',
        name: 'Frontend Development',
        skills: ['TypeScript', 'JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS']
    },
    {
        id: 'backend',
        name: 'Backend Development',
        skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'RESTful APIs', 'GraphQL']
    },
    {
        id: 'database',
        name: 'Databases',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB']
    },
    {
        id: 'tools',
        name: 'Tools & Technologies',
        skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Vitest', 'Webpack', 'Vite']
    }
];
/**
 * Renders a single skill category as HTML
 */
export function renderSkillCategory(category) {
    const skillsHTML = category.skills
        .map(skill => `<span class="skill-tag">${skill}</span>`)
        .join('');
    return `
        <div class="skill-category" data-animation="slide-up">
            <h3 class="category-name">${category.name}</h3>
            <div class="skills-list">
                ${skillsHTML}
            </div>
        </div>
    `;
}
/**
 * Renders all skill categories with visual distinction
 */
export function renderSkillsSection(categories) {
    return categories.map(category => renderSkillCategory(category)).join('\n');
}
/**
 * Initializes the Skills page
 */
function initSkillsPage() {
    // Initialize navigation
    initNavigation(PageId.Skills);
    // Render skill categories
    const container = document.getElementById('skills-container');
    if (container) {
        container.innerHTML = renderSkillsSection(skillsData);
    }
    // Initialize animations
    initAnimations();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsPage);
}
else {
    initSkillsPage();
}
//# sourceMappingURL=skills.js.map