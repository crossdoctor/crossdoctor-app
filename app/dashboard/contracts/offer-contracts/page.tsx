import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Ofertas de Contrato"
        description="Ofertas de Contrato"
      />

      <div className="flex space-x-4 px-4 pb-4">Ofertas de Contrato</div>
    </main>
  )
}
