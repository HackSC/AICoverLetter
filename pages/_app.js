import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Layout from "../components/Layout/Layout.js";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <GoogleAnalytics trackPageViews gaMeasurementId={"G-W621EQN0KS"} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
