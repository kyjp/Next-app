import type { Metadata } from "next"
import { Inter } from "next/font/google"
import styles from './layout.module.sass'
import Nav from "../components/Organisms/nav/Nav"

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
    <>
      <Nav />
      <main className={`${styles.main}`}>
        {children}
      </main>
    </>
  )
}
