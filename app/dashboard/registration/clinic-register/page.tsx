"use client"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Cadastro de Contratos"
        description="Cadastro de Contratos"
      />
      <div className="flex  flex-wrap px-6 pb-4 pt-2 gap-4"></div>
    </main>
  )
}
