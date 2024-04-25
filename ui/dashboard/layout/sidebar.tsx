import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex sidebar flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 '>
        <Link href='/patient'
            className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
        >
          {/* <Image src='/favicon.ico'
            width={23}
            height={23}
            alt="DevFlow"
          /> */}
          Patient
        </Link>
        <Link href='/daybook'
            className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Daybook</Link>
        <Link href='/accessioning'
            className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Accessioning</Link>
        <Link href='/studies'
            className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Studies</Link>
        <Link href='/'
            className='flex px-2 py-1 rounded 
            hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Administration</Link>  {/* TODO: not a link, open a submenu*/}
    </div>
  )
}

export default Sidebar