import { forwardRef } from "react"
import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"

const gridItemVariants = cva("flex flex-auto", {
  variants: {
    grow: {
      true: "grow",
      false: "grow-0",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      centre: "justify-center",
      none: "",
    },
    items: {
      start: "items-start",
      end: "items-end",
      centre: "items-center",
      none: "",
    },
  },
  defaultVariants: {
    grow: true,
    justify: "centre",
    items: "centre",
  },
})

export interface GridItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  children: React.ReactNode
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, children, grow, justify, items, ...props }, ref) => {
    return (
      <div
        className={cn(gridItemVariants({ className, grow, justify, items }))}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

GridItem.displayName = "GridItem"

export { GridItem, gridItemVariants }

// Direct, Wrapping, Align (justify) and Align (items), grow, shrink, margin
