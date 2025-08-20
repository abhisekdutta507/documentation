## What is Server-side Rendering (getServerSideProps)?

In the `pages` directory, `getServerSideProps` is used to fetch data on the server and forward props to the default exported React component in the file. The initial HTML for the page is prerendered from the server.

```tsx
// `pages` directory

import Link from "next/link";
import ProductInformation from "@/components/product-information";

interface IServerSidePropsContext {
  query: {
    [key: string]: string;
  };
}

interface IProject {
  name: string;
}

interface IProductsProps {
  products: IProject[];
}
 
export async function getServerSideProps({
  query,
}: IServerSidePropsContext) {
  const { limit = 10, skip = 0 } = query;

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
}
```

In the `app` directory, data fetching with `fetch()` will default to cache: `"force-cache"`. By setting the cache option to `"no-store"`, we can indicate that the fetched data should never be cached.

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

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, { cache: "no-store" });
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

In this case as we used **searchParams** in async Server Component. By default it will be,

```JSON
{
  "cache": "no-store"
}
```

So, passing the option is not required anymore.

```tsx
export default async function Products({
  searchParams,
}: IProductsProps) {
  const { limit = 10, skip = 0 } = await searchParams;

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const { products } = await response.json() as IProductResponse;

  // ...
};
```
