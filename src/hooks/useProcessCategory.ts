import { selectCategory } from "@/lib/features/categorySlice"
import { useAppSelector } from "@/lib/hooks"
import { FormEvent} from "react"
import { useMutateCategory } from "./useMutateCategory"

export const useProcessCategory = () => {
  const editedCategory = useAppSelector(selectCategory)
  const {
    createCategoryMutation,
    updateCategoryMutation
  } = useMutateCategory()
  const processCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editedCategory.id === '') {
      createCategoryMutation.mutate({
        name: editedCategory.name
      })
    } else {
      updateCategoryMutation.mutate(editedCategory)
    }
  }
  return {processCategory}
}
