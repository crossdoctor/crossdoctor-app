"use client"

import { useRouter } from "next/navigation"
import { CirclePlus, CirclePlusIcon } from "lucide-react"

import { SiteRoutes } from "@/config/site"
import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import RegisterButton from "@/components/registration/registerButton"

export default function Home() {
  const router = useRouter()
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Dashboard"
        description="Painel inicial"
      />
      <div className="flex  flex-wrap px-6 pb-4 pt-2 gap-4">
        <RegisterButton
          icon={CirclePlus}
          title="Cadastrar Nova Demanda"
          description="Cadastrar Nova Demanda"
        />
        <RegisterButton
          icon={CirclePlusIcon}
          title="Cadastrar Nova Oferta"
          description="Cadastrar Nova Oferta"
          onClick={() => router.push(SiteRoutes.REGISTRATION_CLINIC)}
        />
      </div>
    </main>
  )
}
