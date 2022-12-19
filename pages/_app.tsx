import type { AppProps } from 'next/app'
import AppContext from '../components/appContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  )

}

export default MyApp
