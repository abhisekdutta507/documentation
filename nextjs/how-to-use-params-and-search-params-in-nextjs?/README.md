## How to use params & searchParams in Next.js?

The syntax is different for **server components** and **client components**.

### Snippet for Server Components

A Server Component can be `async` Components. By default `params` & `searchParams` will be present as props.

```tsx
interface ICardIdProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>;
}

export default async function CardId({
  params,
  searchParams,
}: ICardIdProps) {
  const { id } = await params;
  const { limit } = await searchParams;

  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-2 p-4">
        
      </main>
    </div>
  );
}
```

### Server Components with Variable Params

A Server Component can have variable number of **params**. Such as, `/products/electronics/mobile/apple/iphone17`.

In this case we can either create nested dynamic route pages or we can simple use variable params `products/[...skus]`.

```tsx
interface IProductSkusProps {
  params: Promise<{
    skus: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>
}

import IProductSkusProps from "@/interfaces/product-skus-props";

export default async function Products({
  params,
}: IProductSkusProps) {
  const { skus = [] } = await params;

  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-2 p-4">
        <h1 className="text-3xl font-semibold">Products</h1>
        <ul className="flex gap-1">
          {
            skus.map((sku, index) => (
              <li key={sku} className="flex gap-1">
                <span className="cursor-pointer">{sku}</span>
                {
                  (index !== skus.length - 1) && (
                    <span>/</span>
                  )
                }
              </li>
            ))
          }
        </ul>
      </main>
    </div>
  );
}
```

### Client Components will be different

In case of client components we are not allowed to create `async` components. Therefor we must rely on Next.js hooks to read the **params** & **searchParams** for us.

```tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function CardId() {
  const params: { id: string } = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const limit = searchParams.get("limit");

  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-2 p-4">
        
      </main>
    </div>
  );
}

```
