# Design Brief — acessibilidade.online
**Para:** Claude Design  
**Projeto:** Hub brasileiro de acessibilidade digital  
**Versão:** 1.0

---

## Contexto do Projeto

**acessibilidade.online** é um ecossistema digital de acessibilidade voltado ao mercado brasileiro. Não é tradução — é conteúdo original, fundamentado na legislação e cultura locais: LBI (Lei Brasileira de Inclusão), eMAG, LIBRAS, WCAG 2.2 e APCA.

O público é composto por desenvolvedores, designers e profissionais de acessibilidade no Brasil — pessoas técnicas que precisam de ferramentas confiáveis, não de conteúdo genérico.

A estrutura é de **subpastas** (não subdomínios):

```
acessibilidade.online/          ← hub principal
acessibilidade.online/checklist ← checklist interativo (71 itens, 16 categorias)
acessibilidade.online/contraste ← verificador de contraste com APCA
acessibilidade.online/simulador ← simulador de visão (daltonismo, baixa visão)
```

---

## Direção Visual

### Conceito Central

> **"Acessibilidade como excelência, não como obrigação."**

O design deve comunicar que acessibilidade e estilo coexistem — e que esse projeto prova isso ao existir. Cada escolha visual é uma demonstração viva do que o site ensina.

### Estética Direcionada

**Editorial técnico com alma brasileira.**

Nem o minimalismo frio do norte europeu, nem o maximalismo exuberante. Um meio-termo que é: preciso, quente, confiante. Pense em uma publicação técnica de prestígio — *A List Apart* encontra *Almanaque Abril* — com densidade informacional e generosidade visual ao mesmo tempo.

Referências de *princípio* (nunca copiar o estilo):
- **Stripe Docs** → clareza radical, tipografia faz 80% do trabalho
- **Pitch** → cor de acento usada com contenção cirúrgica
- **Gov.br** → seriedade institucional, mas sem a frieza

### Paleta

Base escura com modo claro de primeira classe.

```
--color-bg:         #0D0F12   (quase-preto, não puro)
--color-surface:    #161A20   (cards, painéis)
--color-border:     rgba(255,255,255,0.08)
--color-text:       #E8EAF0   (off-white quente)
--color-text-muted: #8A90A0

--color-accent:     #1B8FFF   (azul vivo, acessível sobre escuro)
--color-accent-alt: #00D97E   (verde — usado apenas para estados de sucesso/pass)
--color-warning:    #F5A623
--color-error:      #FF4D4F
```

**Regra de ouro:** o azul `--color-accent` aparece em no máximo 10% da tela. Quando aparece, comanda.

**Modo claro:**
```
--color-bg:         #F7F8FA
--color-surface:    #FFFFFF
--color-text:       #111318
--color-text-muted: #5A6070
--color-accent:     #0070E0   (azul ligeiramente mais escuro para contraste 4.5:1 sobre branco)
```

> **Nota APCA:** Toda cor de texto deve passar **Lc 60** no modo escuro e **Lc 75** no modo claro para corpo de texto. Controles UI (labels, placeholders) passam **Lc 45**. Jamais usar cor para transmitir significado isoladamente.

### Tipografia

Dois typefaces, sem exceção.

| Papel | Fonte | Uso |
|---|---|---|
| Display / Headings | **Syne** (Google Fonts) | H1–H3, labels de seção |
| Corpo / UI | **DM Sans** (Google Fonts) | Parágrafos, botões, inputs, tabelas |

**Escala tipográfica (Minor Third — 1.2):**
```
--text-xs:   12px  / line-height 1.5
--text-sm:   14px  / line-height 1.5
--text-base: 16px  / line-height 1.6
--text-lg:   19px  / line-height 1.5
--text-xl:   23px  / line-height 1.3
--text-2xl:  28px  / line-height 1.2
--text-3xl:  34px  / line-height 1.15
--text-4xl:  41px  / line-height 1.1
```

Tracking em headings grandes: `-0.02em`. ALL CAPS (usado com parcimônia): `+0.08em`.

### Espaçamento

