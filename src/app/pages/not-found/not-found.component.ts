import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Exibido pela rota `**` — eu preferi uma página explícita a deixar o usuário perdido.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Página não encontrada | Angular Blog');
    this.meta.updateTag({
      name: 'description',
      content: 'A página solicitada não existe.'
    });
  }
}
