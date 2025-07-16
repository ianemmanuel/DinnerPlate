"use client"

import Link from "next/link"
import { Button } from "@user-webapp/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@user-webapp/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription>Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Oops! The page you're looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
