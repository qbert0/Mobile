import { ThreadDataType, convertComment, convertCreateAt, convertName } from "@/contants/hospital/thread";
import Avatar from "./Avatar";
import Link from "next/link";

interface Props {
    thread : ThreadDataType
}

const Thread = ({thread} : Props ) => {


    return (
    <>
    <Link href={`hospital/${thread.id}`} className="px-2 py-1 my-2  flex flex-col rounded-md bg-slate-400 shadow-md">
        {/* avatar */}
        <div className="w-full flex flex-row items-center border-b py-2.5">
            <div className="p-0.5 rounded-full ml-3  mr-2  flex justify-center items-center">
                <div className="w-10 h-10 p-0.5 rounded-full mr-4 bg-white flex flex-row justify-center items-center">
                    <Avatar gender={thread.gender} />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="text-base font-semibold">{convertName(thread.gender, thread.age)}</div>
                <div className="text-base font-light italic">{convertCreateAt(thread.createAt)}</div>
            </div>
        </div>

        <div className="text-black p-1 max-h16 pl-3 mb-1">
            {convertComment(thread.content, 250)}
        </div>
        
        <div className="p-1.5 flex flex-row gap-2">
            {
                thread.major.map((major) => (
                    <div className="flex flex-row rounded-lg justify-center items-center bg-gray-500 mx-0.5 px-2 py-1 text-sm">
                        {major}
                    </div>
                ))
            }
        </div>


    </Link>
    
    </>
    )
}
export default Thread