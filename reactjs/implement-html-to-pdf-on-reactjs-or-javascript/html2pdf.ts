import html2canvas from "html2canvas";
import { jsPDF, jsPDFOptions } from "jspdf";

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

interface BalancedPage {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  margin: number;
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
    narrow: 16,
    normal: 32,
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
    narrow: 16,
    normal: 32,
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
    narrow: 16,
    normal: 32,
  }
};

const toHTMLElementArray = (elementsNodeList: NodeListOf<HTMLElement>): HTMLElement[] => {
  const pageElements: HTMLElement[] = [];
  elementsNodeList.forEach((element: HTMLElement) => {
    pageElements.push(element);
  });
  return pageElements;
};

interface BestWidthProps {
  pageWidth: number;
  margin: number;
  canvasWidth: number;
}

const bestWidth = ({
  pageWidth,
  margin,
  canvasWidth,
}: BestWidthProps) => {
  let width = canvasWidth;
  const extras = {
    canvasWidth: 0,
    canvasWidthPercentage: 0,
  };

  const totalWidth = canvasWidth + margin * 2; // canvas width + left margin + right margin; assuming both margins are equal
  if (totalWidth > pageWidth) {
    extras.canvasWidth = totalWidth - pageWidth;
    extras.canvasWidthPercentage = extras.canvasWidth * 100 / canvasWidth;
  }
  width -= extras.canvasWidth;
  return {
    width,
    extras,
  };
};

interface BestHeightProps {
  pageHeight: number;
  margin: number;
  canvasHeight: number;
}

export const bestHeight = ({
  pageHeight = 0,
  margin = 0,
  canvasHeight = 0,
}: BestHeightProps) => {
  let height = canvasHeight;
  const extras = {
    canvasHeight: 0,
    canvasHeightPercentage: 0,
  };

  const totalHeight = canvasHeight + margin * 2; // canvas height + top margin + bottom margin; assuming both margins are equal
  if (totalHeight > pageHeight) {
    extras.canvasHeight = totalHeight - pageHeight;
    extras.canvasHeightPercentage = extras.canvasHeight * 100 / canvasHeight;
  }
  height -= extras.canvasHeight;
  return {
    height,
    extras,
  };
};

type BestWidthAndHeightProps = BestWidthProps & BestHeightProps;

const bestWidthAndHeight = ({
  pageWidth = 0,
  pageHeight = 0,
  margin = 0,
  canvasWidth = 0,
  canvasHeight = 0,
}: BestWidthAndHeightProps) => {
  let {
    width,
    extras: { canvasWidthPercentage },
  } = bestWidth({
    pageWidth,
    margin,
    canvasWidth,
  });

  const adjustedCanvasHeight = canvasHeight * (100 - canvasWidthPercentage) / 100;

  let {
    height,
    extras: { canvasHeightPercentage },
  } = bestHeight({
    pageHeight,
    margin,
    canvasHeight: adjustedCanvasHeight,
  });

  width = width * (100 - canvasHeightPercentage) / 100;

  return {
    width,
    height,
    margin,
  };
};

const generateBalancedElements = async (page: HTMLElement, pageOptions: PageOptions, pageElements: HTMLElement[], traversedElements: HTMLElement[], remainingElements: HTMLElement[], balancedElements: BalancedPage[]) => {
  if (!remainingElements.length) {
    // convert the ui into an image
    const canvas = await html2canvas(page);
    const { width, height, margin } = bestWidthAndHeight({ pageWidth: pageOptions.format[0], pageHeight: pageOptions.format[1], margin: pageOptions.margin.narrow, canvasWidth: canvas.width, canvasHeight: canvas.height });
    balancedElements.push({ canvas, width, height, margin });
    return { page, balancedElements };
  }

  const [element, ...leftEls] = remainingElements;
  element.classList.remove("hidden");
  traversedElements.push(element);

  // convert the ui into an image
  const canvas = await html2canvas(page);

  // find the best width but not best the height
  let { width, extras: { canvasWidthPercentage } } = bestWidth({ pageWidth: pageOptions.format[0], margin: pageOptions.margin.narrow, canvasWidth: canvas.width });  
  const adjustedCanvasHeight = canvas.height * (100 - canvasWidthPercentage) / 100;

  // if the height responsible for best width is more than the page height
  // then find the best height
  if (adjustedCanvasHeight > pageOptions.format[1]) {
    const { height, extras: { canvasHeightPercentage } } = bestHeight({ pageHeight: pageOptions.format[1], margin: pageOptions.margin.narrow, canvasHeight: adjustedCanvasHeight });
    width = width * (100 - canvasHeightPercentage) / 100;

    balancedElements.push({
      canvas,
      width,
      height,
      margin: pageOptions.margin.narrow,
    });

    traversedElements.forEach((element: HTMLElement) => {
      element.classList.add("hidden");
    });
    return await generateBalancedElements(page, pageOptions, pageElements, traversedElements, leftEls, balancedElements);
  }

  return await generateBalancedElements(page, pageOptions, pageElements, traversedElements, leftEls, balancedElements);
};

