"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CopyPlus,
  HomeIcon,
  Hospital,
  Receipt,
  ReceiptText,
  ShieldPlus,
  Stethoscope,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Separator } from "./separator"

// import { Playlist } from "../data/playlists"
export type Playlist = (typeof playlists)[number]

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
]

export const enum SideBarMenus {
  HOME = "dashboard",
  CLINICS = "clinics",
  HOSPITALS = "hospitals",
  MEDICS = "medics",
  CONTRACT_DEMANDS = "contracts/contracts-demands",
  EXAMS = "exams",
  OFFER_CONTRACTS = "contracts/offer-contracts",
  MEDICAL_EXAMS = "exams/medical-exams",
  MATCH_OFFERS = "match/match-offers",
}
type SidebarItem = {
  text: string
  linkUrl: string
  type: SideBarMenus
  icon: React.ReactNode
  isSelected?: boolean
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists?: Playlist[]
}

const sideHeader = [
  SideBarMenus.HOME,
  SideBarMenus.CLINICS,
  SideBarMenus.HOSPITALS,
  SideBarMenus.MEDICS,
]
const contracts = [SideBarMenus.CONTRACT_DEMANDS, SideBarMenus.OFFER_CONTRACTS]
const match = [SideBarMenus.MATCH_OFFERS]
const sideBotttom = [SideBarMenus.EXAMS]

export function Sidebar({ className }: SidebarProps) {
  const selectedTab = usePathname().split("/").slice(2)

  const sidebarItems: SidebarItem[] = [
    {
      text: "Home",
      linkUrl: SideBarMenus.HOME,
      type: SideBarMenus.HOME,
      icon: <HomeIcon size={16} className="text-primary" />,
      isSelected:
        selectedTab[0] === SideBarMenus.HOME || selectedTab.length === 0,
    },
    {
      text: "Clinícas",
      linkUrl: SideBarMenus.CLINICS,
      type: SideBarMenus.CLINICS,
      icon: <Hospital size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.CLINICS),
    },
    {
      text: "Médicos",
      linkUrl: SideBarMenus.MEDICS,
      type: SideBarMenus.MEDICS,
      icon: <Stethoscope size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.MEDICS),
    },
    {
      text: "Hospitais",
      linkUrl: SideBarMenus.HOSPITALS,
      type: SideBarMenus.HOSPITALS,
      icon: <Hospital size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.HOSPITALS),
    },
    {
      text: "Ofertas",
      linkUrl: SideBarMenus.OFFER_CONTRACTS,
      type: SideBarMenus.OFFER_CONTRACTS,
      icon: <Receipt size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.OFFER_CONTRACTS),
    },
    {
      text: "Demandas",
      linkUrl: SideBarMenus.CONTRACT_DEMANDS,
      type: SideBarMenus.CONTRACT_DEMANDS,
      icon: <ReceiptText size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.CONTRACT_DEMANDS),
    },
    {
      text: "Ofertas",
      linkUrl: SideBarMenus.MATCH_OFFERS,
      type: SideBarMenus.MATCH_OFFERS,
      icon: <CopyPlus size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.MATCH_OFFERS),
    },
    {
      text: "Exames",
      linkUrl: SideBarMenus.EXAMS,
      type: SideBarMenus.EXAMS,
      icon: <ShieldPlus size={16} className="text-primary" />,
      isSelected: selectedTab.includes(SideBarMenus.EXAMS),
    },
  ]
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4">
        <div className="">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => sideHeader.includes(item.type))
              .map((item) => (
                <Link
                  key={item.text}
                  href={
                    item.type === "dashboard"
                      ? "/" + item.linkUrl
                      : "/dashboard/" + item.linkUrl
                  }
                >
                  <Button
                    variant={item.isSelected ? "secondary" : "ghost"}
                    className="w-full gap-2 justify-start"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        <div className="">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
            Contratos
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => contracts.includes(item.type))
              .map((item) => (
                <Link
                  key={item.text}
                  href={
                    item.type === "dashboard"
                      ? "/" + item.linkUrl
                      : "/dashboard/" + item.linkUrl
                  }
                >
                  <Button
                    variant={item.isSelected ? "secondary" : "ghost"}
                    className="w-full gap-2 justify-start"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        <div className="">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
            Match
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => match.includes(item.type))
              .map((item) => (
                <Link
                  key={item.text}
                  href={
                    item.type === "dashboard"
                      ? "/" + item.linkUrl
                      : "/dashboard/" + item.linkUrl
                  }
                >
                  <Button
                    variant={item.isSelected ? "secondary" : "ghost"}
                    className="w-full gap-2 justify-start"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        <div className="">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
            Exames
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => sideBotttom.includes(item.type))
              .map((item) => (
                <Link
                  key={item.text}
                  href={
                    item.type === "dashboard"
                      ? "/" + item.linkUrl
                      : "/dashboard/" + item.linkUrl
                  }
                >
                  <Button
                    variant={item.isSelected ? "secondary" : "ghost"}
                    className="w-full gap-2 justify-start"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        {/* <div className="">
          <h2 className="relative text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[250px] px-1">
            <div className="space-y-1 ">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div> */}
      </div>
    </div>
  )
}
