"use client"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Exames" description="Exames" />
      <div className="flex space-x-4 px-4 pb-4">Exames</div>
    </main>
  )
}
