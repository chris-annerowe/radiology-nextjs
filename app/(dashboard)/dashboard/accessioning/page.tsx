'use server'

import AccessioningTabs from "@/ui/dashboard/accessioning/accessioning-tabs";
import { getClientProviders, getInsuranceProviders, getPaymentTypes } from "@/actions/pos";
import { ClientProvider, InsuranceProvider, PaymentType } from "@/types/pos";
import { findPatientById } from "@/actions/patient";
import { Patient } from "@/types/patient";


export default async function Accessioning({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    let search = null;
    let patient:Patient = {
        patient_id: "",
        first_name: "",
        last_name: "",
        other_name: "",
        title: "",
        dob: new Date(),
        age: 0,
        sex: "",
        height: 0,
        weight: 0,
        allergies: "",
        nationality: "",
        next_kin: "",
        address_1: "",
        address_2: "",
        city: "",
        parish: "",
        telephone_1: "",
        telephone_2: "",
        cellular: "",
        email: "",
        id_type: "",
        idnum: ""
    
    }    

    const searchParam = searchParams["id"];

    if (searchParam) {

        search = Array.isArray(searchParam) ? searchParam[0] : searchParam

    }

    const patientSearchResult = async() => {
        if(typeof searchParam === 'string'){
            const resp = await findPatientById(searchParam)
            
            patient.patient_id = resp?.patient_id
            patient.first_name = resp?.first_name
            patient.last_name = resp?.last_name
            patient.other_name = resp?.other_name
            patient.title = resp?.title
            patient.dob = resp?.dob
            patient.age = resp.age
            patient.sex = resp?.sex
            patient.nationality = resp?.nationality
            patient.address_1 = resp?.address_1
            patient.address_2 = resp?.address_2
            patient.city = resp?.city
            patient.parish = resp?.parish
            patient.telephone_1 = resp?.telephone_1
            patient.telephone_2 = resp?.telephone_2
            patient.cellular = resp?.cellular
            patient.email = resp?.email
            patient.id_type = resp?.id_type
            patient.idnum = resp?.idnum

            console.log("Patient to accession from patient list ",patient)
        }
        console.log("No search param ", searchParam,patient)
    }
    
    // let clientProviders:ClientProvider[] = []
    // let insuranceProviders:InsuranceProvider[] = []
    // let paymentTypes:PaymentType[] = []

    // const fetchClientProviders = async () => {
    //     const providers = await getClientProviders()
    //     clientProviders = []
    //     providers.map(prov=>{
    //         let temp:ClientProvider = {
    //             clientprov_desc: '',
    //             clientprov_id: undefined,
    //             clientprov_name: '',
    //             clientprov_type: undefined,
    //             active: false
    //         }
    //             //assign each client provider in list to temp then add each temp provider to array
    //             temp.clientprov_id = prov.clientprov_id
    //             temp.clientprov_name = prov.clientprov_name
    //             temp.clientprov_type = prov.clientprov_type
    //             temp.clientprov_desc = prov.clientprov_desc
    //             temp.active = prov.active
    
    //             clientProviders.push(temp)
    //         })
    //         console.log("Accession page client prov ",clientProviders)
    //     return clientProviders
    // }

    // const fetchInsuranceProviders = async () => {
    //     const providers = await getInsuranceProviders()
    //     insuranceProviders = []
    //     providers.map(prov=> {
    //         let temp:InsuranceProvider = {
    //                 insurance_id: '',
    //                 insurance_name: '',
    //                 user_id: null,
    //                 last_modified: null,
    //                 in_use: null,
    //                 ins_abbreviation: '',
    //                 bin_nos: '',
    //                 bin_codes: ''
    //         }
    //         temp.insurance_id = prov.insurance_id
    //         temp.insurance_name = prov.insurance_name
    //         temp.user_id = prov.user_id
    //         temp.last_modified = prov.last_modified
    //         temp.in_use = prov.in_use
    //         temp.ins_abbreviation = prov.ins_abbreviation
    //         temp.bin_nos = prov.bin_nos
    //         temp.bin_codes = prov.bin_codes

    //         insuranceProviders.push(temp)
    //     })
    //     console.log("Accession page insurance prov ",insuranceProviders)
    //     return insuranceProviders
    // }

    // const fetchPaymentTypes = async () => {
    //     const types = await getPaymentTypes()
    //     paymentTypes = []
    //     types.map(type=> {
    //         let temp:PaymentType = {
    //                 abbreviation: '',
    //                 name: '',
    //                 id_required: false
    //         }
    //         temp.abbreviation = type.abbreviation,
    //         temp.name = type.name,
    //         temp.id_required = type.id_required

    //         paymentTypes.push(temp)
    //     })
    //     console.log("Accession page payment types ",paymentTypes)
    //     return paymentTypes
    // }

    const client = await fetchClientProviders()
    const insurance = await fetchInsuranceProviders()
    const types = await fetchPaymentTypes()
    const pat = await patientSearchResult()

    return (
        <>
            {/* <AccessioningTabs clientProviders={clientProviders} paymentTypes={paymentTypes} insuranceProviders={insuranceProviders} patient={patient}/> */}
            <AccessioningTabs patient={patient}/>
        </>
    )
}