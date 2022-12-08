import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-W621EQN0KS"} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
