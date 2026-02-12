// Skills page module
import { PageId, SkillCategory } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';

/**
 * Sample skills data organized by category
 */
const skillsData: SkillCategory[] = [
    {
        id: 'core',
        name: 'Core Competencies',
        skills: ['Software Development', 'Cloud Computing (AWS)', 'Distributed Systems', 'CI/CD']
    },
    {
        id: 'languages',
        name: 'Programming Languages',
        skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'HTML', 'CSS']
    },
    {
        id: 'cloud',
        name: 'Cloud & DevOps',
        skills: ['AWS Lambda', 'AWS IoT Analytics', 'AWS SageMaker', 'Docker', 'CI/CD Pipelines']
    },
    {
        id: 'ml',
        name: 'Machine Learning & Data',
        skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Deep Learning', 'CNN', 'Data Processing']
    }
];

/**
 * Renders a single skill category as HTML
 */
export function renderSkillCategory(category: SkillCategory): string {
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
export function renderSkillsSection(categories: SkillCategory[]): string {
    return categories.map(category => renderSkillCategory(category)).join('\n');
}

/**
 * Initializes the Skills page
 */
function initSkillsPage(): void {
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
} else {
    initSkillsPage();
}
