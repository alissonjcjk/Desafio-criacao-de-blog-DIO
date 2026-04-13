/**
 * Contrato de um post do blog.
 * Centralizar tipos assim ajuda o TypeScript a validar templates e serviços
 * e documenta o formato dos dados (similar a um DTO em APIs reais).
 */
export interface Article {
  id: string;
  title: string;
  /** Resumo exibido nos cards e na meta description. */
  description: string;
  /** Texto completo na página do artigo. */
  body: string;
  photoCover: string;
  category: string;
  /** Data ISO 8601 (ex.: 2024-03-15) para ordenação ou exibição. */
  publishedAt: string;
  tags?: string[];
  /** Se true, aparece como destaque no big card (senão usa o primeiro da lista). */
  featured?: boolean;
}
