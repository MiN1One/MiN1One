import { GlobalContextProvider } from "@client/contexts/GlobalContext";
import App, { AppContext, AppProps } from "next/app";
import '@client/sass/main.scss';

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

NextApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return appProps;
};

export default NextApp;