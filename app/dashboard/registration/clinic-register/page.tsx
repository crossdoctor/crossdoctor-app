"use client"

import { ProfileForm } from "@/components/registration/registerForm"
import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="relative w-full">
      <InnerStickyHeader
        title="Cadastre uma Clínica/Hospital"
        description="Cadastre uma Clínica/Hospital"
      />
      <div className="flex flex-col px-6 pb-4 pt-2 gap-4">
        <ProfileForm />
        <Toaster />
      </div>
    </main>
  )
}
