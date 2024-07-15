'use client'
import { TabsTrigger } from "@/components/ui/tabs"

interface Props {
    value : string,
    date : Date
}

const SelectDay = ({value, date} : Props) => {


    return (
        <div className="px-2 py-1 mx-2 my-1 flex justify-center items-center rounded-md">
            <TabsTrigger value={value}> {convertCreateAt(date)}</TabsTrigger>
        </div>
    )
}

export default SelectDay


const convertCreateAt = (date : Date) : string => {
    const formattedDate : Date = new Date(date)
    const createAt = formattedDate.toLocaleDateString() 
    return createAt
}