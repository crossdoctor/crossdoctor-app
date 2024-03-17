import type { Metadata } from "next"

import { SiteHeader } from "@/components/ui/SiteHeader"

export const metadata: Metadata = {
  title: "Dashboard - CrossDoctor",
  description: "Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <SiteHeader />
      <div>{children}</div>
    </main>
  )
}
