import { BarChart, Users } from "@repo/ui"
import { FC } from "React"

export interface NavLink {
  labelKey: string
  descriptionKey: string
  href: string
  icon: FC<{ className?: string }>
}

export interface DropdownItems {
  [key: string]: NavLink
}

export interface NavLinks {
  [key: string]: {
    labelKey: string
    href: string
    dropdown: boolean
    showOnDesktop: boolean
    showOnMobile: boolean
    dropdownItems?: DropdownItems
  }
}

interface NavConfig {
  navLinks: NavLinks
}

const navConfig: NavConfig = {
  navLinks: {
    features: {
      labelKey: "Features",
      dropdown: true,
      showOnDesktop: true,
      showOnMobile: true,
      href: "/features",
      dropdownItems: {
        analytics: {
          labelKey: "Dropdown item 1",
          descriptionKey: "Dropdown short description.",
          href: "/features/analytics",
          icon: BarChart,
        },
        collaboration: {
          labelKey: "Dropdown item 2",
          descriptionKey: "Dropdown short description.",
          href: "/features/collaboration",
          icon: Users,
        },
      },
    },
    pricing: {
      labelKey: "Pricing",
      href: "/pricing",
      dropdown: false,
      showOnDesktop: true,
      showOnMobile: true,
    },
    changelog: {
      labelKey: "Changelog",
      href: "/changelog",
      dropdown: false,
      showOnDesktop: true,
      showOnMobile: true,
    },
    help: {
      labelKey: "Help",
      href: "/help",
      dropdown: false,
      showOnDesktop: true,
      showOnMobile: true,
    },
  },
}

export default navConfig
