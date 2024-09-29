import { forwardRef } from "react"
import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"

// TODO - Column and row limit
// TODO - Alignment of items within the grid
// TODO - Responsive design
// TODO - Grid spacing

const gridVariants = cva("flex justify-between", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    spacing: {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
      xl: "gap-16",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
    },
    columns: {
      1: "[&>div]:basis-1/2",
      2: "[&>div]:basis-1/3",
      3: "[&>div]:basis-1/4",
      4: "[&>div]:basis-1/5",
      5: "[&>div]:basis-1/6",
      6: "[&>div]:basis-1/7",
      7: "[&>div]:basis-1/8",
      8: "[&>div]:basis-1/9",
    },
  },
  defaultVariants: {
    direction: "row",
    spacing: "sm",
    wrap: "wrap",
    columns: 1,
  },
})

export interface GridProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  children: React.ReactNode
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { className, children, direction, spacing, wrap, columns, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          gridVariants({
            className,
            direction,
            spacing,
            wrap,
            columns,
          })
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = "Grid"

export { Grid, gridVariants }

// Direct, Wrapping, Align (justify) and Align (items), grow, shrink, margin
