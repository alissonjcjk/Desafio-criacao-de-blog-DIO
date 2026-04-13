import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'angular-blog-theme';

/**
 * Eu quis um tema persistente sem biblioteca externa: BehaviorSubject emite o valor atual
 * e o menu usa async pipe; as cores ficam em variáveis CSS no body.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDark$ = new BehaviorSubject<boolean>(this.readStored());

  init(): void {
    this.apply(this.isDark$.value);
  }

  toggle(): void {
    const next = !this.isDark$.value;
    this.isDark$.next(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* modo privado / storage indisponível */
    }
    this.apply(next);
  }

  private readStored(): boolean {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'light') {
        return false;
      }
      if (v === 'dark') {
        return true;
      }
    } catch {
      /* ignore */
    }
    return true;
  }

  private apply(dark: boolean): void {
    document.body.classList.toggle('theme-dark', dark);
    document.body.classList.toggle('theme-light', !dark);
  }
}
