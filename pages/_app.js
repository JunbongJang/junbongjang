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

import PullToRefresh from 'react-simple-pull-to-refresh';
import {Pull, Refresh} from "../components/PullToRefresh/Icon.tsx";

//Route Events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

// 당겨서 새로고침
const handleRefresh = () => new Promise<any>(() => location.reload())


function MyApp({ Component, pageProps }) {
  return (
    <div>

      <Header />
      <PullToRefresh 
          onRefresh={handleRefresh} 
          pullDownThreshold={80}
          resistance={3}
          maxPullDownDistance={90}
          pullingContent={<Pull/>}
          refreshingContent={<Refresh/>}
        >
          <Component {...pageProps} />
        </PullToRefresh>
      <Footer />

    </div>
  );
}

export default MyApp