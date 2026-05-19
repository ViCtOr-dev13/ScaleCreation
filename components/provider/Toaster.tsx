"use client"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

const ToasterProvider = () => {
    const {resolvedTheme} = useTheme()
  return (
    <div>
      <Toaster theme={resolvedTheme as "light" | "dark" | undefined}
      position="bottom-right"/>
    </div>
  )
}

export default ToasterProvider
