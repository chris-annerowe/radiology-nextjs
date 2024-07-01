"use server"

import Calendar from '@/components/calendar'
import React from 'react'
import "@/styles/calendar.css"
import { getAppointmentByName, getAppointmentCount, getAppointmentSearchCount, getAppointments } from '@/data/appointment'
import AppointmentList from '@/ui/dashboard/appointment/appointment-list'
import { Appointment } from '@/types/appointment'

interface ApptProps{
  date: Date | null,
  modality: string | null,
  index: number | null
}
let appts: any[] = []
    
const Daybook = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getAppts = async () => {
    const appointments = await getAppointments()
    console.log("Daybook appointments: ",appointments)
    appointments?.map(appt=>{
      let temp:Appointment = {
        firstName: "",
        lastName: "",
        appointment_id: null,
        appointment_time: null,
        tel: "",
        sex: "",
        dob:null,
        description: "",
        index: null,
        modality: ""
      }
      temp.appointment_time = appt.appointment_time
      temp.appointment_id = appt.appointment_id
      temp.firstName = appt.firstName
      temp.lastName = appt.lastName
      temp.tel = appt.tel
      temp.sex = appt.sex
      temp.dob = appt.dob
      temp.description = appt.description
      temp.index = appt.index
      temp.modality = appt.modality
      appts.push(temp)
  })
    console.log("Call ",appts)
    return appts
  }
  const call = getAppts()

  
  let search = null;
  let pageNumber = 1

  const pageNumberParam = searchParams["page"];
  const searchParam = searchParams["search"];

    if (pageNumberParam) {
        try {
            if (Array.isArray(pageNumberParam)) {
                pageNumber = parseInt(pageNumberParam[0])
            } else {
                pageNumber = parseInt(pageNumberParam);
            }
        } catch (e) {
            console.log("Page number parameter invalid.")
        }
    }
  
  if (searchParam) {
    console.log("Reading search param")
    search = Array.isArray(searchParam) ? searchParam[0] : searchParam

  }
  const limit = 5

  const appointmentsList = search ? await getAppointmentByName(search) : null
  const appointmentCount = search ? await getAppointmentSearchCount(search) : await getAppointmentCount();
  const appointments = JSON.parse(JSON.stringify(appointmentsList));

  return (
    <div className='flex'>
      <Calendar appointments={appts}/>
      {searchParam && 
        <AppointmentList appointments={appointments} appointmentCount={appointmentCount} activePage={pageNumber} limit={limit} search={search} />
      }
    </div>
  )
}

export default Daybook