import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="loading" role="status"><span class="spinner"></span><p>Finding great products…</p></div>`,
  styles: [`
    .loading { min-height: 320px; display: grid; place-content: center; justify-items: center; color: var(--muted); }
    .spinner { width: 44px; height: 44px; border: 4px solid var(--primary-soft); border-top-color: var(--primary); border-radius: 50%; animation: spin .75s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {}
