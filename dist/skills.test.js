"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const skills_1 = require("./skills");
(0, vitest_1.describe)('Skills Page', () => {
    (0, vitest_1.describe)('renderSkillCategory', () => {
        (0, vitest_1.it)('should render complete category with all skills', () => {
            const category = {
                id: 'frontend',
                name: 'Frontend Development',
                skills: ['React', 'Vue.js', 'TypeScript']
            };
            const html = (0, skills_1.renderSkillCategory)(category);
            (0, vitest_1.expect)(html).toContain('Frontend Development');
            (0, vitest_1.expect)(html).toContain('React');
            (0, vitest_1.expect)(html).toContain('Vue.js');
            (0, vitest_1.expect)(html).toContain('TypeScript');
            (0, vitest_1.expect)(html).toContain('skill-category');
            (0, vitest_1.expect)(html).toContain('category-name');
        });
        (0, vitest_1.it)('should render multiple skills as tags', () => {
            var _a;
            const category = {
                id: 'backend',
                name: 'Backend',
                skills: ['Node.js', 'Python', 'Java', 'Go', 'Ruby']
            };
            const html = (0, skills_1.renderSkillCategory)(category);
            (0, vitest_1.expect)(html).toContain('Node.js');
            (0, vitest_1.expect)(html).toContain('Python');
            (0, vitest_1.expect)(html).toContain('Java');
            (0, vitest_1.expect)(html).toContain('Go');
            (0, vitest_1.expect)(html).toContain('Ruby');
            (0, vitest_1.expect)((_a = html.match(/skill-tag/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(5);
        });
        (0, vitest_1.it)('should render category with single skill', () => {
            const category = {
                id: 'special',
                name: 'Special Skill',
                skills: ['Unique Technology']
            };
            const html = (0, skills_1.renderSkillCategory)(category);
            (0, vitest_1.expect)(html).toContain('Special Skill');
            (0, vitest_1.expect)(html).toContain('Unique Technology');
        });
        (0, vitest_1.it)('should handle empty skills array', () => {
            const category = {
                id: 'empty',
                name: 'Empty Category',
                skills: []
            };
            const html = (0, skills_1.renderSkillCategory)(category);
            (0, vitest_1.expect)(html).toContain('Empty Category');
            (0, vitest_1.expect)(html).toContain('skills-list');
            (0, vitest_1.expect)(html).not.toContain('skill-tag');
        });
    });
    (0, vitest_1.describe)('renderSkillsSection', () => {
        (0, vitest_1.it)('should render multiple categories with visual distinction', () => {
            const categories = [
                {
                    id: 'cat1',
                    name: 'Category One',
                    skills: ['Skill A', 'Skill B']
                },
                {
                    id: 'cat2',
                    name: 'Category Two',
                    skills: ['Skill C', 'Skill D']
                },
                {
                    id: 'cat3',
                    name: 'Category Three',
                    skills: ['Skill E', 'Skill F']
                }
            ];
            const html = (0, skills_1.renderSkillsSection)(categories);
            (0, vitest_1.expect)(html).toContain('Category One');
            (0, vitest_1.expect)(html).toContain('Category Two');
            (0, vitest_1.expect)(html).toContain('Category Three');
            (0, vitest_1.expect)(html).toContain('Skill A');
            (0, vitest_1.expect)(html).toContain('Skill C');
            (0, vitest_1.expect)(html).toContain('Skill E');
            // Check that each category has its own container
            const categoryMatches = html.match(/skill-category/g);
            (0, vitest_1.expect)(categoryMatches === null || categoryMatches === void 0 ? void 0 : categoryMatches.length).toBe(3);
        });
        (0, vitest_1.it)('should maintain category order', () => {
            const categories = [
                {
                    id: 'first',
                    name: 'First Category',
                    skills: ['Skill 1']
                },
                {
                    id: 'second',
                    name: 'Second Category',
                    skills: ['Skill 2']
                },
                {
                    id: 'third',
                    name: 'Third Category',
                    skills: ['Skill 3']
                }
            ];
            const html = (0, skills_1.renderSkillsSection)(categories);
            const firstIndex = html.indexOf('First Category');
            const secondIndex = html.indexOf('Second Category');
            const thirdIndex = html.indexOf('Third Category');
            (0, vitest_1.expect)(firstIndex).toBeLessThan(secondIndex);
            (0, vitest_1.expect)(secondIndex).toBeLessThan(thirdIndex);
        });
        (0, vitest_1.it)('should handle single category', () => {
            const categories = [
                {
                    id: 'solo',
                    name: 'Solo Category',
                    skills: ['Only Skill']
                }
            ];
            const html = (0, skills_1.renderSkillsSection)(categories);
            (0, vitest_1.expect)(html).toContain('Solo Category');
            (0, vitest_1.expect)(html).toContain('Only Skill');
        });
        (0, vitest_1.it)('should handle empty categories array', () => {
            const categories = [];
            const html = (0, skills_1.renderSkillsSection)(categories);
            (0, vitest_1.expect)(html).toBe('');
        });
        (0, vitest_1.it)('should visually distinguish between categories', () => {
            var _a, _b;
            const categories = [
                {
                    id: 'cat1',
                    name: 'Category A',
                    skills: ['Skill 1']
                },
                {
                    id: 'cat2',
                    name: 'Category B',
                    skills: ['Skill 2']
                }
            ];
            const html = (0, skills_1.renderSkillsSection)(categories);
            // Each category should have its own wrapper with class
            (0, vitest_1.expect)((_a = html.match(/class="skill-category"/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(2);
            // Each category should have its own name heading
            (0, vitest_1.expect)((_b = html.match(/class="category-name"/g)) === null || _b === void 0 ? void 0 : _b.length).toBe(2);
        });
    });
});
//# sourceMappingURL=skills.test.js.map