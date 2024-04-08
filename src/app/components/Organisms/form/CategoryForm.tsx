import React from 'react'
import InputText from '../../atom/input/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategory, setEditedCategory } from '@/lib/features/categorySlice'
import { Button } from '@chakra-ui/react'
import { useProcessCategory } from '../../../../hooks/useProcessCategory'

const CategoryForm = () => {
  const dispatch = useDispatch()
  const editedCategory = useSelector(selectCategory)
  const {
    processCategory
  } = useProcessCategory()
  return (
    <form onSubmit={processCategory}>
      <div>
        <InputText
          pleaceholder="名前"
          name=""
          onChange={(event) => {
            dispatch(
              setEditedCategory({
                ...editedCategory,
                name: event.target.value
              })
            )
          }}
        />
      </div>
      <div>
        <Button
          colorScheme="red"
          type="submit"
        >
          {editedCategory.id === '' ? '登録する': '更新する'}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
