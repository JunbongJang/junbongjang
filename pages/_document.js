import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        
        <Head>
          <meta charSet="utf-8" />
          
          {/* <!-- SEO Meta Tags --> */}
          <meta name="description" content="Junbong's personal website introducing about himself, his work and research interests. 장준봉의 개인 웹사이트" />
          <meta name="author" content="Junbong Jang, 장준봉" />

          {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on Facebook, Twitter, LinkedIn --> */}
          <meta property="og:site_name" content="Junbong Jang, 장준봉" />
          <meta property="og:site" content="" /> {/*<!-- website link --> */}
          <meta property="og:title" content=""/> {/*<!-- title shown in the actual shared post --> */}
          <meta property="og:description" content="" /> {/*<!-- description shown in the actual shared post --> */}
          <meta property="og:image" content="" /> {/*<!-- image link, make sure it's jpg --> */}
          <meta property="og:url" content="" /> {/*<!-- where do you want your post to link to --> */}
          <meta name="twitter:card" content="" /> {/*<!-- to have large image post format in Twitter --> */}
          <meta name="google-site-verification" content="qY9snZFK8Yo5waUMpwFT9-SpL-rTfEHD-7rBSlFUShE" />
          
          {/* <!-- Styles --> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@600&display=swap" rel="stylesheet" />
          {/* <link href="../styles/bootstrap.css" rel="stylesheet" />
          <link href="../styles/fontawesome-all.css" rel="stylesheet" />
          <link href="../styles/custom_styles.css" rel="stylesheet" /> */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css" />
          
          <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"/>

          {/* <!-- Favicon  --> */}
          <link rel="icon" href="images/favicon.ico" />

          {/* For styling code blocks */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
          <script>hljs.initHighlightingOnLoad();</script>
        
          
          <Script src="https://use.fontawesome.com/fb615be7a2.js" />
          <Script src="https://kit.fontawesome.com/348d8fb546.js" crossOrigin="anonymous" />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-78F2GG95V2`}
          />
          
          <Script strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-78F2GG95V2', {
                page_path: window.location.pathname,
                });
            `}
          </Script>
          <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7652221922952924"
                  crossorigin="anonymous" strategy="afterInteractive">
          </Script>
        
        </Head>

        <body>

          <Main />
          <NextScript />

          <Script src="/js/jquery.min.js" strategy="beforeInteractive"/> {/* <!-- jQuery for Bootstrap's JavaScript plugins --> */}
          <Script src="/js/jquery.easing.min.js" strategy="beforeInteractive"/> {/* <!-- jQuery Easing for smooth scrolling between anchors --> */}
          <Script src="/js/bootstrap.min.js" strategy="afterInteractive"/> {/* <!-- Bootstrap framework --> */}
          <Script src="/js/scripts.js" strategy="afterInteractive"/>  {/* <!-- Custom scripts --> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;