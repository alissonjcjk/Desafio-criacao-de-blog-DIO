import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Article } from '../models/article';
import { ArticleService } from './article.service';

/**
 * Eu escrevi este spec para provar que entendo HttpClient em testes:
 * expectOne + flush simulam a resposta sem rede real.
 */
describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  const MOCK: Article[] = [
    {
      id: '1',
      title: 'Post A',
      description: 'Resumo A',
      body: 'Corpo A',
      photoCover: '',
      category: 'Cinema',
      publishedAt: '2024-01-01',
      featured: true
    },
    {
      id: '2',
      title: 'Post B',
      description: 'Resumo B',
      body: 'Corpo B',
      photoCover: '',
      category: 'Streaming',
      publishedAt: '2024-01-02'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não ficou requisição pendente sem teste
  });

  it('deve carregar a lista, resolver getById e getFeatured após o HTTP', () => {
    let all: Article[] = [];
    service.getAll().subscribe(a => (all = a));
    httpMock.expectOne('assets/articles.json').flush(MOCK);

    expect(all.length).toBe(2);
    expect(all[0].title).toBe('Post A');

    service.getById('2').subscribe(a => expect(a?.title).toBe('Post B'));

    service.getFeatured().subscribe(a => expect(a?.id).toBe('1'));
  });
});
