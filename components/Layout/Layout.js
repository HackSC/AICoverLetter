import Head from "next/head";
import { COMPANY_NAME } from "./Constants.js";
// import Footer from './Footer';
// import styles from './Layout.module.css';
// import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{COMPANY_NAME}</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="The Future of Job Applications" />
        <meta property="og:title" content="AICoverLetter" />
        <meta
          property="og:description"
          content="The Future of Job Applications"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/34591059/209997883-4d9f56ed-1796-4bdf-a950-d55e5e257c33.png"
        />
      </Head>
      <main>{children}</main>
      {/* <Nav /> */}
      {/* <main className={styles.main}>{children}</main> */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
