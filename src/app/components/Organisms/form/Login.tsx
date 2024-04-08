
'use client'
import Link from "next/link"
import Card from "../../../components/atom/card/Card"
import InputEmail from "../../../components/atom/input/InputEmail"
import InputPassword from "../../../components/atom/input/InputPassword"
import { ChangeEvent, FC, MouseEvent } from "react"
import { Stack } from "@chakra-ui/react"
import Button from "../../atom/button/Button"
import { useProcessAuth } from "@/hooks/useProcessAuth"

const Login: FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth
  } = useProcessAuth()
  const handleClick = () => {
    setIsLogin(!isLogin)
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }
  if (registerMutation.isLoading || loginMutation.isLoading) {
    <div>...Loading</div>
  }
  return (
    <Card>
      <h2 className="text-lg text-center font-bold">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={processAuth}>
        <div className="mt-4">
          <h3 className="pb-1">e-mail</h3>
          <InputEmail pleaceholder="sample@example.com" name="email" onChange={handleChange}/>
        </div>
        <div className="mt-4">
          <h3 className="pb-1">password</h3>
          <InputPassword name="password" onChange={handleChange} />
        </div>
        <p className="text-right mt-1">
          <span className="inline-block text-blue-400  hover:underline hover:cursor-pointer" onClick={handleClick}>
            {isLogin ? <>register</> : <>login</>}
          </span>
        </p>
        <div className="mt-4">
          <Stack direction='row' spacing={4} align='center' justifyContent='center'>
            <Button
              type='submit'
            >
              Submit
            </Button>
          </Stack>
        </div>
      </form>
    </Card>
  )
}

export default Login
