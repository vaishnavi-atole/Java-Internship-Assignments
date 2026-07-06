import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../core/models/product';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  protected readonly cart = inject(CartService);
  protected increase(id: number): void { this.cart.increaseQuantity(id); }
  protected decrease(id: number): void { this.cart.decreaseQuantity(id); }
  protected remove(id: number): void { this.cart.removeFromCart(id); }
  protected clear(): void { this.cart.clearCart(); }
  protected trackItem(_index: number, item: CartItem): number { return item.id; }
}
