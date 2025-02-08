"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  
  const handleClick = () => {
    if(theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark");
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
