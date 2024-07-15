import NurAnser from "@/components/Thread/NurAnser"
import ThreadAnser from "@/components/Thread/ThreadAnser"
import ThreadHead from "@/components/Thread/ThreadHeader"
import { ConvertDatatoThreadObject, ThreadDataType } from "@/contants/hospital/thread"
import instance from "@/untils/axios"


interface Props {

}

const ThreadPage = async ({params} : {params : {id : string}}) => {

    const data : any = await instance.get(`/getThreadById?threadID=${params.id}`)
    const thread  : ThreadDataType = ConvertDatatoThreadObject(data)
    console.log(thread)

    return (
        <div className="h-full w-full flex flex-col px-1 ">
            <div>
            {
                thread && <ThreadHead thread={thread}/>
            }
            {
                thread && <ThreadAnser anser={thread.comment} />
            } 
            </div>
            <div>
                
            </div>
            
            <NurAnser />



        </div>
    )
}

export default ThreadPage