/**
 * 
 * @param pages `HTMLElement[]`
 * @param pageOptions `PageOptions`
 * @param traversedPages `HTMLElement[]`
 * @param remainingPages `HTMLElement[]`
 * @param balancedPages `BalancedPage[]`
 * @param elementSelector `string`
 * @returns `BalancedPage[]`
 */
const generateBalancedPages = async (pages: HTMLElement[], pageOptions: PageOptions, traversedPages: HTMLElement[], remainingPages: HTMLElement[], balancedPages: BalancedPage[], elementSelector: string) => {
  if (!remainingPages.length) {
    return balancedPages;
  }

  const [page, ...leftPages] = remainingPages;
  const elementsNodeList = page.querySelectorAll(`.${elementSelector}`) as NodeListOf<HTMLElement>;
  elementsNodeList.forEach((element: HTMLElement) => {
    element.classList.add("hidden");
  });

  const pageElements = toHTMLElementArray(elementsNodeList);
  const { balancedElements } = await generateBalancedElements(page, pageOptions, pageElements, [], pageElements, []);
  elementsNodeList.forEach((element: HTMLElement) => {
    element.classList.remove("hidden");
  });
  traversedPages.push(page);

  return await generateBalancedPages(pages, pageOptions, traversedPages, leftPages, [...balancedPages, ...balancedElements], elementSelector);
};

const generateBalancedPagesWithMinWidth = async (page: string, pageOptions: PageOptions, selector: string) => {
  const pagesNodeList = document.querySelectorAll(`.${page}`) as NodeListOf<HTMLElement>;
  const pages = toHTMLElementArray(pagesNodeList);
  const balancedPages = await generateBalancedPages(pages, pageOptions, [], pages, [], selector);

  let canvasMinWidth = balancedPages[0].width;
  balancedPages.forEach(({ width }) => {
    if (width < canvasMinWidth) canvasMinWidth = width;
  });

  const balancedPagesWithMinWidth: BalancedPage[] = balancedPages.map(({ width, height, ...rest }) => {
    if (canvasMinWidth === width) {
      return { width, height, ...rest };
    }

    const extraWidth = width - canvasMinWidth;
    const extraWidthPercentage = extraWidth * 100 / width;
    const adjustedCanvasHeight = height * (100 - extraWidthPercentage) / 100;
    return {
      width: canvasMinWidth,
      height: adjustedCanvasHeight,
      ...rest,
    };
  });

  return balancedPagesWithMinWidth;
};

export const generateMultiPagePDF = async (page: string, pageOptions: PageOptions, selector: string): Promise<jsPDF> => {
  const pdf = new jsPDF(pageOptions);
  const balancedPages = await generateBalancedPagesWithMinWidth(page, pageOptions, selector);
  balancedPages.forEach((page, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    const convertedImage = page.canvas.toDataURL('image/jpeg', 1);
    pdf.addImage(convertedImage, 'jpeg', page.margin, page.margin, page.width, page.height);
  });
  return pdf;
};

const generateBalancedPagesWithoutElements = async (pages: HTMLElement[], pageOptions: PageOptions, traversedPages: HTMLElement[], remainingPages: HTMLElement[], balancedPages: BalancedPage[]) => {
  if (!remainingPages.length) {
    return balancedPages;
  }

  const [page, ...leftPages] = remainingPages;
  const canvas = await html2canvas(page);
  const { width, height, margin } = bestWidthAndHeight({
    pageWidth: pageOptions.format[0],
    pageHeight: pageOptions.format[1],
    margin: pageOptions.margin.narrow,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  });
  balancedPages.push({
    canvas,
    width,
    height,
    margin,
  });
  traversedPages.push(page);

  return await generateBalancedPagesWithoutElements(pages, pageOptions, traversedPages, leftPages, balancedPages);
};

export const generateSinglePagePDF = async (page: string, pageOptions: PageOptions): Promise<jsPDF> => {
  const pdf = new jsPDF(pageOptions);
  const pagesNodeList = document.querySelectorAll(`.${page}`) as NodeListOf<HTMLElement>;
  const pages = toHTMLElementArray(pagesNodeList);
  const balancedPages = await generateBalancedPagesWithoutElements(pages, pageOptions, [], pages, []);
  balancedPages.forEach((page, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    const convertedImage = page.canvas.toDataURL('image/jpeg', 1); // 1 => 100%, 0 => 0%, 0.1
    pdf.addImage(convertedImage, 'jpeg', page.margin, page.margin, page.width, page.height);
  });
  return pdf;
};
