import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { Product } from '../../core/models/product';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

interface ProductDetailsState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-product-details',
  imports: [AsyncPipe, CurrencyPipe, RouterLink, LoadingSpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly retryRequest$ = new Subject<void>();

  protected readonly state$: Observable<ProductDetailsState> = this.retryRequest$.pipe(
    startWith(undefined),
    switchMap(() => this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(productId => {
        if (!Number.isInteger(productId) || productId < 1) {
          return of({ product: null, loading: false, error: 'This product does not exist.' });
        }
        return this.productService.getProduct(productId).pipe(
          map(product => ({ product, loading: false, error: null })),
          startWith({ product: null, loading: true, error: null }),
          catchError(() => of({ product: null, loading: false, error: 'We could not load this product. Please try again.' }))
        );
      })
    ))
  );

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  protected retry(): void {
    this.retryRequest$.next();
  }
}
