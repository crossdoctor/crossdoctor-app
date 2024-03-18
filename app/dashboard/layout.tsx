import { AuthProvider } from "@/contexts/userAuthProvider"

import { Sidebar } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/ui/siteHeader"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <SiteHeader />
      <div className="flex w-full">
        <AuthProvider>
          <div className="w-2/12 h-screen border-r pt-4">
            <Sidebar className="fixed w-2/12 h-screen px-4" />
          </div>
          <div className="w-10/12  ">{children}</div>
        </AuthProvider>
      </div>
    </main>
  )
}
