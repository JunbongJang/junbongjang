import  "../styles/bootstrap.css"
import  "../styles/custom_styles.css"
import '../styles/header.css'
import '../styles/home_page.css'
import '../styles/global.css'
import  "../styles/fontawesome-all.css"

import Header from "../components/header.tsx"
import Footer from "../components/footer"
import Script from "next/script";

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/Nprogress.css'; //styles of nprogress

//Route Events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <div>

      <Script
        strategy="afterInteractive "
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="afterInteractive ">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>


      <Header />
      <Component {...pageProps} />
      <Footer />

    </div>
  );
}

export default MyApp