import Link from "next/link"
import { Button, MaxWidthWrapper } from "@repo/ui"

import NavigationButtons from "./navigation-buttons"
import NavigationLinks from "./navigation-links"

export default function Navigation() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <MaxWidthWrapper size="wide">
        <div className="flex h-14 min-w-full items-center justify-between text-sm font-normal">
          <div className="z-50 flex flex-row items-center gap-12">
            <Link href={"/"}>
              <p className="font-semibold">create-next-turbo</p>
            </Link>
            <div id="desktop-nav-links" className="hidden md:flex">
              <NavigationLinks />
            </div>
          </div>
          {/* Lol I never bothered to make a mobile nav */}
          {/* <div
            id="mobile-nav"
            className="flex flex-row justify-end gap-2 md:hidden"
          ></div> */}
          <div id="desktop-nav" className="hidden items-center gap-2 md:flex">
            <div className="flex flex-row gap-3">
              <Link href="http://localhost:3001">
                <Button variant="outline" className="h-8 font-normal" size="sm">
                  Documentation
                </Button>
              </Link>
            </div>
            <div id="desktop-nav-buttons" className="hidden md:flex">
              <NavigationButtons />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
