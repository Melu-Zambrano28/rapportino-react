import '@/styles/globals.css'
import { Provider, createStore } from 'jotai'
import type { AppProps } from 'next/app'

const store = createStore()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
