// Experience page module
import { PageId } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';
/**
 * Sample experience data
 */
const experienceData = [
    {
        id: 'exp-1',
        title: 'Software Engineer II',
        company: 'Amazon, Prime Video',
        startDate: 'June 2022',
        endDate: 'Present',
        description: 'Architect and scale cloud-native services that power live streaming for millions of concurrent viewers across the world\'s biggest sporting events. Own the full lifecycle of distributed systems — from design and implementation to monitoring, on-call, and operational excellence.',
        accomplishments: [
            'Design and scale fault-tolerant microservices to handle massive traffic spikes during live events, supporting an ever-growing roster of 24/7 channels and live broadcasts',
            'Serve as a key engineer for major sporting events including NFL Thursday Night Football, NBA, MLB, UEFA Champions League, ICC Cricket, and UTR Tennis',
            'Lead cross-team initiatives to improve end-to-end availability and quality of audio/video streams, reducing incident rates and improving viewer experience',
            'Drive organization-level operational excellence projects including automated runbooks, monitoring dashboards, and deployment safety improvements',
            'Build real-time monitoring and alerting systems that provide instant visibility into stream health across all active channels and events'
        ]
    },
    {
        id: 'exp-2',
        title: 'Software Engineer II',
        company: 'Palomar Products',
        startDate: 'September 2021',
        endDate: 'March 2022',
        description: 'Performed end-to-end system testing and root cause analysis for integrated intercommunication systems deployed in mission-critical aerospace and naval environments.',
        accomplishments: [
            'Conducted comprehensive system testing of integrated intercommunication systems across both software and hardware layers, ensuring reliability in high-stakes environments',
            'Diagnosed and resolved component-level failures in communication devices used aboard military aircraft and naval vessels',
            'Collaborated with cross-functional teams to validate system integration and ensure compliance with defense industry standards'
        ]
    },
    {
        id: 'exp-3',
        title: 'Process Engineer (PIM)',
        company: 'Ormco Corporation',
        startDate: 'December 2018',
        endDate: 'September 2020',
        description: 'Led the design and implementation of automated manufacturing product lines for orthodontic devices, combining robotics, computer vision, and process optimization to improve throughput and reduce waste.',
        accomplishments: [
            'Designed and deployed automated product lines integrating vision systems, pick-and-place robotics, and debind systems — increasing production efficiency significantly',
            'Led root cause investigations into quality failures, implementing corrective actions that reduced scrap rates and recovered substantial revenue',
            'Developed process documentation and training materials to standardize operations across multiple production shifts'
        ]
    }
];
/**
 * Renders a single experience entry as HTML
 */
export function renderExperienceEntry(entry) {
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
export function renderExperienceSection(entries) {
    // Sort by start date in reverse chronological order (newest first)
    const sortedEntries = [...entries].sort((a, b) => {
        // Convert date strings to comparable format
        const parseDate = (dateStr) => {
            if (dateStr === 'Present')
                return 99991231;
            // Handle formats like "June 2022" or "2022-01"
            const monthMap = {
                'January': '01', 'February': '02', 'March': '03', 'April': '04',
                'May': '05', 'June': '06', 'July': '07', 'August': '08',
                'September': '09', 'October': '10', 'November': '11', 'December': '12'
            };
            // Try to parse "Month YYYY" format
            const parts = dateStr.split(' ');
            if (parts.length === 2 && monthMap[parts[0]]) {
                return parseInt(parts[1] + monthMap[parts[0]]);
            }
            // Try to parse "YYYY-MM" format
            return parseInt(dateStr.replace('-', ''));
        };
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);
        return dateB - dateA; // Descending order (newest first)
    });
    return sortedEntries.map(entry => renderExperienceEntry(entry)).join('\n');
}
/**
 * Initializes the Experience page
 */
function initExperiencePage() {
    // Initialize navigation
    initNavigation(PageId.Experience);
    // Render experience entries
    const container = document.getElementById('experience-container');
    if (container) {
        container.innerHTML = renderExperienceSection(experienceData);
    }
    // Initialize animations
    initAnimations();
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperiencePage);
}
else {
    initExperiencePage();
}
//# sourceMappingURL=experience.js.map