# Cartly — Angular Shopping Cart

Cartly is a responsive shopping cart application built with Angular 20 standalone components. It demonstrates reactive state management, HTTP integration, lazy routing, reusable UI components, and browser persistence without a third-party state or CSS library.

## Features

- Product catalog powered by Fake Store API
- Search by title or category
- Category filters and price sorting
- Loading, automatic retry, error, and empty states
- Add, increase, decrease, remove, and clear cart actions
- Reactive item count and totals across the application
- Cart persistence with `localStorage`
- Responsive navigation, product grid, and cart
- Accessible controls and reduced-motion support
- Lazy-loaded standalone page components

## Technologies

Angular 20, TypeScript, RxJS, Angular Router, Angular HttpClient, standalone components, HTML, and pure CSS.

## Folder Structure

```text
src/app/
├── core/
│   ├── models/product.ts
│   └── services/
│       ├── cart.service.ts
│       └── product.service.ts
├── features/
│   ├── home/
│   ├── products/
│   ├── product-details/
│   ├── cart/
│   └── not-found/
├── shared/
│   ├── navbar/
│   ├── footer/
│   ├── product-card/
│   └── loading-spinner/
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

## Installation and Running

Requirements: a version supported by Angular 20—Node.js 20.19+, 22.12+, or 24—and npm. Node.js 25/26 is not supported by Angular 20.

```bash
npm install
npm start
```

Visit `http://localhost:4200`. Create an optimized build with `npm run build`.

## API

Products are loaded from [Fake Store API](https://fakestoreapi.com/products). Failed requests are retried twice before the UI displays a retry action.

## State Management

`CartService` owns the only mutable cart state in a private `BehaviorSubject`. Components consume read-only `cart$`, `itemCount$`, and `total$` observables using the async pipe. Every cart operation creates a new array and emits it, so all subscribed views update automatically. The emitted state is also serialized to `localStorage` and safely restored on startup.

## Lazy Loading

Home, Products, Product Details, Cart, and Not Found are standalone components loaded with route-level dynamic imports. Their JavaScript is split into separate chunks and requested only when each route is visited.

## Screenshots

Add project screenshots to a `docs/screenshots` directory and reference them here after deployment.

## License

This project is available for educational use.
