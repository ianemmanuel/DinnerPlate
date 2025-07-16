import './global.css'
import Navbar from '../components/Header/Navbar'
import { ThemeProvider } from '@user-webapp/components/Global/ThemeProvider'
import { Inter } from 'next/font/google'
import { cn } from '@user-webapp/lib/utils'
import Footer from '@user-webapp/components/Global/Footer'
import QueryProviders from '@user-webapp/components/Global/QueryProviders'
import { Toaster } from "@user-webapp/components/ui/toaster"
import { AuthProvider } from '@user-webapp/components/auth/AuthProvider'


const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Dinner Plate',
  description: 'Welcome to Dinner Plate',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }){    
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "min-h-screen bg-background antialiased flex flex-col")}>
          <QueryProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Toaster/>
              <Footer/>
            </ThemeProvider>
          </QueryProviders>
        </body>
      </html>
    </AuthProvider>
  )
}