import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { StoreProvider } from './StoreProvider'
import { ChakraProvider } from "@chakra-ui/react"
import "./globals.css"
import QueryProvider from "./QueryProvider"
import Wrapper from "./components/atom/csrf/Wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="ja">
        <body className={inter.className}>
          <QueryProvider>
            <ChakraProvider cssVarsRoot="body">
              <Wrapper>
                {children}
              </Wrapper>
            </ChakraProvider>
          </QueryProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
