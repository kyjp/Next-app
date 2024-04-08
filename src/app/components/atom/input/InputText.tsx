import { FormErrorMessage, Input } from '@chakra-ui/react'
import { ChangeEvent, FC } from 'react'

type InputType = {
  pleaceholder: string
  error?: boolean
  errorText?: string
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputText: FC<InputType> = ({
  pleaceholder,
  error,
  errorText,
  name,
  onChange
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
  }
  return (
    <>
      <Input
        type="text"
        placeholder={pleaceholder}
        name={name}
        onChange={handleOnChange}
        onBlur={handleOnChange}
      />
      {
        error ? <FormErrorMessage>{errorText}</FormErrorMessage> : <></>
      }
    </>
  )
}

export default InputText
