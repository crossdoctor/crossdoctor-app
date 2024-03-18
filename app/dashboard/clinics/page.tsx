import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Clínicas" description="Clínicas" />
      <div className="relative">
        <div className="flex space-x-4 px-4 pb-4">Clinics</div>
      </div>
    </main>
  )
}
