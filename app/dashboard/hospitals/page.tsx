import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Hospitais" description="Hospitais" />
      <div className="relative">
        <div className="flex space-x-4 px-4 pb-4">Hospitais</div>
      </div>
    </main>
  )
}
