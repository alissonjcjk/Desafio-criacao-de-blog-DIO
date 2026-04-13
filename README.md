# Angular Blog — projeto de portfólio

Blog front-end construído com **Angular 14** como evolução de um projeto base de curso. O objetivo foi ir além do tutorial: **uma única fonte de dados**, **serviços reutilizáveis**, **roteamento completo**, **acessibilidade e SEO básicos**, **testes** e **tema claro/escuro** — tudo documentado no código para demonstrar entendimento real do framework em processos seletivos.

---

## O que este projeto mostra sobre mim

- Consigo **estruturar** uma SPA com separação clara entre apresentação (componentes), navegação (`Router`) e dados (`HttpClient` + serviço).
- Entendo o **fluxo reativo** com RxJS (`switchMap`, `shareReplay`, `takeUntil`) e quando usar **injeção de dependência** (`providedIn: 'root'`).
- Penso em **UX e qualidade**: estados de carregamento, 404, `alt` em imagens, título da aba e meta description por página.
- Sei **testar** serviços que dependem de HTTP com `HttpClientTestingModule` e `HttpTestingController`.

---

## Funcionalidades

| Área | O que foi implementado |
|------|-------------------------|
| **Dados** | Posts em `src/assets/articles.json`; carregamento via `HttpClient` e cache com `shareReplay(1)` no `ArticleService`. |
| **Home** | Big card de destaque (`featured` ou primeiro post), lista dinâmica com `*ngFor`, **busca** por texto e **filtro por categoria**. |
| **Artigo** | Rota `content/:id` com corpo longo (`body`), resumo, categoria e data; estado **não encontrado** se o id não existir. |
| **Rotas** | `/` (home), `/sobre` (sobre o projeto), `/content/:id`, wildcard `**` para página **404**. |
| **SEO** | Serviços `Title` e `Meta` do Angular nas páginas relevantes. |
| **Acessibilidade** | Textos alternativos nas imagens; botão de tema com `aria-label`; `lang="pt-BR"` no `index.html`. |
| **Tema** | Alternância claro/escuro com `localStorage` e variáveis CSS no `body`. |
| **Menu** | Links internos com `routerLink` (absoluto em `/content/:id` para funcionar de qualquer rota) + redes sociais. |

---

## Stack

- **Angular** 14.x  
- **TypeScript**  
- **RxJS**  
- **Karma + Jasmine** (testes unitários)

---

## Como rodar

```bash
npm install
npm start
```

Abra `http://localhost:4200/`.

**Build de produção:**

```bash
npm run build
```

**Testes:**

```bash
npm test
```

---

## Arquitetura (visão rápida)

```
src/app/
├── models/article.ts          # Contrato TypeScript dos posts
├── services/
│   ├── article.service.ts     # HTTP + cache + consultas/filtros
│   └── theme.service.ts       # Preferência de tema no navegador
├── components/                # Menu, cards, título
├── pages/
│   ├── home/                  # Listagem + filtros
│   ├── content/               # Leitura do post (rota com :id)
│   ├── about/                 # Sobre
│   └── not-found/             # 404
├── app-routing.module.ts      # Definição das rotas (ordem: específicas antes de **)
└── app.module.ts              # Declarations + HttpClientModule + FormsModule
```

**Fluxo dos dados:** o `ArticleService` busca o JSON uma vez; componentes consomem Observables ou fazem `subscribe` onde faz sentido (ex.: home com `ngModel` e filtros locais). Na página do artigo, **`switchMap`** no `paramMap` garante que mudanças rápidas de rota não misturem respostas antigas com o id novo.

---

## Decisões que valorizam o portfólio

1. **Parei de duplicar dados no HTML** — antes os textos estavam espalhados entre template e um array incompleto; agora só o JSON manda.
2. **`routerLink` absoluto** (`['/content', id]`) — evita URLs erradas quando o usuário está em `/sobre`.
3. **`takeUntil(destroy$)`** no componente de conteúdo — evita memory leak se o observable da rota continuar emitindo após sair da página.
4. **Teste do serviço** — prova que sei isolar HTTP e validar regras (`getById`, `getFeatured`).

---

## Próximos passos (ideias)

- API REST real com interceptors (ex.: token, tratamento global de erro).
- Paginação ou lazy loading de rotas (`loadChildren`).
- Pipes de data (`DatePipe`) ou i18n para datas em português.

---

## Créditos

Projeto inicial gerado com [Angular CLI](https://github.com/angular/angular-cli) 14; evoluções e documentação orientadas a aprendizado e apresentação profissional.
