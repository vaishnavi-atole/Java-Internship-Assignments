import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `<div class="app-shell"><app-navbar /><main><router-outlet /></main><app-footer /></div>`,
  styles: [`
    .app-shell { min-height: 100vh; display: flex; flex-direction: column; }
    main { flex: 1; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
