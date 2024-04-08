import axios from 'axios'
import { useAppDispatch } from '../lib/hooks'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { CategoryType } from '../app/types/types'
import { useQueryUser } from './useQueryUser'
import { resetEditedCategory } from '@/lib/features/categorySlice'
import { toggleCsrfState } from '@/lib/features/itemSlice'
import { useRouter } from 'next/navigation'

export const useMutateCategory = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { data: dataUser } = useQueryUser()

  const createCategoryMutation = useMutation(
    {
      mutationFn: (category: Omit<CategoryType, 'id'>) => {
        return axios.post(`${apiUrl}/category`, {
          ...category,
          user_id: dataUser?.id
        }, {
          withCredentials: true
        })
      },
      onSuccess: (res) => {
        const previousCategories = queryClient.getQueryData<CategoryType[]>(['categories'])
        if (previousCategories) {
          queryClient.setQueryData(['categories'], [...previousCategories, res.data])
          dispatch(resetEditedCategory())
        }
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
  const updateCategoryMutation = useMutation(
    {
      mutationFn: (category: CategoryType) => {
        return axios.put<CategoryType>(`${apiUrl}/category/${category.id}`, {
          name: category.name,
          user_id: dataUser?.id
        }, {
          withCredentials: true
        })
      },
      onSuccess: (res, variables) => {
        const previousCategories = queryClient.getQueryData<CategoryType[]>(['categories'])
        if (previousCategories) {
          queryClient.setQueryData<CategoryType[]>(
            ['categories'],
            previousCategories.map((item) => item.id === variables.id ? res.data : item)
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
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${apiUrl}/category/${id}`, {
        withCredentials: true
      })
    },
    onSuccess(_, variables) {
      const previousCategories = queryClient.getQueryData<CategoryType[]>(['categories'])
      if (previousCategories) {
        queryClient.setQueryData<CategoryType[]>(['categories'], previousCategories.filter(category => category.id !== variables))
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
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation
  }
}
