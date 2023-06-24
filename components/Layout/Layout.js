import Head from "next/head";
import { COMPANY_NAME } from "./Constants.js";

const Layout = ({ children }) => {
  const pageTitle = `${COMPANY_NAME} - The Future of Job Applications`;
  const pageDescription = "AI Cover Letter: The Future of Job Applications";
  const pageUrl = "https://aicoverletter.org";
  const imageUrl = "https://user-images.githubusercontent.com/34591059/209997883-4d9f56ed-1796-4bdf-a950-d55e5e257c33.png";
  const keywords = "AI, Artificial Intelligence, Job Applications, Cover Letter, Employment, Career, Job Search";

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{pageTitle}</title>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:creator" content="@danialasaria" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
