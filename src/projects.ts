// Projects page module
import { PageId, ProjectEntry } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';

/**
 * Sample projects data
 */
const projectsData: ProjectEntry[] = [
    {
        id: 'proj-1',
        title: 'Deep PPG for Better Heart Rate Estimation',
        description: 'Created a CNN architecture to process photoplethysmography (PPG) data for accurate heart rate estimation. Tested various parameters including activation functions, optimizers, and filter sizes to achieve low mean absolute error (MAE).',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'CNN'],
        repoUrl: 'https://github.com/kevinsungyookim/Deep-PPG'
    },
    {
        id: 'proj-2',
        title: 'Cloud Infrastructure to Predict Abnormal Heartbeats',
        description: 'Deployed machine learning inference model using AWS Lambda with visualization of output through AWS IoT Analytics. Built end-to-end cloud infrastructure for real-time heartbeat anomaly detection.',
        technologies: ['AWS Lambda', 'AWS IoT Analytics', 'AWS SageMaker', 'Python', 'Machine Learning'],
        repoUrl: 'https://github.com/kevinsungyookim/Heartbeat-Prediction'
    }
];

/**
 * Renders a single project card as HTML
 */
export function renderProjectCard(project: ProjectEntry): string {
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
export function renderProjectsSection(projects: ProjectEntry[]): string {
    return projects.map(project => renderProjectCard(project)).join('\n');
}

/**
 * Initializes the Projects page
 */
function initProjectsPage(): void {
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
} else {
    initProjectsPage();
}
