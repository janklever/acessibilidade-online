// Contraste page — WCAG + APCA dual verifier with smart suggestions
const ContrastePage = ({ setRoute }) => {
  const [fg, setFg] = React.useState('#1B8FFF');
  const [bg, setBg] = React.useState('#0D0F12');
  const [size, setSize] = React.useState(16);
  const [weight, setWeight] = React.useState(400);

  const lc = window.APCAtool.apca(fg, bg);
  const lcAbs = Math.abs(lc);
  const ratio = window.APCAtool.wcag(fg, bg);
  const apcaLv = window.APCAtool.apcaLevel(lc);
  const wcagLv = window.APCAtool.wcagLevel(ratio);

  // Suggestor — iterate toward a nearest-passing foreground
  const suggest = React.useMemo(() => {
    const target = 75; // APCA Lc target
    if (lcAbs >= target) return null;
    const bgRgb = window.APCAtool.hexToRgb(bg);
    const bgLum = window.APCAtool.relLuminance(bgRgb);
    const goDark = bgLum > 0.4;

    let best = fg;
    let bestLc = lcAbs;
    const startRgb = window.APCAtool.hexToRgb(fg);
    for (let step = 0; step <= 100; step += 2) {
      const factor = step / 100;
      const target = goDark ? 0 : 255;
      const rgb = startRgb.map(c => Math.round(c + (target - c) * factor));
      const hex = window.APCAtool.rgbToHex(rgb);
      const l = Math.abs(window.APCAtool.apca(hex, bg));
      if (l > bestLc) {
        bestLc = l;
        best = hex;
        if (l >= 75) return { hex, lc: l };
      }
    }
    return best !== fg ? { hex: best, lc: bestLc } : null;
  }, [fg, bg, lcAbs]);

  const swap = () => { const t = fg; setFg(bg); setBg(t); };

  const passClass = apcaLv.pass === true ? 'is-pass' : apcaLv.pass === 'ui' ? 'is-warn' : 'is-fail';

  return (
    <div className="contraste-page" data-screen-label="Contraste">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contraste</span>
          </nav>
          <p className="eyebrow">Ferramenta 02</p>
          <h1 className="page-title">Verificador de contraste</h1>
          <p className="lede">
            Dois padrões, lado a lado. <strong>WCAG 2.x</strong> calcula a razão matemática de
            luminância; <strong>APCA</strong> considera peso, tamanho e polaridade. Onde os dois
            discordam, APCA costuma estar mais perto do que o olho percebe.
          </p>
        </div>
      </section>

      <section className="contraste-body">
        <div className="container contraste-grid">
          {/* LEFT — Controls */}
          <div className="contraste-controls">
            <div className="color-pair">
              <ColorField label="Cor do texto" value={fg} onChange={setFg}/>
              <button className="swap-btn" onClick={swap} aria-label="Trocar cores entre texto e fundo">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M3 6h10l-3-3M15 12H5l3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ColorField label="Cor de fundo" value={bg} onChange={setBg}/>
            </div>

            <div className="size-controls">
              <div className="sc-row">
                <label className="sc-label" htmlFor="size-slider">Tamanho</label>
                <span className="sc-value mono">{size}px</span>
              </div>
              <input id="size-slider" type="range" min="12" max="48" step="1" value={size}
                     onChange={(e) => setSize(Number(e.target.value))} className="range"/>

              <div className="sc-row" style={{ marginTop: 16 }}>
                <label className="sc-label">Peso</label>
                <span className="sc-value mono">{weight}</span>
              </div>
              <div className="weight-chips" role="radiogroup" aria-label="Peso da fonte">
                {[300, 400, 500, 600, 700, 800].map(w => (
                  <button key={w}
                          className={`chip ${weight === w ? 'is-active' : ''}`}
                          onClick={() => setWeight(w)}
                          role="radio"
                          aria-checked={weight === w}>{w}</button>
                ))}
              </div>
            </div>

            {suggest && (
              <div className="suggestion-card">
                <div className="eyebrow">Sugestão automática</div>
                <p className="sugg-text">
                  A combinação atual não atinge Lc 75. A cor mais próxima que passa:
                </p>
                <div className="sugg-row">
                  <div className="sugg-swatch" style={{ background: suggest.hex }} aria-hidden="true"/>
                  <div className="sugg-info">
                    <div className="mono sugg-hex">{suggest.hex.toUpperCase()}</div>
                    <div className="sugg-lc mono">Lc {suggest.lc.toFixed(1)}</div>
                  </div>
                  <button className="btn btn-sm btn-primary"
                          onClick={() => setFg(suggest.hex)}>
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Big result + preview */}
          <div className="contraste-result">
            <div className={`result-big result-big-${passClass}`} style={{ background: bg, color: fg }}>
              <div className="result-big-kind">APCA</div>
              <div className="result-big-value">
                <span className="mono">Lc {lcAbs.toFixed(1)}</span>
              </div>
              <div className={`result-badge ${passClass}`}>
                {apcaLv.pass === true
                  ? <><CheckIcon/> {apcaLv.label}</>
                  : apcaLv.pass === 'ui'
                    ? <><DotIcon/> Apenas para UI ({apcaLv.grade})</>
                    : <><XIcon/> {apcaLv.label}</>}
              </div>
            </div>

            <div className="result-parallel">
              <MetricCard
                title="APCA"
                subtitle="Percepção"
                value={`Lc ${lcAbs.toFixed(1)}`}
                status={apcaLv.pass}
                desc={apcaLv.pass === true ? apcaLv.label : apcaLv.pass === 'ui' ? 'Apenas para labels' : 'Abaixo do mínimo'}
              />
              <MetricCard
                title="WCAG 2.2"
                subtitle="Razão matemática"
                value={`${ratio.toFixed(2)}:1`}
                status={ratio >= 4.5 ? true : ratio >= 3 ? 'ui' : false}
                desc={wcagLv.grade}
              />
            </div>

            <div className="preview-block" style={{ background: bg, color: fg }}>
              <div className="preview-tag mono" style={{ color: fg, opacity: 0.6 }}>PREVIEW · {size}px · {weight}</div>
              <p className="preview-sample" style={{ fontSize: size, fontWeight: weight, lineHeight: 1.5 }}>
                A acessibilidade não é um recurso que se adiciona; é a base sobre
                a qual tudo o mais se constrói. Um produto que exclui é, antes
                de mais nada, um produto mal projetado.
              </p>
              <p className="preview-small" style={{ fontSize: size * 0.75, fontWeight: weight, opacity: 0.85 }}>
                — Equipe acessibilidade.online, em referência à Lei Brasileira de Inclusão (2015)
              </p>
            </div>

            {/* Reference grid */}
            <div className="reference-grid">
              <h3 className="ref-title">Referência rápida</h3>
              <table className="ref-table">
                <thead>
                  <tr>
                    <th scope="col">Uso</th>
                    <th scope="col">APCA (Lc)</th>
                    <th scope="col">WCAG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Body · light mode</td><td className="mono">≥ 75</td><td className="mono">≥ 4.5:1</td></tr>
                  <tr><td>Body · dark mode</td><td className="mono">≥ 60</td><td className="mono">≥ 4.5:1</td></tr>
                  <tr><td>Headlines (≥ 24px)</td><td className="mono">≥ 60</td><td className="mono">≥ 3:1</td></tr>
                  <tr><td>UI · labels</td><td className="mono">≥ 45</td><td className="mono">≥ 3:1</td></tr>
                  <tr><td>Decorativo</td><td className="mono">≥ 30</td><td className="mono">—</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter setRoute={setRoute}/>
    </div>
  );
};

function ColorField({ label, value, onChange }) {
  return (
    <div className="color-field">
      <label className="color-field-label">{label}</label>
      <div className="color-field-inner">
        <span className="color-swatch-big" style={{ background: value }}>
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
                 aria-label={label}/>
        </span>
        <input type="text" className="input color-hex mono" value={value.toUpperCase()}
               onChange={(e) => {
                 const v = e.target.value;
                 if (/^#[0-9A-Fa-f]{6}$/.test(v)) onChange(v);
                 else if (/^#[0-9A-Fa-f]{3}$/.test(v)) {
                   const c = v.slice(1);
                   onChange('#' + c.split('').map(x => x + x).join(''));
                 }
               }}
               aria-label={`${label} em hexadecimal`}/>
      </div>
    </div>
  );
}

function MetricCard({ title, subtitle, value, status, desc }) {
  const cls = status === true ? 'is-pass' : status === 'ui' ? 'is-warn' : 'is-fail';
  return (
    <div className={`metric-card ${cls}`}>
      <div className="metric-head">
        <div>
          <div className="metric-title">{title}</div>
          <div className="metric-sub">{subtitle}</div>
        </div>
        <div className={`metric-icon ${cls}`}>
          {status === true ? <CheckIcon/> : status === 'ui' ? <DotIcon/> : <XIcon/>}
        </div>
      </div>
      <div className="metric-value mono">{value}</div>
      <div className="metric-desc">{desc}</div>
    </div>
  );
}

window.ContrastePage = ContrastePage;
