## Special Files in Next.js with AppRouter.

Next.js AppRouter is a conventional routing system. In the `app` folder when we create files with the below mentioned names they will have special behaviours.

### 1.  layout.tsx

We can use **layout.tsx** to add some **metadata**, **common components** like **nav bar** and more.

```tsx
import type { Metadata } from "next";

type IPageLayout = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: "Product Details",
  description: "Here you will see the product details.",
};

export default function PageLayout({
  children,
}: IPageLayout) {
  return children;
}
```

### 2.  page.tsx

The actual view of the UI can be developed on **page.tsx**. Pages can be rendered on Server and Client both.

```tsx
export default interface IPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>;
}

export default async function Page({
  params,
  searchParams,
}: IPageProps) {
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

### 3.  loading.tsx

The special file `loading.tsx` helps you create meaningful Loading UI with `React Suspense`. With this convention, you can show an instant loading state from the server while the content of a route segment streams in. The new content is automatically swapped in once complete.

```tsx
export default function Loading() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-2 p-4">
        <p className="font-base">Loading . . .</p>
      </main>
    </div>
  );
}
```

### 4.  route.ts

We can implement API routings in **route.tsx**. Each **route.tsx** file can have `GET`, `PUT`, `POST`, `PATCH`, `DELETE` async functions.

```ts
interface IRequestProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>;
}

export async function GET(request: Request, { params }: IRequestProps) {
  return Response.json({ error: false }, { status: 200 });
}

interface ISession {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  /**
   * @description https://nextjs.org/docs/app/building-your-application/routing/route-handlers#streaming
   */
  const body: ISession = await request.json();

  return Response.json({ error: true }, { status: 200 });
}
```

### 5.  not-found.tsx

#### Next.js provides two conventions to handle not found cases:

  * `not-found.tsx`: Used when you call the notFound function in a route segment.
  * `global-not-found.tsx`: Used to define a global 404 page for unmatched routes across your entire app. This is handled at the routing level and doesn't depend on rendering a layout or page. Read more about [global-not-found.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/not-found#global-not-foundjs-experimental).

#### We can add the `not-found.tsx` in the `/app` folder. That will work for all missing page. Also, we can add individual `not-found.tsx` for each page to show custom not found message.

```tsx
export default function NotFound() {
  return (
    <main className="grid min-h-screen p-4 xs:p-24 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-16 xs:gap-20 row-start-1">
        <div className="flex flex-col gap-2 max-w-screen-md">
          <p className="font-semibold text-slate-900">Oops!!</p>
          <p className="text-md text-slate-600 font-light">I could not find the page at this moment.</p>
        </div>
      </div>
    </main>
  );
}
```

### 6.  error.tsx

An error file allows you to handle unexpected runtime errors and display fallback UI.

The `error.tsx` wraps a route segment and its nested children in a React Error Boundary. When an error throws within the boundary, the error component shows as the fallback UI.

```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export interface PageError {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset: handleReset,
}: PageError) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen p-4 xs:p-24 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-16 xs:gap-20 row-start-1">
        <div className="flex flex-col gap-2 max-w-screen-md">
          <p className="font-semibold text-slate-900">Oops!!</p>
          <p className="text-md text-slate-600 font-light">An unexpected error {error?.message} has occurred.</p>
          <Button variant="default" type="button" size="sm" className="flex gap-1 px-2 w-20" onClick={handleReset}>
            Retry
          </Button>
        </div>
      </div>
    </main>
  );
}
```
