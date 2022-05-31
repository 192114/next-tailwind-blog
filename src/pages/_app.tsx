import '@/styles/tailwind.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import Layout from '@/layouts/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
