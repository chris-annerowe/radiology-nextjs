import { Label, Select, TextInput } from "flowbite-react";

export default function Payments() {
    return (
        <div>
            <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Payments</h3>
                        <div className="mb-2 block">
                            <Label htmlFor="provider" value="Client Provider" />
                        </div>
                        <Select id="provider" name="provider" defaultValue={'P'}  sizing='sm' disabled={false} required>
                            <option value={'M'}>I</option>
                            <option value={'F'}>Am</option>
                            <option value={'Other'}>A</option>
                            <option value={'F'}>Client</option>
                            <option value={'P'}>Provider</option>
                        </Select>
                        
            </div>
            <div>
                        <div className="mb-2 block">
                            <Label htmlFor="method" value="Method" />
                        </div>
                        <Select id="method" name="method" defaultValue={''}  sizing='sm' disabled={false} required>
                            <option value={'cs'}>Cash</option>
                            <option value={'cc'}>Credit Card</option>
                            <option value={'db'}>Debit Card</option>
                            <option value={'cq'}>Cheque</option>
                        </Select>
            </div>
                   
            <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="paidby" value="Paid By" />
                        </div>
                        <TextInput id="paidby" name="paidby" type="" sizing='sm' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow  />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount" />
                        </div>
                        <TextInput id="amount" name="amount" type="number" sizing='sm' placeholder="0.00" color={"gray"} defaultValue={""} disabled={false} required shadow  />
                    </div>
            </div>
        </div>
    )
}