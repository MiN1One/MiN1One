import { Head, Html, Main, NextScript, } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <link 
        rel="stylesheet" 
        href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css"
      />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <link href="/static/fonts/style.css" rel="stylesheet" />
      {`<!-- Google tag (gtag.js) -->`}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-L0XJ2VX5P4" />
      <Script strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-L0XJ2VX5P4');`}
      </Script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;