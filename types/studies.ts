export interface Study{
    study_id: number        
    cpt_code: string         
    study_name: string | null      
    study_description: string | null
    modality_code: string       
    price: number | null
    isInsurable: boolean | null
    isTaxable: boolean | null
  }

  export interface PatientStudy{
    id: number
    patient_id: string
    study_name: string | null
    study_id: number
    cpt_code: string | null
    isInsurable: boolean | null
    isTaxable: boolean | null
  }