import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-button font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent-amber text-background hover:bg-accent-amber/90":
              variant === "primary",
            "bg-surface text-text-primary border border-border hover:bg-surface/80":
              variant === "secondary",
            "text-text-primary hover:text-accent-teal": variant === "ghost",
            "h-10 px-5 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
