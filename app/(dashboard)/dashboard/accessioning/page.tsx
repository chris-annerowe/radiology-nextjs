'use server'

import AccessioningTabs from "@/ui/dashboard/accessioning/accessioning-tabs";
import { getClientProviders, getInsuranceProviders, getPaymentTypes } from "@/actions/pos";
import { ClientProvider, InsuranceProvider, PaymentType } from "@/types/pos";


export default async function Accessioning(){
    let clientProviders:ClientProvider[] = []
    let insuranceProviders:InsuranceProvider[] = []
    let paymentTypes:PaymentType[] = []

    const fetchClientProviders = async () => {
        const providers = await getClientProviders()
        clientProviders = []
        providers.map(prov=>{
            let temp:ClientProvider = {
                clientprov_desc: '',
                clientprov_id: undefined,
                clientprov_name: '',
                clientprov_type: undefined,
                active: false
            }
                //assign each client provider in list to temp then add each temp provider to array
                temp.clientprov_id = prov.clientprov_id
                temp.clientprov_name = prov.clientprov_name
                temp.clientprov_type = prov.clientprov_type
                temp.clientprov_desc = prov.clientprov_desc
                temp.active = prov.active
    
                clientProviders.push(temp)
            })
            console.log("Accession page client prov ",clientProviders)
        return clientProviders
    }

    const fetchInsuranceProviders = async () => {
        const providers = await getInsuranceProviders()
        insuranceProviders = []
        providers.map(prov=> {
            let temp:InsuranceProvider = {
                    insurance_id: '',
                    insurance_name: '',
                    user_id: null,
                    last_modified: null,
                    in_use: null,
                    ins_abbreviation: '',
                    bin_nos: '',
                    bin_codes: ''
            }
            temp.insurance_id = prov.insurance_id
            temp.insurance_name = prov.insurance_name
            temp.user_id = prov.user_id
            temp.last_modified = prov.last_modified
            temp.in_use = prov.in_use
            temp.ins_abbreviation = prov.ins_abbreviation
            temp.bin_nos = prov.bin_nos
            temp.bin_codes = prov.bin_codes

            insuranceProviders.push(temp)
        })
        console.log("Accession page insurance prov ",insuranceProviders)
        return insuranceProviders
    }

    const fetchPaymentTypes = async () => {
        const types = await getPaymentTypes()
        paymentTypes = []
        types.map(type=> {
            let temp:PaymentType = {
                    abbreviation: '',
                    name: '',
                    id_required: false
            }
            temp.abbreviation = type.abbreviation,
            temp.name = type.name,
            temp.id_required = type.id_required

            paymentTypes.push(temp)
        })
        console.log("Accession page payment types ",paymentTypes)
        return paymentTypes
    }

    const client = await fetchClientProviders()
    const insurance = await fetchInsuranceProviders()
    const types = await fetchPaymentTypes()

    return (
        <>
            <AccessioningTabs clientProviders={clientProviders} paymentTypes={paymentTypes} insuranceProviders={insuranceProviders} />
        </>
    )
}