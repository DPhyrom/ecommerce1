import React from 'react'
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';
import { Label } from '@radix-ui/react-label';


export default function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

    const renderInputsByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.componentType) {
            case 'input':
                element = <Input name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} value={value} onChange={event=> setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}/>
                break;
            case 'select':
                element = <Select onValueChange={(value)=>setFormData({
                    ...formData,
                    [getControlItem.name] : value
                })} value={value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControlItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.option && getControlItem.option.length > 0 ? getControlItem.option.map(optionItem =><SelectItem key={optionItem.id} value={optionItem.id}></SelectItem>) : null
                        }
                    </SelectContent>
                </Select>
                break;
            case 'textarea':
                element = <Textarea name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.id} value={value}/>
                break;
            default:
                element = <Input name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} value={value} onChange={event=> setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}/>
                break;
        }
        return element
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3 '>
                {
                    formControls.map(controlItem => {
                        return <div className='grid w-full gap-1.5' key={controlItem.name}>
                            <Label className='mb-1'>{controlItem.label}</Label>
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    })
                }
            </div>
            <Button type="submit" className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
        </form>
    )
}
