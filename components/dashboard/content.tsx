"use client"

import { useSearchParams } from "next/navigation"

import { SideBarMenus } from "../ui/sidebar"

const Content = () => {
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab") || SideBarMenus.HOME
  switch (selectedTab) {
    case SideBarMenus.HOME:
      return <div>{/* <Users /> */}</div>
    case SideBarMenus.CLINICS:
      return <div>Clinics</div>
    case SideBarMenus.CONTRACT_DEMANDS:
      return <div>Medics</div>
    case SideBarMenus.EXAM_OFFERS:
      return <div>Hospitals</div>
    default:
      return <div>Content</div>
  }
}

export default Content
