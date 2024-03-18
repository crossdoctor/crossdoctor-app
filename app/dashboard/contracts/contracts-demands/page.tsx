import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Demandas de Contrato"
        description="Demandas de Contrato"
      />

      <div className="flex space-x-4 px-4 pb-4">Demandas de Contrato</div>
    </main>
  )
}
