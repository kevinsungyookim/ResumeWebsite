// Experience page module
import { PageId, ExperienceEntry } from './shared/types.js';
import { initNavigation } from './shared/navigation.js';
import { initAnimations } from './shared/animations.js';

/**
 * Sample experience data
 */
const experienceData: ExperienceEntry[] = [
    {
        id: 'exp-1',
        title: 'Software Engineer II',
        company: 'Amazon, Prime Video',
        startDate: 'June 2022',
        endDate: 'Present',
        description: 'Design modular cloud-based services for concurrent processes, database management, and scalability. Implement automation and real-time monitoring for seamless experience during sporting events.',
        accomplishments: [
            'Scale services to handle spikes and load for increasing number of 24/7 channels and live events',
            'Support major sporting events: NFL (TNF), NBA, MLB, UCL, ICC, UTR',
            'Drive cross-team tasks for improving availability and quality of audio and video streams',
            'Perform multiple operational excellence projects for organization level initiatives'
        ]
    },
    {
        id: 'exp-2',
        title: 'Software Engineer II',
        company: 'Palomar Products',
        startDate: 'September 2021',
        endDate: 'March 2022',
        description: 'Conducted system testing and debugging for integrated intercommunication systems used in aerospace and naval applications.',
        accomplishments: [
            'Conducted system testing of integrated intercommunication systems for software and hardware',
            'Debug component failures in communication devices for aircrafts and naval ships'
        ]
    },
    {
        id: 'exp-3',
        title: 'Process Engineer (PIM)',
        company: 'Ormco Corporation',
        startDate: 'December 2018',
        endDate: 'September 2020',
        description: 'Implemented automated product lines and investigated quality failures for orthodontic manufacturing.',
        accomplishments: [
            'Implemented product lines with vision system, pick and place robots, and debind system',
            'Investigated quality failures to mitigate large amounts of scrap and loss in revenue'
        ]
    }
];

/**
 * Renders a single experience entry as HTML
 */
export function renderExperienceEntry(entry: ExperienceEntry): string {
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
export function renderExperienceSection(entries: ExperienceEntry[]): string {
    // Sort by start date in reverse chronological order (newest first)
    const sortedEntries = [...entries].sort((a, b) => {
        // Convert date strings to comparable format
        const parseDate = (dateStr: string): number => {
            if (dateStr === 'Present') return 99991231;
            
            // Handle formats like "June 2022" or "2022-01"
            const monthMap: { [key: string]: string } = {
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
function initExperiencePage(): void {
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
} else {
    initExperiencePage();
}
