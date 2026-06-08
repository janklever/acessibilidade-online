import React, { useState, useMemo } from 'react';
import { SiteFooter } from '../components/Footer';
import { LEARNING_DATA } from '../data/references-data';
import { ArrowOutwardIcon } from '../components/Footer';

// Local Icons for resource types
function ArticleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ReferenceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ReferencesPage({ setRoute }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'article', label: 'Artigos' },
    { id: 'book', label: 'Livros' },
    { id: 'tool', label: 'Ferramentas' },
    { id: 'doc', label: 'Documentação' }
  ];

  const shuffledData = useMemo(() => {
    const arr = [...LEARNING_DATA];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const filteredReferences = useMemo(() => {
    return shuffledData.filter(item => {
      const matchesType = activeType === 'all' || item.type === activeType;

      const cleanQuery = searchQuery.toLowerCase().trim();
      const matchesSearch = !cleanQuery ||
        item.title.toLowerCase().includes(cleanQuery) ||
        item.description.toLowerCase().includes(cleanQuery) ||
        item.author.toLowerCase().includes(cleanQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(cleanQuery));

      return matchesType && matchesSearch;
    });
  }, [shuffledData, searchQuery, activeType]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getResourceTypeDetails = (type) => {
    switch (type) {
      case 'article':
        return { label: 'Artigo', icon: <ArticleIcon />, className: 'type-article' };
      case 'book':
        return { label: 'Livro', icon: <BookIcon />, className: 'type-book' };
      case 'tool':
        return { label: 'Ferramenta', icon: <ToolIcon />, className: 'type-tool' };
      case 'doc':
        return { label: 'Documentação', icon: <DocIcon />, className: 'type-doc' };
      default:
        return { label: 'Referência', icon: <ReferenceIcon />, className: 'type-reference' };
    }
  };

  return (
    <div className="references-page" data-screen-label="Referências">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Referências</span>
          </nav>
          <p className="eyebrow">Aprendizados · v1.0</p>
          <h1 className="page-title">Explore e domine<br />a acessibilidade digital</h1>
          <p className="lede">
            Uma seleção com curadoria de artigos, livros, notebooks interativos e referências
            técnicas oficiais para auxiliar na sua jornada de exploração de interfaces acessíveis.
          </p>
        </div>
      </section>

      <section className="references-body">
        <div className="container">
          <div className="references-controls">
            {/* Filtros */}
            <nav className="references-filters" aria-label="Filtrar por tipo de recurso">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-chip ${activeType === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveType(cat.id)}
                  aria-pressed={activeType === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Busca */}
            <div className="references-search">
              <span className="search-icon"><SearchIcon /></span>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar recursos, tags ou autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar recursos"
              />
              {searchQuery && (
                <button
                  className="clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Limpar campo de busca"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Grid de recursos */}
          {filteredReferences.length > 0 ? (
            <div className="references-grid">
              {filteredReferences.map(resource => {
                const typeInfo = getResourceTypeDetails(resource.type);
                return (
                  <a
                    key={resource.id}
                    href={resource.url}
                    className={`references-card card-${resource.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="card-header-meta">
                      <span className={`resource-type-badge ${typeInfo.className}`}>
                        {typeInfo.icon}
                        <span>{typeInfo.label}</span>
                      </span>
                      <span className="card-arrow" aria-hidden="true">
                        <ArrowOutwardIcon />
                      </span>
                    </div>

                    <h2 className="card-title">{resource.title}</h2>
                    <div className="card-author">Por {resource.author}</div>

                    <p className="card-description">{resource.description}</p>

                    <div className="card-tags">
                      {resource.tags.map(tag => (
                        <span key={tag} className="card-tag">{tag}</span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="references-empty" role="status">
              <h2>Nenhum recurso encontrado</h2>
              <p>Não encontramos nenhum item correspondente aos critérios de busca ou filtro selecionados.</p>
              <button
                className="clear-search-link a"
                onClick={() => { setActiveType('all'); setSearchQuery(''); }}
              >
                Limpar filtros e busca
              </button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
