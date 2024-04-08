'use client'

import { Input } from '@chakra-ui/react'
import { ChangeEvent, FC, ReactNode } from 'react'

type InputType = {
  pleaceholder: string
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputEmail: FC<InputType> = ({
  pleaceholder,
  name,
  onChange
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(onChange) onChange(event)
  }
  return (
    <Input placeholder={pleaceholder} type="email" name={name} onChange={handleOnChange} />
  )
}

export default InputEmail
