import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<section class="not-found container"><span>404</span><h1>That page wandered off.</h1><p>We looked in every aisle, but couldn't find what you requested.</p><a class="button" routerLink="/">Back to home</a></section>`,
  styles: [`.not-found { min-height: 65vh; display: grid; place-content: center; justify-items: center; text-align: center; }.not-found span { color: var(--primary-soft); font-size: clamp(7rem, 22vw, 13rem); font-weight: 900; line-height: .8; }.not-found h1 { margin: 1.5rem 0 .4rem; font-size: 2rem; }.not-found p { margin-bottom: 1.5rem; color: var(--muted); }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
