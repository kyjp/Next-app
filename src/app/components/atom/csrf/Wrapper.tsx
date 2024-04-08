'use client'
import { CsrfToken } from '@/app/types/types'
import { selectCsrfState } from '@/lib/features/itemSlice'
import { useAppSelector } from '@/lib/hooks'
import axios from 'axios'
import React, { FC, ReactNode, useEffect } from 'react'

const Wrapper: FC<{children: ReactNode}> = ({children}) => {
  const csrf = useAppSelector(selectCsrfState)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      })
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <>
      {children}
    </>
  )
}

export default Wrapper
