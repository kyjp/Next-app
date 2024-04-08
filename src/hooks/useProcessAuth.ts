import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useMutateAuth } from './useMutateAuth'

export const useProcessAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()
  const processAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: password
      })
    } else {
      await registerMutation.mutateAsync({
        email: email,
        password: password
      }).then(() => {
        return loginMutation.mutate({
          email: email,
          password: password
        })
      }).catch(() => {
        setPassword('')
        setEmail('')
      })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries({ queryKey: ['items'], exact: true })
    queryClient.removeQueries({ queryKey: ['item'], exact: true })
    queryClient.removeQueries({ queryKey: ['users'], exact: true })
    queryClient.removeQueries({ queryKey: ['categories'], exact: true })
    router.push('/')
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout
  }
}
