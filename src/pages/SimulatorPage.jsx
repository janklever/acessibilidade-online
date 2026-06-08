import React, { useState, useRef, useEffect } from 'react';
import { SiteFooter, DotIcon } from '../components/Footer';
import { VisionFilters } from '../components/VisionFilters';

const CONDITIONS = [
  {
    id: 'normal',
    name: 'Visão padrão',
    k: 'Sem alterações visuais',
    pct: 'Maioria',
    desc: 'Visão normal de cores e nitidez.',
    info: 'Nenhuma condição simulada. Use como base de comparação para as demais visualizações.'
  },
  {
    id: 'protanopia',
    name: 'Protanopia',
    k: 'Sem cones L (vermelho)',
    pct: '1.3% dos homens',
    desc: 'Dificuldade em distinguir tons de vermelho e verde; o vermelho parece escuro.',
    info: 'Causada pela ausência de fotorreceptores vermelhos na retina. Elementos baseados exclusivamente em vermelho para indicar perigo ou erro ficam difíceis de identificar.'
  },
  {
    id: 'deuteranopia',
    name: 'Deuteranopia',
    k: 'Sem cones M (verde)',
    pct: '1.2% dos homens',
    desc: 'Dificuldade em distinguir tons de verde e vermelho; verde parece cinza/marrom.',
    info: 'O tipo mais comum de daltonismo. Interfaces que usam apenas vermelho/verde para indicar estados positivo/negativo (ex: gráficos) geram graves problemas de usabilidade.'
  },
  {
    id: 'tritanopia',
    name: 'Tritanopia',
    k: 'Sem cones S (azul)',
    pct: '0.01% da pop.',
    desc: 'Dificuldade em distinguir tons de azul e amarelo; azul parece esverdeado.',
    info: 'Rara alteração congênita nos cones sensíveis a ondas curtas. O azul e o verde são facilmente confundidos, bem como o amarelo e o violeta.'
  },
  {
    id: 'acromatopsia',
    name: 'Acromatopsia',
    k: 'Sem percepção de cor',
    pct: '1:33.000',
    desc: 'Visão totalmente em escala de cinza.',
    info: 'Ausência total de percepção de cores. O usuário depende inteiramente do contraste de luminância, ícones, posições e texturas para decodificar a informação.'
  },
  {
    id: 'catarata',
    name: 'Catarata',
    k: 'Turvação do cristalino',
    pct: '17% após 50 anos',
    desc: 'Visão embaçada, opaca, com menor contraste e brilho elevado.',
    info: 'O cristalino do olho torna-se opaco. Textos pequenos ou com contraste limítrofe (como cinza claro sobre branco) tornam-se completamente ilegíveis.'
  },
  {
    id: 'glaucoma',
    name: 'Glaucoma',
    k: 'Perda de campo visual',
    pct: '2–3% acima de 40',
    desc: 'Visão em túnel; apenas a área central é visível, enquanto a periferia é escura.',
    info: 'Aumento da pressão intraocular que danifica o nervo óptico. Mova o cursor ou use o teclado no playground para ver o campo de visão dinâmico simulado.'
  },
  {
    id: 'baixa-acuidade',
    name: 'Baixa acuidade',
    k: '20/200 ou menos',
    pct: 'Baixa visão',
    desc: 'Desfocagem acentuada de detalhes em qualquer distância.',
    info: 'Dificuldade severa de nitidez ocular não corrigível por óculos comuns. Requer textos grandes, fontes limpas e layout responsivo com zoom do navegador.'
  },
  {
    id: 'foco-reduzido',
    name: 'Foco reduzido (TDAH)',
    k: 'Simula fadiga / TDAH',
    pct: 'Cognitivo',
    desc: 'Dificuldade de concentração visual; ajuda a destacar elementos sob foco ativo.',
    info: 'Simulação cognitiva baseada em Spotlight. O entorno é escurecido e desfocado, mantendo nítido apenas o elemento focado por teclado ou mouse, evidenciando a importância do indicador de foco.'
  }
];

