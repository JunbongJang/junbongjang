import  "../styles/bootstrap.css"
import  "../styles/custom_styles.css"
import '../styles/header.css'
import '../styles/home_page.css'
import '../styles/global.css'
import  "../styles/fontawesome-all.css"

import Header from "../components/header.tsx"
import Footer from "../components/footer"

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

      <Header />
      <Component {...pageProps} />
      <Footer />

    </div>
  );
}

export default MyApp