import axios, { AxiosResponse } from 'axios'
import { UserType } from '../app/types/types'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '../lib/hooks'
import { resetEditedItem, toggleCsrfState } from '@/lib/features/itemSlice'

export const useMutateAuth = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const loginMutation: any = useMutation(
    {
      mutationFn: (user: UserType) => {
        return axios.post(`${apiUrl}/login`, user, {
          withCredentials: true,
        })
      },
      onSuccess: () => {
        router.push('/admin/')
      },
      onError: (error: any) => {
        alert(`${error.response.data.detail}\n${error.message}`);
        if (error.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )
  const registerMutation: any = useMutation(
    {
      mutationFn: (user: UserType) => {
        return axios.post(`${apiUrl}/register`, user, {
          withCredentials: true,
        })
      },
      onSuccess: () => {
        router.push('/')
      },
      onError: (error: any) => {
        alert(`${error.response.data.detail}\n${error.message}`)
        if (error.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
          router.push('/')
        }
      }
    }
  )
  const logoutMutation = useMutation(
    {
      mutationFn: () => {
        return axios.post(`${apiUrl}/logout`, {}, {
          withCredentials: true
        })
      },
      onSuccess: () => {
        router.push('/')
      },
      onError: (error: any) => {
        alert(`${error.response.data.detail}\n${error.message}`)
        if (error.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
          dispatch(resetEditedItem())
          router.push('/')
        }
      }
    }
  )
  return { loginMutation, registerMutation, logoutMutation}
}
