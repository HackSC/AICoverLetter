import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const getText = (file) => {
  const fileObjectUrl = URL.createObjectURL(file);
  const pdf = pdfjsLib.getDocument(fileObjectUrl);
  return pdf.promise.then((pdf) => {
    // get all pages text
    const maxPages = pdf._pdfInfo.numPages;
    const countPromises = []; // collecting all page promises
    for (let j = 1; j <= maxPages; j++) {
      const page = pdf.getPage(j);
      countPromises.push(
        page.then((page) => {
          // add page promise
          const textContent = page.getTextContent();
          return textContent.then((text) => {
            // return content promise
            return text.items
              .map((s) => {
                return s.str;
              })
              .join(""); // value page text
          });
        })
      );
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then((texts) => {
      return texts.join("");
    });
  });
};

export default getText;
