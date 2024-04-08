import { selectItem, setEditedItem } from "../../../../lib/features/itemSlice"
import React, { useState } from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux"
import { ja } from "date-fns/locale/ja"

registerLocale("ja", ja)

const DatePicker = () => {
  const initialDate = new Date()
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const dispatch = useDispatch()
  const editedItem = useSelector(selectItem)
  return (
    <ReactDatePicker
      dateFormatCalendar="yyyy年 MM月"
      dateFormat="yyyy/MM/dd"
      locale="ja"
      selected={selectedDate}
      onChange={(date: Date) => {
        setSelectedDate(date!)
        dispatch(
          setEditedItem({
            ...editedItem,
            date: date
        }))
      }}
      className="border w-full rounded p-2 pr-4 pl-4 hover:cursor-pointer"
    />
  )
}
export default DatePicker
