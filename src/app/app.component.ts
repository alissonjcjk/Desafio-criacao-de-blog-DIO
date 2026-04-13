import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-blog';

  constructor(private theme: ThemeService) {}

  /**
   * Eu chamo init() na subida da app para reaplicar o tema salvo antes do primeiro paint perceptível.
   */
  ngOnInit(): void {
    this.theme.init();
  }
}
