import { Label, Select } from "flowbite-react";

export default function GenderDropdown(props:{sex:string, disabled:boolean}){
    return (
        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sex" value="Gender" />
                        </div>
                       <Select id="sex" name="sex" defaultValue={props.sex} sizing='sm' disabled={props.disabled} required>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                            <option value={'Other'}>Other</option>
                        </Select>
                    </div>
    )
}