import { combineSlices, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { itemSlice } from './features/itemSlice'
import { categorySlice } from './features/categorySlice'

const rootReducer = combineSlices(itemSlice, categorySlice)

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
