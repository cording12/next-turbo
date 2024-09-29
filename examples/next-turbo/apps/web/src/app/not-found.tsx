import {
    AnimatedElement,
    Button,
    Grid,
    GridItem,
    Section,
    Typography,
  } from "@repo/ui"

export default function NotFound() {
  return <main>
    <AnimatedElement animationStyle="bottomUp" duration="medium">
        <Section padding="loose" className="gap-12">
            <Typography variant={"h1"}>404 {":("}</Typography>
        </Section>
    </AnimatedElement>
  </main>
}
