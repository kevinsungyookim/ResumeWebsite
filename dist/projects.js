// Projects page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
/**
 * Sample projects data
 */
const projectsData = [
    {
        id: 'proj-1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and order tracking. Built with modern web technologies for optimal performance.',
        technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
        liveUrl: 'https://example-ecommerce.com',
        repoUrl: 'https://github.com/example/ecommerce',
        imageUrl: '/images/ecommerce-project.jpg'
    },
    {
        id: 'proj-2',
        title: 'Task Management System',
        description: 'Collaborative task management application with real-time updates, team collaboration features, and advanced filtering capabilities.',
        technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
        liveUrl: 'https://example-tasks.com',
        repoUrl: 'https://github.com/example/task-manager'
    },
    {
        id: 'proj-3',
        title: 'Analytics Dashboard',
        description: 'Data visualization dashboard for business intelligence with interactive charts, custom reports, and export functionality.',
        technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Docker'],
        repoUrl: 'https://github.com/example/analytics-dashboard'
    }
];
/**
 * Renders a single project card as HTML
 */
export function renderProjectCard(project) {
    const technologiesHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    const linksHTML = [];
    if (project.liveUrl) {
        linksHTML.push(`<a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer">View Live</a>`);
    }
    if (project.repoUrl) {
        linksHTML.push(`<a href="${project.repoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">View Code</a>`);
    }
    const linksSection = linksHTML.length > 0
        ? `<div class="project-links">${linksHTML.join('')}</div>`
        : '';
    const imageHTML = project.imageUrl
        ? `<div class="project-image">
            <img src="${project.imageUrl}" alt="${project.title}" />
           </div>`
        : '';
    return `
        <article class="project-card" data-animation="slide-up">
            ${imageHTML}
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${technologiesHTML}
                </div>
                ${linksSection}
            </div>
        </article>
    `;
}
/**
 * Renders all project cards
 */
export function renderProjectsSection(projects) {
    return projects.map(project => renderProjectCard(project)).join('\n');
}
/**
 * Initializes the Projects page
 */
function initProjectsPage() {
    // Initialize navigation
    initNavigation(PageId.Projects);
    // Render project cards
    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = renderProjectsSection(projectsData);
    }
    // Initialize animations
    initAnimations();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsPage);
}
else {
    initProjectsPage();
}
//# sourceMappingURL=projects.js.map