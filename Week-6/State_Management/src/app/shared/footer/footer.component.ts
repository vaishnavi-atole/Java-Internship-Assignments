import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer><div class="container"><a href="/" class="logo">Cartly</a><p>Thoughtful finds, simple shopping.</p><small>© {{ year }} Cartly. Built with Angular.</small></div></footer>`,
  styles: [`
    footer { margin-top: 5rem; padding: 2.5rem 0; color: #cbd5e1; background: #111827; text-align: center; }
    .logo { color: white; font-weight: 800; font-size: 1.25rem; } p { margin: .6rem 0; } small { color: #94a3b8; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { protected readonly year = new Date().getFullYear(); }
