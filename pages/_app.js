import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671714996037159"
            crossorigin="anonymous">
        </script>
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-W621EQN0KS"} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
