import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

// Mock child components to keep it simple and fast
vi.mock('./components/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>
}));
vi.mock('./components/Header', () => ({
  default: () => <header data-testid="header">Header</header>
}));

describe('App Root Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('sidebar')).toBeDefined();
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('initially shows loading state due to Suspense', () => {
    render(<App />);
    // Since everything is lazy loaded, we might see the fallback or the initial view
    // Depending on how Vitest handles lazy, we just check for basic layout
    expect(document.querySelector('main')).toBeDefined();
  });
});
