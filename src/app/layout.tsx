import './globals.css'
import { Poppins } from 'next/font/google'
import NavBar from './components/NavBar'
import { EcommerceContextProvider } from './store/context'
import Head from 'next/head'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] })

export const metadata = {
  title: 'Zaluskyy shop',
  description: 'The best shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="tRsEUBkFRrQ_dehZlRf-uSYPHdQZ5KUri1KPBPRYiP0" />
      </Head>
      <EcommerceContextProvider>
        <body className={poppins.className}>
          <NavBar/>
          {children}
        </body>
      </EcommerceContextProvider>
    </html>
  )
}
