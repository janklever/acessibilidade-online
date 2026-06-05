export const LEARNING_DATA = [
  // Artigos
  {
    id: 'intro-a11y',
    type: 'article',
    title: 'Introdução à Acessibilidade Web',
    description: 'Um guia prático e direto sobre o que é a acessibilidade digital, quais barreiras existem e por que ela importa para o desenvolvimento e design moderno.',
    url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility/What_is_accessibility',
    author: 'MDN Web Docs',
    tags: ['Iniciante', 'Conceito', 'Práticas']
  },
  {
    id: 'aria-correto',
    type: 'article',
    title: 'Como usar os papéis ARIA corretamente',
    description: 'Guia completo explicando a primeira regra do ARIA: "Não use ARIA a menos que seja necessário". Entenda quando usar elementos semânticos HTML nativos e quando complementar com ARIA.',
    url: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/',
    author: 'W3C WAI',
    tags: ['Intermediário', 'ARIA', 'Semântica']
  },
  {
    id: 'apca-vs-wcag',
    type: 'article',
    title: 'APCA vs WCAG 2.x Contrast',
    description: 'Uma análise detalhada comparando o novo algoritmo preditivo de contraste APCA (planejado para a WCAG 3) com a fórmula matemática legada da WCAG 2.x.',
    url: 'https://git.apca.co/',
    author: 'Myndex / Andrew Somers',
    tags: ['Avançado', 'Design', 'Contraste', 'APCA']
  },
  {
    id: 'art-texto-alternativo',
    type: 'article',
    title: 'Guia Rápido de Texto Alternativo',
    description: 'Orientações oficiais sobre como descrever imagens corretamente para garantir a acessibilidade de conteúdo para pessoas que utilizam leitores de tela.',
    url: 'https://www.gov.br/gestaodeconteudo/pt-br/manuais-e-tutoriais/acessibilidade-em-imagens/guia-rapido-texto-alternativo',
    author: 'Governo Federal do Brasil',
    tags: ['Imagens', 'Acessibilidade', 'Brasil', 'Tutorial']
  },

  // Livros
  {
    id: 'book-reinaldo',
    type: 'book',
    title: 'Acessibilidade na Web',
    description: 'A obra de referência indispensável escrita em português por Reinaldo Ferraz, detalhando conceitos, práticas recomendadas e diretrizes de forma didática.',
    url: 'https://reinaldoferraz.com.br/acessibilidadenaweb/',
    author: 'Reinaldo Ferraz',
    tags: ['Leitura', 'Referência', 'Manual']
  },
  {
    id: 'book-inclusive-design',
    type: 'book',
    title: 'Inclusive Design Patterns',
    description: 'Como criar componentes web comuns de forma verdadeiramente acessível e robusta, abordando desde botões e modais até menus complexos de navegação.',
    url: 'https://www.smashingmagazine.com/printed-books/inclusive-design-patterns/',
    author: 'Heydon Pickering',
    tags: ['Leitura', 'Componentes', 'Design']
  },

  // Ferramentas
  {
    id: 'tool-aria',
    type: 'tool',
    title: 'Guia sobre WAI-ARIA',
    description: 'Um notebook sobre a especificação WAI-ARIA e as melhores práticas para tornar aplicações ricas e componentes interativos acessíveis a pessoas com deficiência que utilizam tecnologias assistivas.',
    url: 'https://notebooklm.google.com/notebook/e12386c0-916e-4710-8e24-e09c01f5912b',
    author: 'Jan Klever',
    tags: ['NotebookLM', 'ARIA', 'Estudos']
  },
  {
    id: 'tool-guia-wcag',
    type: 'tool',
    title: 'Guia WCAG',
    description: 'Manual de referência rápida e simplificada sobre os critérios de sucesso e diretrizes da WCAG 2.1 em português, estruturado para facilitar a consulta rápida.',
    url: 'https://guia-wcag.com',
    author: 'Marcelo Sales',
    tags: ['WCAG', 'Guia', 'Referência']
  },
  {
    id: 'tool-vlibras',
    type: 'tool',
    title: 'VLibras',
    description: 'Ferramenta multiplataforma que traduz automaticamente conteúdos digitais (textos, áudios e vídeos) de português para a Libras (Língua Brasileira de Sinais).',
    url: 'https://vlibras.gov.br/',
    author: 'Governo Federal do Brasil',
    tags: ['Libras', 'Tradução', 'Acessibilidade']
  },
  {
    id: 'tool-amaweb',
    type: 'tool',
    title: 'AMAWeb',
    description: 'Plataforma robusta para avaliação e monitoramento continuado de acessibilidade na web desenvolvida pela UNIFESP de acordo com as diretrizes do WCAG.',
    url: 'https://amaweb.unifesp.br/',
    author: 'UNIFESP',
    tags: ['Avaliação', 'Monitoramento', 'Auditoria']
  },
  {
    id: 'tool-access-monitor',
    type: 'tool',
    title: 'Access Monitor Plus',
    description: 'Validador automático de práticas de acessibilidade de Portugal que pontua páginas de acordo com as diretrizes de acessibilidade web do WCAG 2.1.',
    url: 'https://accessmonitor.acessibilidade.gov.pt/',
    author: 'Governo de Portugal',
    tags: ['Validador', 'WCAG', 'Auditoria']
  },
  {
    id: 'tool-wave',
    type: 'tool',
    title: 'WAVE Evaluation Tool',
    description: 'Uma das ferramentas de avaliação visual de acessibilidade web mais conhecidas do mundo, ajudando a identificar erros de conformidade diretamente no navegador.',
    url: 'https://wave.webaim.org/',
    author: 'WebAIM',
    tags: ['Avaliação', 'Extensão', 'Erros']
  },

  // Documentação
  {
    id: 'doc-lbi',
    type: 'doc',
    title: 'Lei Brasileira de Inclusão (LBI - Lei 13.146/2015)',
    description: 'A legislação brasileira que torna obrigatória a acessibilidade nos sítios da web mantidos por empresas com sede ou representação comercial no país, ou por órgãos de governo.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
    author: 'Governo Federal do Brasil',
    tags: ['Legislação', 'Direitos', 'Brasil']
  },
  {
    id: 'doc-emag',
    type: 'doc',
    title: 'eMAG 3.1 (Modelo de Acessibilidade em Governo Eletrônico)',
    description: 'Diretrizes oficiais brasileiras de acessibilidade aplicadas a portais do setor público, alinhadas com as recomendações internacionais da WCAG.',
    url: 'https://emag.governoeletronico.gov.br/',
    author: 'Governo Federal do Brasil',
    tags: ['Padrão Oficial', 'Governo', 'Brasil']
  },
  {
    id: 'doc-wcag',
    type: 'doc',
    title: 'WCAG 2.2 (Web Content Accessibility Guidelines)',
    description: 'O padrão internacional de acessibilidade desenvolvido pelo W3C que define os critérios de sucesso e diretrizes para tornar a web utilizável por pessoas com deficiência.',
    url: 'https://www.w3.org/TR/WCAG22/',
    author: 'W3C WAI',
    tags: ['Padrão Oficial', 'Internacional', 'WCAG']
  },
  {
    id: 'doc-aria-apg',
    type: 'doc',
    title: 'WAI-ARIA Authoring Practices Guide (APG)',
    description: 'Manual definitivo de design e padrões de implementação contendo orientações e exemplos práticos para criar componentes dinâmicos interativos acessíveis.',
    url: 'https://www.w3.org/WAI/ARIA/apg/',
    author: 'W3C WAI',
    tags: ['Padrão Oficial', 'Componentes', 'ARIA']
  },
  {
    id: 'doc-apca-w3',
    type: 'doc',
    title: 'APCA W3 (Advanced Predictive Contrast Algorithm)',
    description: 'O novo modelo matemático para cálculo de contraste que leva em consideração a percepção visual humana, o tamanho da fonte, peso visual e luz emitida pela tela.',
    url: 'https://github.com/Myndex/apca-w3',
    author: 'Myndex / W3C',
    tags: ['Design', 'Contraste', 'Futuro']
  },
  {
    id: 'doc-design-inclusivo',
    type: 'doc',
    title: 'Design Inclusivo',
    description: 'Plataforma focada em disseminar conceitos de design inclusivo, experiência do usuário e acessibilidade digital através de guias e ferramentas.',
    url: 'https://www.designinclusivo.com',
    author: 'Design Inclusivo',
    tags: ['Design', 'UX', 'Inclusão']
  },
  {
    id: 'doc-padrao-digital',
    type: 'doc',
    title: 'Padrão Digital de Governo (Design System)',
    description: 'Design System oficial do Governo Federal, oferecendo diretrizes, componentes e orientações para padronizar e tornar acessível a experiência de uso do cidadão.',
    url: 'https://www.gov.br/ds/home',
    author: 'Governo Federal do Brasil',
    tags: ['Design System', 'Padrões', 'Brasil']
  },
  {
    id: 'doc-eping',
    type: 'doc',
    title: 'ePING (Padrões de Interoperabilidade)',
    description: 'Especificações técnicas de interoperabilidade do governo eletrônico que detalham o compartilhamento de dados e compatibilidade entre sistemas de informação.',
    url: 'https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/interoperabilidade/padroes-de-interoperabilidade',
    author: 'Governo Federal do Brasil',
    tags: ['Interoperabilidade', 'Governo', 'Padrão']
  }
];
