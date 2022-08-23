import '../styles/globals.css'
import type { AppProps } from 'next/app';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeProvider>
      <Component {...pageProps} />
    </SafeProvider>
  )
}

export default MyApp
