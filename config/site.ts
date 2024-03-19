export type SiteConfig = typeof siteConfig

export enum SiteRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  REGISTRATION_CLINIC = "/dashboard/registration/clinic-register",
}
export const siteConfig = {
  name: "Cross Doctor",
  description: "",
  mainNav: [
    {
      title: "Login",
      href: SiteRoutes.HOME,
    },
    {
      title: "Dashboard",
      href: SiteRoutes.DASHBOARD,
    },
    {
      title: "User view",
      href: "/dashboard",
    },
    {
      title: "Registro",
      href: "/dashboard/registration",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
