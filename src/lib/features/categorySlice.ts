import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CategoryInfoType } from '@/app/types/types'

export type CategoryStateType = {
  editedCategory: CategoryInfoType
  csrfTokenExp: boolean
}

const initialState: CategoryStateType = {
  editedCategory: {
    id: '',
    name: '',
    user_id: '',
  },
  csrfTokenExp: false,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setEditedCategory: (state, action: PayloadAction<CategoryInfoType>) => {
      state.editedCategory = action.payload
    },
    resetEditedCategory: (state) => {
      state.editedCategory = initialState.editedCategory
    },
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    }
  }
})

export const { setEditedCategory, resetEditedCategory, toggleCsrfState } = categorySlice.actions
export const selectCategory = (state: RootState) => state.category.editedCategory
export const selectCsrfState = (state: RootState) => state.item.csrfTokenExp
export default categorySlice.reducer
