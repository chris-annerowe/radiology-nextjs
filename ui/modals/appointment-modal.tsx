'use client';

import { createAppointment } from "@/data/appointment";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

interface ApptModalProps{
    show: boolean
    onClose: ()=>void
    date: Date
    modality: string
};

export default function AppointmentModal(props: ApptModalProps) {
    const [errors, setErrors] = useState<{[key:string]:any}>({});

    useEffect(()=>{
        if(errors){
            setErrors(errors)
        }

    },[errors])

    async function handleSave(data: FormData) {
            console.log("Handling save")

            const lastName = data.get('lastName')?.valueOf()
            const firstName = data.get('firstName')?.valueOf()
            const description = data.get('description')?.valueOf()           
            const tel = data.get('tel')?.valueOf()

            if (typeof firstName !== 'string' || firstName?.length === 0) {
                throw new Error("Invalid First Name")
            }
            if (typeof lastName !== 'string' || lastName?.length === 0) {
                throw new Error("Invalid Last Name")
            }
            if (typeof tel !== 'string' || tel?.length === 0) {
                throw new Error("Invalid Telephone Number")
            }
            if (typeof description !== 'string' || description?.length === 0) {
                throw new Error("Invalid Description")
            }
    
           await createAppointment(lastName,firstName, description, props.date, props.modality, tel)
    }


    return (
        <Modal show={props.show} size="md" onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center">Appointment Details</div>
            </Modal.Header>
            <Modal.Body>
            <>
            <form autoComplete="off" action={handleSave}>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value="First Name" />
                        </div>
                        <TextInput id="firstName" name="firstName" type="" placeholder="" defaultValue="" required shadow
                            helperText={
                                errors?.firstName && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Last Name" />
                        </div>
                        <TextInput id="lastName" name="lastName" type="" placeholder="" defaultValue="" required shadow
                            helperText={
                                errors?.lastName && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tel" value="Contact Number" />
                        </div>
                        <TextInput id="tel" name="tel" type="" placeholder="Digits only" defaultValue="" required shadow
                            helperText={
                                errors?.tel && 'Required'
                            }
                        />
                    </div>

                    <div></div>

                    <div  className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput id="description" name="description" sizing='lg' placeholder="Description" defaultValue='' shadow
                            helperText='Eg. Xray of left arm'
                        />
                    </div>

                    
                    <div className="flex my-8 justify-end">
                        <Button className="w-40" type="submit" color="blue">Save</Button>
                        <Button color='red' onClick={()=>{props.onClose()}}>Exit</Button>
                    </div>
                </div>
            </form>


        </>
            </Modal.Body>
        </Modal>
    )
}