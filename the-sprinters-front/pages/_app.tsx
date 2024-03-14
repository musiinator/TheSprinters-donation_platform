import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Provider } from "react-redux";
import { theme } from '@/theme';
import Layout from "@/src/common/layout/layout.component";
import { useStore } from "@/src/common/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Head>
        <title>The Sprinters</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg"/>
      </Head>
      <MantineProvider theme={theme}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </MantineProvider>
    </Provider>
  );
}
