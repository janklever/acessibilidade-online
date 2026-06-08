import React from 'react';
import { CHECKLIST_DATA } from '../data/checklist-data';
import { SiteFooter, CheckIcon, DotIcon } from '../components/Footer';

export function ToolsPage({ setRoute, accent }) {
  const criteriaCount = CHECKLIST_DATA.length;
  const categoriesCount = new Set(CHECKLIST_DATA.map(item => item.cat)).size;

  return (
    <div className="tools-page" data-screen-label="Ferramentas">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Ferramentas</span>
          </nav>
          <p className="eyebrow">Possibilidades · v1.0</p>
          <h1 className="page-title">Ferramentas</h1>
          <p className="lede">
            Uma suíte de ferramentas projetadas para auxiliar no desenvolvimento, design e auditoria de interfaces acessíveis no fuso brasileiro.
          </p>
        </div>
      </section>

      <section className="tools-list-section container">
        <div className="tool-grid">
          <ToolCard
            num="01"
            title="Checklist"
            tag={`${criteriaCount} critérios · WCAG 2.2 + LBI`}
            status={{ label: 'Disponível', kind: 'success' }}
            desc={`Um checklist auditável organizado em ${categoriesCount} categorias. Filtre por tema, marque o progresso e exporte o relatório em PDF, Markdown ou JSON.`}
            stats={[
              { k: 'Critérios', v: String(criteriaCount) },
              { k: 'Categorias', v: String(categoriesCount) },
              { k: 'Nível', v: 'A · AA · AAA' },
            ]}
            onClick={() => setRoute('ferramentas/checklist')}
            accent={accent}
          />
          <ToolCard
            num="02"
            title="Contraste"
            tag="WCAG 2.2 + APCA + sugestor"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Verificador de contraste que combina o cálculo matemático do WCAG 2.x com o modelo de percepção humana do APCA. Inclui sugestor de cor automático."
            stats={[
              { k: 'Padrões', v: 'WCAG · APCA' },
              { k: 'Sugestor', v: 'Automático' },
              { k: 'Formato', v: 'Hex · RGB' },
            ]}
            onClick={() => setRoute('ferramentas/contraste')}
            accent={accent}
          />
          <ToolCard
            num="03"
            title="Simulador"
            tag="Visão · motora · cognitiva · áudio"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Simula em tempo real condições visuais, cognitivas, motoras e de leitura na interface (como daltonismo, catarata, dislexia, tremores musculares e leitor de tela)."
            stats={[
              { k: 'Condições', v: '10' },
              { k: 'Teclado', v: '100%' },
              { k: 'Suportes', v: 'Imagem / URL / Form' },
            ]}
            onClick={() => setRoute('ferramentas/simulador')}
            accent={accent}
          />
          <ToolCard
            num="04"
            title="Avaliador"
            tag="Auditor estrutural de acessibilidade"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Validador automático de marcação HTML. Analisa elementos de mídia, formulários, botões, títulos estruturais e zoom para dar um relatório e score de acessibilidade."
            stats={[
              { k: 'Validações', v: '9 tipos' },
              { k: 'Custo', v: 'Zero/Browser' },
              { k: 'Score', v: '0 a 100' },
            ]}
            onClick={() => setRoute('ferramentas/avaliador')}
            accent={accent}
          />
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}

function ToolCard({ num, title, tag, desc, stats, status, onClick, disabled, accent }) {
  return (
    <article className={`tool-card ${disabled ? 'is-disabled' : ''}`}>
      <div className="tool-head">
        <span className="tool-num mono">{num}</span>
        <span className={`badge ${status.kind === 'success' ? 'badge-success' : 'badge-warning'}`}>
          {status.kind === 'success' ? <CheckIcon /> : <DotIcon />}
          {status.label}
        </span>
      </div>

      {/* <div className="tool-icon" aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
          <path d="M30 4 L52 17 L52 43 L30 56 L8 43 L8 17 Z"
            stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M30 16 L42 23 L42 37 L30 44 L18 37 L18 23 Z"
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          {num === '01' && (
            <path d="M24 29 L28 33 L36 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {num === '02' && (
            <>
              <circle cx="27" cy="30" r="4" fill="currentColor" />
              <circle cx="33" cy="30" r="4" fill="currentColor" opacity="0.35" />
            </>
          )}
          {num === '03' && (
            <>
              <circle cx="30" cy="30" r="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <circle cx="30" cy="30" r="1.8" fill="currentColor" />
            </>
          )}
          {num === '04' && (
            <>
              <rect x="22" y="20" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <line x1="26" y1="25" x2="34" y2="25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="26" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="26" y1="35" x2="30" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div> */}

      <div className="tool-body">
        <h2 className="tool-title">{title}</h2>
        <p className="tool-tag mono">{tag}</p>
        <p className="tool-desc">{desc}</p>
      </div>

      <div className="tool-stats">
        {stats.map((s, i) => (
          <div className="tool-stat" key={i}>
            <div className="tool-stat-k">{s.k}</div>
            <div className="tool-stat-v mono">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="tool-foot">
        {disabled ? (
          <button className="btn btn-ghost" disabled aria-disabled="true">
            Em desenvolvimento
          </button>
        ) : (
          <button className="btn btn-outline tool-cta" onClick={onClick}>
            Abrir {title.toLowerCase()}
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
