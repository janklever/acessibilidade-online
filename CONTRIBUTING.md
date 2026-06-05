# Guia de Contribuição

Primeiramente, muito obrigado pelo interesse em contribuir para o projeto **Acessibilidade digital**! Toda ajuda para tornar a web brasileira mais acessível é extremamente bem-vinda.

Este projeto é comunitário e valoriza a qualidade técnica, a precisão das informações e a facilidade de uso.

---

## 📁 Como o projeto é estruturado

* `/src/pages/`: Contém as páginas em React (ex: `AboutPage.jsx`, `HubPage.jsx`, `ContrastPage.jsx`, etc.).
* `/src/components/`: Componentes compartilhados da interface (ex: `Footer.jsx`, `Nav.jsx`).
* `/src/styles/`: Estilos organizados em SCSS (SASS).
* `/LICENSE`: Detalhes sobre o licenciamento duplo (MIT para código, CC-BY-SA 4.0 para conteúdo).

---

## 🛠️ Como configurar o ambiente local

1. Certifique-se de ter o **Node.js** instalado.
2. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/acessibilidade-online.git
   cd acessibilidade-online
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra `http://localhost:5173` (ou a porta indicada no terminal).

---

## 💡 Como você pode ajudar?

### 1. Sugerindo ou corrigindo conteúdos e guias
Se encontrar erros ortográficos, informações desatualizadas sobre a LBI (Lei Brasileira de Inclusão), ou quiser sugerir novos critérios de acessibilidade:
* Abra uma **Issue** explicando o ponto.
* Ou envie um **Pull Request (PR)** editando diretamente as informações na página relevante dentro de `src/pages/`.

### 2. Contribuindo com Código (React/JS/CSS)
* Para correções ou melhorias visuais, certifique-se de testar se a interface continua totalmente acessível via teclado e leitores de tela.
* Siga a convenção de commits para manter o histórico limpo:
  * `feat(nome-da-funcionalidade): adiciona nova ferramenta...`
  * `fix(contraste): corrige erro de cálculo de luminosidade`
  * `docs(readme): atualiza informações de instalação`

### 3. Testes de Acessibilidade
Se você usa tecnologias assistivas (leitores de tela, navegação por teclado exclusivo, switches, etc.), o seu feedback sobre a usabilidade deste hub é a nossa maior prioridade. Sinta-se livre para abrir issues relatando qualquer barreira de acesso que encontrar!

---

## 🤝 Processo de Revisão

Todos os Pull Requests passam por revisão de código. Buscamos sempre garantir que:
1. O código seja semanticamente correto (HTML5).
2. O contraste atinja o nível AA (mínimo) ou APCA recomendado.
3. Não sejam introduzidos problemas de foco de teclado.