export function SimulatorPage({ setRoute }) {
  const [selectedCondition, setSelectedCondition] = useState('normal');
  const [activeTab, setActiveTab] = useState('playground');

  // Image Upload state
  const [uploadedImage, setUploadedImage] = useState(null);

  // URL Simulator state
  const [urlInput, setUrlInput] = useState('');
  const [simulatedUrl, setSimulatedUrl] = useState('');
  const [iframeSrcDoc, setIframeSrcDoc] = useState('');
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeError, setIframeError] = useState('');

  // Playground Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [accessibleMode, setAccessibleMode] = useState(false);

  const viewportRef = useRef(null);
  const fileInputRef = useRef(null);

  // Set up mouse move event listeners for Glaucoma and Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = viewportRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      if (selectedCondition === 'glaucoma') {
        container.style.setProperty('--mouse-x', `${x}%`);
        container.style.setProperty('--mouse-y', `${y}%`);
      } else if (selectedCondition === 'foco-reduzido') {
        // Only override if focus is not on an interactive form element
        const active = document.activeElement;
        const isFocusingInput = active && container.contains(active) &&
          (active.tagName === 'INPUT' || active.tagName === 'BUTTON' || active.tagName === 'TEXTAREA' || active.tagName === 'A');

        if (!isFocusingInput) {
          container.style.setProperty('--focus-x', `${x}%`);
          container.style.setProperty('--focus-y', `${y}%`);
        }
      }
    };

    const handleFocusIn = (e) => {
      const container = viewportRef.current;
      if (!container || selectedCondition !== 'foco-reduzido') return;

      const rect = container.getBoundingClientRect();
      const elemRect = e.target.getBoundingClientRect();

      // Calculate center of focused element
      const x = ((elemRect.left + elemRect.width / 2 - rect.left) / rect.width) * 100;
      const y = ((elemRect.top + elemRect.height / 2 - rect.top) / rect.height) * 100;

      container.style.setProperty('--focus-x', `${x}%`);
      container.style.setProperty('--focus-y', `${y}%`);
    };

    const container = viewportRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('focusin', handleFocusIn);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('focusin', handleFocusIn);
      }
    };
  }, [selectedCondition, activeTab]);

  // Image upload handling
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // URL Simulation
  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput) return;

    let formattedUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setIframeLoading(true);
    setIframeError('');
    setIframeSrcDoc('');
    setSimulatedUrl(formattedUrl);

    try {
      // First, try to fetch HTML using our Netlify Function to bypass CORS and frame blocks
      const response = await fetch(`/.netlify/functions/fetch-html?url=${encodeURIComponent(formattedUrl)}`);

      if (!response.ok) {
        throw new Error(`Serviço de busca retornou erro: HTTP ${response.status}`);
      }

      const rawHtml = await response.text();

      // Inject base tag into head to resolve relative assets correctly
      const baseTag = `<base href="${formattedUrl}">`;
      let modifiedHtml = rawHtml;

      if (rawHtml.toLowerCase().includes('<head>')) {
        modifiedHtml = rawHtml.replace(/<head>/i, `<head>${baseTag}`);
      } else {
        modifiedHtml = baseTag + rawHtml;
      }

      setIframeSrcDoc(modifiedHtml);
      setIframeLoading(false);
    } catch (err) {
      console.warn('Fallback: falha ao buscar via proxy. Carregando iframe direto.', err);
      // Fallback: load the iframe directly (which will work if target site allows framing)
      setIframeSrcDoc('');
      setIframeError('Não foi possível fazer proxy da página com fidelidade (CORS/scripts estritos). Tentando carregamento direto...');
      setIframeLoading(false);
    }
  };

  // Playground Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formName.trim()) {
      errors.name = 'O nome é obrigatório';
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      errors.email = 'E-mail inválido';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 4000);
      setFormName('');
      setFormEmail('');
    }
  };

  const activeConditionInfo = CONDITIONS.find(c => c.id === selectedCondition) || CONDITIONS[0];

  return (
    <div className="sim-page" data-screen-label="Simulador">
      <VisionFilters />

      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <a href="#/ferramentas" onClick={(e) => { e.preventDefault(); setRoute('ferramentas'); }}>Ferramentas</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Simulador</span>
          </nav>
          <p className="eyebrow">Ferramenta 03</p>
          <h1 className="page-title">Simulador de visão</h1>
          <p className="lede">
            Experimente como pessoas com diferentes condições de visão e foco cognitivo percebem e interagem com a sua aplicação.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="sim-container">
          {/* Sidebar Controls */}
          <aside className="sim-controls-sidebar">
            <h2>Escolha um dos filtros:</h2>

            <nav className="sim-list" aria-label="Condições visuais para simulação">
              {CONDITIONS.map((c) => (
                <button
                  key={c.id}
                  className={`sim-btn ${selectedCondition === c.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCondition(c.id)}
                  aria-pressed={selectedCondition === c.id}
                >
                  <div className="sim-btn-header">
                    <span className="sim-btn-name">{c.name}</span>
                    <span className="sim-btn-pct mono">{c.pct}</span>
                  </div>
                  <span className="sim-btn-desc">{c.desc}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Simulator Workspace */}
          <main className="sim-workspace">
            <div className="sim-mode-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'playground'}
                className={`sim-tab-btn ${activeTab === 'playground' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('playground')}
              >
                Componentes interativos
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'image'}
                className={`sim-tab-btn ${activeTab === 'image' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('image')}
              >
                Subir imagem
              </button>
              <button
                role="tab"
                // aria-selected={activeTab === 'url'}
                className={`sim-tab-btn is-disabled`}
                // onClick={() => setActiveTab('url')}
                disabled
              >
                Visualizar site <strong>[EM BREVE]</strong>
              </button>
            </div>

            <div className="sim-info-panel" style={{ marginTop: 'auto' }}>
              <h3>Sobre a condição</h3>
              <p><strong>{activeConditionInfo.name}:</strong> {activeConditionInfo.info}</p>
            </div>

            {/* Viewport Box */}
            <div className="sim-viewport-container" ref={viewportRef}>
              {/* Overlay Glaucoma */}
              {selectedCondition === 'glaucoma' && (
                <div className="sim-glaucoma-overlay" aria-hidden="true" />
              )}

              {/* Overlay Spotlight (Foco Reduzido) */}
              {selectedCondition === 'foco-reduzido' && (
                <div className="sim-foco-reduzido-overlay" aria-hidden="true" />
              )}

              {/* Viewport Content with applied CSS Filter */}
              <div className={`sim-viewport-content sim-apply-${selectedCondition}`}>

                {/* 1. PLAYGROUND TAB */}
                {activeTab === 'playground' && (
                  <div className="sim-playground">
                    <div className="playground-header">
                      <h4>Playground de componentes</h4>
                      <p>Use os controles abaixo para interagir com elementos simulando foco de teclado e mouse.</p>

                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          id="acc-mode"
                          checked={accessibleMode}
                          onChange={(e) => setAccessibleMode(e.target.checked)}
                        />
                        <label htmlFor="acc-mode" style={{ fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                          Ativar padrão de acessibilidade extra (legenda/ícone de erro)
                        </label>
                      </div>
                    </div>

                    <div className="sim-container-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>

                      {/* Form Card */}
                      <div className="playground-card">
                        <h5 className="playground-title">Formulário com validação</h5>
                        <form className="playground-form" onSubmit={handleFormSubmit} noValidate>
                          <div className="form-group">
                            <label htmlFor="pg-name">Nome completo</label>
                            <input
                              type="text"
                              id="pg-name"
                              className={formErrors.name ? 'is-invalid' : ''}
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Digite seu nome"
                            />
                            {formErrors.name && (
                              <span className="form-error">
                                {accessibleMode ? '⚠️ ' : ''}{formErrors.name}
                              </span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="pg-email">Endereço de e-mail</label>
                            <input
                              type="email"
                              id="pg-email"
                              className={formErrors.email ? 'is-invalid' : ''}
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              placeholder="exemplo@email.com"
                            />
                            {formErrors.email && (
                              <span className="form-error">
                                {accessibleMode ? '⚠️ ' : ''}{formErrors.email}
                              </span>
                            )}
                          </div>

                          <div className="form-row">
                            <button type="submit" className="pg-btn btn-primary">
                              Enviar cadastro
                            </button>
                            <button
                              type="button"
                              className="pg-btn btn-secondary"
                              onClick={() => {
                                setFormName('');
                                setFormEmail('');
                                setFormErrors({});
                                setFormSubmitted(false);
                              }}
                            >
                              Limpar
                            </button>
                          </div>
                        </form>

                        {formSubmitted && (
                          <div className="playground-alert alert-success" style={{ marginTop: '16px' }}>
                            <span><strong>Sucesso:</strong> Cadastro enviado com sucesso!</span>
                          </div>
                        )}
                      </div>

                      {/* Charts and Contrast Comparison Card */}
                      <div className="playground-card">
                        <h5 className="playground-title">Gráfico de comparação (status de produção)</h5>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>
                          Exemplo de erro comum: Usar apenas vermelho e verde para indicar aprovação/rejeição.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                          <div style={{ flex: 1, padding: '12px', background: '#f8fafc', borderRadius: '4px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Taxa de falhas</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cc2b2b', margin: '4px 0' }}>14%</div>
                            <div style={{
                              height: '8px',
                              background: '#cc2b2b',
                              borderRadius: '4px',
                              backgroundImage: accessibleMode ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.4) 5px, rgba(255,255,255,0.4) 10px)' : 'none'
                            }} />
                            {accessibleMode && <span style={{ fontSize: '0.7rem', color: '#a51d1d', fontWeight: 600 }}>Atenção / Crítico</span>}
                          </div>

                          <div style={{ flex: 1, padding: '12px', background: '#f8fafc', borderRadius: '4px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Taxa de sucesso</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#09815c', margin: '4px 0' }}>86%</div>
                            <div style={{ height: '8px', background: '#09815c', borderRadius: '4px' }} />
                            {accessibleMode && <span style={{ fontSize: '0.7rem', color: '#05694b', fontWeight: 600 }}>Normal / Seguro</span>}
                          </div>
                        </div>

                        <div className="colors-row">
                          <button className="pg-btn btn-success">Salvar (Sucesso)</button>
                          <button className="pg-btn btn-danger">Excluir (Perigo)</button>
                          <button className="pg-btn btn-warning">Alerta</button>
                        </div>
                      </div>

                      {/* Text content card for Acuity/Cataract simulation */}
                      <div className="playground-card">
                        <h5 className="playground-title">Legibilidade e contraste de texto</h5>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#334155' }}>
                          Esta caixa simula leitura. Fontes com espessura fina (thin/light) ou contraste inadequado como
                          <span style={{ color: '#475569', margin: '0 4px', fontWeight: 300 }}> texto cinza claro </span>
                          ficam ilegíveis sob filtros de Catarata e Baixa Acuidade.
                        </p>
                        <div className="playground-alert alert-info">
                          <span><strong>Dica:</strong> Sempre use tamanho de fonte mínimo de 16px para texto corrido e taxa de contraste mínima de 4.5:1.</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 2. IMAGE UPLOAD TAB */}
                {activeTab === 'image' && (
                  <div className="sim-image-mode">
                    {!uploadedImage ? (
                      <div className="sim-upload-zone" onClick={triggerFileUpload}>
                        <span className="upload-icon">📁</span>
                        <p>Arraste uma captura de tela para cá ou</p>
                        <button className="btn btn-primary upload-btn">Escolher arquivo local</button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    ) : (
                      <div className="sim-preview-image-container">
                        <img src={uploadedImage} alt="Pré-visualização para simulação" />
                        <button className="sim-image-clear-btn" onClick={clearImage} aria-label="Remover imagem">
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. URL SIMULATION TAB */}
                {activeTab === 'url' && (
                  <div className="sim-url-mode">
                    <div className="sim-url-bar">
                      <form onSubmit={handleUrlSubmit}>
                        <input
                          type="text"
                          placeholder="Digite a URL de teste (ex: google.com)"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                          Simular
                        </button>
                      </form>
                    </div>

                    <div className="sim-iframe-wrapper">
                      {iframeLoading && (
                        <div className="sim-iframe-placeholder">
                          <span className="placeholder-icon">⏳</span>
                          <h5>Carregando visualização...</h5>
                          <p>Buscando HTML e adaptando recursos via proxy do Netlify.</p>
                        </div>
                      )}

                      {!iframeLoading && iframeError && !iframeSrcDoc && simulatedUrl && (
                        <div className="sim-iframe-placeholder">
                          <div className="sim-iframe-error-alert">
                            <h6>Problema no carregamento seguro (CORS)</h6>
                            <p>{iframeError}</p>
                            <div className="btn-group">
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  // Fallback override: Load directly in iframe
                                  setIframeError('');
                                  setIframeSrcDoc('');
                                }}
                              >
                                Tentar iframe direto
                              </button>
                              <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setUrlInput('https://news.ycombinator.com')}
                              >
                                Usar exemplo leve
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {!iframeLoading && !simulatedUrl && (
                        <div className="sim-iframe-placeholder">
                          <span className="placeholder-icon">🌐</span>
                          <h5>Visualização de site externo</h5>
                          <p>Digite um endereço acima para inspecionar páginas web externas através dos filtros de simulação.</p>
                        </div>
                      )}

                      {!iframeLoading && simulatedUrl && (
                        iframeSrcDoc ? (
                          <iframe
                            title="Site simulado via proxy"
                            className="sim-iframe"
                            srcDoc={iframeSrcDoc}
                            sandbox="allow-same-origin allow-scripts"
                          />
                        ) : (
                          <iframe
                            title="Site simulado direto"
                            className="sim-iframe"
                            src={simulatedUrl}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
            <p className="sim-note">
              Esta ferramenta utiliza shaders de cores nativos de processamento gráfico no navegador.
              Gostaria de sugerir novos modelos de simulação cognitiva ou relatar bugs? <a href="#/contato" onClick={(e) => { e.preventDefault(); setRoute('sobre'); }}>Fale conosco</a>.
            </p>
          </main>
        </div>
      </div>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
