import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

/**
 * Eu refatorei a home para não repetir dados no HTML: tudo vem do ArticleService.
 * A busca e a categoria filtram só a lista lateral; o destaque (big card) ficou fixo de propósito.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search = '';
  category = 'all';
  categories: string[] = [];
  allArticles: Article[] = [];
  featured: Article | null = null;
  listArticles: Article[] = [];
  loading = true;

  constructor(
    private articleService: ArticleService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Angular Blog | Início');
    this.meta.updateTag({
      name: 'description',
      content: 'Blog de demonstração em Angular com artigos, busca e filtros por categoria.'
    });

    // Eu poderia usar async pipe no template; aqui preferi subscribe porque misturo filtros com ngModel.
    this.articleService.getAll().subscribe(articles => {
      this.loading = false;
      this.allArticles = articles;
      this.categories = ['all', ...new Set(articles.map(a => a.category))];
      this.refreshFeatured();
      this.applyFilters();
    });
  }

  private refreshFeatured(): void {
    this.featured =
      this.allArticles.find(a => a.featured) ?? this.allArticles[0] ?? null;
  }

  applyFilters(): void {
    const featuredId = this.featured?.id;
    let list = this.allArticles.filter(a => a.id !== featuredId);
    if (this.category !== 'all') {
      list = list.filter(a => a.category === this.category);
    }
    const q = this.search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          (a.tags?.some(t => t.toLowerCase().includes(q)) ?? false)
      );
    }
    this.listArticles = list;
  }
}
