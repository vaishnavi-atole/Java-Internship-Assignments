import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  private readonly router = inject(Router);
  readonly product = input.required<Product>();
  readonly add = output<Product>();
  protected readonly added = signal(false);

  protected openProduct(): void {
    void this.router.navigate(['/products', this.product().id]);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openProduct();
    }
  }

  protected addProduct(event: MouseEvent): void {
    event.stopPropagation();
    this.add.emit(this.product());
    this.added.set(true);
    window.setTimeout(() => this.added.set(false), 900);
  }
}
