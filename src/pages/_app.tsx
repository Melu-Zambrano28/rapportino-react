import '@/styles/globals.css'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import { Provider, createStore } from 'jotai'
import type { AppProps } from 'next/app'

const store = createStore()
const myCache = createEmotionCache({ key: 'mantine', prepend: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider emotionCache={myCache} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  )
}
