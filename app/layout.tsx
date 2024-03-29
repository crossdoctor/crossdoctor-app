import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { siteConfig } from "@/config/site"
import { TailwindIndicator } from "@/components/ui/utils/tailwind-indicators"

import "../styles/globals.css"

import { SelectedTabProvider } from "@/contexts/selectedTabProvider"
import { Provider } from "jotai"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      style={{ colorScheme: "dark" }}
      className={cn(fontSans.variable, "dark")}
    >
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          <SelectedTabProvider>
            <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
              {children}
              <TailwindIndicator />
            </ThemeProvider>
          </SelectedTabProvider>
        </Provider>
      </body>
    </html>
  )
}
