import { GlobalContextProvider } from "@client/contexts/GlobalContext";
import App, { AppContext, AppProps } from "next/app";
import '@client/sass/main.scss';
// import FontsProvider from "@client/components/Common/FontsProvider";

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      {/* <FontsProvider /> */}
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

NextApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return appProps;
};

export default NextApp;