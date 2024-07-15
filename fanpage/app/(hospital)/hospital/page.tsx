import Thread from "@/components/Thread/Thread"
import { ConvertDataToThreadType, ThreadDataType } from "@/contants/hospital/thread"
import instance from "@/untils/axios"


const HospitalPage = async () => {

    const data : any = await instance.get('/threadAll')
    
    const listThread : ThreadDataType[]= ConvertDataToThreadType(data)
    console.log(listThread)
    return (
        <div>

            {
                listThread.length > 0 &&
                listThread.map((thread, index) => (
                    <Thread thread={thread} key={index}/>
                ))
            }
        </div>
    )
}

export default HospitalPage

