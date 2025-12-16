'use client'

import { findAllStudies } from "@/actions/studies";
import { Study } from "@/types/studies";
import EditStudyModal from "@/ui/dashboard/accessioning/studies/edit-study-modal";
import { Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";



export default function EditStudy() {

    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedStudy, setSelectedStudy] = useState<Study>({
        study_id: 0,
        cpt_code: '',
        study_name: null, 
        study_description: null,
        modality_code: '',       
        price: null,
        isInsurable: null,
        isTaxable: null
    })
    
    const [activePage, setActivePage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [studies, setStudies] = useState<Study[]>([])

    useEffect(()=>{
        getStudiesList();
    },[])

    const closeEditModal = () => {
        setOpenEditModal(false);
    }

    const onPageChange = (page: number) => {
        setActivePage(page);
    }

    const getStudiesList = () => {
        console.log("Called");
        findAllStudies().then(res=>{
            console.log(res);
            setStudies(res)
        })
    }



    const handleSelectedStudy = (study: Study) => {
        console.log("Study selected: ",study)

        //open modal to edit study?
        setSelectedStudy(study)
        setOpenEditModal(true)
        
        
    }


    return (
        <>
            <EditStudyModal open={openEditModal} onClose={closeEditModal} study={selectedStudy} />
               <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Study</h3>

                        <Table striped hoverable>
                            <Table.Head>
                                <Table.HeadCell>CPT Code</Table.HeadCell>
                                <Table.HeadCell>Study Name</Table.HeadCell>
                                <Table.HeadCell>Modality Code</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>

                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {studies.map((study, index)=>{
                                    return (
                                        <Table.Row key={index} className='hover:bg-slate-400' onClick={()=>handleSelectedStudy(study)}>
                                            <Table.Cell>{study.cpt_code}</Table.Cell>
                                            <Table.Cell>{study.study_name}</Table.Cell>
                                            <Table.Cell>{study.modality_code}</Table.Cell>
                                            <Table.Cell>{study.price}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
                        </div>

                    </div>
        </>
    )
}