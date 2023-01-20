## Specifications
- Framework: Next.js
- UI library: Material UI
- State management: Zustand
- Data fetching: React Query

## Pages
This is the list of routes, queries, parameters, and endpoints used on each pages.

- Index Page
  - Route: `/?page=`
  - Queries
    - page (optional, default = 1)
  - Endpoints
    - GET `https://dummyjson.com/products?skip=&limit=`

## Data Persistence
To cache user's cart data, the cart state is stored in browser local storage.

***

## Getting Started

Install all dependencies:

```bash
npm install
# or
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3040](http://localhost:3040) with your browser to see the result.
