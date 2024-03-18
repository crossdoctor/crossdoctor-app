"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/userAuthProvider"

import InnerStickyHeader from "@/components/ui/innerStickyHeader"

export default function Home() {
  const { userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userData) {
      router.push("/dashboard/")
    }
  }, [userData])

  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Contratos" description="Contratos" />
      <div className="flex space-x-4 px-4 pb-4">Contratos</div>
    </main>
  )
}
