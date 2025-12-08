"use client";

import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";


interface ModalProps{
    open: boolean,
    onClose: ()=>void,
    code: string
};
export default  function EditModality(props:ModalProps) {
    console.log("Edit code: ",props.code)

    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const handleSave = async (data:FormData) => {
        const name = data.get('name')?.valueOf()
        const code = props.code
        const description = data.get('description')?.valueOf()

        if (typeof name !== 'string' || name?.length === 0) {
            throw new Error("Invalid Modality Name")
        }

        console.log("Modality form values: ",name, props.code, description)
        
        try {
            const response = await fetch('/api/getModalities', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code, name, description
              }),
            });
    
            if (response.ok) {
              const result = await response.json();
              console.log('Modality updated', result)
            } else {
              console.error('Failed to save modality');
            }
        } catch (e) {
            console.log(e)
        }
        props.onClose()
    }

    return (
        <Modal show={props.open} onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center">Edit Modality </div>
            </Modal.Header>
            <Modal.Body>
        <>
            <form action={handleSave} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3 pt-10">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Modality Name" />
                        </div>
                        <TextInput id="name" name="name" type="" placeholder="" color={errors?.name ? "failure" : "gray"} required shadow
                            helperText={
                                errors?.name && errors?.name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput id="description" name="description" type="" placeholder="" color={errors?.description ? "failure" : "gray"} shadow
                            helperText={
                                errors?.description && errors?.description[0]
                            } />
                    </div>
                </div>
                <div className="flex my-8 justify-end">
                    <Button className="w-40" type="submit" color="blue">Submit</Button>
                </div>

                <FormLoadingModal />
            </form>


        </>
        </Modal.Body>
        </Modal>
    )
}