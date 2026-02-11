"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderExperienceEntry = renderExperienceEntry;
exports.renderExperienceSection = renderExperienceSection;
// Experience page module
const types_1 = require("./shared/types");
const navigation_1 = require("./shared/navigation");
const animations_1 = require("./shared/animations");
/**
 * Sample experience data
 */
const experienceData = [
    {
        id: 'exp-1',
        title: 'Senior Software Developer',
        company: 'Tech Solutions Inc.',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Lead development of modern web applications using TypeScript and React. Mentor junior developers and establish coding standards.',
        accomplishments: [
            'Architected and implemented scalable frontend solutions',
            'Reduced page load times by 40% through optimization',
            'Mentored team of 5 junior developers',
            'Established CI/CD pipelines and testing practices'
        ]
    },
    {
        id: 'exp-2',
        title: 'Software Developer',
        company: 'Digital Innovations LLC',
        startDate: '2020-03',
        endDate: '2021-12',
        description: 'Developed full-stack web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software.',
        accomplishments: [
            'Built responsive web applications with modern frameworks',
            'Designed and implemented RESTful APIs',
            'Collaborated with UX designers on user interface improvements',
            'Participated in code reviews and agile ceremonies'
        ]
    },
    {
        id: 'exp-3',
        title: 'Junior Developer',
        company: 'StartUp Ventures',
        startDate: '2018-06',
        endDate: '2020-02',
        description: 'Contributed to various web development projects. Gained experience in modern JavaScript frameworks and development workflows.',
        accomplishments: [
            'Developed features for customer-facing web applications',
            'Fixed bugs and improved application performance',
            'Wrote unit tests and documentation',
            'Learned and applied best practices in software development'
        ]
    }
];
/**
 * Renders a single experience entry as HTML
 */
function renderExperienceEntry(entry) {
    const endDateDisplay = entry.endDate === 'Present' ? 'Present' : entry.endDate;
    const dateRange = `${entry.startDate} - ${endDateDisplay}`;
    const accomplishmentsHTML = entry.accomplishments && entry.accomplishments.length > 0
        ? `<ul class="accomplishments">
            ${entry.accomplishments.map(acc => `<li>${acc}</li>`).join('\n            ')}
           </ul>`
        : '';
    return `
        <article class="experience-entry" data-animation="slide-up">
            <div class="experience-header">
                <h3 class="experience-title">${entry.title}</h3>
                <span class="experience-company">${entry.company}</span>
            </div>
            <div class="experience-date">${dateRange}</div>
            <p class="experience-description">${entry.description}</p>
            ${accomplishmentsHTML}
        </article>
    `;
}
/**
 * Renders all experience entries in reverse chronological order
 */
function renderExperienceSection(entries) {
    // Sort by start date in reverse chronological order (newest first)
    const sortedEntries = [...entries].sort((a, b) => {
        // Handle "Present" as the most recent date
        const dateA = a.endDate === 'Present' ? '9999-12' : a.endDate;
        const dateB = b.endDate === 'Present' ? '9999-12' : b.endDate;
        return dateB.localeCompare(dateA);
    });
    return sortedEntries.map(entry => renderExperienceEntry(entry)).join('\n');
}
/**
 * Initializes the Experience page
 */
function initExperiencePage() {
    // Initialize navigation
    (0, navigation_1.initNavigation)(types_1.PageId.Experience);
    // Render experience entries
    const container = document.getElementById('experience-container');
    if (container) {
        container.innerHTML = renderExperienceSection(experienceData);
    }
    // Initialize animations
    (0, animations_1.initAnimations)();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperiencePage);
}
else {
    initExperiencePage();
}
//# sourceMappingURL=experience.js.map