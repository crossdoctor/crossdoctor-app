"use client"

import { useAuth } from "@/contexts/userAuthProvider"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Home() {
  const { userData } = useAuth()
  return (
    <main className="relative w-full">
      <InnerStickyHeader />
      <div className="relative">
        <ScrollArea>
          {/* <div className="flex space-x-4 px-4 pb-4">
            <Content />
          </div> */}
          <p className="">{userData && JSON.stringify(userData, null, 2)}</p>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </main>
  )
}
