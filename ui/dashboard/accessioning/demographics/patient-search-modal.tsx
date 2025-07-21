"use client";

import { findPatientByName } from "@/actions/patient";
import { ActionResponse } from "@/types/action";
import { Patient, PatientSearch } from "@/types/patient";
import { format } from "date-fns";
import { Modal, Pagination, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import store from "@/store"

const initialState: ActionResponse<PatientSearch> = {
    success: false,
    message: ''
}

interface PatientSearchModalProps {
    open: boolean,
    onClose: () => void,
    onSelect: (patient: Patient) => void
}
export default function PatientSearchModal(props: PatientSearchModalProps) {
    const daybookData = store.getState().appointment.appointment

    const [patients, setPatients] = useState<Patient[]>([])
    
    const defaultSearch = daybookData.firstName || daybookData.lastName ? `${daybookData.firstName} ${daybookData.lastName}`.trim() : '';
      
    const limit = 5;


    const [patientSearch, setPatientSearch] = useState<{
        firstName: string,
        lastName: string,
        dob: Date | null
    }>({
        firstName: "",
        lastName: "",
        dob: new Date()
    })


    const [activePage, setActivePage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);



    const searchPatients = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value;
        let result = await findPatientByName(search, activePage, limit);

            if (result.data) {
                setPatients(result.data);
                setTotalPages(result.pagination.count / limit);
            }
    };

    const searchDefault = async (data:string) => {
        let result = await findPatientByName(data, activePage, limit);

            if (result.data) {
                setPatients(result.data);
                setTotalPages(result.pagination.count / limit);
            }
    }

    useEffect(() => {
        if (defaultSearch) {
            console.log("Searching ",defaultSearch)
            searchDefault(defaultSearch); // simulating an event
        }
    }, [defaultSearch]);
    

    const onPageChange = (page: number) => {
        setActivePage(page);
    }



    const handleDOBDateChange = (date: Date) => {
        console.log(date.toDateString());
        if (date.toDateString() == new Date().toDateString()) {
            setPatientSearch({ ...patientSearch, dob: null })
        } else {
            setPatientSearch({ ...patientSearch, dob: date })
        }

    }


    return (
        <>
            <Modal show={props.open} size="4xl" onClose={props.onClose} popup>
                <Modal.Header />
                <Modal.Body className="min-h-full">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Search Patients</h3>


                        <div className="flex space-x-2">
                            <TextInput id="search" type="text" icon={HiSearch} placeholder="Search for patients" className="" onChange={searchPatients} 
                            defaultValue={defaultSearch}/>
                        </div>

                        <Table striped hoverable>
                            <Table.Head>
                                <Table.HeadCell>Last Name</Table.HeadCell>
                                <Table.HeadCell>First Name</Table.HeadCell>
                                <Table.HeadCell>Date Of Birth</Table.HeadCell>
                                <Table.HeadCell>Gender</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    patients ? patients.map((patient, index) => (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={() => props.onSelect(patient)}>
                                            <Table.Cell>{patient.last_name}</Table.Cell>
                                            <Table.Cell>{patient.first_name}</Table.Cell>
                                            <Table.Cell>{patient.dob ? format(patient.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                            <Table.Cell>{patient.sex}</Table.Cell>
                                            <Table.Cell>

                                            </Table.Cell>


                                        </Table.Row>
                                    )) : <></>
                                }

                            </Table.Body>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}