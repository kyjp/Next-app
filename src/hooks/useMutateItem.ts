import axios from 'axios'
import { useAppDispatch } from '../lib/hooks'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ItemType } from '../app/types/types'
import { useQueryUser } from './useQueryUser'
import { toggleCsrfState } from '@/lib/features/itemSlice'
import { resetEditedCategory } from '@/lib/features/categorySlice'
import { useRouter } from 'next/navigation'

export const useMutateItem = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { data: dataUser } = useQueryUser()

  const createItemMutation = useMutation(
    {
      mutationFn: (item: Omit<ItemType, 'id'>) => {
        let date = new Date(item.date)
        let year = date.getFullYear()
        let month = ("0" + String(date.getMonth() + 1)).slice(-2)
        let day = ("0" + String(date.getDate())).slice(-2)
        console.log({
          ...item,
          date: `${year}/${month}/${day}`,
          user_id: dataUser?.id
        })
        return axios.post(`${apiUrl}/item`, {
          ...item,
          date: `${year}/${month}/${day}`,
          user_id: dataUser?.id
        }, {
          withCredentials: true
        })
      },
      onSuccess: (res) => {
        const previousItems = queryClient.getQueryData<ItemType[]>(['items'])
        if (previousItems) {
          queryClient.setQueryData(['items'], [...previousItems, res.data])
        }
        dispatch(resetEditedCategory())
      },
      onError: (error: any) => {
        alert(`${error.response.data.detail}\n${error.message}`)
        if (
          error.response.data.detail === 'The JWT has expired' ||
          error.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedCategory())
          router.push('/')
        }
      }
    }
  )
  const updateItemMutation = useMutation(
    {
      mutationFn: (item: ItemType) => {
        let date = new Date(item.date)
        let year = date.getFullYear()
        let month = ("0" + String(date.getMonth() + 1)).slice(-2)
        let day = ("0" + String(date.getDate())).slice(-2)
        return axios.put<ItemType>(`${apiUrl}/item/${item.id}`, {
          name: item.name,
          content: item.content,
          category_id: item.category_id,
          date: `${year}/${month}/${day}`,
          user_id: dataUser?.id
        }, {
          withCredentials : true
        })
      },
      onSuccess: (res, variables) => {
        const previousItems = queryClient.getQueryData<ItemType[]>(['items'])
        if (previousItems) {
          queryClient.setQueryData<ItemType[]>(
            ['items'],
            previousItems.map((item) => item.id === variables.id ? res.data : item)
          )
        }
        dispatch(resetEditedCategory())
      },
      onError: (error: any) => {
        alert(`${error.response.data.detail}\n${error.message}`)
        if (
          error.response.data.detail === 'The JWT has expired' ||
          error.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedCategory())
          router.push('/')
        }
      }
    }
  )
  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${apiUrl}/item/${id}`, {
        withCredentials: true
      })
    },
    onSuccess(_, variables) {
      const previousItems = queryClient.getQueryData<ItemType[]>(['items'])
      if (previousItems) {
        queryClient.setQueryData<ItemType[]>(['items'], previousItems.filter(item => item.id !== variables))
      }
      dispatch(resetEditedCategory())
    },
    onError: (error: any) => {
      alert(`${error.response.data.detail}\n${error.message}`)
      if (
        error.response.data.detail === 'The JWT has expired' ||
        error.response.data.detail === 'The CSRF token has expired.'
      ) {
        dispatch(toggleCsrfState())
        dispatch(resetEditedCategory())
        router.push('/')
      }
    }
  })
  return {
    createItemMutation,
    updateItemMutation,
    deleteItemMutation
  }
}
