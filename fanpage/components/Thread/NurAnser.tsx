'use client'

import { useState } from "react"
import { IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
interface Props {

}

const NurAnser = () => {
    const [anser, setAnser] = useState('')

    const onsubmit = () => {
        
    }

    return (

        <div className="flex w-full flex-row justify-end rounded-lg  bottom-1">

            <div className="h-12 w-2/3 flex flex-row ">
            <input 
                type="text"
                value={anser}
                onChange={(e) => setAnser(e.target.value)}
                className="w-full bg-slate-400 rounded-lg pl-5 text-sm outline-2 placeholder:text-gray-500 "
            />

            <Button onClick={() => onsubmit()} className="h-12 w-16">
                <IoMdSend className="h-6 w-8" color="blue" style={{opacity: anser.length === 0 ? 0.3 : 1}}/>
            </Button>
        </div>
        </div>
        
    )
}

export default NurAnser