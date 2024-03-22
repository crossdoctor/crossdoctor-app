import Providers from "@/utils/Providers"

import { Sidebar } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/ui/SiteHeader"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
          <div className="w-10/12  ">{children}</div>
    </main>
  )
}
