import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Users from "@/components/Users/Users"

export default function Home() {
  return (
    <main className="relative w-full">
      <div className="flex flex-col sticky mt-2 w-full bg-transparent backdrop-blur-md z-10 ">
        <div className="flex items-center justify-between ">
          <div className="space-y-1 px-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Listen Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 px-4 pb-4">
            <Users />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </main>
  )
}