Grid de 8pt sem negociação.

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-6:  24px
--space-8:  32px
--space-12: 48px
--space-16: 64px
--space-24: 96px
```

### Elevação e Sombra

No modo escuro, profundidade = superfícies mais claras, não sombras.

```css
/* Modo escuro: use background-color steps */
--surface-0: #0D0F12
--surface-1: #161A20
--surface-2: #1E2330
--surface-3: #252B3B

/* Modo claro: shadows tradicionais, tingidas com o accent */
--shadow-sm: 0 1px 3px rgba(0,112,224,0.08), 0 1px 2px rgba(0,0,0,0.06);
--shadow-md: 0 4px 12px rgba(0,112,224,0.10), 0 2px 4px rgba(0,0,0,0.06);
--shadow-lg: 0 8px 32px rgba(0,112,224,0.12), 0 4px 8px rgba(0,0,0,0.08);
```

### Border-radius

**Sharp-medium.** Profissional mas não frio.

```
--radius-sm:  4px   (inputs, tags pequenas)
--radius-md:  8px   (cards, botões)
--radius-lg:  12px  (painéis, modais)
--radius-xl:  20px  (hero elements, pill badges)
--radius-full: 9999px (avatares, indicadores de status)
```

Regra imutável: elemento filho sempre tem radius menor que o pai.

---

## Componentes Prioritários

### 1. Barra de Navegação

- Altura: 64px desktop / 56px mobile
- `backdrop-filter: blur(16px)` com fundo semitransparente
- Logo à esquerda, navegação principal ao centro, ações (tema, idioma) à direita
- Indicador de página ativa: sublinhado com `--color-accent`, 2px, animado
- Skip link visível no foco: `"Pular para o conteúdo"` — primeiro elemento focável, destaque total

```
Itens de nav: Checklist · Contraste · Simulador · Sobre
```

### 2. Hero Section (Hub)

- Headline em Syne, `--text-4xl`, com a palavra "acessível" em gradient text (azul → verde)
- Subheadline em DM Sans `--text-lg`, cor `--color-text-muted`
- CTA primário: "Explorar o Checklist" (sólido, azul)
- CTA secundário: "Verificar Contraste" (outline)
- Elemento decorativo de fundo: grid geométrico de baixo contraste, não animado (`prefers-reduced-motion` zero)

### 3. Cards de Ferramentas

Três cards no hub, um por ferramenta:

```
┌─────────────────────────────────┐
│  ⬡  Checklist                   │
│  71 critérios · WCAG 2.2 + LBI  │
│                                 │
│  "Verifique sua interface..."   │
│                      [Abrir →]  │
└─────────────────────────────────┘
```

- Padding interno: `--space-6` (24px)
- Gap entre cards: `--space-8` (32px) — gap sempre maior que padding
- Hover: `transform: translateY(-2px)` + sombra aumentada, 200ms ease-out
- Ícone: geometria hexagonal (referência a favos — estrutura, organização)
- Badge de status: "Disponível" / "Em breve" em pill com cores semânticas

### 4. Checklist Interativo

- Filtro por categoria: pills horizontais com scroll no mobile
- Item de checklist:
  - Checkbox personalizado, 24px, com foco visível 3px outline offset
  - Label em `--text-base`, criterio WCAG em tag `--text-sm` muted
  - Expandir detalhe: `<details>` nativo estilizado, ícone chevron animado
  - Estado marcado: texto com opacity 0.5, linha strike opcional via configuração
- Barra de progresso: no topo, atualiza em tempo real, com aria-live
- Exportar: botão "Baixar relatório" — ativa ao completar ao menos 1 item

### 5. Verificador de Contraste

- Dois color pickers (foreground / background)
- Display do ratio em tipografia grande: `4.52:1`
- Badges WCAG AA / AAA / APCA — verde (pass) / vermelho (fail) — **nunca só cor, sempre ícone + texto**
- Preview de texto real no par de cores escolhido
- Sugestão automática: se falhar, sugere a cor mais próxima que passa

### 6. Estados de Sistema

Cada estado tem design próprio — nunca estados genéricos:

| Estado | Tratamento |
|---|---|
| **Loading** | Skeleton screens com shimmer, não spinners |
| **Vazio** | Ilustração minimalista + CTA direto |
| **Erro** | Vermelho semântico + ícone + texto explicativo + ação de recuperação |
| **Sucesso** | Verde `--color-accent-alt` + ícone check + mensagem específica |
| **Foco** | Outline 3px `--color-accent`, offset 2px, visível em todos os temas |

---

## Acessibilidade como Requisito de Design

Este projeto é sobre acessibilidade — cada decisão deve ser verificável.

### Obrigatório em todos os componentes:

- **Contraste mínimo:** Lc 60 (APCA) para corpo de texto; WCAG AA (4.5:1) como fallback
- **Foco visível:** outline 3px, nunca `outline: none` sem substituto equivalente
- **Semântica HTML:** headings hierárquicos, landmarks, roles corretos — nunca `<div>` onde existe elemento nativo
- **ARIA apenas quando necessário:** não adicionar aria-label onde o texto visível já serve
- **Redução de movimento:** toda animação responde a `prefers-reduced-motion: reduce`
- **Touch targets:** 44×44px mínimo, 48×48px ideal
- **Nunca só cor:** ícone + texto + cor juntos para estados semânticos
- **Ordem de foco lógica:** o Tab segue a ordem visual da esquerda para a direita, cima para baixo

### Validações que o design deve demonstrar ao vivo:
- O verificador de contraste *ele próprio* deve passar em APCA Lc 75+
- O checklist deve ser completamente navegável por teclado
- O simulador de visão deve funcionar com teclado (sem depender de drag)

---

## Animações e Motion

**Filosofia:** mover só o que precisa ser movido, na velocidade que respeita.

```css
/* Escala de duração */
--duration-instant:  100ms  /* feedback imediato: checkbox, toggle */
--duration-fast:     150ms  /* tooltips, badges */
--duration-base:     200ms  /* hover states, cards */
--duration-slow:     300ms  /* panels, accordions */
--duration-page:     400ms  /* transições de rota */

