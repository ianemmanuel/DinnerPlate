
export const metadata = {
  title: 'Spicy | Restaurant',
  description: 'Welcome to spicy restaurant',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col">
            <header className="py-6 px-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="container mx-auto flex justify-center md:justify-start">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FoodConnect</h1>
            </div>
            </header>
            
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                {children}
            </div>
            </main>
            
            <footer className="py-6 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} FoodConnect. All rights reserved.
            </div>
            </footer>
        </div>
      </body>
    </html>
  )
}
