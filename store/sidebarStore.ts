// import { create } from "zustand"

// import { createSelectors } from "./createSelectors"

// export const enum SideBarMenus {
//   HOME = "HOME",
//   CLINICS = "CLINICS",
//   MEDICS = "MEDICS",
//   CONTRACT_DEMANDS = "CONTRACT_DEMANDS",
//   EXAM_OFFERS = "EXAM_OFFERS",
//   OFFER_CONTRACTS = "OFFER_CONTRACTS",
//   MEDICAL_EXAMS = "MEDICAL_EXAMS",
//   MATCH_OFFERS = "MATCH_OFFERS",
// }

// type SideBarStore = {
//   selectedTab: SideBarMenus
//   setSelectedTab: (tab: SideBarMenus) => void
// }

// const defaultTab = SideBarMenus.HOME

// const tabState = create<SideBarStore>((set) => ({
//   selectedTab: defaultTab,
//   setSelectedTab: (tab) => set({ selectedTab: tab }),
// }))

// export const sideBarStore = createSelectors(tabState)
