import React from 'react';
import { SiteFooter, DotIcon } from '../components/Footer';

export function SimulatorPage({ setRoute }) {
  return (
    <div className="sim-page" data-screen-label="Simulador">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Simulador</span>
          </nav>
          <div className="page-hero-inline">
            <span className="badge badge-warning">
              <DotIcon /> Em desenvolvimento
            </span>
          </div>
          <h1 className="page-title">Simulador de visão</h1>
          <p className="lede">
            Como pessoas com diferentes condições visuais veem sua interface.
            Oito condições simuladas... todas operáveis por teclado, sem drag.
          </p>
        </div>
      </section>

      <section className="sim-body container">
        <div className="sim-grid">
          {[
            { name: 'Protanopia', k: 'Sem cones L (vermelho)', pct: '1.3% dos homens' },
            { name: 'Deuteranopia', k: 'Sem cones M (verde)', pct: '1.2% dos homens' },
            { name: 'Tritanopia', k: 'Sem cones S (azul)', pct: '0.01% da pop.' },
            { name: 'Acromatopsia', k: 'Sem percepção de cor', pct: '1:33.000' },
            { name: 'Catarata', k: 'Turvação do cristalino', pct: '17% após 50 anos' },
            { name: 'Glaucoma', k: 'Perda de campo visual', pct: '2–3% acima de 40' },
            { name: 'Baixa acuidade', k: '20/200 ou menos', pct: 'Baixa visão' },
            { name: 'Foco reduzido', k: 'Simula fadiga/TDAH', pct: 'Cognitivo' },
          ].map((c, i) => (
            <div className="sim-tile" key={i}>
              <div className="sim-tile-name">{c.name}</div>
              <div className="sim-tile-kind">{c.k}</div>
              <div className="sim-tile-pct mono">{c.pct}</div>
            </div>
          ))}
        </div>
        <p className="sim-note">
          Entrega prevista: <strong>Q4/2026</strong>. Quer contribuir com a implementação
          dos shaders CSS ou com o teste de usuários?
          <a href="#"> Fale com a gente</a>.
        </p>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
