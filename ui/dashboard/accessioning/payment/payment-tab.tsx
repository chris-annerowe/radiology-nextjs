'use client'

import { Study } from "@/types/studies";
import { Button, Popover, Table, TabsRef, } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiPlus, HiSearch, HiTrash } from "react-icons/hi";
import { Patient } from "@/types/patient";
import { deletePatientStudy, findPatientStudyByStudyId } from "@/actions/studies";




interface PaymentTabProps {
    studies: Study[],
    patient: Patient,
    tabsRef: RefObject<TabsRef>,
    activeTab: number, 
    setActiveTab:Dispatch<SetStateAction<number>>
}

export default function PaymentTab(props: PaymentTabProps) {


    const goToNext = () => {
        props.tabsRef.current?.setActiveTab(props.activeTab+1)
    }

    
    return (
        <>
            <div>
                <div className="flex space-x-4">
                    <div className="flex-col grid-cols-1 w-1/2">
                        <Table striped>
                        <Table.Head>
                            <Table.HeadCell colSpan={2}>Item</Table.HeadCell>
                            <Table.HeadCell colSpan={2}>Insurance</Table.HeadCell>
                            <Table.HeadCell>Patient</Table.HeadCell>
                        </Table.Head>
                        <Table.Head>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Provider</Table.HeadCell>
                            <Table.HeadCell>%</Table.HeadCell>
                            <Table.HeadCell>Balance</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {
                            props.studies.map((study,index)=>(
<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{study.study_description}</Table.Cell>
                                    <Table.Cell>{study.price}</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{study.price}</Table.Cell>
                                    
                                </Table.Row>
                            ))}

                        </Table.Body>
                        </Table>
                    </div>
                    
                </div>
                
                <div className="flex my-8 justify-end">
                    {props.patient.patient_id ?
                    (<Button className="w-40" color="blue" onClick={()=>goToNext()}>Continue</Button>)
                    :
                    (
                        <Button className="w-40" type="submit" color="blue">Continue</Button>
                    )
                    }
                    
                </div>
            </div>
        </>
    )
}