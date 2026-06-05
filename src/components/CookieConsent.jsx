import React, { useState, useEffect, useRef } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Opções de consentimento (desmarcadas por padrão para conformidade rígida LGPD/GDPR)
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false
  });

  const bannerRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const triggerButtonRef = useRef(null); // Para devolver o foco ao botão que reabriu o banner

  // Checar consentimento salvo
  useEffect(() => {
    const saved = localStorage.getItem('ac.cookie_consent');
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setConsent(parsed);
      } catch (e) {
        setIsVisible(true);
      }
    }

    // Registrar função global para reabertura a partir de outros componentes (como o Footer)
    window.openCookieConsent = (triggerEl) => {
      if (triggerEl) {
        triggerButtonRef.current = triggerEl;
      }
      setIsVisible(true);
      setIsCustomizing(true);
      // Focar no título do painel após renderizar
      setTimeout(() => {
        if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        }
      }, 50);
    };

    return () => {
      delete window.openCookieConsent;
    };
  }, []);

  const saveConsent = (updatedConsent) => {
    localStorage.setItem('ac.cookie_consent', JSON.stringify(updatedConsent));
    setConsent(updatedConsent);

    // Atualizar Google Consent Mode v2
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': updatedConsent.analytics ? 'granted' : 'denied',
        'ad_storage': updatedConsent.marketing ? 'granted' : 'denied',
        'ad_user_data': updatedConsent.marketing ? 'granted' : 'denied',
        'ad_personalization': updatedConsent.marketing ? 'granted' : 'denied',
        'personalization_storage': updatedConsent.marketing ? 'granted' : 'denied'
      });
    }

    // Enviar evento customizado ao dataLayer para ativação de outras tags no GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_updated',
        consent_analytics: updatedConsent.analytics,
        consent_marketing: updatedConsent.marketing
      });
    }

    setIsVisible(false);
    setIsCustomizing(false);

    // Devolver foco para o elemento original de abertura, caso exista
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
      triggerButtonRef.current = null;
    }
  };

  const handleAcceptAll = () => {
    const allGranted = { analytics: true, marketing: true };
    saveConsent(allGranted);
  };

  const handleRejectAll = () => {
    const allDenied = { analytics: false, marketing: false };
    saveConsent(allDenied);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  const toggleCategory = (category) => {
    setConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-banner"
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-content">
        <div
          id="cookie-banner-title"
          className="cookie-title"
          tabIndex="-1"
          ref={firstFocusableRef}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
          </svg>
          Preferências de privacidade
        </div>
        <p id="cookie-banner-desc" className="cookie-desc">
          Utilizamos cookies e tecnologias semelhantes para fornecer recursos essenciais, analisar tráfego de forma anônima e melhorar sua experiência de desenvolvimento. Consulte nossa <a href="/privacidade" onClick={(e) => { e.preventDefault(); window.openCookieConsent(null); window.location.pathname = '/privacidade'; }}>Política de Privacidade</a>.
        </p>
      </div>

      {isCustomizing && (
        <div className="cookie-options">
          {/* Categoria: Necessários */}
          <div className="cookie-option-row">
            <div className="option-checkbox-wrapper">
              <input
                type="checkbox"
                id="consent-necessary"
                checked
                disabled
                aria-describedby="desc-necessary"
              />
            </div>
            <div className="option-info">
              <label htmlFor="consent-necessary" className="option-label">
                Essenciais e Preferências
                <span className="badge badge-success" style={{ fontSize: '10px', padding: '2px 6px', marginLeft: '6px' }}>Necessário</span>
              </label>
              <span id="desc-necessary" className="option-desc">
                Necessários para o funcionamento do site (como preferências de tema, contraste, tamanho do painel e seu próprio estado de consentimento).
              </span>
            </div>
          </div>

          {/* Categoria: Analíticos */}
          <div className="cookie-option-row">
            <div className="option-checkbox-wrapper">
              <input
                type="checkbox"
                id="consent-analytics"
                checked={consent.analytics}
                onChange={() => toggleCategory('analytics')}
                aria-describedby="desc-analytics"
              />
            </div>
            <div className="option-info">
              <label htmlFor="consent-analytics" className="option-label">
                Analíticos e Desempenho
                <span className="badge badge-warning" style={{ fontSize: '10px', padding: '2px 6px', marginLeft: '6px' }}>Recomendado</span>
              </label>
              <span id="desc-analytics" className="option-desc">
                Coleta dados estatísticos e anônimos de navegação através do Google Analytics e Microsoft Clarity para entendermos erros de carregamento e melhorias na usabilidade.
              </span>
            </div>
          </div>

          {/* Categoria: Marketing/Personalização */}
          <div className="cookie-option-row">
            <div className="option-checkbox-wrapper">
              <input
                type="checkbox"
                id="consent-marketing"
                checked={consent.marketing}
                onChange={() => toggleCategory('marketing')}
                aria-describedby="desc-marketing"
              />
            </div>
            <div className="option-info">
              <label htmlFor="consent-marketing" className="option-label">
                Personalização e Marketing
              </label>
              <span id="desc-marketing" className="option-desc">
                Permite a ativação de eventuais recursos externos personalizados ou tags de parceiros em atualizações futuras.
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="cookie-actions">
        {!isCustomizing ? (
          <>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsCustomizing(true)}
              aria-expanded="false"
            >
              Opções
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={handleRejectAll}
            >
              Apenas essenciais
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAcceptAll}
            >
              Aceitar todos
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsCustomizing(false)}
              aria-expanded="true"
            >
              Voltar
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={handleAcceptAll}
            >
              Aceitar todos
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSavePreferences}
            >
              Salvar seleção
            </button>
          </>
        )}
      </div>
    </div>
  );
}
