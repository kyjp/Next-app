import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useQueryItems = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const getItems = async () => {
    try {
      const data = await axios.get(`${apiUrl}/items`, {
        withCredentials: true
      })
      return data
    } catch (error) {

    }
  }
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    staleTime: Infinity
  })
}
