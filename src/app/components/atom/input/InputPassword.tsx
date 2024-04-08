'use client'

import { FC, ReactNode, useState, ChangeEvent} from 'react'
import { Button, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

type InputType = {
  error?: boolean
  errorText?: string
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputPassword: FC<InputType> = ({
  error,
  errorText,
  name,
  onChange
}) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
  }
  return (
    <>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          name={name}
          onChange={handleOnChange}
          onBlur={handleOnChange}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {
        error ? <FormErrorMessage>{errorText}</FormErrorMessage> : <></>
      }
    </>
  )
}

export default InputPassword
