"use client"

import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button, Icons } from "@repo/ui"

export default function NavigationButtons() {
  return (
    <div className="flex flex-row">
      <ThemeToggle />
      <Button variant="ghost" size="icon">
        <Icons.github className="fill-foreground size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Icons.linkedin className="fill-foreground size-4" />
      </Button>
    </div>
  )
}
