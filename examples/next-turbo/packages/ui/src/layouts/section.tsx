import { forwardRef } from "react"
import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"

import { maxWidthVariants, MaxWidthWrapper } from "./max-width-wrapper"

// TODO: Establish colours for lighter/darker sections vs. overall background colour
// TODO: Establish responsive styling
// TODO: Refactor to split styling for section, max-width-wrapper and gradient

const sectionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      dark: "bg-background",
      light: "bg-background-complement",
      callout: "border-border/70 bg-background border-b border-t",
    },
    padding: {
      tight: "py-8 lg:py-12",
      loose: "py-16 lg:py-24",
      none: "p-0",
    },
    direction: {
      override: "",
      row: "flex w-full flex-row",
      column: "flex w-full flex-col",
    },
    alignment: {
      left: "items-left",
      center: "items-center",
      right: "items-right",
    },
    gradient: {
      override: "",
      none: "display-none",
      primary: "from-primary to-secondary-foreground",
      secondary: "from-secondary to-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "loose",
    direction: "column",
    gradient: "none",
  },
})

export interface SectionProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants>,
    VariantProps<typeof maxWidthVariants> {
  children: React.ReactNode
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      variant,
      padding,
      className,
      children,
      direction,
      size,
      alignment,
      gradient,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full overflow-hidden">
        <section
          className={cn(
            sectionVariants({
              variant,
              padding,
              // Note: sectionVariants applies all defaultVariants, even when only picking variant, padding etc.
              // The below overrides this behaviour by applying the "override" class declared in sectionVariants
              direction: "override",
              gradient: "override",
            })
          )}
          ref={ref}
          {...props}
        >
          <MaxWidthWrapper
            size={size}
            className={cn(
              sectionVariants({
                direction,
                className,
                alignment,
                gradient: "override",
              }),
              "relative"
            )}
          >
            <div className="z-10">{children}</div>
            {gradient !== null && gradient !== undefined && (
              <>
                <div
                  className={cn(
                    sectionVariants({ gradient, padding: "none" }),
                    "z-5 absolute top-0 mx-auto h-px w-full max-w-4xl bg-gradient-to-r opacity-[18%] blur-[50px]"
                  )}
                ></div>
                <div
                  className={cn(
                    sectionVariants({ gradient, padding: "none" }),
                    "z-5 absolute -top-32 h-96 w-1/2 transform-gpu rounded-full bg-gradient-to-r opacity-[10%] blur-[120px]"
                  )}
                ></div>
              </>
            )}
          </MaxWidthWrapper>
        </section>
      </div>
    )
  }
)

Section.displayName = "Section"

export { Section, sectionVariants }
