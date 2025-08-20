## What is Streaming?

Streaming allows the server to send parts of a dynamic route to the client as soon as they're ready, rather than waiting for the entire route to be rendered. This means users see something sooner, even if parts of the page are still loading.

For dynamic routes, it means they can be partially prefetched. That is, shared layouts and loading skeletons can be requested ahead of time.

To use streaming, create a `loading.tsx` in your route folder:

```tsx
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />
}
```
