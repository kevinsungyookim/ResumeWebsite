"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fc = __importStar(require("fast-check"));
const navigation_1 = require("./navigation");
const types_1 = require("./types");
(0, vitest_1.describe)('Navigation completeness across all pages', () => {
    (0, vitest_1.beforeEach)(() => {
        document.body.innerHTML = '';
    });
    (0, vitest_1.it)('Navigation contains all 5 pages regardless of current page', () => {
        // Validates: Requirements 1.2, 1.4
        const allPages = [
            types_1.PageId.About,
            types_1.PageId.Experience,
            types_1.PageId.Projects,
            types_1.PageId.Skills,
            types_1.PageId.Contact,
        ];
        fc.assert(fc.property(fc.constantFrom(...allPages), (currentPage) => {
            // Generate navigation HTML for the current page
            const html = (0, navigation_1.createNavigationHTML)(currentPage);
            // Navigation must contain all 5 page labels
            (0, vitest_1.expect)(html).toContain('About');
            (0, vitest_1.expect)(html).toContain('Experience');
            (0, vitest_1.expect)(html).toContain('Projects');
            (0, vitest_1.expect)(html).toContain('Skills');
            (0, vitest_1.expect)(html).toContain('Contact');
            // Navigation must contain all 5 page hrefs
            (0, vitest_1.expect)(html).toContain('index.html');
            (0, vitest_1.expect)(html).toContain('experience.html');
            (0, vitest_1.expect)(html).toContain('projects.html');
            (0, vitest_1.expect)(html).toContain('skills.html');
            (0, vitest_1.expect)(html).toContain('contact.html');
            // Exactly one link should have the active class
            const activeMatches = html.match(/class="active"/g);
            (0, vitest_1.expect)(activeMatches).not.toBeNull();
            (0, vitest_1.expect)(activeMatches.length).toBe(1);
            // The active link should correspond to the current page
            const pageLabels = {
                [types_1.PageId.About]: 'About',
                [types_1.PageId.Experience]: 'Experience',
                [types_1.PageId.Projects]: 'Projects',
                [types_1.PageId.Skills]: 'Skills',
                [types_1.PageId.Contact]: 'Contact',
            };
            const currentPageLabel = pageLabels[currentPage];
            const activePattern = new RegExp(`class="active">${currentPageLabel}<`);
            (0, vitest_1.expect)(html).toMatch(activePattern);
        }), { numRuns: 100 });
    });
    (0, vitest_1.it)('Navigation initialization maintains completeness in DOM', () => {
        // Validates: Requirements 1.2, 1.4
        const allPages = [
            types_1.PageId.About,
            types_1.PageId.Experience,
            types_1.PageId.Projects,
            types_1.PageId.Skills,
            types_1.PageId.Contact,
        ];
        fc.assert(fc.property(fc.constantFrom(...allPages), (currentPage) => {
            // Set up DOM
            document.body.innerHTML = '<div id="nav-container"></div>';
            // Initialize navigation
            (0, navigation_1.initNavigation)(currentPage);
            const navContainer = document.getElementById('nav-container');
            (0, vitest_1.expect)(navContainer).not.toBeNull();
            // Check that all 5 links are present in the DOM
            const navLinks = navContainer.querySelectorAll('.main-nav a');
            (0, vitest_1.expect)(navLinks.length).toBe(5);
            // Check that exactly one link has the active class
            const activeLinks = navContainer.querySelectorAll('.main-nav a.active');
            (0, vitest_1.expect)(activeLinks.length).toBe(1);
            // Verify all expected hrefs are present
            const hrefs = Array.from(navLinks).map(link => link.getAttribute('href'));
            (0, vitest_1.expect)(hrefs).toContain('index.html');
            (0, vitest_1.expect)(hrefs).toContain('experience.html');
            (0, vitest_1.expect)(hrefs).toContain('projects.html');
            (0, vitest_1.expect)(hrefs).toContain('skills.html');
            (0, vitest_1.expect)(hrefs).toContain('contact.html');
        }), { numRuns: 100 });
    });
});
//# sourceMappingURL=navigation.property.test.js.map