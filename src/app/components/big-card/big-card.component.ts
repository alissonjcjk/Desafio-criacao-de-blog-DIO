import { Component, Input, OnInit } from '@angular/core';

/**
 * Componente "burro": só exibe o que o pai passa via @Input().
 * Eu aprendi que isso facilita reutilizar o mesmo card em outros layouts.
 */
@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit {

  @Input()
  photoCover:string =""
  @Input()
  cardTitle:string= ""
  @Input()
  cardDescription:string =""
  @Input()
  Id:string="0"

  /** Eu adicionei isso para acessibilidade: leitores de tela precisam de alt descritivo. */
  @Input()
  imageAlt = ""

  constructor() { }

  ngOnInit(): void {
  }

}
