import { forwardRef } from "react"
import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"

const maxWidthVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      full: "max-w-full",
      wide: "max-w-screen-2xl p-0",
      default: "max-w-screen-2xl px-5 lg:px-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface MaxWidthWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof maxWidthVariants> {
  children: React.ReactNode
}

const MaxWidthWrapper = forwardRef<HTMLDivElement, MaxWidthWrapperProps>(
  ({ size, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(maxWidthVariants({ className, size }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MaxWidthWrapper.displayName = "MaxWidthWrapper"

export { MaxWidthWrapper, maxWidthVariants }
