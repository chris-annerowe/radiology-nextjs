"use client"

import { MODALITIES } from "@/config"
import { Appointment } from "@/types/appointment"
import AppointmentSearch from "@/ui/dashboard/appointment/appointment-search"
import { add, format } from "date-fns"
import { useRouter } from "next/navigation"

interface BusinessHours {
    opening_time: number,
    closing_time: number,
    interval: number
}

interface AppointmentProps {
    appointments?: Appointment[],
    calendarDate: Date,
    setSelectedModality: (modality:string)=>void,
    handleSelectedTimeslot: (time:Date, index:number)=>void,
    getAppointmentForSelectedDate: (index:number,modality:string)=>{},
    businessHrs: BusinessHours
}

export default function AppointmentTimes(props: AppointmentProps) {

    const router = useRouter();
    console.log("Daybook business hours ",props.businessHrs[0])

    const getTimes = () => {
        if(!props.calendarDate) return

        const justDate = props.calendarDate
        const startTime = add(justDate, {hours: props.businessHrs[0].opening_time}) //sets opening time to 9:00AM
        const end = add(justDate, {hours: props.businessHrs[0].closing_time})  //sets closing time to 5:00PM
        const interval = props.businessHrs[0].interval //in minutes. Sets time slot in 30 min intervals
    
        const times = []
        for(let i=startTime; i<=end; i=add(i,{minutes:interval})){
            times.push(i)
        }

        return times
    }

    const times = getTimes()

    


    return (
        <div className='flex flex-col w-3/4 m-3'>
        <h2 className='flex justify-end m-2 w-64'>
            <AppointmentSearch />
        </h2>
        <div className='grid grid-cols-5 gap-2 text-center p-1'>
            {MODALITIES?.map((modality,i) => (
            <div key={`modality-${i}`}>
                {modality}
                {times?.map((time, i) => (
                    <>
                    <div key={`time-${i}`} className={`rounded-sm p-2 m-2 ${ props.getAppointmentForSelectedDate(i,modality)} cursor:pointer hover:bg-sky-600 hover:text-white dark:text-white`} onClick={()=>props.setSelectedModality(modality)} >
                        <button id={`${modality}-timeslot`} className={`rounded-sm`} type='button' onClick={()=> props.handleSelectedTimeslot(time,i)}>
                        {format(time,'h:mm aa')}
                        </button>
                    </div>
                    </>
                ))}
            </div>   
            ))}
        </div>
    </div>
    )

}