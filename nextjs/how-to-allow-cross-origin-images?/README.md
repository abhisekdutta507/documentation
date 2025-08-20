## How do we allow CROSS Origin Images in Next.js?

Navigate to the `next.config.ts` or `next.config.js`. Then update the file with below snippet.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com"
      },
      {
        protocol: "https",
        hostname: "cloudinary.com"
      }
    ],
  }
};

export default nextConfig;
```
