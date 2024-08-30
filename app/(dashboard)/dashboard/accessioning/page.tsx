'use server'

import AccessioningTabs from "@/ui/dashboard/accessioning/accessioning-tabs";
import { getClientProviders } from "@/actions/pos";
import { ClientProvider } from "@/types/pos";


export default async function Accessioning(){
    let clientProviders:ClientProvider[] = []

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
    const call = await fetchClientProviders()

    return (
        <>
            <AccessioningTabs clientProviders={clientProviders}/>
        </>
    )
}