import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import Users from "@/components/Users/Users"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Médicos" description="Medicos" />
      <div className="relative">
        <div className="flex space-x-4 px-4 pb-4">
          <Users />
        </div>
      </div>
    </main>
  )
}
