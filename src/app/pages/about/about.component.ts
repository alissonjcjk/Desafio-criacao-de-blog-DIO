import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * Eu atualizo Title/Meta aqui também: cada rota "importante" merece título único no navegador.
   */
  ngOnInit(): void {
    this.title.setTitle('Sobre | Angular Blog');
    this.meta.updateTag({
      name: 'description',
      content: 'Conheça o propósito deste blog de demonstração em Angular.'
    });
  }
}
