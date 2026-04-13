import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Article } from '../models/article';

/**
 * Camada de acesso aos posts.
 * Injeta HttpClient (fornecido pelo HttpClientModule) e expõe Observables,
 * alinhado ao modelo reativo do Angular (idealmente com async pipe no template).
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private static readonly URL = 'assets/articles.json';

  /**
   * shareReplay(1) mantém a última lista em memória: vários componentes
   * podem chamar getAll()/getById() sem disparar novo HTTP.
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
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this.cached$;
  }

  /** Artigo por id ou undefined se não existir (após o JSON carregar). */
  getById(id: string): Observable<Article | undefined> {
    return this.articles$().pipe(
      map(articles => articles.find(a => a.id === id))
    );
  }

  /** Primeiro com featured === true, ou o primeiro da lista. */
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
