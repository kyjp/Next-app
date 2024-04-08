import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useQueryCategories = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const getCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/category`, {
        withCredentials: true
      })
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity
  })
}
