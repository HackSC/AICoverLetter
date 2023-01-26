import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Layout from "../components/Layout/Layout.js";

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
