import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isAppMode, getViewFromHash, enterApp, leaveApp, APP_HASH_PREFIX } from './navigation';

describe('Navigation Logic', () => {
  beforeEach(() => {
    // Mock window.location
    vi.stubGlobal('location', {
      hash: '',
    });
  });

  it('detects app mode correctly', () => {
    window.location.hash = `${APP_HASH_PREFIX}/tracker`;
    expect(isAppMode()).toBe(true);

    window.location.hash = '';
    expect(isAppMode()).toBe(false);

    window.location.hash = '#/other';
    expect(isAppMode()).toBe(false);
  });

  it('resolves views from hash correctly', () => {
    window.location.hash = `${APP_HASH_PREFIX}/dashboard`;
    expect(getViewFromHash()).toBe('dashboard');

    window.location.hash = `${APP_HASH_PREFIX}/unknown`;
    expect(getViewFromHash()).toBe('home');

    window.location.hash = '';
    expect(getViewFromHash()).toBe('home');
  });

  it('updates hash when entering app', () => {
    enterApp('insights');
    expect(window.location.hash).toBe(`${APP_HASH_PREFIX}/insights`);
  });

  it('clears hash when leaving app', () => {
    window.location.hash = `${APP_HASH_PREFIX}/tracker`;
    leaveApp();
    expect(window.location.hash).toBe('');
  });
});
