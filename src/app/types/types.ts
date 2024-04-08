export type UserType = {
  email: string
  password: string
}
export type UserInfoType = {
  id: string
  email: string
}
export type ItemType = {
  id: string
  name: string
  amount: number
  content: string
  type: string
  date: Date
  category_id: string
}
export type CategoryType = {
  id: string
  name: string
}
export type CategoryInfoType = CategoryType & {
  user_id: string
}
export interface CsrfToken {
  csrf_token: string
}
