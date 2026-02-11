import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PageId } from './shared/types';

describe('About Page', () => {
  let initNavigation: any;
  let initAnimations: any;
  let saveToStorage: any;
  let loadFromStorage: any;

  beforeEach(async () => {
    document.body.innerHTML = '';
    localStorage.clear();
    vi.resetModules();

    // Mock the modules before importing
    initNavigation = vi.fn();
    initAnimations = vi.fn();
    saveToStorage = vi.fn(() => true);
    loadFromStorage = vi.fn(() => 0);

    vi.doMock('./shared/navigation', () => ({
      initNavigation,
    }));

    vi.doMock('./shared/animations', () => ({
      initAnimations,
    }));

    vi.doMock('./shared/storage', () => ({
      saveToStorage,
      loadFromStorage,
    }));
  });

  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('should initialize navigation with About page ID', async () => {
    await import('./about');

    expect(initNavigation).toHaveBeenCalledWith(PageId.About);
  });

  it('should initialize animations', async () => {
    await import('./about');

    expect(initAnimations).toHaveBeenCalled();
  });

  it('should track page views', async () => {
    await import('./about');

    expect(loadFromStorage).toHaveBeenCalledWith('about-page-views');
    expect(saveToStorage).toHaveBeenCalledWith('about-page-views', 1);
  });

  it('should increment page view count on subsequent visits', async () => {
    // Mock returning 5 previous views
    loadFromStorage.mockReturnValue(5);
    
    await import('./about');

    expect(saveToStorage).toHaveBeenCalledWith('about-page-views', 6);
  });
});
