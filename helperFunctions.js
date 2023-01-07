import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const getText = (file) => {
  // Added the if check to ensure you only call this in a browser insetead of in the server when compiling the app
  if (typeof document !== "undefined") {
    const fileObjectUrl = URL.createObjectURL(file);
    const pdf = pdfjsLib.getDocument(fileObjectUrl);

    // const fileObjectUrl = URL.createObjectURL(file);
    // const pdf = pdfjsLib.getDocument(fileObjectUrl);
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
  }
};

export const ltrim = (str) => {
    if (!str) return str;
    return str.trimStart();
  };

  