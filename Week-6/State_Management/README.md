# Cartly — Angular Shopping Cart

Cartly is a responsive shopping cart application built using Angular 20 standalone components. The application demonstrates Angular HttpClient integration, reactive state management with RxJS, routing, reusable components, and browser persistence using LocalStorage.

## Features

- Fetch products from Fake Store API using Angular HttpClient
- Search products by title or category
- Filter products by category
- Sort products by price
- Loading, error, retry, and empty state handling
- Add products to cart
- Increase and decrease product quantity
- Remove individual products from cart
- Clear complete cart
- Reactive cart item count and total price calculation
- LocalStorage persistence across browser refreshes
- Responsive user interface
- Lazy-loaded standalone components and routes

## Technologies Used

- Angular 20
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
- Standalone Components
- HTML5
- CSS3
- LocalStorage

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

## Installation

```bash
npm install
```

## Run Project

```bash
npm start
```

or

```bash
ng serve
```

Open the following URL in your browser:

```text
http://localhost:4200
```

## Build Project

```bash
npm run build
```

## API Integration

The application consumes product data from the Fake Store API using Angular HttpClient.

API Endpoint:

```text
https://fakestoreapi.com/products
```

Failed API requests are automatically retried before displaying an error message and retry option to the user.

## State Management

The application uses RxJS `BehaviorSubject` for managing cart state.

Features include:

- Reactive cart updates
- Shared state across components
- Item count tracking
- Total price calculation
- LocalStorage synchronization

## Routing and Lazy Loading

The application uses Angular Router with lazy-loaded standalone components for:

- Home
- Products
- Product Details
- Cart
- Not Found Page

This improves performance by loading pages only when required.

## Screenshots

Add screenshots after running the project:

- Home Page
- Product Listing Page
- Product Details Page
- Shopping Cart Page
- Error and Empty States

## Learning Outcomes

- Angular HttpClient Integration
- REST API Consumption
- RxJS State Management
- Angular Routing and Lazy Loading
- Reusable Component Architecture
- LocalStorage Data Persistence
- Responsive UI Development

## Author

**Vaishnavi Atole**
