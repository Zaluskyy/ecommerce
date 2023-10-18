import './globals.css'
import { Poppins } from 'next/font/google'
import NavBar from './components/NavBar'
import { EcommerceContextProvider } from './store/context'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] })

export const metadata = {
  title: 'Zaluskyy shop',
  description: 'The best shop',
  verification: {
    google: 'tRsEUBkFRrQ_dehZlRf-uSYPHdQZ5KUri1KPBPRYiP0',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <EcommerceContextProvider>
        <body className={poppins.className}>
          <NavBar/>
          {children}
          <Toaster position='top-center'/>
        </body>
      </EcommerceContextProvider>
    </html>
  )
}
