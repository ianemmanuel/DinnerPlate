import { Header } from '@restaurant-webapp/components/dashboard/header/Header'
import { Sidebar } from '@restaurant-webapp/components/dashboard/layout/sidebar'
import { Footer } from '@restaurant-webapp/components/dashboard/layout/footer'
import { ThemeProvider } from '@restaurant-webapp/components/shared/ThemeProvider'
import { Toaster } from '@restaurant-webapp/components/ui/sonner'
import AuthInitializer from '@restaurant-webapp/components/auth/AuthInitializer'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

        <div className="flex h-screen overflow-hidden">
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex-1 flex flex-col min-h-0 border-r bg-background">
              <Sidebar />
            </div>
          </div>
          <div className="flex flex-col w-0 flex-1 overflow-hidden md:ml-64">
            <Header />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <div className="py-4 md:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {/* <AuthInitializer/> */}
                  {children}
                  <Toaster richColors/>
                </div>
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}