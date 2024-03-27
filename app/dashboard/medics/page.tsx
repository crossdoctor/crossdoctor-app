import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import MedicsTable from "@/components/medics/medicsTable"
import Users from "@/components/Users/Users"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Médicos" description="Medicos" />

      <MedicsTable />
    </main>
  )
}
