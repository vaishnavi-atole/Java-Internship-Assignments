import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Home | Cartly', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'products/:id', title: 'Product Details | Cartly', loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: 'products', title: 'Products | Cartly', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent) },
  { path: 'cart', title: 'Your Cart | Cartly', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: '**', title: 'Page Not Found | Cartly', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
