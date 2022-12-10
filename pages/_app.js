import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

<Head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671714996037159"
      crossorigin="anonymous">
  </script>
</Head>

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-W621EQN0KS"} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
