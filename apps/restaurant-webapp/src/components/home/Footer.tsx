import Link from 'next/link'
import { ChefHat } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container px-6 py-8 md:py-12">
        {/* Footer Columns */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Spicy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium food delivery and exclusive meal plans from your favorite restaurants.
            </p>
          </div>

          {/* Company Column */}
          <div className="pl-4">
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-sm text-muted-foreground hover:text-foreground">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="pl-4">
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="pl-4">
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-1 pl-4">
            <h3 className="font-semibold mb-3">Payment Methods</h3>
            <div className="flex items-center gap-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-4"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-4"
              />
            </div>
          </div>

          {/* App Download Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-2 pl-4">
            <h3 className="font-semibold mb-3">Download Our App</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="https://apps.apple.com" // Replace with your App Store link
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-8"
                />
              </Link>
              <Link
                href="https://play.google.com" // Replace with your Play Store link
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-8" 
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Spicy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}