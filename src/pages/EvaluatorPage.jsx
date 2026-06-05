import React from 'react';
import { SiteFooter } from '../components/Footer';

export function EvaluatorPage({ setRoute }) {
  const [inputType, setInputType] = React.useState('url'); // 'url' | 'html'
  const [url, setUrl] = React.useState('');
  const [htmlCode, setHtmlCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [report, setReport] = React.useState(null);
  const [showScope, setShowScope] = React.useState(false);

  // Fallback public CORS proxy if the Netlify function is not available or fails
  const CORS_PROXY = 'https://api.allorigins.win/get?url=';

  const runAudit = (htmlText, sourceName) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const issues = [];
      let passedCount = 0;

      // 1. Language Audit
      const htmlEl = doc.querySelector('html');
      const lang = htmlEl ? htmlEl.getAttribute('lang') : null;
      if (!htmlEl || !lang) {
        issues.push({
          id: 'lang-missing',
          severity: 'critical',
          category: 'Geral',
          title: 'Idioma do documento não definido',
          desc: 'O elemento HTML principal está sem o atributo "lang" (ex: <html lang="pt-BR">). Isso impede leitores de tela de pronunciarem o texto corretamente.',
          fix: 'Adicione o atributo "lang" à tag <html>, definindo o idioma principal da página (ex: lang="pt-BR").'
        });
      } else if (lang.trim() === '') {
        issues.push({
          id: 'lang-empty',
          severity: 'critical',
          category: 'Geral',
          title: 'Idioma do documento está vazio',
          desc: 'O atributo "lang" existe na tag <html>, mas está vazio.',
          fix: 'Defina o idioma principal no atributo "lang", como lang="pt-BR".'
        });
      } else {
        passedCount++;
      }

      // 2. Title Audit
      const titleEl = doc.querySelector('title');
      const titleText = titleEl ? titleEl.textContent.trim() : '';
      if (!titleEl || titleText === '') {
        issues.push({
          id: 'title-missing',
          severity: 'critical',
          category: 'Geral',
          title: 'Título da página ausente ou vazio',
          desc: 'A página não possui a tag <title> no <head> ou o título está em branco. O título é a primeira informação lida pelos leitores de tela ao carregar a página.',
          fix: 'Adicione uma tag <title> descritiva dentro do <head> do seu documento.'
        });
      } else {
        passedCount++;
      }

      // 3. Viewport Zoom Audit
      const viewportEl = doc.querySelector('meta[name="viewport"]');
      if (viewportEl) {
        const content = viewportEl.getAttribute('content') || '';
        const disablesZoom = content.includes('user-scalable=no') ||
          content.includes('maximum-scale=1') ||
          content.includes('maximum-scale=0');
        if (disablesZoom) {
          issues.push({
            id: 'viewport-zoom-disabled',
            severity: 'critical',
            category: 'Acessibilidade Móvel',
            title: 'Zoom do usuário bloqueado no celular',
            desc: 'O atributo viewport contém instruções que impedem o usuário de ampliar (zoom) a página em dispositivos móveis (ex: "user-scalable=no"). Isso prejudica muito pessoas com baixa visão.',
            fix: 'Remova "user-scalable=no" e garanta que "maximum-scale" seja pelo menos 2 (ou remova ambos).'
          });
        } else {
          passedCount++;
        }
      }

      // 4. Images Alt Audit
      const images = Array.from(doc.querySelectorAll('img'));
      const missingAltImages = [];
      const decorativeImages = [];

      images.forEach((img, idx) => {
        const alt = img.getAttribute('alt');
        const src = img.getAttribute('src') || `Imagem #${idx + 1}`;

        if (alt === null) {
          missingAltImages.push(src);
        } else if (alt.trim() === '') {
          decorativeImages.push(src);
        }
      });

      if (missingAltImages.length > 0) {
        issues.push({
          id: 'image-alt-missing',
          severity: 'critical',
          category: 'Mídia',
          title: `Imagens sem atributo "alt" (${missingAltImages.length})`,
          desc: 'Imagens que não contêm o atributo "alt" fazem com que leitores de tela leiam o nome do arquivo da imagem, o que é confuso e inútil.',
          fix: 'Adicione alt="descrição da imagem" para imagens informativas, ou alt="" (vazio) se a imagem for meramente decorativa.',
          items: missingAltImages
        });
      } else if (images.length > 0) {
        passedCount++;
      }

      if (decorativeImages.length > 0) {
        issues.push({
          id: 'image-alt-empty-info',
          severity: 'recommendation',
          category: 'Mídia',
          title: `Imagens marcadas como decorativas (${decorativeImages.length})`,
          desc: 'Essas imagens possuem alt="" (vazio). Elas serão ignoradas por leitores de tela. Certifique-se de que elas são realmente apenas decorativas e não trazem conteúdo informativo importante.',
          fix: 'Verifique se alguma dessas imagens precisa de descrição de texto e atualize o atributo "alt" se necessário.',
          items: decorativeImages
        });
      }

      // 5. Headings Hierarchy Audit
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const h1s = headings.filter(h => h.tagName === 'H1');

      if (headings.length === 0) {
        issues.push({
          id: 'headings-none',
          severity: 'warning',
          category: 'Estrutura',
          title: 'Nenhum título estrutural (H1-H6) encontrado',
          desc: 'Títulos ajudam usuários de leitores de tela a navegar rapidamente pelas seções da página. Sem eles, o documento vira um bloco único de texto difícil de navegar.',
          fix: 'Use tags de título (<h1> a <h6>) para organizar as seções do seu conteúdo de forma lógica.'
        });
      } else {
        passedCount++;

        if (h1s.length === 0) {
          issues.push({
            id: 'headings-no-h1',
            severity: 'warning',
            category: 'Estrutura',
            title: 'Ausência de título principal (H1)',
            desc: 'Cada página deve ter pelo menos um título H1 que descreva o tema principal daquela tela.',
            fix: 'Adicione um título <h1> no início da área principal de conteúdo.'
          });
        } else if (h1s.length > 1) {
          issues.push({
            id: 'headings-multiple-h1',
            severity: 'recommendation',
            category: 'Estrutura',
            title: `Múltiplos títulos H1 encontrados (${h1s.length})`,
            desc: 'Embora permitido pelo HTML5, o uso de mais de um H1 pode confundir a hierarquia mental de navegação do usuário. Recomenda-se apenas um H1 por página.',
            fix: 'Mantenha apenas um <h1> principal e converta os outros em <h2> para indicar seções secundárias.'
          });
        }

        // Check level skips
        let lastLevel = 0;
        const skippedHeadings = [];

        headings.forEach(h => {
          const currentLevel = parseInt(h.tagName[1]);
          if (lastLevel > 0 && currentLevel > lastLevel + 1) {
            skippedHeadings.push(`<${h.tagName.toLowerCase()}> - "${h.textContent.trim().substring(0, 30)}..."`);
          }
          lastLevel = currentLevel;
        });

        if (skippedHeadings.length > 0) {
          issues.push({
            id: 'headings-skipped',
            severity: 'warning',
            category: 'Estrutura',
            title: 'Hierarquia de títulos quebrada',
            desc: 'Títulos que pulam níveis (ex: H2 seguido diretamente por H4, sem um H3 no meio) prejudicam a navegação sequencial lógica por teclado.',
            fix: 'Ajuste as tags de título para que sigam uma sequência direta sem pular níveis (ex: H1 -> H2 -> H3).',
            items: skippedHeadings
          });
        } else {
          passedCount++;
        }
      }

      // 6. Form Inputs Labels Audit
      const inputs = Array.from(doc.querySelectorAll('input:not([type="submit"]):not([type="button"]):not([type="image"]):not([type="hidden"]), textarea, select'));
      const unlabeledInputs = [];

      inputs.forEach((input, idx) => {
        const id = input.getAttribute('id');
        const name = input.getAttribute('name') || `Campo #${idx + 1}`;
        const type = input.getAttribute('type') || input.tagName.toLowerCase();

        // Check if wrapped in <label>
        let hasLabel = !!input.closest('label');

        // Check if referenced by label[for]
        if (!hasLabel && id) {
          const associatedLabel = doc.querySelector(`label[for="${id}"]`);
          if (associatedLabel) hasLabel = true;
        }

        // Check for aria-label or aria-labelledby
        if (!hasLabel && (input.getAttribute('aria-label') || input.getAttribute('aria-labelledby'))) {
          hasLabel = true;
        }

        if (!hasLabel) {
          unlabeledInputs.push(`${name} (tipo: ${type}${id ? `, id: ${id}` : ''})`);
        }
      });

      if (unlabeledInputs.length > 0) {
        issues.push({
          id: 'form-label-missing',
          severity: 'critical',
          category: 'Formulários',
          title: `Campos de formulário sem etiqueta/rótulo (${unlabeledInputs.length})`,
          desc: 'Campos de entrada que não têm uma etiqueta (<label>) associada deixam usuários de leitores de tela sem saber qual informação devem digitar.',
          fix: 'Adicione uma tag <label> com o atributo "for" apontando para o "id" do input correspondente, ou envolva o input com a tag <label>.',
          items: unlabeledInputs
        });
      } else if (inputs.length > 0) {
        passedCount++;
      }

      // 7. Buttons Content Audit
      const buttons = Array.from(doc.querySelectorAll('button, input[type="submit"], input[type="button"]'));
      const emptyButtons = [];

      buttons.forEach((btn, idx) => {
        const text = btn.textContent ? btn.textContent.trim() : '';
        const val = btn.getAttribute('value') || '';
        const alt = btn.getAttribute('alt') || '';
        const ariaLabel = btn.getAttribute('aria-label') || '';
        const ariaLabelledby = btn.getAttribute('aria-labelledby') || '';

        // Check if button has an image with alt inside
        const imgInside = btn.querySelector('img');
        const imgAlt = imgInside ? imgInside.getAttribute('alt') || '' : '';

        const hasText = text !== '' || val !== '' || alt !== '' || ariaLabel !== '' || ariaLabelledby !== '' || (imgInside && imgAlt !== '');

        if (!hasText) {
          emptyButtons.push(btn.outerHTML.substring(0, 100) + '...');
        }
      });

      if (emptyButtons.length > 0) {
        issues.push({
          id: 'button-empty',
          severity: 'critical',
          category: 'Interação',
          title: `Botões vazios ou inacessíveis (${emptyButtons.length})`,
          desc: 'Botões sem texto legível ou rótulo ARIA são lidos apenas como "botão" pelos leitores de tela. O usuário não sabe o que o botão faz.',
          fix: 'Adicione texto visível ao botão ou insira um atributo aria-label="Ação do botão" explicando sua finalidade.',
          items: emptyButtons
        });
      } else if (buttons.length > 0) {
        passedCount++;
      }

      // 8. Generic Links Audit
      const links = Array.from(doc.querySelectorAll('a'));
      const genericWords = ['clique aqui', 'clica aqui', 'aqui', 'mais', 'leia mais', 'saiba mais', 'veja mais', 'ver mais', 'clique', 'click here', 'here', 'read more', 'more', 'link', 'info'];
      const badLinks = [];

      links.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (genericWords.includes(text)) {
          badLinks.push(`Link para "${link.getAttribute('href') || '#'}" com texto "${link.textContent.trim()}"`);
        }
      });

      if (badLinks.length > 0) {
        issues.push({
          id: 'link-generic-text',
          severity: 'warning',
          category: 'Navegação',
          title: `Links com textos ambíguos (${badLinks.length})`,
          desc: 'Links com textos genéricos como "clique aqui" ou "saiba mais" prejudicam quem navega usando lista de links em leitores de tela, pois perdem o contexto de para onde o link aponta.',
          fix: 'Escreva textos de link informativos e descritivos por si só (ex: "Leia nosso guia sobre acessibilidade" em vez de "Para ler o guia clique aqui").',
          items: badLinks
        });
      } else if (links.length > 0) {
        passedCount++;
      }

      // 9. Semantic Landmarks Audit
      const landmarks = ['header', 'nav', 'main', 'footer', 'aside'];
      const foundLandmarks = landmarks.filter(l => doc.querySelector(l) !== null);
      if (foundLandmarks.length < 2) {
        issues.push({
          id: 'semantic-landmarks-missing',
          severity: 'recommendation',
          category: 'Estrutura',
          title: 'Poucos marcos semânticos encontrados',
          desc: 'Tags semânticas estruturais como <header>, <nav>, <main>, e <footer> ajudam na navegação e entendimento do layout.',
          fix: 'Substitua divs estruturais genéricas pelas tags semânticas correspondentes do HTML5.'
        });
      } else {
        passedCount++;
      }

      // Calculate score
      let score = 100;
      const criticals = issues.filter(i => i.severity === 'critical');
      const warnings = issues.filter(i => i.severity === 'warning');

      score -= (criticals.length * 12);
      score -= (warnings.length * 6);
      if (score < 0) score = 0;

      setReport({
        source: sourceName,
        score,
        totalIssues: issues.length,
        criticalCount: criticals.length,
        warningCount: warnings.length,
        recommendationCount: issues.filter(i => i.severity === 'recommendation').length,
        passedChecks: passedCount,
        issues
      });
      setIsLoading(false);
    } catch (err) {
      setError(`Falha ao processar e auditar o HTML: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError(null);
    setReport(null);
    setIsLoading(true);

    if (inputType === 'url') {
      if (!url) {
        setError('Por favor, informe uma URL.');
        setIsLoading(false);
        return;
      }

      let targetUrl = url.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
        setUrl(targetUrl);
      }

      try {
        // First, try the local/production Netlify function
        const netlifyUrl = `/.netlify/functions/fetch-html?url=${encodeURIComponent(targetUrl)}`;
        const res = await fetch(netlifyUrl);

        if (res.ok) {
          const htmlText = await res.text();
          runAudit(htmlText, targetUrl);
        } else {
          // If Netlify function fails (e.g. running vite local without netlify dev), fall back to public proxy
          console.warn('Netlify function failed or returned error. Trying CORS proxy fallback...');
          const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
          const proxyRes = await fetch(proxyUrl);

          if (!proxyRes.ok) {
            throw new Error(`Serviço de busca indisponível (HTTP ${proxyRes.status})`);
          }

          const proxyData = await proxyRes.json();
          if (proxyData.contents) {
            runAudit(proxyData.contents, targetUrl);
          } else {
            throw new Error('Formato de resposta do proxy inválido.');
          }
        }
      } catch (err) {
        setError(`Não foi possível carregar a URL informada. Erro: ${err.message}. Tente copiar e colar o código HTML da página na aba ao lado.`);
        setIsLoading(false);
      }
    } else {
      if (!htmlCode.trim()) {
        setError('Por favor, cole o código HTML para análise.');
        setIsLoading(false);
        return;
      }
      runAudit(htmlCode, 'Código HTML Colado');
    }
  };

  return (
    <div className="eval-page" data-screen-label="Avaliador">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <a href="#/ferramentas" onClick={(e) => { e.preventDefault(); setRoute('ferramentas'); }}>Ferramentas</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Avaliador</span>
          </nav>
          <p className="eyebrow">Ferramenta 04</p>
          <h1 className="page-title">Avaliador de acessibilidade</h1>
          <p className="lede">
            Analise a estrutura semântica da sua página em segundos. Identifique falhas críticas de navegação, imagens sem descrição e erros de formulários.
          </p>
        </div>
      </section>

      <section className="eval-body container">
        <div className="eval-scope-card">
          <button
            type="button"
            className="scope-toggle-btn"
            onClick={() => setShowScope(!showScope)}
            aria-expanded={showScope}
            aria-controls="eval-scope-table-container"
          >
            <span className="toggle-title">O que esta ferramenta avalia?</span>
            <svg
              className={`chevron-icon ${showScope ? 'is-expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showScope && (
            <div id="eval-scope-table-container" className="scope-content-wrapper">
              <p className="scope-intro">
                Esta ferramenta realiza uma auditoria estática do código HTML. Abaixo estão listados os critérios que conseguimos analisar de forma automatizada e aqueles que requerem testes manuais ou ferramentas externas de runtime:
              </p>
              <div className="table-wrapper">
                <table className="scope-table">
                  <thead>
                    <tr>
                      <th scope="col">Categoria</th>
                      <th scope="col" className="status-header status-evaluated">É avaliado</th>
                      <th scope="col" className="status-header status-not-evaluated">Não é avaliado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="cat-cell"><strong>Geral</strong></td>
                      <td>
                        <ul>
                          <li>Presença e preenchimento do atributo <code>lang</code> na tag <code>&lt;html&gt;</code>.</li>
                          <li>Presença e conteúdo do título da página (tag <code>&lt;title&gt;</code>).</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Coerência entre o idioma definido no código e o idioma real do texto.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="cat-cell"><strong>Mídia</strong></td>
                      <td>
                        <ul>
                          <li>Presença do atributo <code>alt</code> em imagens (<code>&lt;img&gt;</code>).</li>
                          <li>Identificação de imagens decorativas (com <code>alt=""</code>).</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Qualidade e exatidão da descrição alternativa.</li>
                          <li>Legendas e audiodescrições em vídeos e áudios.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="cat-cell"><strong>Estrutura</strong></td>
                      <td>
                        <ul>
                          <li>Existência e ordem hierárquica dos títulos (<code>&lt;h1&gt;</code> a <code>&lt;h6&gt;</code>).</li>
                          <li>Garantia de título <code>&lt;h1&gt;</code> principal único.</li>
                          <li>Uso de marcos semânticos (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, etc.).</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Ordem lógica de leitura visual versus ordem de tabulação no DOM.</li>
                          <li>Presença de links de atalho ("Ir para o conteúdo").</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="cat-cell"><strong>Formulários</strong></td>
                      <td>
                        <ul>
                          <li>Associação de <code>&lt;label&gt;</code> aos campos de entrada (via ID/for, encapsulamento ou <code>aria-label</code>/<code>aria-labelledby</code>).</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Exibição e leitura de mensagens de validação e erros em tempo real.</li>
                          <li>Clareza e instrução de preenchimento dos campos.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="cat-cell"><strong>Interação</strong></td>
                      <td>
                        <ul>
                          <li>Presença de rótulos/texto acessível em botões.</li>
                          <li>Evitação de links genéricos ou ambíguos (ex: "clique aqui", "saiba mais").</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Operabilidade total por teclado e ausência de armadilhas (keyboard traps).</li>
                          <li>Foco visual claro (outline) em elementos ativos.</li>
                          <li>Comportamento dinâmico de modais, menus suspensos e abas.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="cat-cell"><strong>Aparência &amp; CSS</strong></td>
                      <td>
                        <ul>
                          <li>Verificação do bloqueio de zoom em dispositivos móveis (viewport com <code>user-scalable=no</code> ou limite de escala inadequado).</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Contraste de cor mínimo entre texto e fundo.</li>
                          <li>Responsividade da página (reflow) e ausência de perda de conteúdo ao dar zoom.</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="eval-card">
          <div className="eval-tabs" role="tablist" aria-label="Opções de análise">
            <button
              className={`eval-tab ${inputType === 'url' ? 'is-active' : ''}`}
              role="tab"
              aria-selected={inputType === 'url'}
              onClick={() => { setInputType('url'); setError(null); }}
            >
              Analisar URL
            </button>
            <button
              className={`eval-tab ${inputType === 'html' ? 'is-active' : ''}`}
              role="tab"
              aria-selected={inputType === 'html'}
              onClick={() => { setInputType('html'); setError(null); }}
            >
              Colar código HTML
            </button>
          </div>

          <form onSubmit={handleAnalyze} className="eval-form">
            {inputType === 'url' ? (
              <div className="form-group">
                <label htmlFor="url-input" className="form-label">Endereço da Página (URL)</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="url-input"
                    className="form-input"
                    placeholder="https://exemplo.com.br"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Analisando...' : 'Avaliar'}
                  </button>
                </div>
                <span className="input-help">Digite a URL completa da página pública que deseja auditar.</span>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="html-input" className="form-label">Código Fonte HTML</label>
                <textarea
                  id="html-input"
                  className="form-input form-textarea font-mono"
                  placeholder="<!DOCTYPE html>&#10;<html lang='pt-BR'>&#10;..."
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  disabled={isLoading}
                  rows="10"
                />
                <span className="input-help">Cole o código-fonte HTML completo ou parte dele para validação instantânea.</span>
                <div className="form-actions-row">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Analisando...' : 'Avaliar Código'}
                  </button>
                </div>
              </div>
            )}
          </form>

          {error && (
            <div className="eval-error" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>{error}</div>
            </div>
          )}
        </div>

        {/* Audit Report */}
        {report && (
          <div className="eval-report" aria-live="polite">
            <div className="report-summary-card">
              <div className="summary-score-sec">
                <div className="score-ring" style={{ '--score': report.score }}>
                  <div className="score-inner">
                    <span className="score-val">{report.score}</span>
                    <span className="score-label">score</span>
                  </div>
                </div>
                <div className="score-explanation">
                  <h2>Análise concluída</h2>
                  <p className="source-link mono truncate">{report.source}</p>
                  <div className="score-badge-row">
                    <span className={`badge ${report.score >= 90 ? 'badge-success' : report.score >= 50 ? 'badge-warning' : 'badge-danger'}`}>
                      {report.score >= 90 ? 'Excelente' : report.score >= 50 ? 'Precisa de melhorias' : 'Crítico'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="summary-stats-grid">
                <div className="stat-box">
                  <span className="stat-num text-danger">{report.criticalCount}</span>
                  <span className="stat-label">Críticos</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num text-warning">{report.warningCount}</span>
                  <span className="stat-label">Alertas</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num text-info">{report.recommendationCount}</span>
                  <span className="stat-label">Sugestões</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num text-success">{report.passedChecks}</span>
                  <span className="stat-label">Validados</span>
                </div>
              </div>
            </div>

            {report.totalIssues === 0 ? (
              <div className="perfect-score-card">
                <div className="celebrate-icon">🎉</div>
                <h3>Nenhuma inconsistência encontrada!</h3>
                <p>O HTML fornecido passou em todas as nossas verificações estruturais de acessibilidade. Excelente trabalho!</p>
              </div>
            ) : (
              <div className="issues-list-section">
                <h3 className="section-title">Oportunidades de Melhoria ({report.totalIssues})</h3>

                <div className="issues-grid">
                  {report.issues.map((issue) => (
                    <article key={issue.id} className={`issue-card is-${issue.severity}`}>
                      <div className="issue-header">
                        <span className={`severity-badge severity-${issue.severity}`}>
                          {issue.severity === 'critical' ? 'Crítico' : issue.severity === 'warning' ? 'Alerta' : 'Sugestão'}
                        </span>
                        <span className="issue-cat font-mono">{issue.category}</span>
                      </div>

                      <h4 className="issue-title">{issue.title}</h4>
                      <p className="issue-desc">{issue.desc}</p>

                      <div className="issue-fix-box">
                        <strong>Como corrigir:</strong>
                        <p>{issue.fix}</p>
                      </div>

                      {issue.items && issue.items.length > 0 && (
                        <div className="issue-items">
                          <strong>Elementos afetados:</strong>
                          <ul className="items-list font-mono">
                            {issue.items.map((item, idx) => (
                              <li key={idx} className="truncate">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
