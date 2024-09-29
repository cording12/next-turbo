import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui"

import navConfig, { DropdownItems, NavLink } from "./navConfig"

export default function NavigationLinks() {
  const renderDropdownItems = (items: DropdownItems) => {
    return Object.keys(items).map((key) => {
      const item: NavLink = items[key]
      return (
        <ul
          key={item.labelKey}
          className="hover:bg-accent focus:bg-accent focus:text-accent-foreground group rounded-md transition-colors"
        >
          <div className="block h-full select-none leading-none no-underline outline-none">
            <Link href={item.href}>
              <div className="p-3">
                <div className="group-hover:text-foreground leading-none transition-colors">
                  <div className="flex flex-row items-center gap-1">
                    <item.icon className="size-4" />
                    {item.labelKey}
                  </div>
                </div>
                <p className="text-muted-foreground line-clamp-2 leading-snug">
                  {item.descriptionKey}
                </p>
              </div>
            </Link>
          </div>
        </ul>
      )
    })
  }

  const renderNavLinks = () => {
    return Object.keys(navConfig.navLinks)
      .filter((key) => navConfig.navLinks[key].showOnDesktop)
      .map((key) => {
        const link = navConfig.navLinks[key]
        return (
          <NavigationMenuItem key={key}>
            {link.dropdown && link.dropdownItems ? (
              <NavigationMenuTrigger className="text-foreground/70 hover:text-foreground p-0">
                {link.labelKey}
                <NavigationMenuContent>
                  <ul
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                    key={key}
                  >
                    {renderDropdownItems(link.dropdownItems)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuTrigger>
            ) : (
              <Link
                className="hover:text-foreground text-foreground/70 data-[active]:bg-accent/50 ring-offset-background focus-visible:ring-ring group inline-flex h-10 w-max items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                href={link.href}
              >
                {link.labelKey}
              </Link>
            )}
          </NavigationMenuItem>
        )
      })
  }

  return (
    <NavigationMenu className="flex items-center ease-out">
      <NavigationMenuList className="justify-start gap-6 space-x-0">
        {renderNavLinks()}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
