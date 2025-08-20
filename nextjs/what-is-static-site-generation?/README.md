## What is Static Site Generation (getStaticProps)?

In the `pages` directory, the `getStaticProps` function is used to pre-render a page at build time. This function can be used to fetch data from an external API or directly from a database, and pass this data down to the entire page as it's being generated during the build.

```tsx
// `pages` directory

import Link from "next/link";
import ProductInformation from "@/components/product-information";

interface IProject {
  name: string;
}

interface IProductsProps {
  products: IProject[];
}

export async function getStaticProps() {
  const limit = 10;
  const skip = 0;

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const { products } = await response.json() as IProductResponse;

  return { props: { products } };
}

export default function Products({
  products,
}: IProductsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {
        products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Product {...product} />
          </Link>
        ))
      }
    </div>
  );
};
```

In the `app` directory, data fetching with `fetch()` will default to cache: `"force-cache"`, which will cache the request data until manually invalidated. This is similar to `getStaticProps` in the `pages` directory.

```tsx
// `app` directory

import Link from "next/link";
import ProductInformation from "@/components/product-information";

interface IProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

interface IProductsProps {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Products({
  searchParams,
}: IProductsProps) {
  const { limit = 10, skip = 0 } = await searchParams;

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const { products } = await response.json() as IProductResponse;

  return (
    <div className="flex flex-wrap gap-4">
      {
        products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Product {...product} />
          </Link>
        ))
      }
    </div>
  );
};
```

### Limitations of `pages` router.

In `pages` router using `getStaticProps` we can not read **params** or **searchParams**. Whereas in `app` router we can create `async` pages. And we can access **params** and **searchParams** using **await** and make API calls using **fetch()**.

### Advantages of Static Site Generation (SSG)

The page is generated during the build. And API calls will be cached until manually invalidated or the next build. Putting less load on the server to generate HTML template on each request. Instead returns the same HTML template everytime.

But as soon as we use **params** or **searchParams** in an `async` Server Component, the Static Site Generation will be stopped automatically and it will fall back to Server Side Rendering.

Which means, if we use make API calls with static data then we can take the advantage of Static Site Generation.

```tsx
export default async function Products() {
  const limit = 200;
  const skip = 0;

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const { products } = await response.json() as IProductResponse;

  return (
    <div className="flex flex-wrap gap-4">
      {
        products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Product {...product} />
          </Link>
        ))
      }
    </div>
  );
};
```
