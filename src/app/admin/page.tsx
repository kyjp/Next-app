'use client'
import InputField from "../components/Molecules/InputField"
import CategoryForm from "../components/Organisms/form/CategoryForm"
import Calendar from "../components/atom/calendar/Calendar"
import { PieChart } from "../components/atom/chart/PieChart"
import VerticalBar from "../components/atom/chart/VerticalBar"

export default function Admin() {
  return (
    <div>
      <InputField /><br />
      <CategoryForm /><br/>
      <Calendar /><br/>
      {/* <VerticalBar /><br />
      <PieChart /> */}
    </div>
  )
}
