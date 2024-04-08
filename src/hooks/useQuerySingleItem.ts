import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useQuerySingleItem = (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const getSingleItems = async (id: string) => {
    const data = await axios.get(`${apiUrl}/item/${id}`, {
      withCredentials: true
    })
    return data
  }
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => getSingleItems(id),
    enabled: !id,
    staleTime: Infinity
  })
}
