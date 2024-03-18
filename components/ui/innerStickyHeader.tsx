"use client"

import { Separator } from "./separator"

const InnerStickyHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col sticky mt-2 w-full bg-transparent backdrop-blur-md z-10 ">
      <div className="flex items-center justify-between ">
        <div className="space-y-1 px-4">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}

export default InnerStickyHeader
