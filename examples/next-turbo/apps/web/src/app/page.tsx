import Image from "next/image"
import {
  ExampleArea,
  ExampleBar,
  ExampleChartSteps,
  ExamplePie,
} from "@/components/chart-examples"
import {
  AnimatedElement,
  Button,
  Grid,
  GridItem,
  Section,
  Typography,
} from "@repo/ui"

import heroImg from "../../public/hero-img.jpg"

export default function Home() {
  return (
    <main>
      <AnimatedElement animationStyle="bottomUp" duration="medium">
        <Section padding="loose" className="gap-12">
          <Grid columns={2} spacing="xl" className="gap-40">
            <GridItem className="flex max-w-fit flex-col items-start gap-6">
              <div>
                <Typography variant="heroHeading">Hero Section</Typography>
                <Typography variant="heroSubHeading">
                  This a hero subheading
                </Typography>
              </div>
              <div className="flex max-w-fit flex-row gap-4">
                <Button variant="default">Sign up</Button>
                <Button variant="secondary">Find out more</Button>
              </div>
            </GridItem>
            <GridItem className="relative h-[500px]">
              <Image
                className="rounded-3xl shadow-2xl shadow-black"
                alt="Random hero image"
                src={heroImg}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </GridItem>
          </Grid>
        </Section>
      </AnimatedElement>

      <AnimatedElement animationStyle="bottomUp" duration="slowest">
        <Section
          variant="callout"
          padding="none"
          alignment="center"
          gradient="primary"
        >
          <Typography
            variant="section_eyebrow"
            className="from-primary to-secondary-foreground bg-gradient-to-r bg-clip-text text-transparent"
            alignment="center"
          >
            Trusted globally
          </Typography>
          <Typography variant="section_title" alignment="center">
            Trusted by companies worldwide
          </Typography>
          <Typography variant="section_description" alignment="center">
            Users don't want to send feedback to a black hole. Give them a sense
            of control with engaging and highly scalable feedback portals.
          </Typography>
        </Section>
      </AnimatedElement>

      <Section variant="light" className="gap-12">
        <Grid columns={3}>
          <GridItem>
            <ExampleChartSteps />
          </GridItem>
          <GridItem>
            <ExampleBar />
          </GridItem>
          <GridItem>
            <ExamplePie />
          </GridItem>

          <GridItem>
            <ExampleArea />
          </GridItem>
          <GridItem>
            <ExampleArea />
          </GridItem>
        </Grid>
      </Section>
    </main>
  )
}
