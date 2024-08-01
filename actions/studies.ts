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

export const addPatientStudy = async (patient_id:string, study_id:number, study_name: string, cpt_code:string) => {
    try{
        await db.patient_studies.create({
            data: {
                patient_id,
                study_id,
                study_name,
                cpt_code
            }
        })
        console.log("Patient study created successfully")
    }catch(e){ throw e }
    
}