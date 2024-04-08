import { ReactNode, FC } from 'react'
import { Card as ChakraCard, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

type CardType = {
  children: ReactNode
}

const Card: FC<CardType> = ({ children }) => {
  return (
    <ChakraCard>
      <CardBody>
        {children}
      </CardBody>
    </ChakraCard>
  )
}

export default Card
