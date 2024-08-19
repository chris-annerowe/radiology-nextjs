import PaymentTab from '@/ui/dashboard/accessioning/payment/payment-tab'
import Sidebar from '@/ui/dashboard/layout/sidebar'
import React from 'react'

const Payment =  async ({
    searchParams,
  }: {
    searchParams: { [key: string]: bigint | bigint[] | undefined };
  }) => {
    let studies = null;
  
  const searchParam = searchParams["search"];
  
   if (searchParam) {
      console.log("Reading search param")
      studies = Array.isArray(searchParam) ? searchParam[0] : searchParam
      console.log(studies)
   }

  return (
    <PaymentTab />
  )
}

export default Payment