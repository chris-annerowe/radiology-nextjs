import Calendar from '@/components/calendar'
import React from 'react'
import "@/styles/calendar.css"
import { getAppointments } from '@/data/appointment'
import NumCalculator from 'antd/es/theme/util/calc/NumCalculator'

interface DateAndModality{
  date: Date | null,
  modality: string | null
}
let appts = []
let temp:DateAndModality = {
  date: null,
  modality:null
}
    
const Daybook = () => {
  const getAppts = async () => {
    const appointments = await getAppointments()
    console.log("Daybook appointments: ",appointments)
    appointments?.map(appt=>(
      appts.push(appt.appointment_time,appt.modality)
    ))
    console.log("Call ",appts)
    return appts
  }
  const call = getAppts()
  return (
    <div className='flex'><Calendar appointments={appts}/></div>
  )
}

export default Daybook