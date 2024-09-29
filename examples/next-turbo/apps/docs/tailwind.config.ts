import sharedConfig from "@repo/tailwind-config/tailwind.config.ts"
import type { Config } from "tailwindcss"

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      darkMode: ["class", '[class*="dark"]'],
      content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        // https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
        "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
        "../../packages/theme/globals.css",
      ],
      theme: {
        extend: {
          ...sharedConfig?.theme?.extend,
          animation: {
            ...sharedConfig?.theme?.extend?.animation,
          },
          keyframes: {
            ...sharedConfig?.theme?.extend?.keyframes,
          },
          transitionDuration: {
            DEFAULT: "350ms",
          },
        },
      },
    },
  ],
}

export default config
