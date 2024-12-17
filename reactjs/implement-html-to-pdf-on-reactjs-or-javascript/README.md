### How to convert a pretty looking HTML template into a PDF file?

We will be using the below mentioned JavaScript plugins to prepare the setup.

- [jsPDF](https://github.com/parallax/jsPDF)
- [html2canvas](https://html2canvas.hertzen.com/)

#### Prepare the HTML template

##### CSS selectors will be used to generate the HTML template

```ts
const pageSelector: string = "jspdf-page";
const pageElementSelector: string = "jspdf-page-element";
```

##### HTML template

```html
<!-- the parent must have the class pageSelector -->
<div className="flex flex-col jspdf-page">
  <div className="flex jspdf-page-element">
    <h1 className="text-slate-900">The 2011 Cricket World Cup Quiz</h1>
  </div>

  <div className="flex jspdf-page-element">
    <h2 className="text-slate-900 text-xl font-bold">With India winning the 2011 World Cup, it has meant that the biggest set of cricket fans remember this tournament very fondly. You can take this cricket quiz surrounding the 2011 edition of the tournament to test your knowledge too!</h2>
  </div>

  <!-- every row should have the class pageElementSelector -->

  <!-- row without the class pageElementSelector will be treated as HEADER or FOOTER -->
  <Link href="https://cricketperfect.com/the-2011-cricket-world-cup-quiz/" target="_blank" className="underline">The credit goes to cricketperfect.com</Link>
</div>
```


#### Available Page options

```ts
import { jsPDFOptions } from "jspdf";

interface Margin {
  narrow: number;
  normal: number;
}

export interface PageOptions extends jsPDFOptions {
  orientation: "p" | "portrait" | "l" | "landscape";
  unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
  format: number[];
  compress: boolean;
  margin: Margin;
}

/**
 * @description A4 page is 20.99 cm x 29.7 cm
 * or 446.2 px x 631.4 px
 */
export const A4: PageOptions = {
  orientation: 'portrait',
  unit: 'px',
  format: [446.2, 631.4],
  compress: false,
  margin: {
    narrow: 26.997,
    normal: 54.064,
  }
};

/**
 * @description Legal page is 21.59 cm x 35.56 cm
 * or 459 px x 756 px
 */
export const Legal: PageOptions = {
  orientation: 'portrait',
  unit: 'px',
  format: [459, 756],
  compress: false,
  margin: {
    narrow: 26.997,
    normal: 54.064,
  }
};

/**
 * @description Letter page is 21.59 cm x 27.94 cm
 * or 459 px x 594 px
 */
export const Letter: PageOptions = {
  orientation: 'portrait',
  unit: 'px',
  format: [459, 594],
  compress: false,
  margin: {
    narrow: 26.997,
    normal: 54.064,
  }
};

enum PageLayout {
  A4 = "A4",
  Legal = "Legal",
  Letter = "Letter",
}

const fetchPageOptionsTypeFromLayout = (pageLayout: PageLayout): PageOptions => {
  const layoutCollection = new Map<PageLayout, PageOptions>([
    [PageLayout.A4, A4],
    [PageLayout.Legal, Legal],
    [PageLayout.Letter, Letter],
  ]);
  const options = layoutCollection.get(pageLayout) as PageOptions;
  return options;
};
```

#### Generate a multipage PDF file

```ts
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface BalancedPage {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  margin: number;
}

const generateMultiPagePDF = async (page: string, pageOptions: PageOptions, selector: string): Promise<jsPDF> => {
  const pdf = new jsPDF(pageOptions);
  const balancedPages = await generateBalancedPagesWithMinWidth(page, pageOptions, selector);
  balancedPages.forEach((page, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    const convertedImage = page.canvas.toDataURL('image/jpeg', 1);
    const { left, top } = bestMargin({ pageWidth: pageOptions.format[0], canvasWidth: page.width, margin: page.margin });
    pdf.addImage(convertedImage, 'jpeg', left, top, page.width, page.height);
  });
  return pdf;
};

const handleMuliPageDownload = async (event: BaseSyntheticEvent) => {
  event.preventDefault();

  /*
   * @description pageSelector = "jspdf-page";
   * pageElementSelector = "jspdf-page-element";
   */
  const pdf = await generateMultiPagePDF(pageSelector, fetchPageOptionsTypeFromLayout(PageLayout.A4), pageElementSelector);
  const time = new Date().getTime();
  pdf.save(`HTML2PDF-A4-${time}.pdf`);

  return {};
};
```

#### Live Demo

Visit [https://abhisekdutta.vercel.app](https://abhisekdutta.vercel.app/experiments/html2pdf) for the live demo.

#### View the source file

Check the source code here @ [html2pdf.ts](./html2pdf.ts).
