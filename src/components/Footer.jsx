import React from 'react';
import { Logo } from './Nav';

export function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.5 L5 9 L9.5 3.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  );
}

export function ArrowOutwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  );
}

export function SiteFooter({ setRoute }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-wordmark">
            <span className="brand-mark" aria-hidden="true"><Logo size={24} /></span>
            <span className="brand-text">
              <span className="brand-root">Acessibilidade</span>
              &nbsp;
              <span className="brand-tld">Online</span>
            </span>
          </div>
          <p className="footer-tag">
            Hub de acessibilidade digital para o Brasil.<br />
            <span className="mono">v1.0 · abril de 2026 · São Paulo</span>
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4 className="footer-col-title">Ferramentas</h4>
            <ul>
              <li><a href="/checklist" onClick={(e) => { e.preventDefault(); setRoute('checklist'); }}>Checklist</a></li>
              <li><a href="/contraste" onClick={(e) => { e.preventDefault(); setRoute('contraste'); }}>Contraste</a></li>
              <li><a href="/simulador" onClick={(e) => { e.preventDefault(); setRoute('simulador'); }}>Simulador</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Referências</h4>
            <ul>
              <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm" target="_blank" rel="noopener noreferrer">LBI (Lei 13.146/2015) <ArrowOutwardIcon /></a></li>
              <li><a href="https://emag.governoeletronico.gov.br/" target="_blank" rel="noopener noreferrer">eMAG 3.1 <ArrowOutwardIcon /></a></li>
              <li><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">WCAG 2.2 <ArrowOutwardIcon /></a></li>
              <li><a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">WAI-ARIA APG <ArrowOutwardIcon /></a></li>
              <li><a href="https://github.com/Myndex/apca-w3" target="_blank" rel="noopener noreferrer">APCA W3 <ArrowOutwardIcon /></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Projeto</h4>
            <ul>
              <li><a href="/sobre" onClick={(e) => { e.preventDefault(); setRoute('sobre'); }}>Sobre</a></li>
              <li><a href="/privacidade" onClick={(e) => { e.preventDefault(); setRoute('privacidade'); }}>Privacidade</a></li>
              <li><button onClick={(e) => { e.preventDefault(); if (window.openCookieConsent) window.openCookieConsent(e.currentTarget); }}>Gerenciar cookies</button></li>
              <li><a href="https://github.com/janklever/acessibilidade-online/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Como contribuir <ArrowOutwardIcon /></a></li>
              <li><a href="https://github.com/janklever/acessibilidade-online" target="_blank" rel="noopener noreferrer">Código-fonte <ArrowOutwardIcon /></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-statement">
          <span className="badge badge-success">
            <CheckIcon /> Em conformidade com WCAG 2.2 AA
          </span>
          <span className="mono footer-lc">Lc 78 · Corpo de texto · APCA</span>
        </div>
        <p className="footer-rights">
          Criado por <a href="https://janklever.com.br" target="_blank" rel="noopener noreferrer">Jan Klever <ArrowOutwardIcon /></a>
        </p>
      </div>
    </footer>
  );
}
