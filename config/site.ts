export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Cross Doctor",
  description: "",
  mainNav: [
    {
      title: "Login",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "User view",
      href: "/dashboard",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
