import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Article } from '../models/article';

/**
 * Eu concentrei todo o acesso aos posts aqui em vez de importar JSON nos componentes.
 * Aprendi que `providedIn: 'root'` registra o serviço uma vez e o Angular injeta onde preciso.
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private static readonly URL = 'assets/articles.json';

  /**
   * Eu usei shareReplay(1) porque percebi que home e content pediam os mesmos dados:
   * sem isso eu dispararia várias requisições iguais ao assets/articles.json.
   */
  private cached$: Observable<Article[]> | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.articles$();
  }

  private articles$(): Observable<Article[]> {
    if (!this.cached$) {
      this.cached$ = this.http.get<Article[]>(ArticleService.URL).pipe(
        catchError(err => {
          console.error('Falha ao carregar artigos', err);
          // Eu retorno array vazio para a UI não quebrar se o JSON falhar (rede, 404, etc.).
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this.cached$;
  }

  /** Busco por id depois que a lista já está em memória (derivado do mesmo Observable). */
  getById(id: string): Observable<Article | undefined> {
    return this.articles$().pipe(
      map(articles => articles.find(a => a.id === id))
    );
  }

  /** Eu priorizo `featured: true` no JSON; se não houver, mostro o primeiro post. */
  getFeatured(): Observable<Article | undefined> {
    return this.articles$().pipe(
      map(articles => {
        if (!articles.length) {
          return undefined;
        }
        return articles.find(a => a.featured) ?? articles[0];
      })
    );
  }

  search(query: string): Observable<Article[]> {
    const q = query.trim().toLowerCase();
    return this.articles$().pipe(
      map(articles => {
        if (!q) {
          return articles;
        }
        return articles.filter(
          a =>
            a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            (a.tags?.some(t => t.toLowerCase().includes(q)) ?? false)
        );
      })
    );
  }

  filterByCategory(category: string): Observable<Article[]> {
    return this.articles$().pipe(
      map(articles => {
        if (!category || category === 'all') {
          return articles;
        }
        return articles.filter(a => a.category === category);
      })
    );
  }
}
