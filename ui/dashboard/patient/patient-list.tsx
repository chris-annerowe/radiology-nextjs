"use client"

import { findPatientById } from "@/actions/patient"
import { Patient } from "@/types/patient"
import PatientFormModal from "@/ui/modals/patient-form-modal"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import { Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiNewspaper, HiOutlinePencilAlt } from "react-icons/hi"

interface PatientListProps {
    patients: Patient[],
    patientCount: number,
    activePage: number,
    limit: number,
    search: string | null
}
export default function PatientList(props: PatientListProps) {

    const router = useRouter();
    const [sortConfig, setSortConfig] = useState<{ key: keyof Patient | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });

    const sortedPatients = [...props.patients].sort((a, b) => {
        if (sortConfig.key) {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'entry_date' || sortConfig.key === 'dob') {
                aValue = new Date(aValue as any).getTime();
                bValue = new Date(bValue as any).getTime();
            }

            if (aValue! < bValue!) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue! > bValue!) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key: keyof Patient) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const onPageChange = (page: number) => {
        const search = props.search;
        if (props.search)
            router.push(`/dashboard/patient?search=${search}&page=${page}`);
        else
            router.push(`/dashboard/patient?page=${page}`);
    }

    const totalPages = Math.ceil(props.patientCount / props.limit);


    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell onClick={() => requestSort('entry_date')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        Registration Date {sortConfig.key === 'entry_date' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                    </Table.HeadCell>
                    <Table.HeadCell onClick={() => requestSort('last_name')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        Last Name {sortConfig.key === 'last_name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                    </Table.HeadCell>
                    <Table.HeadCell onClick={() => requestSort('first_name')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        First Name {sortConfig.key === 'first_name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                    </Table.HeadCell>
                    <Table.HeadCell onClick={() => requestSort('dob')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        Date Of Birth {sortConfig.key === 'dob' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                    </Table.HeadCell>
                    <Table.HeadCell onClick={() => requestSort('sex')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        Gender {sortConfig.key === 'sex' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Accession</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        sortedPatients.map((patient, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{patient.entry_date?.split("T")[0]}</Table.Cell>
                                <Table.Cell>{patient.last_name}</Table.Cell>
                                <Table.Cell>{patient.first_name}</Table.Cell>
                                <Table.Cell>{patient.dob ? format(patient.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                <Table.Cell>{patient.sex}</Table.Cell>
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                        <Link href={`/dashboard/patient/edit/${patient.patient_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>

                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Accession
                                            </div>)}>
                                        <Link href={`/dashboard/accessioning?id=${patient.patient_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiNewspaper size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={props.activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
            </div>


        </div>
    )

}