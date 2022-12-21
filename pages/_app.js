import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671714996037159"
      />
      <Script
        id="Adsense-id"
        async
        data-ad-client="ca-pub-4671714996037159"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-W621EQN0KS"} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
