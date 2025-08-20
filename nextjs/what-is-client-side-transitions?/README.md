## What is Client-side Transitions?

Traditionally, navigation to a server-rendered page triggers a full page load. This clears state, resets scroll position, and blocks interactivity.

Next.js avoids this with client-side transitions using the `<Link>` component. Instead of reloading the page, it updates the content dynamically by:

  * Keeping any shared layouts and UI.
  * Replacing the current page with the prefetched loading state or a new page if available.

Client-side transitions are what makes a server-rendered apps feel like client-rendered apps.

```tsx
import Link from "next/link";

export default function Page() {
  return (
    <navigation className="p-4">
      <ul className="flex flex-col gap-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/blogs">Blogs</Link></li>
      </ul>
    </navigation>
  );
}
```
