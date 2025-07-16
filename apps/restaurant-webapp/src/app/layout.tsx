
import AuthInitializer from '@restaurant-webapp/components/auth/AuthInitializer';
import './globals.css';
import QueryProviders from './QueryProviders';

export const metadata = {
  title: 'Spicy | Restaurant',
  description: 'Welcome to spicy restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProviders>
          <AuthInitializer/>
          {children}
        </QueryProviders>
      </body>
    </html>
  )
}
