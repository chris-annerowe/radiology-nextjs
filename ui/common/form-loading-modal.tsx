'use client';

import { Modal, Spinner } from "flowbite-react";
import { useFormStatus } from "react-dom";

export default function FormLoadingModal() {

    const { pending } = useFormStatus();


    return (
        <Modal show={pending} size={"sm"} popup>
            <Modal.Body>
                    
                    <div className="text-center p-16">
                        <Spinner aria-label="Center-aligned spinner example" size={'xl'} />
                    </div>
                    
            </Modal.Body>

        </Modal>
    )
}