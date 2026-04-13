import { Component, Input, OnInit } from '@angular/core';

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

  /** Texto alternativo da imagem (a11y); se vazio, usa o título do card. */
  @Input()
  imageAlt = ""

  constructor() { }

  ngOnInit(): void {
  }

}
