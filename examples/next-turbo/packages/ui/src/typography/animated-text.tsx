import React, { forwardRef, HTMLProps } from "react"
import { cn } from "@repo/utils"
import { motion, MotionProps } from "framer-motion"

// TODO: Refine properly using variants: https://www.framer.com/motion/animation/#variants

const variantsConfig = {
  animationStyle: {
    topDown: { y: -10, opacity: 0 },
    bottomUp: { y: 10, opacity: 0 },
  },
  duration: {
    slowest: { duration: 1 },
    slow: { duration: 0.75 },
    medium: { duration: 0.5 },
    fast: { duration: 0.25 },
  },
}

type AnimationStyle = keyof typeof variantsConfig.animationStyle
type Duration = keyof typeof variantsConfig.duration
type AnimatedElementProps = HTMLProps<HTMLDivElement> &
  MotionProps & {
    children: React.ReactNode
    className?: string
    animationStyle?: AnimationStyle
    duration?: Duration
  }

const AnimatedElement = forwardRef<HTMLDivElement, AnimatedElementProps>(
  (
    {
      children,
      className,
      animationStyle = "topDown",
      duration = "medium",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        initial={variantsConfig.animationStyle[animationStyle]}
        viewport={{ once: true, amount: 0.8 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={variantsConfig.animationStyle[animationStyle]}
        transition={variantsConfig.duration[duration]}
        className={cn(className)}
        ref={ref}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

export { AnimatedElement }
