import { MouseEvent, useState } from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Calendar = () => {
  const [value, setValue] = useState(new Date())

  return (
    <div>
      <ReactCalendar
        value={value}
        locale="ja-JP"
        onClickDay={(event: any) => {
          console.log(event, new Date())
          setValue(event)
        }}
      />
    </div>
  )
}

export default Calendar
