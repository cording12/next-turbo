import { ThemeProvider } from "@/components/theme/theme-provider"
import { Provider as ReactWrapProvider } from "react-wrap-balancer"

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
    >
      <ReactWrapProvider>{children}</ReactWrapProvider>
    </ThemeProvider>
  )
}
