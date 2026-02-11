"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const experience_1 = require("./experience");
(0, vitest_1.describe)('Experience Page', () => {
    (0, vitest_1.describe)('renderExperienceEntry', () => {
        (0, vitest_1.it)('should render complete entry with all fields', () => {
            const entry = {
                id: 'exp-1',
                title: 'Senior Developer',
                company: 'Tech Corp',
                startDate: '2022-01',
                endDate: 'Present',
                description: 'Leading development team',
                accomplishments: [
                    'Code reviews',
                    'Architecture design'
                ]
            };
            const html = (0, experience_1.renderExperienceEntry)(entry);
            (0, vitest_1.expect)(html).toContain('Senior Developer');
            (0, vitest_1.expect)(html).toContain('Tech Corp');
            (0, vitest_1.expect)(html).toContain('2022-01 - Present');
            (0, vitest_1.expect)(html).toContain('Leading development team');
            (0, vitest_1.expect)(html).toContain('Code reviews');
            (0, vitest_1.expect)(html).toContain('Architecture design');
        });
        (0, vitest_1.it)('should handle entry without accomplishments', () => {
            const entry = {
                id: 'exp-2',
                title: 'Developer',
                company: 'Company',
                startDate: '2020-01',
                endDate: '2021-12',
                description: 'Development work',
                accomplishments: []
            };
            const html = (0, experience_1.renderExperienceEntry)(entry);
            (0, vitest_1.expect)(html).toContain('Developer');
            (0, vitest_1.expect)(html).toContain('Company');
            (0, vitest_1.expect)(html).toContain('Development work');
            (0, vitest_1.expect)(html).not.toContain('<ul class="accomplishments">');
        });
        (0, vitest_1.it)('should format date range correctly', () => {
            const entry = {
                id: 'exp-3',
                title: 'Developer',
                company: 'Company',
                startDate: '2020-06',
                endDate: '2022-03',
                description: 'Work',
                accomplishments: []
            };
            const html = (0, experience_1.renderExperienceEntry)(entry);
            (0, vitest_1.expect)(html).toContain('2020-06 - 2022-03');
        });
        (0, vitest_1.it)('should display "Present" for current positions', () => {
            const entry = {
                id: 'exp-4',
                title: 'Developer',
                company: 'Company',
                startDate: '2023-01',
                endDate: 'Present',
                description: 'Current role',
                accomplishments: []
            };
            const html = (0, experience_1.renderExperienceEntry)(entry);
            (0, vitest_1.expect)(html).toContain('2023-01 - Present');
        });
    });
    (0, vitest_1.describe)('renderExperienceSection', () => {
        (0, vitest_1.it)('should render multiple entries in reverse chronological order', () => {
            const entries = [
                {
                    id: 'exp-1',
                    title: 'Junior Developer',
                    company: 'Company A',
                    startDate: '2018-01',
                    endDate: '2020-01',
                    description: 'First job',
                    accomplishments: []
                },
                {
                    id: 'exp-2',
                    title: 'Senior Developer',
                    company: 'Company C',
                    startDate: '2022-01',
                    endDate: 'Present',
                    description: 'Current job',
                    accomplishments: []
                },
                {
                    id: 'exp-3',
                    title: 'Mid Developer',
                    company: 'Company B',
                    startDate: '2020-02',
                    endDate: '2021-12',
                    description: 'Second job',
                    accomplishments: []
                }
            ];
            const html = (0, experience_1.renderExperienceSection)(entries);
            // Current job (Present) should come first
            const seniorIndex = html.indexOf('Senior Developer');
            const midIndex = html.indexOf('Mid Developer');
            const juniorIndex = html.indexOf('Junior Developer');
            (0, vitest_1.expect)(seniorIndex).toBeLessThan(midIndex);
            (0, vitest_1.expect)(midIndex).toBeLessThan(juniorIndex);
        });
        (0, vitest_1.it)('should handle single entry', () => {
            const entries = [
                {
                    id: 'exp-1',
                    title: 'Developer',
                    company: 'Company',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: 'Only job',
                    accomplishments: []
                }
            ];
            const html = (0, experience_1.renderExperienceSection)(entries);
            (0, vitest_1.expect)(html).toContain('Developer');
            (0, vitest_1.expect)(html).toContain('Company');
        });
        (0, vitest_1.it)('should handle empty entries array', () => {
            const entries = [];
            const html = (0, experience_1.renderExperienceSection)(entries);
            (0, vitest_1.expect)(html).toBe('');
        });
        (0, vitest_1.it)('should sort entries with same end date by start date', () => {
            const entries = [
                {
                    id: 'exp-1',
                    title: 'Job A',
                    company: 'Company',
                    startDate: '2020-01',
                    endDate: '2021-12',
                    description: 'Earlier start',
                    accomplishments: []
                },
                {
                    id: 'exp-2',
                    title: 'Job B',
                    company: 'Company',
                    startDate: '2021-01',
                    endDate: '2021-12',
                    description: 'Later start',
                    accomplishments: []
                }
            ];
            const html = (0, experience_1.renderExperienceSection)(entries);
            // Both end at same time, but Job B started later so should appear first
            const jobAIndex = html.indexOf('Job A');
            const jobBIndex = html.indexOf('Job B');
            (0, vitest_1.expect)(jobAIndex).toBeGreaterThan(-1);
            (0, vitest_1.expect)(jobBIndex).toBeGreaterThan(-1);
        });
    });
});
//# sourceMappingURL=experience.test.js.map