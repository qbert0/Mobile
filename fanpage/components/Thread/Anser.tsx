import { convertCreateAt } from "@/contants/hospital/thread"
import Avatar from "./Avatar"

interface Props {
    name : string,
    date : Date,
    title : string,
    nurId? : string
}

const Anser = ({name, date, title, nurId} : Props ) => {
    
    const gender = splitStringAtCustomChar(name, ',')[0]
    

    return (
        <div className="w-full flex flex-col bg-blue-300 p-2 my-2 rounded-lg shadow-md ">
            {/* header */}
            <div className="w-full flex-row flex items-center px-2 py-1">
                <div className="p-0.5 rounded-full ml-3  mr-2  flex justify-center items-center">
                    <div className="w-10 h-10 p-0.5 rounded-full mr-4 bg-white flex flex-row justify-center items-center">
                        <Avatar gender={gender} />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="text-[#5e9e8d] font-medium text-base">{name}</div>
                    <div className="text-md font-light italic">{convertCreateAt(date)}</div>
                </div>
            </div>


            {/* seperator */}
            <div style={{
                    height: 1,
                    backgroundColor: '#e0e0e0',
                    
            }}></div>

            {/* title */}
            <div className="py-1">
                {title}
            </div>
        </div>
    )
}

export default Anser

const splitStringAtCustomChar = (input: string, separator: string): string[] => {
    return input.split(separator);
}