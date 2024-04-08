import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ItemType } from '@/app/types/types'

export type ItemStateType = {
  editedItem: ItemType
  csrfTokenExp: boolean
}

const initialState: ItemStateType = {
  editedItem: {
    id: '',
    name: '',
    content: '',
    amount: 0,
    type: '支出',
    date: new Date(),
    category_id: ''
  },
  csrfTokenExp: false,
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setEditedItem: (state, action: PayloadAction<ItemType>) => {
      state.editedItem = action.payload
    },
    resetEditedItem: (state) => {
      state.editedItem = initialState.editedItem
    },
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    }
  }
})

export const { setEditedItem, resetEditedItem, toggleCsrfState } = itemSlice.actions
export const selectItem = (state: RootState) => state.item.editedItem
export const selectCsrfState = (state: RootState) => state.item.csrfTokenExp
export default itemSlice.reducer
