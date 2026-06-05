# Acessibilidade digital

[![Netlify Status](https://api.netlify.com/api/v1/badges/3a76f8d0-7d59-4b3f-8665-0e1e37fc5fde/deploy-status)](https://app.netlify.com/projects/acessibilidadeonline/deploys)

Um hub de ferramentas, guias e auditoria para acessibilidade web em contexto brasileiro.

---

## O que temos

- **Contraste**: verificador WCAG + APCA
- **Leitores de tela**: simulação de VoiceOver e NVDA em português brasileiro
- **Legislação**: LBI e decretos brasileiros anotados
- **Conteúdo**: guias, glossário e estudos de caso
- **UI**: modo escuro/claro, modo de alto contraste, alta fonte, modo de leitura

## Começar rápido

```bash
# dependências
npm install

# modo de desenvolvimento (com hot-reload)
npm run dev

# produção (estático)
npm run build
npm run start
```

Abra `http://localhost:3000` (ou porta definida por `PORT`).

## Arquitetura

- `src/pages/`: Páginas da aplicação React (ex: `AboutPage.jsx`, `HubPage.jsx`, `ContrastPage.jsx`, etc.)
- `src/components/`: Componentes compartilhados da interface (ex: `Footer.jsx`, `Nav.jsx`, `Tile.jsx`)
- `src/styles/`: Estilos organizados em SCSS (SASS)
- `src/utils/`: Utilitários Javascript (ex: cálculos de APCA)
- `src/data/`: Bases de dados estáticas (ex: dados do checklist)

## Como contribuir

1. Abra issues para bugs ou sugestões
2. Pull requests são bem-vindos (use convenção `feat(contrast): ...` ou `fix(checklist): ...`)
3. Para alterações em componentes UI, atualize `src/components/`
4. Para novas páginas, crie o componente em `src/pages/` e adicione ao roteamento no `App.jsx`
5. Teste localmente com `npm run dev`
6. Para finalizar, rode `npm run build` e verifique a pasta `dist/`

## Licença

Este projeto é publicado sob licenciamento duplo:
- **Código-fonte:** Licença MIT (software livre e permissivo).
- **Conteúdo, Guias e Documentação:** Licença Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional (CC BY-SA 4.0).

Consulte o arquivo [LICENSE](file:///Users/janklever/Acessibilidade/LICENSE) para ler os termos completos.

