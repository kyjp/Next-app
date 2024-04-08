import { FormEvent } from 'react'
import { useMutateItem } from './useMutateItem'
import { useAppSelector } from '../lib/hooks'
import { selectItem } from '../lib/features/itemSlice'

export const useProcessItem = () => {
  const editedItem = useAppSelector(selectItem)
  const { createItemMutation, updateItemMutation } = useMutateItem()
  const processItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editedItem.id === '') {
      createItemMutation.mutate({
        name: editedItem.name,
        amount: editedItem.amount,
        content: editedItem.content,
        date: editedItem.date,
        category_id: editedItem.category_id,
        type: editedItem.type
      })
    } else {
      updateItemMutation.mutate(editedItem)
    }
  }
  return {processItem}
}
