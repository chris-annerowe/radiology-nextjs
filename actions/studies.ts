'use server';


import { db } from "@/lib/db";



export const findAllStudies = async () => {

    const studies = db.studies.findMany();

    return studies;

}

export const findStudyByPatientId = async (patientId:string) => {
    const studies = await db.patient_studies.findMany({
        where: {
            patient_id: patientId
        }
    })
    return studies
}

export const addPatientStudy = async (patient_id:string, study_id:number, study_name: string, cpt_code:string, isInsurable:boolean, isTaxable:boolean) => {
    try{
        await db.patient_studies.create({
            data: {
                patient_id,
                study_id,
                study_name,
                cpt_code,
                isInsurable,
                isTaxable
            }
        })
        console.log("Patient study created successfully")
    }catch(e){ throw e }
    
}

export const findStudyById = async (id: number) => {
    const studies = await db.studies.findMany({
        where: {
            study_id : id
        }
    })
    return studies
}

export const findPatientStudyByStudyId = async (id: number) => {
    const studies = await db.patient_studies.findMany({
        where: {
            study_id: id
        }
    })
    return studies
}

export const deletePatientStudy = async (id: number) => {
    await db.patient_studies.delete({
        where: {
            id: id
        }
    })
    console.log("Patient Study successfully deleted.")
    return
}