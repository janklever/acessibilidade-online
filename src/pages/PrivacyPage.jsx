import React from 'react';
import { SiteFooter } from '../components/Footer';

export function PrivacyPage({ setRoute }) {
  return (
    <div className="privacidade-page" data-screen-label="Privacidade">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacidade</span>
          </nav>
          <p className="eyebrow">Políticas · v1.0</p>
          <h1 className="page-title">Política de Privacidade</h1>
          <p className="lede">
            Este documento descreve como coletamos, usamos, armazenamos e protegemos as informações geradas por seu acesso e uso de nosso site. Ao navegar ou interagir com nossas páginas, você concorda com as práticas descritas nesta Política de Privacidade.
          </p>
        </div>
      </section>

      <section className="privacidade-body">
        <div className="container privacidade-container">
          <div className="privacidade-content">

            <section className="privacidade-section">
              <h2>1. Introdução</h2>
              <p>
                Bem-vindo ao Acessibilidade Online ("nós", "nosso" ou "site"). Esta política detalha o tratamento de dados no nosso ecossistema de ferramentas de acessibilidade.
              </p>
            </section>

            <section className="privacidade-section">
              <h2>2. Informações Coletadas</h2>
              <h3>2.1. Dados de Navegação (não identificáveis)</h3>
              <p>
                Utilizamos ferramentas para entender o comportamento geral no site e melhorar a usabilidade para toda a comunidade desenvolvedora:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics:</strong> Coletamos dados agregados sobre visitas, páginas acessadas, tempo de permanência, eventos (cliques, rolagens, etc.) e informações de dispositivo (navegador, sistema operacional, resolução). Essas informações são armazenadas de forma estatística e não identificável.
                </li>
                <li>
                  <strong>Microsoft Clarity:</strong> Coletamos gravações de sessões (heatmaps, cliques, comportamento de rolagem e navegação) de forma anônima, sem associar os dados a pessoas específicas, com a finalidade exclusiva de otimização de interface.
                </li>
              </ul>
            </section>

            <section className="privacidade-section">
              <h2>3. Cookies</h2>
              <h3>3.1. O que são Cookies?</h3>
              <p>
                Cookies são pequenos arquivos de texto salvos no seu dispositivo quando você visita um site. Eles facilitam o funcionamento da plataforma e nos ajudam a entender como o site é utilizado.
              </p>

              <h3>3.2. Tipos de Cookies Utilizados</h3>
              <ul>
                <li>
                  <strong>Cookies Estritamente Necessários:</strong> Essenciais para fazer o site funcionar (por exemplo, salvar suas preferências de acessibilidade e temas).
                </li>
                <li>
                  <strong>Cookies Analíticos e de Desempenho (Google Analytics e Microsoft Clarity):</strong> Coletam dados anônimos sobre como as pessoas usam as páginas, permitindo encontrar erros de código ou de layout.
                </li>
                <li>
                  <strong>Cookies de Funcionalidade:</strong> Salvam preferências como o tema claro/escuro ou configurações customizadas por até 1 ano.
                </li>
              </ul>

              <h3>3.3. Como Gerenciar e Desativar Cookies</h3>
              <p>
                Você pode desativar ou excluir os cookies diretamente nas configurações de privacidade do seu navegador (como Chrome, Firefox, Safari ou Edge). Além disso, cookies analíticos de terceiros só começam a registrar a sessão após o seu consentimento explícito no site (Google Consent Mode v2).
              </p>
            </section>

            <section className="privacidade-section">
              <h2>4. Finalidade do Tratamento</h2>
              <p>
                Os dados estatísticos coletados servem unicamente para a análise de tráfego, medição de performance de novas ferramentas de acessibilidade e para garantir o desenvolvimento contínuo da plataforma.
              </p>
            </section>

            <section className="privacidade-section">
              <h2>5. Compartilhamento de Dados</h2>
              <p>
                Não vendemos ou alugamos dados coletados. As informações agregadas de tráfego são processadas pelo Google (Analytics) e pela Microsoft (Clarity) sob suas respectivas políticas de conformidade com a LGPD e GDPR.
              </p>
            </section>

            <section className="privacidade-section">
              <h2>6. Armazenamento e Segurança</h2>
              <p>
                Toda a comunicação do nosso site é criptografada via protocolo TLS/SSL (HTTPS). Os dados estatísticos do Google Analytics são retidos por até 26 meses e as gravações de sessões do Microsoft Clarity são mantidas por até 12 meses.
              </p>
            </section>

            <section className="privacidade-section">
              <h2>7. Direitos dos Usuários</h2>
              <p>
                Como coletamos dados anonimizados, não é viável associar estatísticas a identidades reais. Contudo, você tem total direito de desabilitar cookies analíticos ou solicitar informações de privacidade através do e-mail oficial: <a href="mailto:privacidade@acessibilidade.online">privacidade@acessibilidade.online</a>.
              </p>
            </section>

            <section className="privacidade-section">
              <h2>8. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade conforme novas ferramentas forem lançadas ou para adequação a diretrizes de segurança. Notificaremos as principais atualizações em destaque na interface.
              </p>
            </section>

            <footer className="privacidade-doc-footer">
              <p className="mono">Última atualização em 21 de março de 2026.</p>
            </footer>

          </div>
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}
