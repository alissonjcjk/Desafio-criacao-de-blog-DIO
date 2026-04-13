import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

/**
 * Eu aprendi que o parâmetro da rota vem como Observable: não posso confiar só no primeiro tick.
 * switchMap cancela a busca anterior se eu clicar rápido de um post para outro.
 */
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  article: Article | undefined;
  notFound = false;
  loading = true;

  /** Eu uso takeUntil para encerrar a inscrição quando saio da página (evita vazamento de memória). */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.loading = true;
          const id = params.get('id');
          if (!id) {
            return of(undefined);
          }
          return this.articleService.getById(id);
        }),
        tap(article => {
          this.loading = false;
          this.article = article;
          this.notFound = !article;
          if (article) {
            this.title.setTitle(`${article.title} | Angular Blog`);
            this.meta.updateTag({ name: 'description', content: article.description });
          } else {
            this.title.setTitle('Artigo não encontrado | Angular Blog');
            this.meta.updateTag({
              name: 'description',
              content: 'O artigo solicitado não foi encontrado.'
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
