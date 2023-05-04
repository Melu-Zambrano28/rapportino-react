import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Provider, createStore } from 'jotai'
import type { AppProps } from 'next/app'

const store = createStore()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  )
}
