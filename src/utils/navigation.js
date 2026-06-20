export const APP_HASH_PREFIX = '#/app';

export function isAppMode() {
  return window.location.hash.startsWith(APP_HASH_PREFIX);
}

export function getViewFromHash() {
  const match = window.location.hash.match(/^#\/app\/(\w+)/);
  const view = match?.[1];
  const valid = ['home', 'dashboard', 'tracker', 'insights', 'actions', 'coach', 'history', 'reports', 'profile'];
  return valid.includes(view) ? view : 'home';
}

export function enterApp(view = 'home') {
  window.location.hash = `${APP_HASH_PREFIX}/${view}`;
}

export function leaveApp() {
  window.location.hash = '';
}
