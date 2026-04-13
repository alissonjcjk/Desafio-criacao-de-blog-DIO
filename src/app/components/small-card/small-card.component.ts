import { Component, Input, OnInit } from '@angular/core';

/** Mesma ideia do big-card: dados entram por @Input e eu não acoplo à origem (JSON, API, etc.). */
@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  @Input()
  photoCover:string = ""

  @Input()
  cardTitle:string = ""

  @Input()
  Id:string="0"

  @Input()
  imageAlt = ""

  constructor() { }

  ngOnInit(): void {
  }

}
