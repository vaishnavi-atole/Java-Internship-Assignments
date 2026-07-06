import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, combineLatest, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { Product } from '../../core/models/product';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

type SortOption = 'featured' | 'price-asc' | 'price-desc';
interface ProductsState { products: Product[]; loading: boolean; error: string | null; }

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ReactiveFormsModule, LoadingSpinnerComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly retryRequest$ = new Subject<void>();

  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly categoryControl = new FormControl('all', { nonNullable: true });
  protected readonly sortControl = new FormControl<SortOption>('featured', { nonNullable: true });

  protected readonly state$: Observable<ProductsState> = this.retryRequest$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getProducts().pipe(
      map(products => ({ products, loading: false, error: null })),
      startWith({ products: [], loading: true, error: null }),
      catchError(() => of({ products: [], loading: false, error: 'We could not load the products. Please check your connection and try again.' }))
    )),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly categories$ = this.state$.pipe(map(state => [...new Set(state.products.map(product => product.category))].sort()));

  protected readonly filteredProducts$ = combineLatest([
    this.state$.pipe(map(state => state.products)),
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    this.categoryControl.valueChanges.pipe(startWith(this.categoryControl.value)),
    this.sortControl.valueChanges.pipe(startWith(this.sortControl.value))
  ]).pipe(map(([products, search, category, sort]) => this.filterAndSort(products, search, category, sort)));

  protected addToCart(product: Product): void { this.cartService.addToCart(product); }
  protected retry(): void { this.retryRequest$.next(); }
  protected trackProduct(_index: number, product: Product): number { return product.id; }

  private filterAndSort(products: Product[], search: string, category: string, sort: SortOption): Product[] {
    const query = search.trim().toLowerCase();
    const filtered = products.filter(product =>
      (category === 'all' || product.category === category) &&
      (!query || product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query))
    );
    return [...filtered].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : a.id - b.id);
  }
}
