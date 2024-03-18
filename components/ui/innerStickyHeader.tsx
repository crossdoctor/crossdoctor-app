"use client"

import { useSearchParams } from "next/navigation"

import { Separator } from "./separator"
import { SideBarMenus } from "./sidebar"

const InnerStickyHeader = () => {
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab") || SideBarMenus.HOME
  return (
    <div className="flex flex-col sticky mt-2 w-full bg-transparent backdrop-blur-md z-10 ">
      <div className="flex items-center justify-between ">
        <div className="space-y-1 px-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {selectedTab}
          </h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}

export default InnerStickyHeader
