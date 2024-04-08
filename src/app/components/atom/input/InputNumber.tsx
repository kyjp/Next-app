import { FormErrorMessage, Input } from '@chakra-ui/react'
import { ChangeEvent, FC } from 'react'

type InputType = {
  pleaceholder: string
  error?: boolean
  errorText?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputNumber: FC<InputType> = ({
  pleaceholder,
  error,
  errorText,
  onChange
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
  }
  return (
    <>
      <Input
        placeholder={pleaceholder}
        type='number'
        onChange={handleOnChange}
        onBlur={handleOnChange}
      />
      {
        error ? <FormErrorMessage>{errorText}</FormErrorMessage> : <></>
      }
    </>
  )
}

export default InputNumber
