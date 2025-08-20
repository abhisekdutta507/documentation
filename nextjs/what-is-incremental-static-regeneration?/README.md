## WHat is Incremental Static Regeneration (ISR)?

Incremental Static Regeneration (ISR) enables you to:

  * Update static content without rebuilding the entire site
  * Reduce server load by serving prerendered, static pages for most requests
  * Handle large amounts of content pages without long `next build` times

Here's a minimal example:

```tsx
// `app` directory

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

export const revalidate = 120; // invalidate every 2 minutes

export default async function Products() {
  const limit = 10;
  const skip = 0;
  const localTime = new Date().toLocaleTimeString();

  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const { products } = await response.json() as IProductResponse;

  return (
    <div className="flex flex-wrap gap-4">
      <span className="text-lg">{localTime}</span>

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

### How do we know it is working as expected?

On UI we have rendered the local time `localTime`. We will notice we might press the reload multiple times back to back but the **localTime** does not change.

But after every 2 minutes when we reload we will see the time has changed.
