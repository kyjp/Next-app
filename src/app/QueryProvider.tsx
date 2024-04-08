'use client'
import { FC, ReactNode, useState} from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClientOptions = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
}

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClientStore] = useState(
    () => new QueryClient(queryClientOptions)
  )
  return (
    <>
      <QueryClientProvider client={queryClientStore} >
        {children}
      </QueryClientProvider>
    </>
  )
}

export default QueryProvider
