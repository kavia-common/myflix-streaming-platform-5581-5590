import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * MyFlix Homepage
 * Implements: sticky app bar, filter chips, hero card, content rails carousel, and bottom navigation
 * Mobile-first layout, accessible semantics and ARIA for carousel.
 */

// Simple inline SVG icons to avoid extra deps
const Icon = {
  Cast: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M21 3H3a2 2 0 0 0-2 2v3h2V5h18v11h-7v2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM1 18v3h3a3 3 0 0 0-3-3zm0-4v2a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7zm0-4v2a9 9 0 0 1 9 9h2c0-6.075-4.925-11-11-11z"/>
    </svg>
  ),
  Search: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),
  Profile: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z"/>
    </svg>
  ),
  ChevronDown: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
    </svg>
  ),
  Play: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>
  ),
  Plus: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z"/>
    </svg>
  ),
  Home: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  Games: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7 6h10a5 5 0 1 1 0 10h-1l-2 2h-4l-2-2H7a5 5 0 0 1 0-10zm0 2a3 3 0 0 0 0 6h1.83L11 16h2l2.17-2H17a3 3 0 0 0 0-6H7z"/>
    </svg>
  ),
  Fire: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M13.5 5S12 7 12 9c0 1.5 1 2.5 2.5 2.5S17 10.5 17 9c0-3-3.5-4-3.5-4zM12 3s-6 4-6 10a6 6 0 0 0 12 0c0-6-6-10-6-10z"/>
    </svg>
  ),
  Download: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z"/>
    </svg>
  ),
  More: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 8a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm0 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
    </svg>
  ),
};

// PUBLIC_INTERFACE
export function useThemePreference() {
  /** Hook to manage light/dark data-theme on <html> with local state. */
  const [theme, setTheme] = useState('dark'); // default dark for streaming feel
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return { theme, setTheme };
}

// PUBLIC_INTERFACE
function AppBar({ onToggleTheme }) {
  /** Sticky app bar with title and utility icons. */
  return (
    <header className="app-bar" role="banner">
      <div className="title-group">
        <span className="title-label" aria-label="Profile context">For Labeeb</span>
      </div>
      <div className="utilities" role="group" aria-label="App utilities">
        <button className="icon-btn" aria-label="Cast">
          <Icon.Cast />
        </button>
        <button className="icon-btn" aria-label="Search">
          <Icon.Search />
        </button>
        <button className="icon-btn" aria-label="Account">
          <Icon.Profile />
        </button>
        <button className="icon-btn theme-toggle-mini" onClick={onToggleTheme} aria-label="Toggle theme">
          ☀️
        </button>
      </div>
    </header>
  );
}

// PUBLIC_INTERFACE
function FiltersRow() {
  /** Horizontally scrollable filter chips row. */
  return (
    <section className="filters" aria-label="Content filters">
      <div className="chip-row" role="tablist" aria-label="Browse categories">
        <button className="chip" role="tab" aria-selected="true">TV Shows</button>
        <button className="chip" role="tab" aria-selected="false">Movies</button>
        <button className="chip" role="tab" aria-selected="false">
          Categories <Icon.ChevronDown />
        </button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Hero() {
  /** Featured hero poster card with overlay title, meta and actions. */
  const title = 'The Madness';
  const meta = ['Suspenseful', 'Thriller', 'Conspiracy'];

  return (
    <section className="hero" aria-label="Featured title">
      <div className="poster" role="img" aria-label={`Featured show poster: ${title}`}>
        {/* Placeholder gradient poster; replace with image src when integrating API */}
        <div className="poster-img" />
        <div className="overlay" />
        <div className="badge-title">
          <span className="brand-n" aria-label="Brand N">N</span>
          <h1 className="title">
            THE <span className="title-n">MADNESS</span>
          </h1>
        </div>
        <div className="meta" aria-label="Genres and tags">
          {meta.join(' • ')}
        </div>
      </div>

      <div className="actions" role="group" aria-label="Primary actions">
        <button className="btn primary" aria-label="Play">
          <Icon.Play /> <span>Play</span>
        </button>
        <button className="btn secondary" aria-label="Add to My List">
          <Icon.Plus /> <span>My List</span>
        </button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Rail({ title, cta }) {
  /** Horizontal carousel rail with scroll-snap cards. */
  const items = useMemo(
    () => [
      { id: 1, name: 'Void Runner' },
      { id: 2, name: 'Pixel Siege' },
      { id: 3, name: 'Neon Drift' },
      { id: 4, name: 'Mystic Quest' },
      { id: 5, name: 'Shadow Ops' },
      { id: 6, name: 'Orbital Dash' },
    ],
    []
  );

  return (
    <section className="rail mobile-games" aria-roledescription="carousel" aria-label={title}>
      <div className="header">
        <h2 className="rail-title">{title}</h2>
        <a className="rail-cta" href="#my-list" aria-label={`${cta}`}>{cta} ▸</a>
      </div>
      <div className="carousel" role="group" aria-label={`${title} items`}>
        {items.map((it, idx) => (
          <div
            key={it.id}
            className="card"
            role="group"
            aria-label={`${it.name}, item ${idx + 1} of ${items.length}`}
          >
            <div className="thumb" aria-hidden="true" />
            <div className="caption">{it.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function BottomNav() {
  /** Bottom navigation with 5 tabs (Home active). */
  const tabs = [
    { key: 'home', label: 'Home', icon: Icon.Home, active: true },
    { key: 'games', label: 'Games', icon: Icon.Games },
    { key: 'new', label: 'New & Hot', icon: Icon.Fire },
    { key: 'downloads', label: 'Downloads', icon: Icon.Download },
    { key: 'more', label: 'More', icon: Icon.More },
  ];
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map((t) => {
        const I = t.icon;
        return (
          <button
            key={t.key}
            className={`tab ${t.active ? 'active' : ''}`}
            aria-current={t.active ? 'page' : undefined}
          >
            <I />
            <span className="tab-label">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root: assembles homepage layout and theme toggle. */
  const { theme, setTheme } = useThemePreference();

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="myflix-app" data-testid="myflix-home" style={{ minHeight: '100vh' }}>
      <AppBar onToggleTheme={toggleTheme} />
      <FiltersRow />
      <main>
        <Hero />
        <Rail title="Mobile Games" cta="My List" />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
