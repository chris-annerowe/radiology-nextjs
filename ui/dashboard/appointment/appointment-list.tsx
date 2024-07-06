"use client"

import { Appointment } from "@/types/appointment"
import { format } from "date-fns"
import { Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi"

interface AppointmentListProps {
    appointments: Appointment[],
    appointmentCount: number,
    activePage: number,
    limit: number,
    search: string | null
}
export default function AppointmentList(props: AppointmentListProps) {
console.log("Appointment list props: ",props.appointments)
    const router = useRouter();

    const onPageChange = (page: number) => {
        const search = props.search;
        if(props.search)
            router.push(`/dashboard/daybook?search=${search}&page=${page}`);    //TODO
        else
        router.push(`/dashboard/daybook?page=${page}`);                 //TODO
    }

    const totalPages = Math.ceil(props.appointmentCount / props.limit);

    const testAppointments:Appointment[] = [
        {
          firstName: 'test',
          lastName: 'dob',
          appointment_id: 21n,
          appointment_time: new Date(2024,6,20,12,0,0),
          tel: '5555555555',
          sex: null,
          dob: new Date(2010,6,1,5,0,0),
          description: 'final check that dob saves as date',
          index: 3,
          modality: 'MRI'
        },
        {
          firstName: 'Jordan',
          lastName: 'Northover',
          appointment_id: 9n,
          appointment_time: new Date(2024,6,23,10,0,0),
          tel: '8765347295',
          sex: 'M',
          dob: new Date(2024,6,22,5,0,0),
          description: 'Desc',
          index: 2,
          modality: 'UltraSound'
        },
        {
          firstName: 'Jordan',
          lastName: 'Northover',
          appointment_id: 10n,
          appointment_time: new Date(2024,6,22,9,30,0),
          tel: '8765347295',
          sex: 'M',
          dob: new Date(2024,6,22,5,0,0),
          description: 'Desc',
          index: 1,
          modality: 'UltraSound'
        },
        {
          firstName: 'test',
          lastName: 'highlight',
          appointment_id: 7n,
          appointment_time: new Date(2024,7,18,11,0,0),
          tel: '5555555555',
          sex: 'M',
          dob: new Date(2024,6,22,5,0,0),
          description: 'save to db and reload',
          index: 4,
          modality: 'UltraSound'
        },
        {
          firstName: 'jane',
          lastName: 'doe',
          appointment_id: 6n,
          appointment_time: new Date(2024,7,18,12,0,0),
          tel: '5555555555',
          sex: 'F',
          dob: new Date(2009,4,27,5,0,0),
          description: '',
          index: 6,
          modality: 'MRI'
        },
        {
          firstName: 'test',
          lastName: 'dob',
          appointment_id: 19n,
          appointment_time: new Date(2024,7,18,13,0,0),
          tel: '5555555555',
          sex: null,
          dob: null,
          description: 'last test',
          index: 1,
          modality: 'Xray'
        },
        {
          firstName: 'john',
          lastName: 'doe',
          appointment_id: 8n,
          appointment_time: new Date(2024,7,10,9,0,0),
          tel: null,
          sex: 'M',
          dob: null,
          description: ' ',
          index: 0,
          modality: 'CT'
        }
      ]


    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Last Name</Table.HeadCell>
                    <Table.HeadCell>First Name</Table.HeadCell>
                    <Table.HeadCell>Date Of Birth</Table.HeadCell>
                    <Table.HeadCell>Gender</Table.HeadCell>
                    <Table.HeadCell>Appointment Date</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        props.appointments.map((appt, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{appt.lastName}</Table.Cell>
                                <Table.Cell>{appt.firstName}</Table.Cell>
                                <Table.Cell>{appt.dob ? format(appt.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                <Table.Cell>{appt.sex}</Table.Cell>
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                        <Link href={`/dashboard/daybook/edit/${appt.appointment_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>

                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Delete
                                            </div>)}>
                                        <Link href={`#`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiTrash size={18} className="mx-auto" />
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