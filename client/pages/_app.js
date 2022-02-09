import Head from "next/head";
import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  // router
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <Provider>
        {/* Add the favicon */}
        <Head>
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <ToastContainer position='top-center' />
        <TopNav />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
