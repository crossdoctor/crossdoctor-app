"use client"

import { CreateMedicForm } from "@/components/registration/registerMedic"
import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Adicione um médico a uma Clinica/Hospital"
        description="Adicione um médico a uma Clinica/Hospital"
      />
      <div className="flex flex-col px-6 pb-4 pt-2 gap-4">
        <CreateMedicForm />
        <Toaster />
      </div>
    </main>
  )
}
