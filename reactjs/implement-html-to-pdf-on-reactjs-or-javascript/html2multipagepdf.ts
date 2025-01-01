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
