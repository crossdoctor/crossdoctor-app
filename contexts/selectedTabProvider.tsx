"use client"

import { createContext, ReactNode, useContext, useState } from "react"

import { SideBarMenus } from "@/components/ui/sidebar"

// Define o tipo do contexto
interface SelectedTabContextType {
  selectedTab: SideBarMenus
  setSelectedTab: (tab: SideBarMenus) => void
}

// Cria o contexto com um valor default
const SelectedTabContext = createContext<SelectedTabContextType | undefined>(
  undefined
)

// Cria um Provider que gerencia o estado 'selectedTab'
export function SelectedTabProvider({ children }: { children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState<SideBarMenus>(
    SideBarMenus.HOME
  )

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  )
}

// Hook personalizado para facilitar o uso do contexto
export function useSelectedTab() {
  const context = useContext(SelectedTabContext)
  if (context === undefined) {
    throw new Error("useSelectedTab must be used within a SelectedTabProvider")
  }
  return context
}
