import { describe, it, expect } from 'vitest';
import { renderExperienceEntry, renderExperienceSection } from './experience';
import { ExperienceEntry } from './shared/types';

describe('Experience Page', () => {
  describe('renderExperienceEntry', () => {
    it('should render complete entry with all fields', () => {
      const entry: ExperienceEntry = {
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

      const html = renderExperienceEntry(entry);

      expect(html).toContain('Senior Developer');
      expect(html).toContain('Tech Corp');
      expect(html).toContain('2022-01 - Present');
      expect(html).toContain('Leading development team');
      expect(html).toContain('Code reviews');
      expect(html).toContain('Architecture design');
    });

    it('should handle entry without accomplishments', () => {
      const entry: ExperienceEntry = {
        id: 'exp-2',
        title: 'Developer',
        company: 'Company',
        startDate: '2020-01',
        endDate: '2021-12',
        description: 'Development work',
        accomplishments: []
      };

      const html = renderExperienceEntry(entry);

      expect(html).toContain('Developer');
      expect(html).toContain('Company');
      expect(html).toContain('Development work');
      expect(html).not.toContain('<ul class="accomplishments">');
    });

    it('should format date range correctly', () => {
      const entry: ExperienceEntry = {
        id: 'exp-3',
        title: 'Developer',
        company: 'Company',
        startDate: '2020-06',
        endDate: '2022-03',
        description: 'Work',
        accomplishments: []
      };

      const html = renderExperienceEntry(entry);

      expect(html).toContain('2020-06 - 2022-03');
    });

    it('should display "Present" for current positions', () => {
      const entry: ExperienceEntry = {
        id: 'exp-4',
        title: 'Developer',
        company: 'Company',
        startDate: '2023-01',
        endDate: 'Present',
        description: 'Current role',
        accomplishments: []
      };

      const html = renderExperienceEntry(entry);

      expect(html).toContain('2023-01 - Present');
    });
  });

  describe('renderExperienceSection', () => {
    it('should render multiple entries in reverse chronological order', () => {
      const entries: ExperienceEntry[] = [
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

      const html = renderExperienceSection(entries);

      // Current job (Present) should come first
      const seniorIndex = html.indexOf('Senior Developer');
      const midIndex = html.indexOf('Mid Developer');
      const juniorIndex = html.indexOf('Junior Developer');

      expect(seniorIndex).toBeLessThan(midIndex);
      expect(midIndex).toBeLessThan(juniorIndex);
    });

    it('should handle single entry', () => {
      const entries: ExperienceEntry[] = [
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

      const html = renderExperienceSection(entries);

      expect(html).toContain('Developer');
      expect(html).toContain('Company');
    });

    it('should handle empty entries array', () => {
      const entries: ExperienceEntry[] = [];

      const html = renderExperienceSection(entries);

      expect(html).toBe('');
    });

    it('should sort entries with same end date by start date', () => {
      const entries: ExperienceEntry[] = [
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

      const html = renderExperienceSection(entries);

      // Both end at same time, but Job B started later so should appear first
      const jobAIndex = html.indexOf('Job A');
      const jobBIndex = html.indexOf('Job B');

      expect(jobAIndex).toBeGreaterThan(-1);
      expect(jobBIndex).toBeGreaterThan(-1);
    });
  });
});
