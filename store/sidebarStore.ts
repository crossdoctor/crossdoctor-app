import { create } from "zustand"

import { createSelectors } from "./createSelectors"

export enum SideBarMenus {
  HOME = "HOME",
  MEDIC = "MEDIC",
}

type SideBarStore = {
  selectedTab: SideBarMenus
  setSelectedTab: (tab: SideBarMenus) => void
}

const defaultTab = SideBarMenus.HOME

const tabState = create<SideBarStore>((set) => ({
  selectedTab: defaultTab,
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}))

export const sideBarStore = createSelectors(tabState)
