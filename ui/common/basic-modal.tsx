'use client';

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

interface BasicModalProps{
    show: boolean
    onClose: ()=>void
    message: string

};

export default function BasicModal(props: BasicModalProps) {



    return (
        <Modal show={props.show} size="md" onClose={props.onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    {/*<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />*/}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {props.message}
                    </h3>
                    <div className="flex justify-center gap-4">
                        
                        <Button onClick={()=>{props.onClose()}}>
                            Ok
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}