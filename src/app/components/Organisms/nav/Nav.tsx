'use client'

import { useQueryUser } from "@/hooks/useQueryUser"
import Drawer from "../../Molecules/Drawer"

const Nav = () => {
  const { data: dataUser } = useQueryUser()
  return (
    <nav className="flex w-full p-4 fixed bg-green-400 left-0 top-0">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-white">Next.js App</h1>
        <div className="flex items-center">
          <p className="text-white pr-4">{dataUser?.email}</p>
          <Drawer />
        </div>
      </div>
    </nav>
  )
}

export default Nav
