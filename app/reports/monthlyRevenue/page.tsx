'use client'
import { Button, Table } from "flowbite-react";
import html2pdf from "html2pdf.js";

export default function MonthlyRevenueReport(){
    const total = 23000

    const handleDownload = () => {
        const element = document.getElementById("generatePDF")
        console.log("Element to generate ",element)
        html2pdf(element, {
            margin: 20,
            filename: 'MonthlyRevenueReport.pdf'
        })
        
    }
    return (
        <div className="space-y-6 mt-10" id='generatePDF'>
            {/* TODO: format for better looking report. Pull necessary data from DB */}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Monthly Revenue</h3>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Item</Table.HeadCell>
                        <Table.HeadCell>Unit Price</Table.HeadCell>
                        <Table.HeadCell>Total Price</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Fee</Table.Cell>
                            <Table.Cell>500</Table.Cell>
                            <Table.Cell>{total}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button onClick={handleDownload} data-html2canvas-ignore>Download Report</Button>
        </div>
    )
}