### How to convert a pretty looking HTML template into a PDF file?

We will be using the below mentioned JavaScript plugins to prepare the setup.

- [@abhisek507/html2multipagepdf](https://www.npmjs.com/package/@abhisek507/html2multipagepdf)

#### Prepare the HTML template

##### CSS selectors will be used to generate the HTML template

```tsx
"use client";
import {
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
} from "@abhisek507/html2multipagepdf/constants";
import { cn } from "@/lib/utils";

export const Template = () => (
  <div className={cn("flex flex-col max-w-2xl min-h-64 border border-neutral-950 rounded-md gap-8 p-8", PageWithMaxPossibleWidthSelector)}>
    <div className={cn("flex", PageElementSelector)}>
      <h1 className="text-slate-900 text-2xl sm:text-3xl font-bold">The 2011 Cricket World Cup Quiz</h1>
    </div>

    <div className={cn("flex", PageElementSelector)}>
      <h2 className="text-slate-900 text-xl font-bold">With India winning the 2011 World Cup, it has meant that the biggest set of cricket fans remember this tournament very fondly. You can take this cricket quiz surrounding the 2011 edition of the tournament to test your knowledge too!</h2>
    </div>

    <!-- every row should have the class pageElementSelector -->

    <!-- row without the class pageElementSelector will be treated as HEADER or FOOTER -->
    <Link href="https://cricketperfect.com/the-2011-cricket-world-cup-quiz/" target="_blank" className="underline">The credit goes to cricketperfect.com</Link>
  </div>
);
```


#### Available Page options

We can choose from the below page sizes.

```ts
"use client";
import {
  A4,
  Legal,
  Letter,
} from "@abhisek507/html2multipagepdf/constants";
```

#### Generate a multipage PDF file

Code snippet to generate a PDF file.

```ts
"use client";
import { BaseSyntheticEvent } from "react";
import { generatePDF, PageConfig } from "@abhisek507/html2multipagepdf";
import {
  A4,
  Quality,
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
} from "@abhisek507/html2multipagepdf/constants";

const handleMuliPageDownload = async (event: BaseSyntheticEvent) => {
  event.preventDefault();

  const pageConfig: PageConfig = {
    quality: Quality["100"], // 100 || 90 || 80 || ... 20 || 10
    alignCenter: true, // true || false
  };

  const pdf = await generatePDF(
    [PageWithMaxPossibleWidthSelector],
    A4, // A4 || Legal || Letter
    PageElementSelector,
    pageConfig,
  );
  const time = new Date().getTime();
  pdf.save(`pdf-A4-${time}.pdf`);

  return {};
};
```

#### Live Demo

Visit [abhisekdutta.com](https://abhisekdutta.com/experiments/html2pdf) for the live demo.

#### View the source file

Check the source code here @ [html2multipagepdf.ts](./html2multipagepdf.ts).
