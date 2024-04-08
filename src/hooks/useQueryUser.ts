import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserInfoType } from '../app/types/types'
import { useRouter } from 'next/navigation'

export const useQueryUser = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()
  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get<UserInfoType>(
        `${ apiUrl }/user`, {
        withCredentials: true
      })
      return data
    } catch (error) {
      router.push('/')
    }
  }
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  })
}
