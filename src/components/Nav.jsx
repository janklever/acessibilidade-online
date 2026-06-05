import React, { useState, useEffect } from 'react';

export function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
        stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M16 10 L22 13.5 L22 20.5 L16 24 L10 20.5 L10 13.5 Z"
        fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function Nav({ route, setRoute, theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'ferramentas', label: 'Ferramentas' },
    { id: 'referencias', label: 'Referências' },
  ];

  const isTabActive = (id) => {
    if (id === 'ferramentas') {
      return route === 'ferramentas' || route.startsWith('ferramentas/');
    }
    return route === id;
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="site-nav">
      <a href="#main" className="skip-link">Pular para o conteúdo</a>
      <div className="nav-inner">
        <a href="/" className="nav-brand"
          onClick={(e) => { e.preventDefault(); setRoute('hub'); setIsMenuOpen(false); }}
          aria-label="Acessibilidade Online — ir para início">
          <span className="brand-mark" aria-hidden="true"><Logo size={22} /></span>
          <span className="brand-text">
            <span className="brand-root">Acessibilidade</span>
            &nbsp;
            <span className="brand-tld">Online</span>
          </span>
        </a>

        <nav className="nav-main" aria-label="Navegação principal">
          {items.map(item => (
            <a key={item.id}
              href={`/${item.id}`}
              className={`nav-link ${isTabActive(item.id) ? 'is-active' : ''}`}
              aria-current={isTabActive(item.id) ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); setRoute(item.id); }}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn theme-toggle-desktop"
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a7.5 7.5 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <button
            className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="hamburger-lines">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? 'is-active' : ''}`}>
        <nav className="mobile-menu-links" aria-label="Navegação móvel">
          {items.map(item => (
            <a key={item.id}
              href={`/${item.id}`}
              className={`mobile-nav-link ${isTabActive(item.id) ? 'is-active' : ''}`}
              aria-current={isTabActive(item.id) ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setRoute(item.id);
                setIsMenuOpen(false);
              }}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <button className="theme-toggle-mobile"
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span>Tema claro</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a7.5 7.5 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <span>Tema escuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
