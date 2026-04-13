import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

/**
 * Eu misturei routerLink (rotas internas) com href externo.
 * No HTML dos cards usei ['/content', id] com barra inicial para o link funcionar mesmo vindo da rota /sobre.
 */
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  constructor(public theme: ThemeService) {}

  toggleTheme(): void {
    this.theme.toggle();
  }
}
