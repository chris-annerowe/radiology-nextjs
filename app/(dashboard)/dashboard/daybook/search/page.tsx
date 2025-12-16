"use server"

import Calendar from '@/components/calendar'
import React from 'react'
import "@/styles/calendar.css"
import { getAppointmentsByName, getAppointmentSearchCount, getAppointmentsByPagination, getUpcomingAppointmentsCount } from '@/data/appointment'
import AppointmentList from '@/ui/dashboard/appointment/appointment-list'
import { Appointment } from '@/types/appointment'
import AppointmentSearch from '@/ui/dashboard/appointment/appointment-search'

let searchAppointments: any[] = []
    
const Search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let search = "";
  let pageNumber = 1
  const limit = 5

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
    console.log(search)
    //Get appointments by name
    const appointments = await getAppointmentsByName(search)
    console.log("appointments by name: ",appointments)
    //clear any previous search results
    searchAppointments = []
    appointments?.map(appt=>{
      let temp:Appointment = {
        first_name: "",
        last_name: "",
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
      temp.first_name = appt.first_name
      temp.last_name = appt.last_name
      temp.tel = appt.tel
      temp.sex = appt.sex
      temp.dob = appt.dob
      temp.description = appt.description
      temp.index = appt.index
      temp.modality = appt.modality
      
      searchAppointments.push(temp)
    })
  }
  
  const appointmentCount = search ? await getAppointmentSearchCount(search) : await getUpcomingAppointmentsCount();

  return (
    <div className='flex-col'>
        <h2 className='flex justify-center m-2 w-64'>
            <AppointmentSearch />
        </h2>
        
       <AppointmentList appointments={searchAppointments} appointmentCount={appointmentCount} activePage={pageNumber} limit={limit} search={search} />
        
    </div>
  )
}

export default Search