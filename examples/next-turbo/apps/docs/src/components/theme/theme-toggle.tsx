"use client"

import { Moon, Sun } from "@repo/ui"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }

  return (
    <button
      className="group flex items-center justify-center rounded-full bg-transparent outline-none hover:bg-inherit focus-visible:outline-none"
      onClick={() => toggleTheme()}
    >
      <Sun className="group-hover:text-foreground size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="group-hover:text-foreground absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
