/**
 * Helper utilities to generate and trigger download of checklist reports.
 */

// Generate JSON export
export function generateJSON(checked, data) {
  const completedCount = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedCount / data.length) * 100);

  const report = {
    projectName: "Acessibilidade Online - Checklist",
    exportDate: new Date().toISOString(),
    progress: {
      total: data.length,
      completed: completedCount,
      percentage: percentage
    },
    items: data.map((item, index) => ({
      index,
      category: item.cat,
      wcag: item.wcag,
      level: item.level,
      title: item.title,
      detail: item.detail,
      completed: !!checked[index]
    }))
  };

  return JSON.stringify(report, null, 2);
}

// Generate Markdown export
export function generateMarkdown(checked, data) {
  const completedCount = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedCount / data.length) * 100);
  const dateStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let md = `# Relatório de conformidade - Acessibilidade Online\n\n`;
  md += `*Gerado em: ${dateStr}*\n\n`;
  md += `## 📊 Resumo do Progresso\n\n`;
  md += `- **Total de critérios:** ${data.length}\n`;
  md += `- **Critérios concluídos:** ${completedCount} / ${data.length} (${percentage}%)\n\n`;

  // Group items by category
  const categories = {};
  data.forEach((item, index) => {
    if (!categories[item.cat]) {
      categories[item.cat] = [];
    }
    categories[item.cat].push({ ...item, index });
  });

  md += `## 📋 Detalhamento por Categoria\n\n`;

  Object.entries(categories).forEach(([catName, items]) => {
    const catDone = items.filter(it => checked[it.index]).length;
    md += `### ${catName} (${catDone}/${items.length})\n\n`;

    items.forEach(item => {
      const isDone = !!checked[item.index];
      const statusIcon = isDone ? '✅ [Concluído]' : '❌ [Pendente]';
      md += `#### ${statusIcon} ${item.title}\n`;
      md += `- **Diretriz WCAG:** ${item.wcag} (Nível ${item.level})\n`;
      md += `- **Detalhes:** ${item.detail}\n\n`;
    });
  });

  md += `---\n*Relatório gerado por [Acessibilidade Online](http://localhost:3000)*\n`;
  return md;
}

function escapeAndFormatHTML(text) {
  if (!text) return '';
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="code-highlight">$1</code>');
  escaped = escaped.replace(/\\&lt;([^&]+)\\&gt;/g, '<code class="code-highlight">&lt;$1&gt;</code>');
  escaped = escaped.replace(/(?<!<code[^>]*?>)&lt;([a-zA-Z0-9="'.#_:\s\-\/]+)&gt;/g, '<code class="code-highlight">&lt;$1&gt;</code>');
  
  return escaped;
}

// Generate HTML export
export function generateHTML(checked, data) {
  const completedCount = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedCount / data.length) * 100);
  const dateStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Group items by category
  const categories = {};
  data.forEach((item, index) => {
    if (!categories[item.cat]) {
      categories[item.cat] = [];
    }
    categories[item.cat].push({ ...item, index });
  });

  let catHtml = '';
  Object.entries(categories).forEach(([catName, items]) => {
    const catDone = items.filter(it => checked[it.index]).length;
    let itemsHtml = '';

    items.forEach(item => {
      const isDone = !!checked[item.index];
      const titleEscaped = escapeAndFormatHTML(item.title);
      const detailEscaped = escapeAndFormatHTML(item.detail);
      itemsHtml += `
        <div class="item-card ${isDone ? 'is-done' : 'is-pending'}">
          <div class="item-header">
            <span class="status-badge ${isDone ? 'badge-done' : 'badge-pending'}">
              ${isDone ? '✓ Concluído' : '✗ Pendente'}
            </span>
            <span class="wcag-badge">WCAG ${item.wcag}</span>
            <span class="level-badge level-${item.level}">${item.level}</span>
          </div>
          <h3 class="item-title">${titleEscaped}</h3>
          <p class="item-detail">${detailEscaped}</p>
        </div>
      `;
    });

    catHtml += `
      <section class="category-section">
        <h2 class="category-title">
          <span>${catName}</span>
          <span class="category-meta">${catDone} de ${items.length} concluídos</span>
        </h2>
        <div class="items-grid">
          ${itemsHtml}
        </div>
      </section>
    `;
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Acessibilidade - Acessibilidade Online</title>
  <style>
    :root {
      --color-bg: #fafafa;
      --color-surface: #ffffff;
      --color-border: #e4e4e7;
      --color-text: #18181b;
      --color-text-muted: #71717a;
      --color-primary: #1254ff;
      --color-success: #10b981;
      --color-success-bg: #ecfdf5;
      --color-pending: #f59e0b;
      --color-pending-bg: #fffbeb;
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #09090b;
        --color-surface: #18181b;
        --color-border: #27272a;
        --color-text: #f4f4f5;
        --color-text-muted: #a1a1aa;
        --color-success-bg: rgba(16, 185, 129, 0.15);
        --color-pending-bg: rgba(245, 158, 11, 0.15);
      }
    }

    body {
      font-family: var(--font-family);
      background-color: var(--color-bg);
      color: var(--color-text);
      line-height: 1.5;
      margin: 0;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    header {
      border-bottom: 2px solid var(--color-border);
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      position: relative;
    }

    .btn-print {
      position: absolute;
      right: 0;
      top: 0;
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    @media print {
      .btn-print {
        display: none;
      }
      body {
        background-color: white;
        padding: 0;
      }
    }

    .title {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
      font-weight: 800;
    }

    .meta {
      color: var(--color-text-muted);
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .dashboard {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .progress-info h2 {
      margin: 0 0 0.25rem 0;
      font-size: 1.25rem;
    }

    .progress-bar-container {
      width: 150px;
      height: 10px;
      background: var(--color-border);
      border-radius: 5px;
      overflow: hidden;
      margin-top: 0.5rem;
    }

    .progress-bar {
      height: 100%;
      background: var(--color-success);
      width: ${percentage}%;
    }

    .percentage {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-success);
    }

    .category-section {
      margin-bottom: 3rem;
    }

    .category-title {
      font-size: 1.25rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 0.5rem;
      margin-bottom: 1.25rem;
      display: flex;
      justify-content: space-between;
    }

    .category-meta {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      font-weight: 400;
    }

    .items-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 1.25rem;
    }

    .item-header {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      flex-wrap: wrap;
    }

    .status-badge {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .badge-done {
      background: var(--color-success-bg);
      color: var(--color-success);
    }

    .badge-pending {
      background: var(--color-pending-bg);
      color: var(--color-pending);
    }

    .wcag-badge {
      background: var(--color-border);
      color: var(--color-text-muted);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .level-badge {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      border: 1px solid var(--color-border);
    }

    .level-A { color: var(--color-primary); }
    .level-AA { color: var(--color-success); }
    .level-AAA { color: var(--color-pending); }

    .item-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .item-detail {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }

    .code-highlight {
      font-family: monospace;
      font-size: 0.9em;
      padding: 2px 4px;
      background: var(--color-border);
      border-radius: 4px;
      color: var(--color-primary);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1 class="title">Relatório de conformidade</h1>
      <div class="meta">Acessibilidade Online • Gerado em ${dateStr}</div>
      <button class="btn-print" onclick="window.print()">Imprimir</button>
    </header>

    <div class="dashboard">
      <div class="progress-info">
        <h2>Progresso geral</h2>
        <div>${completedCount} de ${data.length} critérios concluídos</div>
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
      <div class="percentage">${percentage}%</div>
    </div>

    ${catHtml}
  </div>
</body>
</html>`;
}

// Download file helper
export function triggerDownload(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
