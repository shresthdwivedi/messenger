"use client";

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { IoMoon, IoSunny } from "react-icons/io5"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleClick = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme])

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <IoSunny className="h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <IoMoon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
