import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cartly-cart';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.readCart());

  readonly cart$ = this.cartSubject.asObservable();
  readonly total$: Observable<number> = this.cart$.pipe(map(items => this.calculateTotal(items)));
  readonly itemCount$: Observable<number> = this.cart$.pipe(map(items => this.calculateItemCount(items)));

  addToCart(product: Product): void {
    const existing = this.cartSubject.value.find(item => item.id === product.id);
    const next = existing
      ? this.cartSubject.value.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...this.cartSubject.value, { ...product, quantity: 1 }];
    this.updateCart(next);
  }

  removeFromCart(productId: number): void {
    this.updateCart(this.cartSubject.value.filter(item => item.id !== productId));
  }

  increaseQuantity(productId: number): void {
    this.updateQuantity(productId, 1);
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartSubject.value.find(candidate => candidate.id === productId);
    if (!item) return;
    if (item.quantity === 1) this.removeFromCart(productId);
    else this.updateQuantity(productId, -1);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getTotal(): number {
    return this.calculateTotal(this.cartSubject.value);
  }

  getItemCount(): number {
    return this.calculateItemCount(this.cartSubject.value);
  }

  private updateQuantity(productId: number, change: number): void {
    this.updateCart(this.cartSubject.value.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + change } : item
    ));
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private calculateItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart(items: CartItem[]): void {
    this.cartSubject.next(items);
    if (this.isBrowser) localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private readCart(): CartItem[] {
    if (!this.isBrowser) return [];
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) as CartItem[] : [];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}
