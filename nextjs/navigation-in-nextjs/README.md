## How do we navigate in Next.js?

There are 2 ways we can navigate throughout the Next.js application.

### 1. Link

```tsx
import Link from "next/link";

export default function NextServerComponent() {
  return (
    <ul>
      <li><Link href="/cards">Colourful Cards</Link></li>
    </ul>
  );
}
```

### 2. Programmatic Navigation

```tsx
"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NextClientComponent() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex">
      <form className="flex flex-col gap-4" method="post" onSubmit={handleSubmit}>
        <input name="username" />
        <input name="password" type="password" />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
```
