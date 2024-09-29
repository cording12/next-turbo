import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"
import Balancer from "react-wrap-balancer"

// TODO: Needs refactoring for responsiveness

const variantsConfig = {
  variant: {
    heroHeading:
      "tracking-loose mb-2 mt-9 scroll-m-20 text-6xl font-bold leading-[105%]",
    heroSubHeading: "tracking-loose m-0 text-xl leading-[165%]",
    h1: "tracking-loose mb-4 mt-9 scroll-m-20 text-6xl font-semibold leading-tight",
    h2: "mb-4 mt-9 scroll-m-20 text-5xl font-semibold leading-tight tracking-tight",
    h3: "mb-4 mt-9 scroll-m-20 text-4xl font-semibold leading-tight tracking-tight",
    h4: "mb-4 mt-9 scroll-m-20 text-3xl font-semibold leading-tight tracking-tight",
    section_title: "text-4xl",
    section_eyebrow: "text-sm font-medium uppercase tracking-widest mb-6",
    section_description: "text-lg max-w-prose text-muted-foreground",
    eyebrow: "text-primary text-base font-semibold",
    p: "tracking-loose my-4 leading-[150%]",
    small: "text-xs",
    code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
    lead: "text-xl",
  },
  colour: {
    default: "",
    muted: "text-muted-foreground",
    accent: "text-accent",
    inverted: "text-background",
  },
  spacing: {
    none: "p-0 m-0",
    default: "my-4",
  },
  alignment: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  },
}

const typographyVariants = cva("text-pretty text-base", {
  variants: variantsConfig,
  defaultVariants: {
    variant: "p",
    colour: "default",
    spacing: "default",
    alignment: "left",
  },
})

type VariantKeys = keyof typeof variantsConfig.variant

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  children: React.ReactNode
}

const variantMapping: Record<VariantKeys, keyof JSX.IntrinsicElements> = {
  heroHeading: "h1",
  heroSubHeading: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  section_title: "h2",
  section_eyebrow: "p",
  section_description: "p",
  eyebrow: "p",
  p: "p",
  small: "p",
  code: "code",
  lead: "p",
}

const Typography = ({
  variant,
  colour,
  spacing,
  alignment,
  className,
  children,
}: TypographyProps) => {
  const isVariantValid = (variant: any): variant is VariantKeys =>
    variant in variantMapping

  const TextComponent: React.ElementType = isVariantValid(variant)
    ? variantMapping[variant]
    : "p"

  return (
    <TextComponent
      className={cn(
        typographyVariants({ variant, spacing, className, colour, alignment })
      )}
    >
      <Balancer>{children}</Balancer>
    </TextComponent>
  )
}

export { Typography, typographyVariants }
