'use client'

import ClinicsTable from "@/components/clinics/clinicsTable"
import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {


  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Clínicas" description="Clínicas" />

      <ClinicsTable/>
    </main>
  )
}
