import { Select as ChakraSelect } from '@chakra-ui/react'
import React, { FC } from 'react'

type SelectType = {
  array: {
    name: string
  }[]
}

const Select: FC<SelectType> = ({
  array
}) => {
  return (
    <ChakraSelect placeholder='選択してください'>
      {Object.keys(array).map((_, index) => <option value={array[index].name} key={index}>{array[index].name}</option>)}
    </ChakraSelect>
  )
}

export default Select
