"use client"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import ClinicsTable from "@/components/clinics/clinicsTable"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Clínicas" description="Clínicas" />

      <ClinicsTable />
    </main>
  )
}
