"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const projects_1 = require("./projects");
(0, vitest_1.describe)('Projects Page', () => {
    (0, vitest_1.describe)('renderProjectCard', () => {
        (0, vitest_1.it)('should render complete project with all fields', () => {
            const project = {
                id: 'proj-1',
                title: 'Test Project',
                description: 'A test project description',
                technologies: ['TypeScript', 'React', 'Node.js'],
                liveUrl: 'https://example.com',
                repoUrl: 'https://github.com/test/project',
                imageUrl: '/images/test.jpg'
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('Test Project');
            (0, vitest_1.expect)(html).toContain('A test project description');
            (0, vitest_1.expect)(html).toContain('TypeScript');
            (0, vitest_1.expect)(html).toContain('React');
            (0, vitest_1.expect)(html).toContain('Node.js');
            (0, vitest_1.expect)(html).toContain('https://example.com');
            (0, vitest_1.expect)(html).toContain('https://github.com/test/project');
            (0, vitest_1.expect)(html).toContain('/images/test.jpg');
        });
        (0, vitest_1.it)('should render project without optional URLs', () => {
            const project = {
                id: 'proj-2',
                title: 'Simple Project',
                description: 'Project without URLs',
                technologies: ['JavaScript']
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('Simple Project');
            (0, vitest_1.expect)(html).toContain('Project without URLs');
            (0, vitest_1.expect)(html).toContain('JavaScript');
            (0, vitest_1.expect)(html).not.toContain('View Live');
            (0, vitest_1.expect)(html).not.toContain('View Code');
            (0, vitest_1.expect)(html).not.toContain('project-links');
        });
        (0, vitest_1.it)('should render project with only liveUrl', () => {
            const project = {
                id: 'proj-3',
                title: 'Live Project',
                description: 'Project with live URL only',
                technologies: ['Vue.js'],
                liveUrl: 'https://live.example.com'
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('Live Project');
            (0, vitest_1.expect)(html).toContain('https://live.example.com');
            (0, vitest_1.expect)(html).toContain('View Live');
            (0, vitest_1.expect)(html).not.toContain('View Code');
        });
        (0, vitest_1.it)('should render project with only repoUrl', () => {
            const project = {
                id: 'proj-4',
                title: 'Code Project',
                description: 'Project with repo URL only',
                technologies: ['Python'],
                repoUrl: 'https://github.com/test/repo'
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('Code Project');
            (0, vitest_1.expect)(html).toContain('https://github.com/test/repo');
            (0, vitest_1.expect)(html).toContain('View Code');
            (0, vitest_1.expect)(html).not.toContain('View Live');
        });
        (0, vitest_1.it)('should render project without image', () => {
            const project = {
                id: 'proj-5',
                title: 'No Image Project',
                description: 'Project without image',
                technologies: ['Java']
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('No Image Project');
            (0, vitest_1.expect)(html).not.toContain('project-image');
            (0, vitest_1.expect)(html).not.toContain('<img');
        });
        (0, vitest_1.it)('should render multiple technologies as tags', () => {
            var _a;
            const project = {
                id: 'proj-6',
                title: 'Multi-Tech Project',
                description: 'Project with many technologies',
                technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
            };
            const html = (0, projects_1.renderProjectCard)(project);
            (0, vitest_1.expect)(html).toContain('React');
            (0, vitest_1.expect)(html).toContain('TypeScript');
            (0, vitest_1.expect)(html).toContain('Node.js');
            (0, vitest_1.expect)(html).toContain('PostgreSQL');
            (0, vitest_1.expect)(html).toContain('Docker');
            (0, vitest_1.expect)((_a = html.match(/tech-tag/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(5);
        });
    });
    (0, vitest_1.describe)('renderProjectsSection', () => {
        (0, vitest_1.it)('should render multiple projects', () => {
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
            const html = (0, projects_1.renderProjectsSection)(projects);
            (0, vitest_1.expect)(html).toContain('Project One');
            (0, vitest_1.expect)(html).toContain('Project Two');
            (0, vitest_1.expect)(html).toContain('Project Three');
            (0, vitest_1.expect)(html).toContain('First project');
            (0, vitest_1.expect)(html).toContain('Second project');
            (0, vitest_1.expect)(html).toContain('Third project');
        });
        (0, vitest_1.it)('should handle single project', () => {
            const projects = [
                {
                    id: 'proj-1',
                    title: 'Solo Project',
                    description: 'Only project',
                    technologies: ['TypeScript']
                }
            ];
            const html = (0, projects_1.renderProjectsSection)(projects);
            (0, vitest_1.expect)(html).toContain('Solo Project');
            (0, vitest_1.expect)(html).toContain('Only project');
        });
        (0, vitest_1.it)('should handle empty projects array', () => {
            const projects = [];
            const html = (0, projects_1.renderProjectsSection)(projects);
            (0, vitest_1.expect)(html).toBe('');
        });
    });
});
//# sourceMappingURL=projects.test.js.map