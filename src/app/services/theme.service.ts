import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'angular-blog-theme';

/**
 * Alternância claro/escuro com persistência em localStorage.
 * Aplica classes no body para o CSS global reagir via variáveis.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** true = tema escuro (padrão alinhado ao visual original do projeto). */
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
      /* ignore */
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
