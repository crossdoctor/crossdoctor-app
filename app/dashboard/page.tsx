"use client"

import { Suspense } from "react"
import { useAuth } from "@/contexts/userAuthProvider"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Home() {
  const { userData, isAuthorized, isLoading, isLoggedIn } = useAuth()
  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Dashboard" description="Dashboard" />
      <div className="relative">
        <ScrollArea>
          <div className="flex flex-col space-x-4 px-4 pb-4">
            <Suspense fallback={<div>Loading...</div>}>
              {userData && JSON.stringify(userData, null, 2)}
            </Suspense>
            <p className="">Dashboard</p>
            <p className="">
              {" "}
              {isAuthorized ? "Authorized" : "Not Authorized"}
            </p>
            <p className="">
              {" "}
              {isLoading
                ? "Loading"
                : isLoggedIn
                  ? "Logged In"
                  : "Not Logged In"}
            </p>
            <p className=""></p>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </main>
  )
}
