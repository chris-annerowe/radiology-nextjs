'use client'
import { Button, Label, Select } from "flowbite-react";
import { redirect } from "next/navigation";


export default function ManagementReports(){
    const handleReport = (data: FormData) => {
        const report = data.get('manageReports')?.valueOf()
        console.log("Report selected ",report)

        //TODO: case selection to redirect to report based on which report selected. Use html2pdf to allow download
        switch(report){
            case 'monthlyRev':
                redirect('/reports/monthlyRevenue')
            default:
                console.log("No report chosen")
        }
    }
    return(
        <>
            <form action={handleReport}>
                        <div className="mb-2 block">
                            <Label htmlFor="manageReports" value="Management Reports" />
                        </div>
                        <Select id="manageReports" name="manageReports" defaultValue={''}>
                            <option value={''}> </option>
                            <option value={'monthlyRev'}>Total Monthly Revenue</option>
                            <option value={'orders'}>Detailed Orders</option>
                        </Select>
                <div>
                    <Button className="mt-10" type="submit">View</Button>
                </div>
            </form>
        </>
    )
}