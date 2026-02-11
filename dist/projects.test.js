import { describe, it, expect } from 'vitest';
import { renderProjectCard, renderProjectsSection } from './projects';
describe('Projects Page', () => {
    describe('renderProjectCard', () => {
        it('should render complete project with all fields', () => {
            const project = {
                id: 'proj-1',
                title: 'Test Project',
                description: 'A test project description',
                technologies: ['TypeScript', 'React', 'Node.js'],
                liveUrl: 'https://example.com',
                repoUrl: 'https://github.com/test/project',
                imageUrl: '/images/test.jpg'
            };
            const html = renderProjectCard(project);
            expect(html).toContain('Test Project');
            expect(html).toContain('A test project description');
            expect(html).toContain('TypeScript');
            expect(html).toContain('React');
            expect(html).toContain('Node.js');
            expect(html).toContain('https://example.com');
            expect(html).toContain('https://github.com/test/project');
            expect(html).toContain('/images/test.jpg');
        });
        it('should render project without optional URLs', () => {
            const project = {
                id: 'proj-2',
                title: 'Simple Project',
                description: 'Project without URLs',
                technologies: ['JavaScript']
            };
            const html = renderProjectCard(project);
            expect(html).toContain('Simple Project');
            expect(html).toContain('Project without URLs');
            expect(html).toContain('JavaScript');
            expect(html).not.toContain('View Live');
            expect(html).not.toContain('View Code');
            expect(html).not.toContain('project-links');
        });
        it('should render project with only liveUrl', () => {
            const project = {
                id: 'proj-3',
                title: 'Live Project',
                description: 'Project with live URL only',
                technologies: ['Vue.js'],
                liveUrl: 'https://live.example.com'
            };
            const html = renderProjectCard(project);
            expect(html).toContain('Live Project');
            expect(html).toContain('https://live.example.com');
            expect(html).toContain('View Live');
            expect(html).not.toContain('View Code');
        });
        it('should render project with only repoUrl', () => {
            const project = {
                id: 'proj-4',
                title: 'Code Project',
                description: 'Project with repo URL only',
                technologies: ['Python'],
                repoUrl: 'https://github.com/test/repo'
            };
            const html = renderProjectCard(project);
            expect(html).toContain('Code Project');
            expect(html).toContain('https://github.com/test/repo');
            expect(html).toContain('View Code');
            expect(html).not.toContain('View Live');
        });
        it('should render project without image', () => {
            const project = {
                id: 'proj-5',
                title: 'No Image Project',
                description: 'Project without image',
                technologies: ['Java']
            };
            const html = renderProjectCard(project);
            expect(html).toContain('No Image Project');
            expect(html).not.toContain('project-image');
            expect(html).not.toContain('<img');
        });
        it('should render multiple technologies as tags', () => {
            var _a;
            const project = {
                id: 'proj-6',
                title: 'Multi-Tech Project',
                description: 'Project with many technologies',
                technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
            };
            const html = renderProjectCard(project);
            expect(html).toContain('React');
            expect(html).toContain('TypeScript');
            expect(html).toContain('Node.js');
            expect(html).toContain('PostgreSQL');
            expect(html).toContain('Docker');
            expect((_a = html.match(/tech-tag/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(5);
        });
    });
    describe('renderProjectsSection', () => {
        it('should render multiple projects', () => {
            const projects = [
                {
                    id: 'proj-1',
                    title: 'Project One',
                    description: 'First project',
                    technologies: ['React']
                },
                {
                    id: 'proj-2',
                    title: 'Project Two',
                    description: 'Second project',
                    technologies: ['Vue.js']
                },
                {
                    id: 'proj-3',
                    title: 'Project Three',
                    description: 'Third project',
                    technologies: ['Angular']
                }
            ];
            const html = renderProjectsSection(projects);
            expect(html).toContain('Project One');
            expect(html).toContain('Project Two');
            expect(html).toContain('Project Three');
            expect(html).toContain('First project');
            expect(html).toContain('Second project');
            expect(html).toContain('Third project');
        });
        it('should handle single project', () => {
            const projects = [
                {
                    id: 'proj-1',
                    title: 'Solo Project',
                    description: 'Only project',
                    technologies: ['TypeScript']
                }
            ];
            const html = renderProjectsSection(projects);
            expect(html).toContain('Solo Project');
            expect(html).toContain('Only project');
        });
        it('should handle empty projects array', () => {
            const projects = [];
            const html = renderProjectsSection(projects);
            expect(html).toBe('');
        });
    });
});
//# sourceMappingURL=projects.test.js.map