/* Easings */
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0)  /* elementos entrando */
--ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0)  /* elementos saindo */
--ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0)  /* repositionamentos */

/* NUNCA linear, exceto barras de progresso */
```

**Animações com propósito:**
- Cards do hub: stagger de entrada com `animation-delay` de 80ms entre cada card
- Checklist progress bar: transição suave ao marcar/desmarcar
- Skip link: `transform: translateY(0)` animado ao receber foco
- Contraste picker: preview atualiza com fade de 100ms

**`prefers-reduced-motion`:** todos os keyframes e transitions desativados. O produto deve ser 100% funcional sem nenhuma animação.

---

## Responsividade

Mobile-first. O checklist é a ferramenta mais usada em contexto de trabalho — provavelmente desktop. O simulador e o contraste podem ter uso mobile relevante.

| Breakpoint | Layout |
|---|---|
| `< 640px` | Coluna única, nav em hamburger, cards em stack |
| `640–1024px` | Cards em 2 colunas, nav expandida |
| `> 1024px` | Cards em 3 colunas, sidebar no checklist |

---

## O Que Entregar

### Fase 1 — Hub (prioridade máxima)
- [ ] Design system completo: tokens, componentes base, dark/light
- [ ] Página inicial (hub): hero + 3 cards de ferramentas + footer
- [ ] Componentes de navegação com skip link e focus styles
- [ ] Documentação das decisões de acessibilidade embutida nos componentes

### Fase 2 — Checklist
- [ ] Interface do checklist interativo (lista + filtros + progresso)
- [ ] Estados: vazio, em andamento, concluído
- [ ] Export de relatório

### Fase 3 — Contraste
- [ ] Verificador de contraste com WCAG + APCA
- [ ] Sugestor de cor acessível

---

## Princípio Unificador

> Cada pixel deste projeto é uma demonstração do que ele ensina.  
> Se um componente falhar em acessibilidade, ele invalida o argumento do produto inteiro.  
> Design aqui não é decoração — é argumento.

---

*Brief gerado por equipe multidisciplinar acessibilidade.online · v1.0*
