/**
 * Eu defini esta interface para ter um "contrato" único do que é um post.
 * Assim o TypeScript me avisa se eu errar um campo no JSON ou no template,
 * e fica parecido com o que vi sobre DTOs / modelos em APIs reais.
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
  /** Se true, aparece como destaque no big card (senão uso o primeiro da lista). */
  featured?: boolean;
}
