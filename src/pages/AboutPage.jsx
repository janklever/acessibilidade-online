import React from 'react';
import { SiteFooter } from '../components/Footer';
import { CHECKLIST_DATA } from '../data/checklist-data';

export function AboutPage({ setRoute }) {
  const criteriaCount = CHECKLIST_DATA.length;
  const categoriesCount = new Set(CHECKLIST_DATA.map(item => item.cat)).size;

  return (
    <div className="sobre-page" data-screen-label="Sobre">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Sobre</span>
          </nav>
          <p className="eyebrow">Manifesto · v1.0</p>
          <h1 className="page-title">Um hub brasileiro,<br />escrito por quem codifica.</h1>
          <p className="lede">
            Acessibilidade Online nasceu de uma frustração simples: o conteúdo
            mais citado sobre acessibilidade digital não fala português, não
            conhece a LBI e não foi escrito para nosso contexto. Então começamos
            a escrever.
          </p>
        </div>
      </section>

      <section className="sobre-body">
        <div className="container sobre-grid">
          <article className="sobre-col">
            <h2>O que é</h2>
            <p>
              Um ecossistema com três ferramentas e uma biblioteca de conteúdo,
              servido sob um único domínio em subpastas, sem silos, sem subdomínios.
              Tudo ao mesmo tempo em qualquer dispositivo.
            </p>
            <p>
              Cada critério, cada cláusula, cada cor... tudo é auditável.
              A fonte está aberta. O checklist é versionado. Os relatórios são exportáveis.
            </p>
          </article>

          <article className="sobre-col">
            <h2>O que não é</h2>
            <p>
              Não é uma tradução de material estrangeiro. Não é um SaaS com login.
              Não é uma certificadora. Não substitui teste com pessoas com
              deficiências já que, a automação pega ~30% dos problemas, e o resto só
              teste real revela.
            </p>
          </article>

          <article className="sobre-col">
            <h2>Como contribuir</h2>
            <p>
              Projeto de código aberto (licença MIT) com guias e conteúdos sob
              licença CC-BY-SA 4.0. Aceitamos pull requests de critérios,
              traduções (LIBRAS principalmente), casos de uso e correções.
              Revisão em dupla, sempre com uma pessoa com deficiência no
              processo.
            </p>
            <p>
              <a href="https://github.com/janklever/acessibilidade-online" target="_blank" rel="noopener noreferrer">Repositório</a> · <a href="https://github.com/janklever/acessibilidade-online/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Diretrizes de Contribuição</a>
            </p>
          </article>
        </div>
      </section>

      <section className="sobre-stats-section">
        <div className="container">
          <div className="sobre-stats">
            <div className="stat">
              <div className="stat-value mono">{criteriaCount}</div>
              <div className="stat-label">Critérios auditáveis</div>
            </div>
            <div className="stat">
              <div className="stat-value mono">{categoriesCount}</div>
              <div className="stat-label">Categorias de a11y</div>
            </div>
            <div className="stat">
              <div className="stat-value mono">AA</div>
              <div className="stat-label">Nível mínimo garantido</div>
            </div>
            <div className="stat">
              <div className="stat-value mono">Lc 78</div>
              <div className="stat-label">APCA do corpo</div>
            </div>
            <div className="stat">
              <div className="stat-value mono">100%</div>
              <div className="stat-label">Navegável por teclado</div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
