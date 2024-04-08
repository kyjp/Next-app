import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
  },
  reducers: {},
  extraReducers: () => {}
})

export const selectTodos = (state: any) => state.todos
export default exampleSlice.reducer
