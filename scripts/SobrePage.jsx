// Sobre page — manifesto + team + methodology
const SobrePage = ({ setRoute }) => {
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
          <h1 className="page-title">Um hub brasileiro,<br/>escrito por quem codifica.</h1>
          <p className="lede">
            acessibilidade.online nasceu de uma frustração simples: o conteúdo
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
              Um ecossistema aberto de três ferramentas e uma biblioteca de conteúdo,
              servido sob um único domínio em subpastas — sem silos, sem subdomínios.
              Tudo ao mesmo tempo em qualquer dispositivo.
            </p>
            <p>
              Cada critério, cada cláusula, cada cor — é auditável.
              A fonte está aberta. O checklist é versionado. Os relatórios são exportáveis.
            </p>
          </article>

          <article className="sobre-col">
            <h2>O que não é</h2>
            <p>
              Não é uma tradução de material estrangeiro. Não é um SaaS com login.
              Não é uma certificadora. Não substitui teste com pessoas com
              deficiências — automação pega ~30% dos problemas; o resto só
              teste real revela.
            </p>
          </article>

          <article className="sobre-col">
            <h2>Como contribuir</h2>
            <p>
              Repositório aberto sob licença CC-BY-SA 4.0. Aceitamos pull requests
              de critérios, traduções (LIBRAS principalmente), casos de uso e
              correções. Revisão em dupla, sempre com uma pessoa com deficiência
              no processo.
            </p>
            <p>
              <a href="#">Repositório</a> · <a href="#">Diretrizes</a> · <a href="#">Canal no Discord</a>
            </p>
          </article>
        </div>
      </section>

      <section className="sobre-stats-section">
        <div className="container">
          <div className="sobre-stats">
            <div className="stat">
              <div className="stat-value mono">71</div>
              <div className="stat-label">Critérios auditáveis</div>
            </div>
            <div className="stat">
              <div className="stat-value mono">16</div>
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

      <SiteFooter setRoute={setRoute}/>
    </div>
  );
};

// Simulator placeholder page — transparent about not being ready
const SimuladorPage = ({ setRoute }) => {
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
              <DotIcon/> Em desenvolvimento
            </span>
          </div>
          <h1 className="page-title">Simulador de visão</h1>
          <p className="lede">
            Como pessoas com diferentes condições visuais veem sua interface.
            Oito condições simuladas — todas operáveis por teclado, sem drag.
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
          Entrega prevista: <strong>Q3/2026</strong>. Quer contribuir com a implementação
          dos shaders CSS ou com o teste de usuários?
          <a href="#"> Fale com a gente</a>.
        </p>
      </section>

      <SiteFooter setRoute={setRoute}/>
    </div>
  );
};

window.SobrePage = SobrePage;
window.SimuladorPage = SimuladorPage;
