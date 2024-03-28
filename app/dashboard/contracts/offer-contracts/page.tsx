import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import OfferTable from "@/components/contracts/offer-contracts/offerTable"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Ofertas de Contrato"
        description="Ofertas de Contrato"
      />

      <OfferTable />
    </main>
  )
}
