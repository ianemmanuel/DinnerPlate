

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export async function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </>
    
)
}