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
const types_1 = require("./shared/types");
(0, vitest_1.describe)('About Page', () => {
    let initNavigation;
    let initAnimations;
    let saveToStorage;
    let loadFromStorage;
    (0, vitest_1.beforeEach)(async () => {
        document.body.innerHTML = '';
        localStorage.clear();
        vitest_1.vi.resetModules();
        // Mock the modules before importing
        initNavigation = vitest_1.vi.fn();
        initAnimations = vitest_1.vi.fn();
        saveToStorage = vitest_1.vi.fn(() => true);
        loadFromStorage = vitest_1.vi.fn(() => 0);
        vitest_1.vi.doMock('./shared/navigation', () => ({
            initNavigation,
        }));
        vitest_1.vi.doMock('./shared/animations', () => ({
            initAnimations,
        }));
        vitest_1.vi.doMock('./shared/storage', () => ({
            saveToStorage,
            loadFromStorage,
        }));
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.resetModules();
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('should initialize navigation with About page ID', async () => {
        await Promise.resolve().then(() => __importStar(require('./about')));
        (0, vitest_1.expect)(initNavigation).toHaveBeenCalledWith(types_1.PageId.About);
    });
    (0, vitest_1.it)('should initialize animations', async () => {
        await Promise.resolve().then(() => __importStar(require('./about')));
        (0, vitest_1.expect)(initAnimations).toHaveBeenCalled();
    });
    (0, vitest_1.it)('should track page views', async () => {
        await Promise.resolve().then(() => __importStar(require('./about')));
        (0, vitest_1.expect)(loadFromStorage).toHaveBeenCalledWith('about-page-views');
        (0, vitest_1.expect)(saveToStorage).toHaveBeenCalledWith('about-page-views', 1);
    });
    (0, vitest_1.it)('should increment page view count on subsequent visits', async () => {
        // Mock returning 5 previous views
        loadFromStorage.mockReturnValue(5);
        await Promise.resolve().then(() => __importStar(require('./about')));
        (0, vitest_1.expect)(saveToStorage).toHaveBeenCalledWith('about-page-views', 6);
    });
});
//# sourceMappingURL=about.test.js.map