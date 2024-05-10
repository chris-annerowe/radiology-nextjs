"use client"
import ReactCalendar from 'react-calendar'

import React, { useState } from 'react'
import { add, format } from 'date-fns'
import { BUSINESS_HOURS_INTERVAL, CLOSING_HOURS, OPENING_HOURS } from '@/config'
import { FaCalendar, FaClock } from 'react-icons/fa6'

interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

const Calendar = () => {
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null
    })
    console.log(date.justDate)
    console.log(date.dateTime)

    const getTimes = () => {
        if(!date.justDate) return

        const {justDate} = date
        const startTime = add(justDate, {hours: OPENING_HOURS}) //sets opening time to 9:00AM
        const end = add(justDate, {hours: CLOSING_HOURS})  //sets closing time to 5:00PM
        const interval = BUSINESS_HOURS_INTERVAL //in minutes. Select time slot in 30 min intervals
    
        const times = []
        for(let i=startTime; i<=end; i=add(i,{minutes:interval})){
            times.push(i)
        }

        return times
    }

    const times = getTimes()
    
    return (
      <div className='h-screen flex flex-col justify-center items-center'>
       <h2 className='flex gap-2 justify-start items-center gap-3'>
        <FaCalendar/>
            Select Date
       </h2>
        <ReactCalendar
              className="REACT-CALENDAR p-2"
              minDate={new Date()}
              view='month'
              onClickDay={(date)=>{setDate((prev)=>({...prev,justDate:date}))}}
          />
          {date?.justDate ?
          (<>
          <h2 className='flex gap-2 justify-start items-center gap-3'>
                <FaClock/>
                Select Time
            </h2>
         <div className='grid grid-cols-3 gap-2 border rounded-lg p-3'>
            {times?.map((time, i) => (
                <div key={`time-${i}`} className={`rounded-sm bg-gray-100 p-2 cursor:pointer hover:bg-sky-600 hover:text-white `}>
                    <button classname={`rounded-sm ${date?.dateTime && 'bg-sky-600 text-white'}`} type='button' onClick={()=> setDate((prev)=>({...prev,dateTime:time}))}>
                        {format(time,'kk:mm')}
                    </button>
                </div>
            ))}
            </div>
            </>)
            : null}
      </div>
  )
}

export default Calendar