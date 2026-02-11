import { describe, it, expect } from 'vitest';
import { renderSkillCategory, renderSkillsSection } from './skills';
describe('Skills Page', () => {
    describe('renderSkillCategory', () => {
        it('should render complete category with all skills', () => {
            const category = {
                id: 'frontend',
                name: 'Frontend Development',
                skills: ['React', 'Vue.js', 'TypeScript']
            };
            const html = renderSkillCategory(category);
            expect(html).toContain('Frontend Development');
            expect(html).toContain('React');
            expect(html).toContain('Vue.js');
            expect(html).toContain('TypeScript');
            expect(html).toContain('skill-category');
            expect(html).toContain('category-name');
        });
        it('should render multiple skills as tags', () => {
            var _a;
            const category = {
                id: 'backend',
                name: 'Backend',
                skills: ['Node.js', 'Python', 'Java', 'Go', 'Ruby']
            };
            const html = renderSkillCategory(category);
            expect(html).toContain('Node.js');
            expect(html).toContain('Python');
            expect(html).toContain('Java');
            expect(html).toContain('Go');
            expect(html).toContain('Ruby');
            expect((_a = html.match(/skill-tag/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(5);
        });
        it('should render category with single skill', () => {
            const category = {
                id: 'special',
                name: 'Special Skill',
                skills: ['Unique Technology']
            };
            const html = renderSkillCategory(category);
            expect(html).toContain('Special Skill');
            expect(html).toContain('Unique Technology');
        });
        it('should handle empty skills array', () => {
            const category = {
                id: 'empty',
                name: 'Empty Category',
                skills: []
            };
            const html = renderSkillCategory(category);
            expect(html).toContain('Empty Category');
            expect(html).toContain('skills-list');
            expect(html).not.toContain('skill-tag');
        });
    });
    describe('renderSkillsSection', () => {
        it('should render multiple categories with visual distinction', () => {
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
            const html = renderSkillsSection(categories);
            expect(html).toContain('Category One');
            expect(html).toContain('Category Two');
            expect(html).toContain('Category Three');
            expect(html).toContain('Skill A');
            expect(html).toContain('Skill C');
            expect(html).toContain('Skill E');
            // Check that each category has its own container
            const categoryMatches = html.match(/skill-category/g);
            expect(categoryMatches === null || categoryMatches === void 0 ? void 0 : categoryMatches.length).toBe(3);
        });
        it('should maintain category order', () => {
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
            const html = renderSkillsSection(categories);
            const firstIndex = html.indexOf('First Category');
            const secondIndex = html.indexOf('Second Category');
            const thirdIndex = html.indexOf('Third Category');
            expect(firstIndex).toBeLessThan(secondIndex);
            expect(secondIndex).toBeLessThan(thirdIndex);
        });
        it('should handle single category', () => {
            const categories = [
                {
                    id: 'solo',
                    name: 'Solo Category',
                    skills: ['Only Skill']
                }
            ];
            const html = renderSkillsSection(categories);
            expect(html).toContain('Solo Category');
            expect(html).toContain('Only Skill');
        });
        it('should handle empty categories array', () => {
            const categories = [];
            const html = renderSkillsSection(categories);
            expect(html).toBe('');
        });
        it('should visually distinguish between categories', () => {
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
            const html = renderSkillsSection(categories);
            // Each category should have its own wrapper with class
            expect((_a = html.match(/class="skill-category"/g)) === null || _a === void 0 ? void 0 : _a.length).toBe(2);
            // Each category should have its own name heading
            expect((_b = html.match(/class="category-name"/g)) === null || _b === void 0 ? void 0 : _b.length).toBe(2);
        });
    });
});
//# sourceMappingURL=skills.test.js.map