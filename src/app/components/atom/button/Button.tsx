import { ReactNode, FC, MouseEvent } from 'react'
import { Button as ChakraButton, ButtonGroup } from '@chakra-ui/react'

type ButtonType = {
  children: ReactNode
  isLoading?: true | false
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset" | undefined
}

const Button: FC<ButtonType> = ({
  children,
  isLoading,
  onClick,
  type
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if(onClick) onClick(event)
  }
  return (
    <ChakraButton
      colorScheme='blue'
      isLoading={isLoading ? isLoading : false}
      onClick={handleClick}
      type={type ? type : 'button'}
    >
      {children}
    </ChakraButton>
  )
}

export default Button
