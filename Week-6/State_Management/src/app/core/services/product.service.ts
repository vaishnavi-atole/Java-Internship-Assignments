import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      retry({ count: 2, delay: 800 })
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${productId}`).pipe(
      retry({ count: 2, delay: 800 })
    );
  }
}
